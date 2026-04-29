import { createBrowserRouter } from "react-router";
import { Layout }       from "./components/layout/Layout";
import { HomePage }     from "./pages/HomePage";
import { AboutPage }    from "./pages/AboutPage";
import { FeaturesPage } from "./pages/FeaturesPage";
import { GalleryPage }  from "./pages/GalleryPage";
import { DownloadPage } from "./pages/DownloadPage";
import { SupportPage }  from "./pages/SupportPage";

export const router = createBrowserRouter([
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
