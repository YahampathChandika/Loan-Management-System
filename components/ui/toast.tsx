// components/ui/toast.tsx
import { useState, useEffect, useCallback } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Button } from "./button";

export interface Toast {
  id: string;
  title: string;
  message?: string;
  type: "success" | "error" | "info";
  duration?: number;
}

interface ToastProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

function ToastComponent({ toast, onRemove }: ToastProps) {
  useEffect(() => {
    const duration = toast.duration || 5000;
    const timer = setTimeout(() => {
      onRemove(toast.id);
    }, duration);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onRemove]);

  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case "success":
        return "border-l-emerald-500";
      case "error":
        return "border-l-red-500";
      case "info":
        return "border-l-blue-500";
    }
  };

  return (
    <div
      className={`flex items-start space-x-3 p-4 bg-background border border-l-4 ${getBorderColor()} rounded-lg shadow-lg max-w-sm w-full animate-in slide-in-from-right duration-300`}
    >
      {getIcon()}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm">{toast.title}</p>
        {toast.message && (
          <p className="text-sm text-muted-foreground mt-1">{toast.message}</p>
        )}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6"
        onClick={() => onRemove(toast.id)}
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  );
}

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto" data-testid="toast">
          <ToastComponent toast={toast} onRemove={onRemove} />
        </div>
      ))}
    </div>
  );
}

// Toast Hook

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = useCallback(
    (title: string, message?: string) => {
      addToast({ title, message, type: "success" });
    },
    [addToast]
  );

  const error = useCallback(
    (title: string, message?: string) => {
      addToast({ title, message, type: "error" });
    },
    [addToast]
  );

  const info = useCallback(
    (title: string, message?: string) => {
      addToast({ title, message, type: "info" });
    },
    [addToast]
  );

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    info,
  };
}
