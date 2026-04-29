import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ThemeProvider }    from "./components/layout/ThemeProvider";
import { LanguageProvider } from "./context/LanguageContext";

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <RouterProvider router={router} />
      </LanguageProvider>
    </ThemeProvider>
  );
}
