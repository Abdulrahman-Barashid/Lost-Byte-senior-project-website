import { motion } from "motion/react";
import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import "../../styles/GalleryPage.css";

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
    <div className="gallery-page">
      <div className="gallery-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="gallery-title">
            <ImageIcon className="h-12 w-12 gallery-title-icon" />
            {t("gallery.title")}
          </h1>
          <p className="gallery-subtitle">{t("gallery.subtitle")}</p>

          {/* Image grid */}
          <div className="gallery-grid">
            {GALLERY_IMAGES.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="gallery-item"
                onClick={() => setSelectedId(image.id)}
              >
                <div className="gallery-item-frame">
                  <div className="gallery-item-bg">
                    <div>
                      <p className="gallery-item-title">{t(image.titleKey)}</p>
                      <p className="gallery-item-desc">{t(image.descKey)}</p>
                    </div>
                  </div>
                  <div className="gallery-item-overlay">
                    <span className="gallery-item-overlay-label">{t("gallery.click_to_view")}</span>
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
            className="gallery-sysreq-card"
          >
            <h2 className="gallery-sysreq-title">{t("gallery.system_req")}</h2>
            <div className="gallery-sysreq-grid">
              <div>
                <h3 className="gallery-sysreq-tier-title">{t("gallery.minimum")}</h3>
                <ul className="gallery-sysreq-list">
                  {SYSTEM_REQUIREMENTS.minimum.map(({ label, value }) => (
                    <li key={label}><span>{label}:</span> {value}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="gallery-sysreq-tier-title">{t("gallery.recommended")}</h3>
                <ul className="gallery-sysreq-list">
                  {SYSTEM_REQUIREMENTS.recommended.map(({ label, value }) => (
                    <li key={label}><span>{label}:</span> {value}</li>
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
          className="gallery-lightbox"
          onClick={() => setSelectedId(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="gallery-lightbox-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="gallery-lightbox-preview">
              <p className="gallery-lightbox-preview-title">{t(selected.titleKey)}</p>
            </div>
            <p className="gallery-lightbox-desc">{t(selected.descKey)}</p>
            <button
              onClick={() => setSelectedId(null)}
              className="gallery-lightbox-close-btn"
            >
              {t("gallery.close")}
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
