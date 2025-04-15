import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface AppLoaderProps {
  className?: string;
  message?: string;
  fullScreen?: boolean;
}

export function AppLoader({
  className,
  message,
  fullScreen = false,
}: AppLoaderProps) {
  const containerClasses = cn(
    "flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-purple-900 via-blue-900 to-black",
    fullScreen && "min-h-screen w-full",
    className
  );

  return (
    <div className={containerClasses}>
      <Loader2 className="h-18 w-18 animate-spin text-white" />
      {message && <p className="text-sm text-white/90">{message}</p>}
    </div>
  );
}
