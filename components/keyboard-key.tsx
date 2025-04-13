"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface KeyboardKeyProps {
  letter: string
  className?: string
  isPressed?: boolean
  onClick?: () => void
}

// キーボードキーのモバイル対応を改善
export default function KeyboardKey({ letter, className, isPressed = false, onClick }: KeyboardKeyProps) {
  return (
    <motion.button
      className={cn("relative group", className)}
      whileTap={{ y: 4 }}
      onClick={onClick}
      aria-label={`Keyboard key ${letter}`}
    >
      <div className="absolute inset-0 rounded-md bg-zinc-900 translate-y-1" />
      <div
        className={cn(
          "relative px-2 sm:px-3 py-2 sm:py-4 rounded-md border border-zinc-700 font-mono font-bold text-center transition-all duration-100 flex items-center justify-center text-xs sm:text-base",
          isPressed
            ? "bg-cyan-500 text-zinc-900 border-cyan-400 translate-y-1"
            : "bg-zinc-800 text-zinc-200 group-hover:bg-zinc-700 group-hover:border-zinc-600",
        )}
      >
        {letter}
      </div>
    </motion.button>
  )
}
