import emailjs from "@emailjs/browser";
import { motion } from "motion/react";
import { useState } from "react";
import { HeadphonesIcon, Send, Mail, User, MessageSquare, X as CloseIcon } from "lucide-react";
import { toast, Toaster } from "sonner";
import { useLanguage } from "../context/LanguageContext";

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-500 transition-all";

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
      "service_jshbmlw",   //Service ID
      "template_yu4rlrn",  //Template ID
      {
        name:    form.name,
        email:   form.email,
        message: form.message,
        time:    new Date().toLocaleString(),
      },
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
      <div className="min-h-[calc(100vh-4rem)] py-12 px-4">
        <div className="container mx-auto max-w-4xl">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-red-500/10 rounded-full">
                <HeadphonesIcon className="h-12 w-12 text-red-500" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">{t("support.title")}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("support.description")}</p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-lg p-8 shadow-lg mb-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <User className="h-4 w-4 text-red-500" />
                  {t("support.name")}
                </label>
                <input
                  type="text" id="name" name="name"
                  value={form.name} onChange={handleChange}
                  placeholder={t("support.name_placeholder")}
                  required className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-red-500" />
                  {t("support.email")}
                </label>
                <input
                  type="email" id="email" name="email"
                  value={form.email} onChange={handleChange}
                  placeholder={t("support.email_placeholder")}
                  required className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-red-500" />
                  {t("support.message")}
                </label>
                <textarea
                  id="message" name="message"
                  value={form.message} onChange={handleChange}
                  rows={6} required
                  placeholder={t("support.message_placeholder")}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit" disabled={isSubmitting}
                className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
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

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {contactInfo.map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-card border border-border rounded-lg p-6 text-center">
                <Icon className="h-8 w-8 text-red-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">{label}</h3>
                <p className="text-sm text-muted-foreground">{value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}
