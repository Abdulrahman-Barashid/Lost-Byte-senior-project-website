import emailjs    from "@emailjs/browser";
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
  Send,
} from "lucide-react";
import { toast, Toaster }            from "sonner";
import { useLanguage }               from "../../context/LanguageContext";
import { giveKauKey, givePaypalKey } from "../../lib/steamKeys";
import qrcode from "../../assets/images/qrcode.png";
import "../../styles/DownloadPage.css";

const PAYPAL_PAYMENT_URL = "https://www.paypal.com/ncp/payment/WHLUQU9TVH6GU";
const STEAM_REDEEM_URL   = "https://store.steampowered.com/account/registerkey";

// SET THIS TO true WHEN STEAM KEYS ARE READY IN FIRESTORE
const KEYS_AVAILABLE = false;

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
    { label: "OS",        value: "Windows 10 64-bit" },
    { label: "Processor", value: "Intel Core i3" },
    { label: "Memory",    value: "4 GB RAM" },
    { label: "Storage",   value: "2 GB available space" },
  ],
  recommended: [
    { label: "OS",        value: "Windows 11 64-bit" },
    { label: "Processor", value: "Intel Core i5" },
    { label: "Memory",    value: "8 GB RAM" },
    { label: "Storage",   value: "4 GB available space" },
  ],
};

// ── Reusable key reveal shown inside both cards ───────────────
function KeyReveal({ steamKey, email, onCopy, onEmail, emailSent, t }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="download-key-reveal-inner"
    >
      <div className="download-key-reveal-icon-wrap">
        <Key className="h-10 w-10" />
      </div>

      <h3 className="download-paypal-key-title">{t("download.key_reveal_title")}</h3>

      {/* Key box with copy button */}
      <div className="download-key-box">
        <span className="download-key-text">{steamKey}</span>
        <button onClick={onCopy} className="download-key-copy-btn">
          <Copy className="h-4 w-4" /> {t("download.key_copy")}
        </button>
      </div>

      {/* Email key button */}
      <button onClick={onEmail} disabled={emailSent} className="download-email-key-btn">
        {emailSent ? (
          <><CheckCircle className="h-4 w-4" />{t("download.key_sent_to")} {email}</>
        ) : (
          <><Send className="h-4 w-4" />{t("download.email_key_btn")} {email}</>
        )}
      </button>

      {/* Redeem on Steam */}
      <a href={STEAM_REDEEM_URL} target="_blank" rel="noreferrer" className="download-steam-redeem-btn">
        <ExternalLink className="h-5 w-5" /> {t("download.key_redeem")}
      </a>

      {/* Step by step */}
      <div className="download-key-steps">
        <p className="download-key-steps-title">{t("download.key_how_title")}</p>
        <ol className="download-key-steps-list">
          <li>{t("download.key_step1")}</li>
          <li>{t("download.key_step2")}</li>
          <li>{t("download.key_step3")}</li>
          <li>{t("download.key_step4")}</li>
        </ol>
      </div>
    </motion.div>
  );
}

export function DownloadPage() {
  const { t } = useLanguage();

  const [activeFlow, setActiveFlow]           = useState("kau");
  const [email, setEmail]                     = useState("");
  const [isVerifying, setIsVerifying]         = useState(false);
  const [otpSent, setOtpSent]                 = useState(false);
  const [otpInput, setOtpInput]               = useState("");
  const [generatedOTP, setGeneratedOTP]       = useState("");
  const [otpError, setOtpError]               = useState("");
  const [isFetchingKey, setIsFetchingKey]     = useState(false);

  // KAU key state
  const [kauKey, setKauKey]                   = useState("");
  const [kauEmail, setKauEmail]               = useState("");
  const [kauEmailSent, setKauEmailSent]       = useState(false);

  // PayPal flow state
  const [paypalVerified, setPaypalVerified]   = useState(false);
  const [paypalEmail, setPaypalEmail]         = useState("");
  const [paypalKey, setPaypalKey]             = useState("");
  const [paypalEmailSent, setPaypalEmailSent] = useState(false);
  const [paypalClicked, setPaypalClicked]     = useState(false);


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
      toast.error(t("download.otp_failed"));
      return;
    }

    if (!KEYS_AVAILABLE) {
      toast.error(t("download.keys_unavailable_title"), {
        description: t("download.keys_unavailable_desc"),
        duration: 8000,
        closeButton: true,
      });
      return;
    }

    if (flow === "kau") {
      const kauRegex = /^[a-zA-Z0-9._%+-]+@stu\.kau\.edu\.sa$/;
      if (!kauRegex.test(email.toLowerCase())) {
        toast.error(t("download.verification_failed"), {
          description: t("download.verification_failed_description"),
          cancel: { label: <CloseIcon className="h-4 w-4" />, onClick: () => {} },
        });
        return;
      }
    }

    if (flow === "paypal") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email.toLowerCase())) {
        toast.error(t("download.verification_failed"), {
          description: t("download.verification_failed_description"),
        });
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
        { to_email: email, otp }
      );
      setOtpSent(true);
      toast.success(t("download.otp_sent"), {
        description: `${t("download.otp_sent_desc")} ${email}`,
      });
    } catch (error) {
      console.error("OTP send error:", error);
      toast.error(t("download.otp_failed"));
    } finally {
      setIsVerifying(false);
    }
  };


  // STEP 2: Verify OTP
  // KAU   → fetch key immediately → show inside KAU card
  // PayPal → mark verified → show payment options
  const handleVerifyOTP = async () => {
    if (otpInput !== generatedOTP) {
      setOtpError(t("download.otp_error"));
      return;
    }

    setOtpError("");

    if (activeFlow === "kau") {
      setIsFetchingKey(true);
      try {
        const result = await giveKauKey(email);

        if (result.status === "already_claimed") {
          toast.info(t("download.already_have_key"), {
            description: t("download.already_have_key_desc"),
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
          toast.error(t("download.otp_failed"));
          return;
        }

        if (result.status === "ok") {
          setKauEmail(email);
          setKauKey(result.key);
          setKauEmailSent(false);
          toast.success(t("download.key_reveal_title"), {
            description: t("download.otp_sent_desc") + " " + email,
          });
        }
      } catch (error) {
        console.error("giveKauKey error:", error);
        toast.error(t("download.otp_failed"));
      } finally {
        setIsFetchingKey(false);
      }

    } else {
      // PayPal: email verified — show payment options
      setPaypalEmail(email);
      setPaypalVerified(true);
      resetForm();
      toast.success(t("download.verification_success"), {
        description: t("download.verification_success_description"),
      });
    }
  };


  // STEP 3 (PayPal): After payment → fetch key
  const handleClaimKey = async () => {
    setIsFetchingKey(true);
    try {
      const result = await givePaypalKey(paypalEmail);

      if (result.status === "no_keys") {
        toast.error(t("download.keys_unavailable_title"), {
          description: t("download.keys_unavailable_desc"),
          duration: 8000,
          closeButton: true,
        });
        return;
      }

      if (result.status === "error") {
        toast.error(t("download.otp_failed"));
        return;
      }

      if (result.status === "ok") {
        setPaypalKey(result.key);
        setPaypalEmailSent(false);
        toast.success(t("download.key_reveal_title"), {
          description: t("download.email_key_btn") + " " + paypalEmail,
        });
      }
    } catch (error) {
      console.error("handleClaimKey error:", error);
      toast.error(t("download.otp_failed"));
    } finally {
      setIsFetchingKey(false);
    }
  };


  // Email key on demand (KAU)
  const handleKauEmailKey = async () => {
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_STEAM_TEMPLATE,
        { to_email: kauEmail, steam_key: kauKey, redeem_url: STEAM_REDEEM_URL }
      );
      setKauEmailSent(true);
      toast.success(t("download.key_copied"), {
        description: `${t("download.otp_sent_desc")} ${kauEmail}`,
      });
    } catch (error) {
      console.error("KAU email key error:", error);
      toast.error(t("download.otp_failed"));
    }
  };


  // Email key on demand (PayPal)
  const handlePaypalEmailKey = async () => {
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_STEAM_TEMPLATE,
        { to_email: paypalEmail, steam_key: paypalKey, redeem_url: STEAM_REDEEM_URL }
      );
      setPaypalEmailSent(true);
      toast.success(t("download.key_copied"), {
        description: `${t("download.otp_sent_desc")} ${paypalEmail}`,
      });
    } catch (error) {
      console.error("PayPal email key error:", error);
      toast.error(t("download.otp_failed"));
    }
  };


  // Copy key to clipboard
  const handleCopyKey = async (key) => {
    try {
      await navigator.clipboard.writeText(key);
      toast.success(t("download.key_copied"));
    } catch {
      toast.error(t("download.otp_failed"));
    }
  };


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
                  <h2 className="download-kau-title">{t("download.kau_student")}</h2>
                  <p className="download-kau-desc">{t("download.kau_description")}</p>
                </div>
              </div>

              {/* Show form only when no key yet */}
              {!kauKey && (
                <>
                  {!otpSent || activeFlow !== "kau" ? (
                    <form onSubmit={(e) => handleVerifyEmail(e, "kau")} className="download-form">
                      <div>
                        <label htmlFor="kau-email" className="download-form-label">
                          {t("download.verify_email")}
                        </label>
                        <div className="download-input-wrap">
                          <Mail className="h-5 w-5 download-input-icon" />
                          <input
                            type="email" id="kau-email"
                            value={activeFlow === "kau" ? email : ""}
                            onChange={(e) => { setActiveFlow("kau"); setEmail(e.target.value); }}
                            placeholder={t("download.email_placeholder")}
                            required className="download-input"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={isVerifying && activeFlow === "kau"}
                        className="download-verify-btn"
                      >
                        {isVerifying && activeFlow === "kau" ? (
                          <><div className="download-spinner" />{t("download.verifying")}</>
                        ) : (
                          <><CheckCircle className="h-5 w-5" />{t("download.verify")}</>
                        )}
                      </button>
                    </form>
                  ) : (
                    <div className="download-form">
                      <p className="download-otp-info">
                        {t("download.otp_sent_desc")} <strong>{email}</strong>
                      </p>
                      <input
                        type="text" maxLength={6} value={otpInput}
                        onChange={(e) => { setOtpInput(e.target.value); setOtpError(""); }}
                        placeholder={t("download.otp_placeholder")}
                        className="download-otp-input"
                      />
                      {otpError && <p className="download-otp-error">{otpError}</p>}
                      <button
                        onClick={handleVerifyOTP}
                        disabled={isFetchingKey}
                        className="download-verify-btn"
                      >
                        {isFetchingKey ? (
                          <><div className="download-spinner" />{t("download.otp_getting_key")}</>
                        ) : (
                          <><Key className="h-5 w-5" />{t("download.otp_confirm")}</>
                        )}
                      </button>
                      <button onClick={resetForm} className="download-otp-back-btn">
                        {t("download.otp_back")}
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* Key reveal inside KAU card */}
              {kauKey && (
                <KeyReveal
                  steamKey={kauKey}
                  email={kauEmail}
                  onCopy={() => handleCopyKey(kauKey)}
                  onEmail={handleKauEmailKey}
                  emailSent={kauEmailSent}
                  t={t}
                />
              )}

              <div className="download-free-badge">
                <CheckCircle className="h-5 w-5 download-free-badge-icon" />
                <div>
                  <p className="download-free-badge-title">{t("download.free_access")}</p>
                  <p className="download-free-badge-desc">{t("download.free_access_desc")}</p>
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
                  <h2 className="download-purchase-title">{t("download.purchase")}</h2>
                  <p className="download-purchase-desc">{t("download.purchase_description")}</p>
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

              {/* KEYS NOT AVAILABLE */}
              {!KEYS_AVAILABLE && (
                <>
                  <button className="download-paypal-btn download-paypal-btn-disabled" disabled>
                    <CreditCard className="h-5 w-5" />
                    {t("download.buy_now")}
                  </button>
                  <p className="download-keys-unavailable-notice">
                    {t("download.keys_unavailable_notice")}
                  </p>
                </>
              )}

              {/* KEYS AVAILABLE */}
              {KEYS_AVAILABLE && (
                <>
                  {/* STEP 1: Verify email before payment */}
                  {!paypalVerified && (
                    <div className="download-paypal-verify-section">
                      <p className="download-paypal-verify-label">
                        {t("download.verify_email_first")}
                      </p>
                      {!otpSent || activeFlow !== "paypal" ? (
                        <form onSubmit={(e) => handleVerifyEmail(e, "paypal")} className="download-form">
                          <div className="download-input-wrap">
                            <Mail className="h-5 w-5 download-input-icon" />
                            <input
                              type="email"
                              value={activeFlow === "paypal" ? email : ""}
                              onChange={(e) => { setActiveFlow("paypal"); setEmail(e.target.value); }}
                              placeholder="your@email.com"
                              required className="download-input"
                            />
                          </div>
                          <button
                            type="submit"
                            disabled={isVerifying && activeFlow === "paypal"}
                            className="download-verify-btn"
                          >
                            {isVerifying && activeFlow === "paypal" ? (
                              <><div className="download-spinner" />{t("download.sending_code")}</>
                            ) : (
                              <><Mail className="h-5 w-5" />{t("download.send_verification")}</>
                            )}
                          </button>
                        </form>
                      ) : (
                        <div className="download-form">
                          <p className="download-otp-info">
                            {t("download.otp_sent_desc")} <strong>{email}</strong>
                          </p>
                          <input
                            type="text" maxLength={6} value={otpInput}
                            onChange={(e) => { setOtpInput(e.target.value); setOtpError(""); }}
                            placeholder={t("download.otp_placeholder")}
                            className="download-otp-input"
                          />
                          {otpError && <p className="download-otp-error">{otpError}</p>}
                          <button onClick={handleVerifyOTP} className="download-verify-btn">
                            <CheckCircle className="h-5 w-5" /> {t("download.verify_email_btn")}
                          </button>
                          <button onClick={resetForm} className="download-otp-back-btn">
                            {t("download.otp_back")}
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* STEP 2: Verified — show PayPal + QR + claim */}
                  {paypalVerified && !paypalKey && (
                    <div className="download-paypal-verified-section">
                      <p className="download-paypal-verified-email">
                        ✅ {t("download.verification_success")}: <strong>{paypalEmail}</strong>
                      </p>

                      <a
                        href={PAYPAL_PAYMENT_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="download-paypal-btn"
                        onClick={() => setPaypalClicked(true)}
                      >
                        <CreditCard className="h-5 w-5" />
                        {t("download.buy_now")}
                      </a>

                      <p className="download-secure-text">{t("download.secure_payment")}</p>

                      <div className="download-qr-section">
                        <p className="download-qr-label">{t("download.scan_to_pay")}</p>
                        <img src={qrcode} alt="PayPal QR Code" className="download-qr-img" />
                        <p className="download-qr-hint">{t("download.scan_qr_desc")}</p>
                      </div>

                      {paypalClicked && (
                        <div className="download-claim-section">
                          <p className="download-claim-label">
                            {t("download.paid_confirm")}
                          </p>
                          <button
                            onClick={handleClaimKey}
                            disabled={isFetchingKey}
                            className="download-verify-btn"
                          >
                            {isFetchingKey ? (
                              <><div className="download-spinner" />{t("download.getting_key")}</>
                            ) : (
                              <><Key className="h-5 w-5" />{t("download.get_my_key")}</>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* STEP 3: Key revealed inside PayPal card */}
                  {paypalKey && (
                    <KeyReveal
                      steamKey={paypalKey}
                      email={paypalEmail}
                      onCopy={() => handleCopyKey(paypalKey)}
                      onEmail={handlePaypalEmailKey}
                      emailSent={paypalEmailSent}
                      t={t}
                    />
                  )}
                </>
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
            <h3 className="download-sysreq-title">{t("download.system_req")}</h3>
            <div className="download-sysreq-grid">
              {["minimum", "recommended"].map((tier) => (
                <div key={tier}>
                  <h4 className="download-sysreq-tier">{t(`download.${tier}`)}</h4>
                  <ul className="download-sysreq-list">
                    {SYSTEM_REQUIREMENTS[tier].map(({ label, value }) => (
                      <li key={label}><span>{label}:</span> {value}</li>
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