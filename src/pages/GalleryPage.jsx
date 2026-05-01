import { motion } from "motion/react";
import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const GALLERY_IMAGES = [
  { id: 1, titleKey: "gallery.img1_title", descKey: "gallery.img1_desc" },
  { id: 2, titleKey: "gallery.img2_title", descKey: "gallery.img2_desc" },
  { id: 3, titleKey: "gallery.img3_title", descKey: "gallery.img3_desc" },
  { id: 4, titleKey: "gallery.img4_title", descKey: "gallery.img4_desc" },
  { id: 5, titleKey: "gallery.img5_title", descKey: "gallery.img5_desc" },
  { id: 6, titleKey: "gallery.img6_title", descKey: "gallery.img6_desc" },
];

const SYSTEM_REQUIREMENTS = {
  minimum: [
    { label: "OS",        value: "Windows 10 64-bit" },
    { label: "Processor", value: "Intel Core i5-4590" },
    { label: "Memory",    value: "8 GB RAM" },
    { label: "Graphics",  value: "NVIDIA GTX 970" },
    { label: "Storage",   value: "10 GB available space" },
  ],
  recommended: [
    { label: "OS",        value: "Windows 11 64-bit" },
    { label: "Processor", value: "Intel Core i7-8700K" },
    { label: "Memory",    value: "16 GB RAM" },
    { label: "Graphics",  value: "NVIDIA RTX 3060" },
    { label: "Storage",   value: "15 GB available space" },
  ],
};

export function GalleryPage() {
  const { t } = useLanguage();
  const [selectedId, setSelectedId] = useState(null);
  const selected = GALLERY_IMAGES.find((img) => img.id === selectedId);

  return (
    <div className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-center mb-6 flex items-center justify-center gap-3">
            <ImageIcon className="h-12 w-12 text-red-500" />
            {t("gallery.title")}
          </h1>
          <p className="text-xl text-center text-muted-foreground mb-16 max-w-3xl mx-auto">
            {t("gallery.subtitle")}
          </p>

          {/* Image Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {GALLERY_IMAGES.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedId(image.id)}
              >
                <div className="relative overflow-hidden rounded-lg border border-border bg-card aspect-video">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 to-red-950/60 flex items-center justify-center">
                    <div className="text-center p-6">
                      <p className="font-bold text-xl mb-2">{t(image.titleKey)}</p>
                      <p className="text-sm text-muted-foreground">{t(image.descKey)}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white font-semibold">{t("gallery.click_to_view")}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* System Requirements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-lg p-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">{t("gallery.system_req")}</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div>
                <h3 className="font-bold mb-4 text-lg">{t("gallery.minimum")}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {SYSTEM_REQUIREMENTS.minimum.map(({ label, value }) => (
                    <li key={label}>
                      <span className="font-semibold text-foreground">{label}:</span> {value}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4 text-lg">{t("gallery.recommended")}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {SYSTEM_REQUIREMENTS.recommended.map(({ label, value }) => (
                    <li key={label}>
                      <span className="font-semibold text-foreground">{label}:</span> {value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Lightbox */}
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedId(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-card border border-border rounded-lg p-8 max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video bg-gradient-to-br from-red-900/40 to-red-950/60 rounded-lg flex items-center justify-center mb-4">
              <p className="text-2xl font-bold">{t(selected.titleKey)}</p>
            </div>
            <p className="text-center text-muted-foreground mb-4">{t(selected.descKey)}</p>
            <button
              onClick={() => setSelectedId(null)}
              className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
            >
              {t("gallery.close")}
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}