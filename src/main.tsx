import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "./i18n/index.ts";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext.tsx";
import { ModalProvider } from "./context/ModalContext.tsx";
import { PdfProvider } from "./context/PdfContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PdfProvider>
      <ModalProvider>
        <UserProvider>
          <BrowserRouter>
            <App />
            <Toaster position="bottom-left" />
          </BrowserRouter>
        </UserProvider>
      </ModalProvider>
    </PdfProvider>
  </StrictMode>,
);
