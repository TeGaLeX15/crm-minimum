export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    primaryLight: string;
    primaryDark: string;
    accent: string;
  };
}

export const THEMES: Theme[] = [
  {
    id: "default",
    name: "Серый",
    colors: {
      primary: "#171717",
      primaryLight: "#404040",
      primaryDark: "#0a0a0a",
      accent: "#737373",
    },
  },
  {
    id: "blue",
    name: "Синий",
    colors: {
      primary: "#1e40af",
      primaryLight: "#3b82f6",
      primaryDark: "#1e3a8a",
      accent: "#60a5fa",
    },
  },
  {
    id: "green",
    name: "Зелёный",
    colors: {
      primary: "#15803d",
      primaryLight: "#22c55e",
      primaryDark: "#166534",
      accent: "#4ade80",
    },
  },
  {
    id: "purple",
    name: "Фиолетовый",
    colors: {
      primary: "#7c3aed",
      primaryLight: "#a78bfa",
      primaryDark: "#6d28d9",
      accent: "#c4b5fd",
    },
  },
  {
    id: "orange",
    name: "Оранжевый",
    colors: {
      primary: "#ea580c",
      primaryLight: "#fb923c",
      primaryDark: "#c2410c",
      accent: "#fdba74",
    },
  },
  {
    id: "rose",
    name: "Розовый",
    colors: {
      primary: "#e11d48",
      primaryLight: "#fb7185",
      primaryDark: "#be123c",
      accent: "#fda4af",
    },
  },
  {
    id: "teal",
    name: "Бирюзовый",
    colors: {
      primary: "#0f766e",
      primaryLight: "#14b8a6",
      primaryDark: "#115e59",
      accent: "#5eead4",
    },
  },
  {
    id: "amber",
    name: "Янтарный",
    colors: {
      primary: "#d97706",
      primaryLight: "#fbbf24",
      primaryDark: "#b45309",
      accent: "#fcd34d",
    },
  },
];
