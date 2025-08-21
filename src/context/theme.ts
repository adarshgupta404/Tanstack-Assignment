import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";

type ThemeContext = {
  theme: Theme;
  setTheme: () => void;
};

function getInitialTheme(): Theme {
  try {
    const stored = window.localStorage.getItem("theme-storage");
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed?.state?.theme === "dark" ? "dark" : "light";
    }
  } catch {}
  return "light";
}

export const useThemeStore = create<ThemeContext>()(
  persist(
    (set, get) => ({
      theme: getInitialTheme(),
      setTheme: () => {
        const newTheme = get().theme === "light" ? "dark" : "light";
        set({ theme: newTheme });
        window.localStorage.setItem("theme-storage", JSON.stringify({ state: { theme: newTheme } }));
        if (newTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    }),
    {
      name: "theme-storage",
      onRehydrateStorage: () => (state) => {
        if (state?.theme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    }
  )
);
