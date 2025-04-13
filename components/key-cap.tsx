"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface KeyCapProps {
  children: ReactNode
  color?: "cyan" | "blue" | "purple" | "pink"
  size?: "small" | "medium" | "large"
  variant?: "default" | "outline"
}

export default function KeyCap({ children, color = "cyan", size = "medium", variant = "default" }: KeyCapProps) {
  // カラーマップ
  const colorMap = {
    cyan: {
      default: {
        bg: "bg-cyan-500",
        border: "border-cyan-600",
        shadow: "bg-cyan-700",
        hover: "group-hover:bg-cyan-400",
        text: "text-zinc-900",
      },
      outline: {
        bg: "bg-transparent",
        border: "border-cyan-500",
        shadow: "bg-cyan-700/50",
        hover: "group-hover:bg-cyan-900/20",
        text: "text-cyan-400",
      },
    },
    blue: {
      default: {
        bg: "bg-blue-500",
        border: "border-blue-600",
        shadow: "bg-blue-700",
        hover: "group-hover:bg-blue-400",
        text: "text-zinc-900",
      },
      outline: {
        bg: "bg-transparent",
        border: "border-blue-500",
        shadow: "bg-blue-700/50",
        hover: "group-hover:bg-blue-900/20",
        text: "text-blue-400",
      },
    },
    purple: {
      default: {
        bg: "bg-purple-500",
        border: "border-purple-600",
        shadow: "bg-purple-700",
        hover: "group-hover:bg-purple-400",
        text: "text-zinc-900",
      },
      outline: {
        bg: "bg-transparent",
        border: "border-purple-500",
        shadow: "bg-purple-700/50",
        hover: "group-hover:bg-purple-900/20",
        text: "text-purple-400",
      },
    },
    pink: {
      default: {
        bg: "bg-pink-500",
        border: "border-pink-600",
        shadow: "bg-pink-700",
        hover: "group-hover:bg-pink-400",
        text: "text-zinc-900",
      },
      outline: {
        bg: "bg-transparent",
        border: "border-pink-500",
        shadow: "bg-pink-700/50",
        hover: "group-hover:bg-pink-900/20",
        text: "text-pink-400",
      },
    },
  }

  // サイズマップ
  const sizeMap = {
    small: "px-3 py-2 text-sm",
    medium: "px-4 py-3",
    large: "px-6 py-4 text-lg",
  }

  const styles = colorMap[color][variant]
  const sizeStyle = sizeMap[size]

  return (
    <motion.div
      className="relative inline-block font-mono font-bold"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className={`absolute inset-0 translate-y-1.5 rounded-md ${styles.shadow}`} />
      <div
        className={cn(
          "relative rounded-md border-2 flex items-center justify-center transition-all duration-200 group-hover:translate-y-0.5 group-active:translate-y-1.5",
          styles.bg,
          styles.border,
          styles.hover,
          styles.text,
          sizeStyle,
        )}
      >
        {children}
      </div>
    </motion.div>
  )
}
