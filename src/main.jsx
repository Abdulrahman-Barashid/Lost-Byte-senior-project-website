import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import emailjs from "@emailjs/browser";
import "./index.css";
import App from "./App";

emailjs.init("hvTeVwZZzVjYfZGm5"); // initialize EmailJS publicKey

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);