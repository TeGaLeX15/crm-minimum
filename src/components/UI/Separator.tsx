import React from "react";

interface SectionSeparatorProps {
  label?: string;
  onClick?: () => void;
}

const SectionSeparator: React.FC<SectionSeparatorProps> = ({
  label = "Сепаратор, мать его",
  onClick,
}) => {
  return (
    <div className="flex w-full items-center my-5">
      <div className="flex-1 h-0.5 bg-neutral-600" />

      <button
        type="button"
        onClick={onClick}
        className="
          mx-4
          inline-flex items-center gap-2
          px-4 py-2
          text-sm font-semibold
          text-neutral-200
          bg-neutral-800
          border border-neutral-700
          rounded
          transition-colors
          hover:bg-neutral-700
          hover:text-neutral-100
          hover:cursor-pointer
        "
      >
        <span className="text-lg leading-none">+</span>
        <span>{label}</span>
      </button>

      <div className="flex-1 h-0.5 bg-neutral-600" />
    </div>
  );
};

export default SectionSeparator;
