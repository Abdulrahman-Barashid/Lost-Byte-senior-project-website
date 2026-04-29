import { motion } from "motion/react";
import { useState } from "react";
import {
  Download as DownloadIcon, Mail, CheckCircle, CreditCard,
  X as CloseIcon, GraduationCap, DollarSign,
} from "lucide-react";
import { toast, Toaster } from "sonner";
import { useLanguage } from "../context/LanguageContext";

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

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-500 transition-all";

export function DownloadPage() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    if (!email) { toast.error("Please enter your email"); return; }

    const isKauEmail = email.toLowerCase().endsWith("@stu.kau.edu.sa");
    setIsVerifying(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsVerifying(false);

    if (isKauEmail) {
      toast.success(t("download.verification_success"), {
        description: t("download.verification_success_description"),
        cancel: { label: <CloseIcon className="h-4 w-4" />, onClick: () => {} },
      });
      // TODO: trigger actual download
    } else {
      toast.error(t("download.verification_failed"), {
        description: t("download.verification_failed_description"),
        cancel: { label: <CloseIcon className="h-4 w-4" />, onClick: () => {} },
      });
    }
  };

  const handlePurchase = async () => {
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsProcessing(false);
    toast.success(t("download.payment_success"), {
      description: t("download.payment_success_description"),
      cancel: { label: <CloseIcon className="h-4 w-4" />, onClick: () => {} },
    });
    // TODO: integrate Stripe
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-[calc(100vh-4rem)] py-12 px-4">
        <div className="container mx-auto max-w-5xl">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-red-500/10 rounded-full">
                <DownloadIcon className="h-12 w-12 text-red-500" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">{t("download.title")}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("download.description")}</p>
          </motion.div>

          {/* Download Options */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">

            {/* KAU Student */}
            <motion.div
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className="bg-card border-2 border-green-500/30 rounded-lg p-8 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="h-8 w-8 text-green-500" />
                <div>
                  <h2 className="text-2xl font-bold">{t("download.kau_student")}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{t("download.kau_description")}</p>
                </div>
              </div>

              <form onSubmit={handleVerifyEmail} className="space-y-4">
                <div>
                  <label htmlFor="student-email" className="block text-sm font-medium mb-2">
                    {t("download.verify_email")}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      type="email" id="student-email"
                      value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("download.email_placeholder")}
                      required
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>
                <button
                  type="submit" disabled={isVerifying}
                  className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isVerifying ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
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

              <div className="mt-6 p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-semibold text-green-500 mb-1">{t("download.free_access")}</p>
                    <p className="text-muted-foreground">{t("download.free_access_desc")}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Purchase */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              className="bg-card border-2 border-border rounded-lg p-8 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <DollarSign className="h-8 w-8 text-red-500" />
                <div>
                  <h2 className="text-2xl font-bold">{t("download.purchase")}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{t("download.purchase_description")}</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl font-bold">{t("download.price")}</span>
                  <span className="text-muted-foreground">USD</span>
                </div>
                <ul className="space-y-3">
                  {PURCHASE_FEATURES.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-red-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={handlePurchase} disabled={isProcessing}
                className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {t("download.processing")}
                  </>
                ) : (
                  <>
                    <CreditCard className="h-5 w-5" />
                    {t("download.buy_now")}
                  </>
                )}
              </button>
              <p className="text-xs text-center text-muted-foreground mt-4">{t("download.secure_payment")}</p>
            </motion.div>
          </div>

          {/* OR divider */}
          <div className="flex items-center gap-4 my-8 max-w-4xl mx-auto">
            <div className="flex-1 h-px bg-border" />
            <span className="text-muted-foreground font-semibold">{t("download.or")}</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* System Requirements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-card border border-border rounded-lg p-6 max-w-4xl mx-auto"
          >
            <h3 className="text-xl font-bold mb-4">{t("download.system_req")}</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {["minimum", "recommended"].map((tier) => (
                <div key={tier}>
                  <h4 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wide">
                    {t(`download.${tier}`)}
                  </h4>
                  <ul className="space-y-2 text-sm">
                    {SYSTEM_REQUIREMENTS[tier].map(({ label, value }) => (
                      <li key={label}>
                        <span className="font-semibold">{label}:</span> {value}
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
