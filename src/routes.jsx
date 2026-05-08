import { createHashRouter } from "react-router";
import { Layout }       from "./components/layout/Layout";
import { HomePage }     from "./components/pages/HomePage";
import { AboutPage }    from "./components/pages/AboutPage";
import { FeaturesPage } from "./components/pages/FeaturesPage";
import { GalleryPage }  from "./components/pages/GalleryPage";
import { DownloadPage } from "./components/pages/DownloadPage";
import { SupportPage }  from "./components/pages/SupportPage";

export const router = createHashRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true,      Component: HomePage },
      { path: "about",    Component: AboutPage },
      { path: "features", Component: FeaturesPage },
      { path: "gallery",  Component: GalleryPage },
      { path: "download", Component: DownloadPage },
      { path: "support",  Component: SupportPage },
    ],
  },
]);
