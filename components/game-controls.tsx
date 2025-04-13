"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Keyboard, Coffee, Terminal, Code, ChevronUp, ChevronDown, Info } from "lucide-react"

interface GameControlsProps {
  score: number
  setScore: React.Dispatch<React.SetStateAction<number>>
  onOpenTerminal?: () => void
  onOpenEditor?: () => void
}

export default function GameControls({ score, setScore, onOpenTerminal, onOpenEditor }: GameControlsProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showShortcuts, setShowShortcuts] = useState(false)

  const handleCoffeeBreak = () => {
    setScore((prev) => prev + 50)

    // コーヒーブレイクメッセージ
    const message = document.createElement("div")
    message.className =
      "fixed bottom-24 right-4 bg-zinc-800 p-3 rounded-lg border border-zinc-700 text-zinc-300 font-mono z-50"
    message.innerHTML = "Coffee break! +50 points ☕"
    document.body.appendChild(message)

    setTimeout(() => {
      message.style.opacity = "0"
      message.style.transition = "opacity 0.5s"
      setTimeout(() => {
        document.body.removeChild(message)
      }, 500)
    }, 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-4 right-4 z-40"
    >
      <div className="flex flex-col items-end space-y-2">
        {/* ショートカット情報 */}
        <AnimatePresence>
          {showShortcuts && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="bg-zinc-800 rounded-lg border-2 border-zinc-700 overflow-hidden shadow-lg p-3 mb-2"
            >
              <div className="flex flex-col space-y-1 font-mono text-xs text-zinc-300">
                <div>Ctrl + ` : Toggle Terminal</div>
                <div>Ctrl + E : Toggle Code Editor</div>
                <div>??? : Secret Code</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 展開されたコントロールパネル */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="bg-zinc-800 rounded-lg border-2 border-zinc-700 overflow-hidden shadow-lg"
            >
              <div className="p-3 border-b border-zinc-700">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-300 text-sm font-mono">GAME CONTROLS</span>
                </div>
              </div>

              <div className="p-4 space-y-3">
                {onOpenTerminal && (
                  <button
                    onClick={onOpenTerminal}
                    className="w-full flex items-center justify-between bg-zinc-700 hover:bg-zinc-600 text-zinc-300 px-4 py-2 rounded transition-colors"
                  >
                    <span className="font-mono text-sm">Terminal</span>
                    <Terminal className="h-4 w-4 text-cyan-400" />
                  </button>
                )}

                {onOpenEditor && (
                  <button
                    onClick={onOpenEditor}
                    className="w-full flex items-center justify-between bg-zinc-700 hover:bg-zinc-600 text-zinc-300 px-4 py-2 rounded transition-colors"
                  >
                    <span className="font-mono text-sm">Code Editor</span>
                    <Code className="h-4 w-4 text-cyan-400" />
                  </button>
                )}

                <button
                  onClick={handleCoffeeBreak}
                  className="w-full flex items-center justify-between bg-zinc-700 hover:bg-zinc-600 text-zinc-300 px-4 py-2 rounded transition-colors"
                >
                  <span className="font-mono text-sm">Coffee Break</span>
                  <Coffee className="h-4 w-4 text-cyan-400" />
                </button>

                <button
                  onClick={() => setShowShortcuts(!showShortcuts)}
                  className="w-full flex items-center justify-between bg-zinc-700 hover:bg-zinc-600 text-zinc-300 px-4 py-2 rounded transition-colors"
                >
                  <span className="font-mono text-sm">Keyboard Shortcuts</span>
                  <Info className="h-4 w-4 text-cyan-400" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* スコア表示とトグルボタン */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-zinc-800 px-4 py-2 rounded-lg border-2 border-zinc-700 font-mono shadow-lg flex items-center"
        >
          <div className="flex items-center mr-3">
            <Keyboard className="mr-2 h-5 w-5 text-cyan-400" />
            <span className="text-zinc-300 text-sm md:text-base">SCORE:</span>
            <motion.span
              key={score}
              initial={{ scale: 1.5, color: "#22d3ee" }}
              animate={{ scale: 1, color: "#e5e5e5" }}
              className="ml-2 font-bold text-sm md:text-base"
            >
              {score.toString().padStart(6, "0")}
            </motion.span>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-zinc-700 hover:bg-zinc-600 p-1 rounded text-zinc-300 transition-colors"
            aria-label={isExpanded ? "Collapse controls" : "Expand controls"}
          >
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}
