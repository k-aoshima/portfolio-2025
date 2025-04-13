"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

interface PixelButtonProps {
  children: ReactNode
  href: string
  color?: "purple" | "pink" | "blue" | "green"
  variant?: "default" | "outline"
}

export default function PixelButton({ children, href, color = "purple", variant = "default" }: PixelButtonProps) {
  // カラーマップ
  const colorMap = {
    purple: {
      default: {
        bg: "bg-purple-600",
        border: "border-purple-800",
        shadow: "shadow-purple-900",
        hover: "hover:bg-purple-700",
        text: "text-white",
      },
      outline: {
        bg: "bg-transparent",
        border: "border-purple-500",
        shadow: "shadow-purple-900/50",
        hover: "hover:bg-purple-900/20",
        text: "text-purple-400",
      },
    },
    pink: {
      default: {
        bg: "bg-pink-600",
        border: "border-pink-800",
        shadow: "shadow-pink-900",
        hover: "hover:bg-pink-700",
        text: "text-white",
      },
      outline: {
        bg: "bg-transparent",
        border: "border-pink-500",
        shadow: "shadow-pink-900/50",
        hover: "hover:bg-pink-900/20",
        text: "text-pink-400",
      },
    },
    blue: {
      default: {
        bg: "bg-blue-600",
        border: "border-blue-800",
        shadow: "shadow-blue-900",
        hover: "hover:bg-blue-700",
        text: "text-white",
      },
      outline: {
        bg: "bg-transparent",
        border: "border-blue-500",
        shadow: "shadow-blue-900/50",
        hover: "hover:bg-blue-900/20",
        text: "text-blue-400",
      },
    },
    green: {
      default: {
        bg: "bg-green-600",
        border: "border-green-800",
        shadow: "shadow-green-900",
        hover: "hover:bg-green-700",
        text: "text-white",
      },
      outline: {
        bg: "bg-transparent",
        border: "border-green-500",
        shadow: "shadow-green-900/50",
        hover: "hover:bg-green-900/20",
        text: "text-green-400",
      },
    },
  }

  const styles = colorMap[color][variant]

  return (
    <Link href={href} className="group">
      <motion.div
        className={`relative inline-block font-mono font-bold ${styles.text}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className={`absolute inset-0 translate-y-1.5 translate-x-1.5 rounded ${styles.shadow}`} />
        <div
          className={`relative px-6 py-3 border-2 ${styles.border} ${styles.bg} ${styles.hover} rounded flex items-center justify-center transition-all duration-200 group-hover:translate-x-1 group-hover:translate-y-1 group-active:translate-x-0 group-active:translate-y-0`}
        >
          {children}
        </div>
      </motion.div>
    </Link>
  )
}
