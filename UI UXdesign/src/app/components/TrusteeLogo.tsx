export function TrusteeLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const scales = { sm: "text-lg", md: "text-2xl", lg: "text-4xl" };
  const dotScales = { sm: "text-xs", md: "text-base", lg: "text-2xl" };

  return (
    <div className="flex items-baseline gap-0" style={{ fontFamily: "Georgia, serif" }}>
      <span className={`${scales[size]} font-normal text-[#4CAF7D] leading-none relative`}>
        <span className="relative inline-block">
          <span
            className={`absolute ${dotScales[size]} text-[#F5C842] font-bold leading-none`}
            style={{ top: size === "lg" ? "-14px" : size === "md" ? "-10px" : "-7px", left: size === "lg" ? "2px" : "1px" }}
          >
            ·
          </span>
          t
        </span>
        <span className="text-[#E8F2EC]">rustee</span>
      </span>
    </div>
  );
}
