import { createContext, useContext, useState, type ReactNode } from "react";

type PdfContextType = {
  setExportFunction: (fn: (() => void) | null) => void;

  exportPdf: () => void;
};

const PdfContext = createContext<PdfContextType | null>(null);

type PdfProviderProps = {
  children: ReactNode;
};

export function PdfProvider({ children }: PdfProviderProps) {
  const [exportFunction, setExportFunction] = useState<(() => void) | null>(
    null,
  );

  const exportPdf = () => {
    exportFunction?.();
  };

  return (
    <PdfContext.Provider
      value={{
        setExportFunction,
        exportPdf,
      }}
    >
      {children}
    </PdfContext.Provider>
  );
}

export const usePdf = () => {
  const context = useContext(PdfContext);

  if (!context) {
    throw new Error("usePdf must be used inside PdfProvider");
  }

  return context;
};
