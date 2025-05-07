import clsx from "clsx";
import { Star } from "lucide-react";

export type RatingProps = {
  value: number;
  className?: string;
};
export default function Rating({ value, className }: RatingProps) {
  const validated = Math.max(0, Math.min(5, value));
  return (
    <div className={clsx("text-muted-foreground flex items-center gap-2", className)}>
      <Star />
      <p>{validated}</p>
    </div>
  );
}
