import emailjs from "@emailjs/browser";
import { motion } from "motion/react";
import { useState } from "react";
import {
  Download as DownloadIcon,
  Mail,
  CheckCircle,
  CreditCard,
  X as CloseIcon,
  GraduationCap,
  DollarSign,
  Key,
  Copy,
  ExternalLink,
} from "lucide-react";
import { toast, Toaster } from "sonner";
import { useLanguage } from "../../context/LanguageContext";
import { giveKauKey, givePaypalKey } from "../../lib/steamKeys";
import qrcode from "../../assets/images/qrcode.png";
import "../../styles/DownloadPage.css";

const PAYPAL_PAYMENT_URL = "https://www.paypal.com/ncp/payment/WHLUQU9TVH6GU";
const STEAM_REDEEM_URL = "https://store.steampowered.com/account/registerkey";

// ── SET THIS TO true WHEN STEAM KEYS ARE READY IN FIRESTORE ──
const KEYS_AVAILABLE = false;
// ─────────────────────────────────────────────────────────────

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const PURCHASE_FEATURES = [
  "download.feature_full_access",
  "download.feature_puzzles",
  "download.feature_updates",
  "download.feature_support",
];

const SYSTEM_REQUIREMENTS = {
  minimum: [
    { label: "OS", value: "Windows 10 64-bit" },
    { label: "Processor", value: "Intel Core i3" },
    { label: "Memory", value: "4 GB RAM" },
    { label: "Storage", value: "2 GB available space" },
  ],
  recommended: [
    { label: "OS", value: "Windows 11 64-bit" },
    { label: "Processor", value: "Intel Core i5" },
    { label: "Memory", value: "8 GB RAM" },
    { label: "Storage", value: "4 GB available space" },
  ],
};

export function DownloadPage() {
  const { t } = useLanguage();

  const [activeFlow, setActiveFlow] = useState("kau");
  const [email, setEmail] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isFetchingKey, setIsFetchingKey] = useState(false);
  const [steamKey, setSteamKey] = useState("");
  const [claimedEmail, setClaimedEmail] = useState("");
  const [paypalClicked, setPaypalClicked] = useState(false);

  // Reset form back to email input
  function resetForm() {
    setEmail("");
    setOtpSent(false);
    setOtpInput("");
    setGeneratedOTP("");
    setOtpError("");
  }

  // STEP 1: Validate email then send OTP
  const handleVerifyEmail = async (e, flow) => {
    e.preventDefault();
    setActiveFlow(flow);

    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    // Block everything if keys are not available yet
    // This prevents wasting EmailJS quota when there is nothing to give
    if (!KEYS_AVAILABLE) {
      toast.error(t("download.keys_unavailable_title"), {
        description: t("download.keys_unavailable_desc"),
        duration: 8000,
        closeButton: true,
      });
      return;
    }

    // KAU: must be @stu.kau.edu.sa with valid username
    if (flow === "kau") {
      const kauRegex = /^[a-zA-Z0-9._%+-]+@stu\.kau\.edu\.sa$/;
      if (!kauRegex.test(email.toLowerCase())) {
        toast.error(t("download.verification_failed"), {
          description: t("download.verification_failed_description"),
          cancel: {
            label: <CloseIcon className="h-4 w-4" />,
            onClick: () => {},
          },
        });
        return;
      }
    }

    // PayPal: any valid email format
    if (flow === "paypal") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email.toLowerCase())) {
        toast.error("Please enter a valid email address.");
        return;
      }
    }

    setIsVerifying(true);

    try {
      const otp = generateOTP();
      setGeneratedOTP(otp);

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_OTP_TEMPLATE,
        { to_email: email, otp },
      );

      setOtpSent(true);
      toast.success("Code sent!", {
        description: `A 6-digit code was sent to ${email}`,
      });
    } catch (error) {
      console.error("OTP send error:", error);
      toast.error("Failed to send code. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  // STEP 2: Verify OTP → fetch key from Firestore → email key
  const handleVerifyOTP = async () => {
    if (otpInput !== generatedOTP) {
      setOtpError("Incorrect code. Please try again.");
      return;
    }

    setOtpError("");
    setIsFetchingKey(true);

    try {
      let result;

      if (activeFlow === "kau") {
        // One free key per KAU email ever
        result = await giveKauKey(email);
      } else {
        // One key per payment — no quota limit
        result = await givePaypalKey(email);
      }

      if (result.status === "already_claimed") {
        toast.info("You already have a Steam key!", {
          description:
            "We already sent a key to this email. Please check your inbox and spam folder.",
          duration: 8000,
        });
        resetForm();
        return;
      }

      if (result.status === "no_keys") {
        toast.error(t("download.keys_unavailable_title"), {
          description: t("download.keys_unavailable_desc"),
          duration: 8000,
          closeButton: true,
        });
        resetForm();
        return;
      }

      if (result.status === "error") {
        toast.error("Something went wrong. Please try again.");
        return;
      }

      if (result.status === "ok") {
        // Email the key to the user
        try {
          await emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_STEAM_TEMPLATE,
            {
              to_email: email,
              steam_key: result.key,
              redeem_url: STEAM_REDEEM_URL,
            },
          );
          toast.success("Steam key sent to your email!", {
            description: "Check your inbox. Your key is also shown below.",
          });
        } catch (emailError) {
          // Key is saved in Firestore — user can still copy from screen
          console.error("Steam key email failed:", emailError);
          toast.error(
            "Email failed — please copy your key from the screen below!",
          );
        }

        setClaimedEmail(email);
        setSteamKey(result.key);
      }
    } catch (error) {
      console.error("handleVerifyOTP error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsFetchingKey(false);
    }
  };

  // Copy key to clipboard
  const handleCopyKey = async () => {
    try {
      await navigator.clipboard.writeText(steamKey);
      toast.success("Key copied to clipboard!");
    } catch {
      toast.error("Could not copy. Please select and copy the key manually.");
    }
  };

  // PayPal Buy Now — disabled until keys are ready
  const handlePurchase = () => {
    toast.error("Steam keys are not available yet.", {
      description:
        "We are still setting up. Please check back later or contact us at lostbyte.support@gmail.com",
      duration: 8000,
    });
  };

  // KEY REVEAL SCREEN — shown after key is successfully claimed
  if (steamKey) {
    return (
      <>
        <Toaster position="top-right" />
        <div className="download-page">
          <div className="download-container">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="download-key-reveal-card"
            >
              <div className="download-key-reveal-icon-wrap">
                <Key className="h-14 w-14" />
              </div>

              <h2 className="download-key-reveal-title">Your Steam Key 🎮</h2>

              <p className="download-key-reveal-desc">
                This key has also been emailed to{" "}
                <strong>{claimedEmail}</strong>
              </p>

              {/* Key display + copy button */}
              <div className="download-key-box">
                <span className="download-key-text">{steamKey}</span>
                <button
                  onClick={handleCopyKey}
                  className="download-key-copy-btn"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </button>
              </div>

              {/* Redeem on Steam button */}
              <a
                href={STEAM_REDEEM_URL}
                target="_blank"
                rel="noreferrer"
                className="download-steam-redeem-btn"
              >
                <ExternalLink className="h-5 w-5" />
                Redeem on Steam
              </a>

              {/* Step by step instructions */}
              <div className="download-key-steps">
                <p className="download-key-steps-title">How to redeem:</p>
                <ol className="download-key-steps-list">
                  <li>Open Steam on your PC</li>
                  <li>
                    Click <strong>Games</strong> in the top menu
                  </li>
                  <li>
                    Click <strong>Activate a Product on Steam</strong>
                  </li>
                  <li>
                    Paste your key and click <strong>Next</strong>
                  </li>
                </ol>
              </div>
            </motion.div>
          </div>
        </div>
      </>
    );
  }

  // MAIN PAGE
  return (
    <>
      <Toaster position="top-right" />
      <div className="download-page">
        <div className="download-container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="download-header"
          >
            <div className="download-icon-wrap">
              <div className="download-icon-circle">
                <DownloadIcon className="h-12 w-12" />
              </div>
            </div>
            <h1 className="download-title">{t("download.title")}</h1>
            <p className="download-desc">{t("download.description")}</p>
          </motion.div>

          <div className="download-options-grid">
            {/* ── KAU STUDENT CARD ── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="download-kau-card"
            >
              <div className="download-kau-header">
                <GraduationCap className="h-8 w-8 download-kau-icon" />
                <div>
                  <h2 className="download-kau-title">
                    {t("download.kau_student")}
                  </h2>
                  <p className="download-kau-desc">
                    {t("download.kau_description")}
                  </p>
                </div>
              </div>

              {!otpSent || activeFlow !== "kau" ? (
                <form
                  onSubmit={(e) => handleVerifyEmail(e, "kau")}
                  className="download-form"
                >
                  <div>
                    <label htmlFor="kau-email" className="download-form-label">
                      {t("download.verify_email")}
                    </label>
                    <div className="download-input-wrap">
                      <Mail className="h-5 w-5 download-input-icon" />
                      <input
                        type="email"
                        id="kau-email"
                        value={activeFlow === "kau" ? email : ""}
                        onChange={(e) => {
                          setActiveFlow("kau");
                          setEmail(e.target.value);
                        }}
                        placeholder={t("download.email_placeholder")}
                        required
                        className="download-input"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isVerifying && activeFlow === "kau"}
                    className="download-verify-btn"
                  >
                    {isVerifying && activeFlow === "kau" ? (
                      <>
                        <div className="download-spinner" />
                        {t("download.verifying")}
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-5 w-5" />
                        {t("download.verify")}
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="download-form">
                  <p className="download-otp-info">
                    Code sent to <strong>{email}</strong>
                  </p>
                  <input
                    type="text"
                    maxLength={6}
                    value={otpInput}
                    onChange={(e) => {
                      setOtpInput(e.target.value);
                      setOtpError("");
                    }}
                    placeholder="Enter 6-digit code"
                    className="download-otp-input"
                  />
                  {otpError && <p className="download-otp-error">{otpError}</p>}
                  <button
                    onClick={handleVerifyOTP}
                    disabled={isFetchingKey}
                    className="download-verify-btn"
                  >
                    {isFetchingKey ? (
                      <>
                        <div className="download-spinner" />
                        Getting your key...
                      </>
                    ) : (
                      <>
                        <Key className="h-5 w-5" />
                        Confirm &amp; Get Steam Key
                      </>
                    )}
                  </button>
                  <button onClick={resetForm} className="download-otp-back-btn">
                    ← Use a different email
                  </button>
                </div>
              )}

              <div className="download-free-badge">
                <CheckCircle className="h-5 w-5 download-free-badge-icon" />
                <div>
                  <p className="download-free-badge-title">
                    {t("download.free_access")}
                  </p>
                  <p className="download-free-badge-desc">
                    {t("download.free_access_desc")}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ── PURCHASE CARD ── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="download-purchase-card"
            >
              <div className="download-purchase-header">
                <DollarSign className="h-8 w-8 download-purchase-icon" />
                <div>
                  <h2 className="download-purchase-title">
                    {t("download.purchase")}
                  </h2>
                  <p className="download-purchase-desc">
                    {t("download.purchase_description")}
                  </p>
                </div>
              </div>

              <div className="download-price-row">
                <span className="download-price">{t("download.price")}</span>
                <span className="download-currency">USD</span>
              </div>

              <ul className="download-features-list">
                {PURCHASE_FEATURES.map((feature) => (
                  <li key={feature}>
                    <CheckCircle className="h-4 w-4 feature-check" />
                    <span>{t(feature)}</span>
                  </li>
                ))}
              </ul>

              {/* Disabled until keys are ready */}
              <button
                onClick={handlePurchase}
                className="download-paypal-btn download-paypal-btn-disabled"
              >
                <CreditCard className="h-5 w-5" />
                {t("download.buy_now")}
              </button>

              <p className="download-keys-unavailable-notice">
                {t("download.keys_unavailable_notice")}
              </p>

              <p className="download-secure-text">
                {t("download.secure_payment")}
              </p>

              {/* QR code — only shown when keys are available */}
              {KEYS_AVAILABLE && (
                <div className="download-qr-section">
                  <p className="download-qr-label">
                    {t("download.scan_to_pay")}
                  </p>
                  <img
                    src={qrcode}
                    alt="PayPal QR Code"
                    className="download-qr-img"
                  />
                  <p className="download-qr-hint">
                    {t("download.scan_qr_desc")}
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* OR divider */}
          <div className="download-divider">
            <div className="download-divider-line" />
            <span className="download-divider-text">{t("download.or")}</span>
            <div className="download-divider-line" />
          </div>

          {/* System Requirements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="download-sysreq-card"
          >
            <h3 className="download-sysreq-title">
              {t("download.system_req")}
            </h3>
            <div className="download-sysreq-grid">
              {["minimum", "recommended"].map((tier) => (
                <div key={tier}>
                  <h4 className="download-sysreq-tier">
                    {t(`download.${tier}`)}
                  </h4>
                  <ul className="download-sysreq-list">
                    {SYSTEM_REQUIREMENTS[tier].map(({ label, value }) => (
                      <li key={label}>
                        <span>{label}:</span> {value}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
