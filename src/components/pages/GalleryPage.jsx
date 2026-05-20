import { motion } from "motion/react";
import { useState } from "react";
import { ImageIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import "../../styles/GalleryPage.css";

/* ── Game screenshots ── */
import img1 from "../../assets/images/Lobby.png";
import img2 from "../../assets/images/Lobby 2nd floor.png";
import img3 from "../../assets/images/LightOut puzzle.png";
import img4 from "../../assets/images/Painting puzzle.png";
import img5 from "../../assets/images/Programming puzzle1.png";
import img6 from "../../assets/images/Closet view.png";
import img7 from "../../assets/images/Monster view.png";

/* Each card has a titleKey, descKey, and an array of images */
const GALLERY_CARDS = [
  {
    id: 1,
    titleKey: "gallery.card1_title",
    descKey:  "gallery.card1_desc",
    images:   [img1, img2],
  },
  {
    id: 2,
    titleKey: "gallery.card2_title",
    descKey:  "gallery.card2_desc",
    images:   [img3, img4],
  },
  {
    id: 3,
    titleKey: "gallery.card3_title",
    descKey:  "gallery.card3_desc",
    images:   [img5, img6, img7],
  },
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

  // Which card is open in lightbox
  const [selectedId, setSelectedId] = useState(null);
  // Which image index is shown in the lightbox
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const selected = GALLERY_CARDS.find((c) => c.id === selectedId);

  const openLightbox = (id, index = 0) => {
    setSelectedId(id);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setSelectedId(null);
    setLightboxIndex(0);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((i) => (i === 0 ? selected.images.length - 1 : i - 1));
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((i) => (i === selected.images.length - 1 ? 0 : i + 1));
  };

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

          {/* Gallery grid — one card per scene group */}
          <div className="gallery-grid">
            {GALLERY_CARDS.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="gallery-item"
                onClick={() => openLightbox(card.id, 0)}
              >
                {/* Main preview — always first image */}
                <div className="gallery-item-frame">
                  <img
                    src={card.images[0]}
                    alt={t(card.titleKey)}
                    className="gallery-item-img"
                  />

                  {/* Caption at bottom */}
                  <div className="gallery-item-caption">
                    <p className="gallery-item-title">{t(card.titleKey)}</p>
                    <p className="gallery-item-desc">{t(card.descKey)}</p>
                  </div>

                  {/* Hover overlay */}
                  <div className="gallery-item-overlay">
                    <span className="gallery-item-overlay-label">
                      {t("gallery.click_to_view")}
                      {card.images.length > 1 && (
                        <span className="gallery-item-count">
                          {" "}({card.images.length} {t("gallery.photos")})
                        </span>
                      )}
                    </span>
                  </div>
                </div>

                {/* Thumbnail strip — show all images as small previews */}
                {card.images.length > 1 && (
                  <div className="gallery-thumbs">
                    {card.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`${t(card.titleKey)} ${i + 1}`}
                        className="gallery-thumb"
                        onClick={(e) => { e.stopPropagation(); openLightbox(card.id, i); }}
                      />
                    ))}
                  </div>
                )}
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

      {/* Lightbox with prev/next navigation */}
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="gallery-lightbox"
          onClick={closeLightbox}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="gallery-lightbox-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image preview */}
            <div className="gallery-lightbox-preview">
              <img
                src={selected.images[lightboxIndex]}
                alt={t(selected.titleKey)}
                className="gallery-lightbox-img"
              />

              {/* Prev/Next buttons only if more than one image */}
              {selected.images.length > 1 && (
                <>
                  <button onClick={prevImage} className="gallery-lightbox-prev">
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button onClick={nextImage} className="gallery-lightbox-next">
                    <ChevronRight className="h-6 w-6" />
                  </button>
                  {/* Image counter */}
                  <div className="gallery-lightbox-counter">
                    {lightboxIndex + 1} / {selected.images.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail strip in lightbox */}
            {selected.images.length > 1 && (
              <div className="gallery-lightbox-thumbs">
                {selected.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${t(selected.titleKey)} ${i + 1}`}
                    className={`gallery-lightbox-thumb${i === lightboxIndex ? " active" : ""}`}
                    onClick={() => setLightboxIndex(i)}
                  />
                ))}
              </div>
            )}

            <p className="gallery-lightbox-desc">{t(selected.descKey)}</p>
            <button onClick={closeLightbox} className="gallery-lightbox-close-btn">
              {t("gallery.close")}
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}