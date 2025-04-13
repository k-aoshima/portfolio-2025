"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { X, Terminal } from "lucide-react"

interface CommandLineProps {
  onClose: () => void
  setScore: React.Dispatch<React.SetStateAction<number>>
}

export default function CommandLine({ onClose, setScore }: CommandLineProps) {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<{ command: string; output: string }[]>([
    { command: "", output: "Welcome to the Terminal! Type 'help' for available commands." },
  ])
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // フォーカスを入力フィールドに設定
    inputRef.current?.focus()

    // 端末の一番下までスクロール
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    let output = ""
    const command = input.trim().toLowerCase()

    // コマンドの処理
    switch (command) {
      case "help":
        output = `
Available commands:
- help: Show this help message
- about: Show information about me
- skills: List my skills
- clear: Clear the terminal
- whoami: Show current user
- date: Show current date and time
- echo [text]: Echo the text
- ls: List files
- cat [file]: Show file content
- score [number]: Add points to your score
- exit: Close the terminal
`
        break

      case "about":
        output = "I'm a keyboard enthusiast and developer who loves mechanical keyboards and coding."
        break

      case "skills":
        output = `
My skills include:
- Keyboard customization and firmware development
- Web development with React, TypeScript, and Next.js
- Command line tools and shell scripting
- Version control with Git and GitHub
- Mechanical keyboard building and modding
`
        break

      case "clear":
        setHistory([])
        return

      case "whoami":
        output = "keyboard-enthusiast"
        break

      case "date":
        output = new Date().toString()
        break

      case "ls":
        output = `
projects/
skills.txt
about.md
keyboard-collection.json
.bashrc
.vimrc
`
        break

      case "cat keyboard-collection.json":
        output = `
{
  "keyboards": [
    {
      "name": "Custom 60%",
      "switches": "Gateron Ink Black",
      "keycaps": "GMK Laser",
      "case": "Aluminum"
    },
    {
      "name": "Ergodox",
      "switches": "Zealios 67g",
      "keycaps": "MT3 /dev/tty",
      "case": "Acrylic"
    },
    {
      "name": "HHKB Pro 2",
      "switches": "Topre 45g",
      "keycaps": "Stock PBT",
      "case": "Plastic"
    }
  ]
}
`
        break

      case "exit":
        onClose()
        return

      default:
        // echo コマンドの処理
        if (command.startsWith("echo ")) {
          output = command.substring(5)
        }
        // score コマンドの処理
        else if (command.startsWith("score ")) {
          const points = Number.parseInt(command.substring(6))
          if (!isNaN(points)) {
            setScore((prev) => prev + points)
            output = `Added ${points} points to your score!`
          } else {
            output = "Invalid number format."
          }
        }
        // cat コマンドの処理（デフォルトファイル）
        else if (command.startsWith("cat ")) {
          const file = command.substring(4)
          if (file === "skills.txt") {
            output = "Keyboard Customization, Web Development, Command Line, Version Control"
          } else if (file === "about.md") {
            output = "# About Me\n\nKeyboard enthusiast and developer passionate about creating great user experiences."
          } else if (file === ".vimrc") {
            output = `
set number
set relativenumber
set tabstop=2
set shiftwidth=2
set expandtab
set autoindent
syntax on
colorscheme nord
`
          } else if (file === ".bashrc") {
            output = `
alias ll='ls -la'
alias gs='git status'
alias gc='git commit'
alias gp='git push'
export PATH=$PATH:~/.local/bin
`
          } else {
            output = `cat: ${file}: No such file or directory`
          }
        } else {
          output = `Command not found: ${command}. Type 'help' for available commands.`
        }
    }

    setHistory((prev) => [...prev, { command: input, output }])
    setInput("")

    // コマンド実行でポイント加算
    setScore((prev) => prev + 5)
  }

  // モバイル対応を改善
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-3xl bg-zinc-900 rounded-lg border-2 border-zinc-700 overflow-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <div className="flex items-center justify-between p-3 bg-zinc-800 border-b border-zinc-700">
          <div className="flex items-center">
            <Terminal className="h-5 w-5 text-cyan-400 mr-2" />
            <span className="font-mono text-zinc-300">Terminal</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600 transition-colors"
              aria-label="Close terminal"
            >
              <X className="h-3 w-3 text-zinc-900" />
            </button>
          </div>
        </div>

        <div ref={terminalRef} className="h-60 md:h-96 overflow-y-auto p-4 font-mono text-sm text-zinc-300 bg-zinc-950">
          {history.map((item, index) => (
            <div key={index} className="mb-2">
              {item.command && (
                <div className="flex items-center">
                  <span className="text-cyan-400 mr-2">$</span>
                  <span>{item.command}</span>
                </div>
              )}
              <div className="whitespace-pre-wrap ml-4">{item.output}</div>
            </div>
          ))}

          <form onSubmit={handleCommand} className="flex items-center mt-2">
            <span className="text-cyan-400 mr-2">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent outline-none"
              autoFocus
            />
          </form>
        </div>
      </motion.div>
    </motion.div>
  )
}
