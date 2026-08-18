import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className={cn("text-3xl font-bold sm:text-4xl", light ? "text-white" : "text-primary dark:text-white")}>
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-base", light ? "text-white/70" : "text-primary/70 dark:text-white/70")}>
          {description}
        </p>
      )}
    </div>
  );
}
