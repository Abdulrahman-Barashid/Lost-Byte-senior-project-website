import emailjs from "@emailjs/browser";
import { motion } from "motion/react";
import { useState } from "react";
import { HeadphonesIcon, Send, Mail, User, MessageSquare, X as CloseIcon } from "lucide-react";
import { toast, Toaster } from "sonner";
import { useLanguage } from "../../context/LanguageContext";
import "../../styles/SupportPage.css";

export function SupportPage() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    { icon: Mail,           label: t("support.contact_email"),    value: "lostbyte.support@gmail.com" },
    { icon: HeadphonesIcon, label: t("support.contact_response"), value: t("support.contact_response_value") },
    { icon: MessageSquare,  label: t("support.contact_hours"),    value: t("support.contact_hours_value") },
  ];

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error(t("support.error_fill_all"));
      return;
    }
    setIsSubmitting(true);
    try {
      await emailjs.send(
        "service_jshbmlw",
        "template_yu4rlrn",
        {
          name:    form.name,
          email:   form.email,
          message: form.message,
          time:    new Date().toLocaleString(),
        }
      );
      toast.success(t("support.success"), {
        description: t("support.success_description"),
        cancel: { label: <CloseIcon className="h-4 w-4" />, onClick: () => {} },
      });
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error("EmailJS error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="support-page">
        <div className="support-container">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="support-header"
          >
            <div className="support-icon-wrap">
              <div className="support-icon-circle">
                <HeadphonesIcon className="h-12 w-12" />
              </div>
            </div>
            <h1 className="support-title">{t("support.title")}</h1>
            <p className="support-desc">{t("support.description")}</p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="support-form-card"
          >
            <form onSubmit={handleSubmit} className="support-form">

              <div>
                <label htmlFor="name" className="support-form-label">
                  <User className="h-4 w-4 support-form-label-icon" />
                  {t("support.name")}
                </label>
                <input
                  type="text" id="name" name="name"
                  value={form.name} onChange={handleChange}
                  placeholder={t("support.name_placeholder")}
                  required className="support-input"
                />
              </div>

              <div>
                <label htmlFor="email" className="support-form-label">
                  <Mail className="h-4 w-4 support-form-label-icon" />
                  {t("support.email")}
                </label>
                <input
                  type="email" id="email" name="email"
                  value={form.email} onChange={handleChange}
                  placeholder={t("support.email_placeholder")}
                  required className="support-input"
                />
              </div>

              <div>
                <label htmlFor="message" className="support-form-label">
                  <MessageSquare className="h-4 w-4 support-form-label-icon" />
                  {t("support.message")}
                </label>
                <textarea
                  id="message" name="message"
                  value={form.message} onChange={handleChange}
                  rows={6} required
                  placeholder={t("support.message_placeholder")}
                  className="support-textarea"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="support-submit-btn"
              >
                {isSubmitting ? (
                  <>
                    <div className="support-spinner" />
                    {t("support.submitting")}
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    {t("support.submit")}
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="support-info-grid"
          >
            {contactInfo.map(({ icon: Icon, label, value }) => (
              <div key={label} className="support-info-card">
                <Icon className="h-8 w-8 support-info-icon" />
                <h3 className="support-info-label">{label}</h3>
                <p className="support-info-value">{value}</p>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </>
  );
}
