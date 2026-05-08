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
} from "lucide-react";
import { toast, Toaster } from "sonner";
import { useLanguage } from "../../context/LanguageContext";
import qrcode from "../../assets/images/qrcode.png";
import "../../styles/DownloadPage.css";

const PAYPAL_PAYMENT_URL = "https://www.paypal.com/ncp/payment/WHLUQU9TVH6GU";
const GAME_DOWNLOAD_URL  = "https://drive.google.com";

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const PURCHASE_FEATURES = [
  "Full game access",
  "IT puzzles",
  "Lifetime updates",
  "Priority support",
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

export function DownloadPage() {
  const { t } = useLanguage();
  const [email, setEmail]               = useState("");
  const [isVerifying, setIsVerifying]   = useState(false);
  const [otpSent, setOtpSent]           = useState(false);
  const [otpInput, setOtpInput]         = useState("");
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [otpError, setOtpError]         = useState("");

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    if (!email) { toast.error("Please enter your email"); return; }

    const isKauEmail = email.toLowerCase().endsWith("@stu.kau.edu.sa");
    if (!isKauEmail) {
      toast.error(t("download.verification_failed"), {
        description: t("download.verification_failed_description"),
        cancel: { label: <CloseIcon className="h-4 w-4" />, onClick: () => {} },
      });
      return;
    }

    setIsVerifying(true);
    const otp = generateOTP();
    setGeneratedOTP(otp);

    try {
      await emailjs.send("service_jshbmlw", "template_1rbk9yh", {
        to_email: email,
        otp: otp,
      });
      setOtpSent(true);
      toast.success("OTP sent!", { description: `A 6-digit code was sent to ${email}` });
    } catch (err) {
      toast.error("Failed to send OTP. Please try again.");
      console.error(err);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleVerifyOTP = () => {
    if (otpInput === generatedOTP) {
      setOtpError("");
      toast.success(t("download.verification_success"), {
        description: t("download.verification_success_description"),
        cancel: { label: <CloseIcon className="h-4 w-4" />, onClick: () => {} },
      });
      window.open(GAME_DOWNLOAD_URL, "_blank");
      setOtpSent(false);
      setOtpInput("");
      setEmail("");
    } else {
      setOtpError("Incorrect code. Please try again.");
    }
  };

  const handlePurchase = () => {
    window.open(PAYPAL_PAYMENT_URL, "_blank");
  };

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

          {/* Download options */}
          <div className="download-options-grid">

            {/* KAU Student card */}
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

              {!otpSent ? (
                <form onSubmit={handleVerifyEmail} className="download-form">
                  <div>
                    <label htmlFor="student-email" className="download-form-label">
                      {t("download.verify_email")}
                    </label>
                    <div className="download-input-wrap">
                      <Mail className="h-5 w-5 download-input-icon" />
                      <input
                        type="email" id="student-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t("download.email_placeholder")}
                        required className="download-input"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="download-verify-btn"
                  >
                    {isVerifying ? (
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
                    A 6-digit code was sent to <strong>{email}</strong>
                  </p>
                  <input
                    type="text"
                    maxLength={6}
                    value={otpInput}
                    onChange={(e) => { setOtpInput(e.target.value); setOtpError(""); }}
                    placeholder="Enter 6-digit code"
                    className="download-otp-input"
                  />
                  {otpError && <p className="download-otp-error">{otpError}</p>}
                  <button onClick={handleVerifyOTP} className="download-verify-btn">
                    <CheckCircle className="h-5 w-5" />
                    Confirm &amp; Download
                  </button>
                  <button
                    onClick={() => { setOtpSent(false); setOtpInput(""); setOtpError(""); }}
                    className="download-otp-back-btn"
                  >
                    ← Use a different email
                  </button>
                </div>
              )}

              <div className="download-free-badge">
                <CheckCircle className="h-5 w-5 download-free-badge-icon" />
                <div>
                  <p className="download-free-badge-title">{t("download.free_access")}</p>
                  <p className="download-free-badge-desc">{t("download.free_access_desc")}</p>
                </div>
              </div>
            </motion.div>

            {/* Purchase card */}
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
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button onClick={handlePurchase} className="download-paypal-btn">
                <CreditCard className="h-5 w-5" />
                {t("download.buy_now")}
              </button>
              <p className="download-secure-text">{t("download.secure_payment")}</p>

              {/* QR code */}
              <div className="download-qr-section">
                <p className="download-qr-label">{t("download.scan_to_pay")}</p>
                <img src={qrcode} alt="PayPal QR Code" className="download-qr-img" />
                <p className="download-qr-hint">{t("download.scan_qr_desc")}</p>
              </div>
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
