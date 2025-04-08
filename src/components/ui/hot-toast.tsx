
import { forwardRef } from "react";
import { toast as sonnerToast, Toast } from "sonner";
import { AlertTriangle, CheckCircle2, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastProps = React.ComponentProps<typeof Toast> & {
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success" | "warning";
  icon?: React.ReactNode;
};

export const HotToast = forwardRef<
  HTMLDivElement,
  ToastProps
>(({ className, variant = "default", title, description, icon, ...props }, ref) => {
  
  let IconComponent = Info;
  let iconColor = "text-blue-500";
  
  if (variant === "destructive") {
    IconComponent = X;
    iconColor = "text-destructive";
  } else if (variant === "success") {
    IconComponent = CheckCircle2;
    iconColor = "text-green-500";
  } else if (variant === "warning") {
    IconComponent = AlertTriangle;
    iconColor = "text-amber-500";
  }
  
  return (
    <div
      ref={ref}
      className={cn(
        "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg p-4 shadow-lg transition-all",
        variant === "destructive" && "bg-destructive text-destructive-foreground",
        variant === "success" && "bg-background border-l-4 border-green-500",
        variant === "warning" && "bg-background border-l-4 border-amber-500",
        variant === "default" && "bg-background border-l-4 border-blue-500",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3">
        {icon || <IconComponent className={cn("h-5 w-5", iconColor)} />}
        <div className="grid gap-1">
          {title && <h5 className="font-semibold leading-none tracking-tight">{title}</h5>}
          {description && <div className="text-sm opacity-90">{description}</div>}
        </div>
      </div>
    </div>
  );
});

HotToast.displayName = "HotToast";

type ToastOptions = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success" | "warning";
  icon?: React.ReactNode;
  duration?: number;
};

export function hotToast(options: ToastOptions) {
  return sonnerToast.custom((toastProps) => (
    <HotToast
      {...toastProps}
      title={options.title}
      description={options.description}
      variant={options.variant}
      icon={options.icon}
    />
  ), {
    duration: options.duration || 4000,
  });
}
