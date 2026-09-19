import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  variant?: "light" | "dark"
  showText?: boolean
}

export default function Logo({ className, variant = "dark", showText = true }: LogoProps) {
  const color = variant === "light" ? "#ffffff" : "#00CED1"
  const textColor = variant === "light" ? "text-white" : "text-[#00CED1]"

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* House silhouette */}
        <path
          d="M32 8L6 30h8v22h36V30h8L32 8z"
          fill={color}
          opacity="0.15"
        />
        <path
          d="M32 8L6 30h8v22h36V30h8L32 8z"
          stroke={color}
          strokeWidth="2.5"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Leaf accent inside house */}
        <path
          d="M32 24c-6 0-10 6-10 12 0 4 2 7 4 9 2-4 6-8 10-10-2-2-3-6-4-11z"
          fill={color}
          opacity="0.6"
        />
        <path
          d="M32 24c6 0 10 6 10 12 0 4-2 7-4 9-2-4-6-8-10-10 2-2 3-6 4-11z"
          fill={color}
          opacity="0.4"
        />
        {/* Leaf vein */}
        <path
          d="M32 24v20"
          stroke={variant === "light" ? "#ffffff" : "#ffffff"}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
      {showText && (
        <span className={cn("font-bold text-lg tracking-wider", textColor)}>
          WEEKEND
        </span>
      )}
    </div>
  )
}
