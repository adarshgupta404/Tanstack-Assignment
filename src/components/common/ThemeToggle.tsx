import { useThemeStore } from "@/context/theme";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";

const ThemeToggle = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}) => {
  const { theme, setTheme } = useThemeStore();
  const isMobile = useIsMobile();
  return (
    <Button
      onClick={() => {
        setTheme();
        setIsMobileMenuOpen(false);
      }}
      variant="ghost"
      size="sm"
      className="w-fit justify-start gap-3 h-9 rounded-lg hover:bg-accent transition-all duration-300"
    >
      <div className="relative">
        <Sun
          className={cn(
            "h-4 w-4 transition-all duration-500 rotate-0 scale-100",
            theme === "dark" && "rotate-90 scale-0"
          )}
        />
        <Moon
          className={cn(
            "absolute top-0 left-0 h-4 w-4 transition-all duration-500 rotate-90 scale-0",
            theme === "dark" && "rotate-0 scale-100"
          )}
        />
      </div>
      {isMobile && (
        <span className="text-sm font-medium">
          Switch to {theme === "light" ? "dark" : "light"} mode
        </span>
      )}
    </Button>
  );
};

export default ThemeToggle;
