import { useState, type ReactNode } from "react";
import { LoadingContext } from "../LoadingContext";
import TradeLoader from "../../module/TradeLoading";

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading: setIsLoading }}>
      {children}
      {isLoading && <TradeLoader />}
    </LoadingContext.Provider>
  );
}
