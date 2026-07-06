import i18next from "i18next";
import { X } from "lucide-react";
import { useEffect, type ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

function Modal({ open, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", close);

    return () => {
      window.removeEventListener("keydown", close);
    };
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-9999
        flex items-center justify-center
        p-3 sm:p-5 lg:p-8
      "
    >
      <div
        onClick={onClose}
        className="
          absolute inset-0
          bg-black/60
          backdrop-blur-2xl
          animate-in fade-in duration-200
        "
      />

      <div
        className="
          relative
          flex flex-col
          w-full
          max-w-5xl
          max-h-[92vh]
          overflow-hidden
          rounded-4xl
          border border-zinc-200
          bg-white
          dark:border-zinc-800
          dark:bg-[#211c1c]
          shadow-[0_30px_100px_rgba(0,0,0,0.55)]
          animate-in zoom-in-95 duration-200
        "
      >
        <div className="absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-amber-500/10 blur-[120px]" />

        <div
          dir={i18next.language === "fa" ? "rtl" : "ltr"}
          className="
            relative
            flex items-center justify-between
            border-b border-zinc-200
            dark:border-zinc-800
            px-4 py-4
            sm:px-6
          "
        >
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-white">
            {i18next.language === "fa" ? "جزئیات" : "Details"}
          </h2>

          <button
            onClick={onClose}
            className="
              flex h-10 w-10 items-center justify-center
              cursor-pointer
              rounded-xl
              bg-zinc-100
              text-zinc-600
              transition-all duration-300
              hover:rotate-90
              hover:bg-zinc-200
              dark:bg-zinc-800
              dark:text-zinc-300
              dark:hover:bg-zinc-700
            "
          >
            <X size={20} />
          </button>
        </div>

        <div
          className="
            relative
            flex-1
            overflow-y-auto
            p-4
            sm:p-6
            lg:p-8
          "
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
