import { useState } from "react";

type ToastProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
};

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = (props: ToastProps) => {
    setToasts((prevToasts) => [...prevToasts, props]);
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((t) => t !== props));
    }, 5000);
  };

  const dismiss = (index: number) => {
    setToasts((prevToasts) => prevToasts.filter((_, i) => i !== index));
  };

  return {
    toast,
    dismiss,
    toasts,
  };
}