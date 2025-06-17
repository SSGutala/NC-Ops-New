import React, { ReactNode } from "react";

type TooltipProviderProps = {
  children: ReactNode;
};

export const TooltipProvider = ({ children }: TooltipProviderProps) => {
  return <>{children}</>;
};
