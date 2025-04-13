"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { X, Code, Play, Save, Copy } from "lucide-react"

interface CodeEditorProps {
  onClose: () => void
  setScore: React.Dispatch<React.SetStateAction<number>>
}

export default function CodeEditor({ onClose, setScore }: CodeEditorProps) {
  const [code, setCode] = useState(`// Welcome to the Code Editor!
// Try running this code with the Play button

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Calculate first 10 Fibonacci numbers
const results = [];
for (let i = 0; i < 10; i++) {
  results.push(fibonacci(i));
}

console.log("Fibonacci Sequence:");
console.log(results.join(", "));
`)
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [language, setLanguage] = useState<"javascript" | "typescript" | "html">("javascript")
  const editorRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    // フォーカスをエディタに設定
    editorRef.current?.focus()
  }, [])

  const runCode = () => {
    setIsRunning(true)
    setOutput("")

    // コンソール出力をキャプチャ
    const originalConsoleLog = console.log
    const logs: string[] = []

    console.log = (...args) => {
      logs.push(args.map((arg) => (typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg))).join(" "))
    }

    try {
      // コードを実行
      const result = new Function(code)()

      // 出力を設定
      setOutput(logs.join("\n"))

      // 実行成功でポイント加算
      setScore((prev) => prev + 20)
    } catch (error) {
      if (error instanceof Error) {
        setOutput(`Error: ${error.message}`)
      } else {
        setOutput("An unknown error occurred")
      }
    } finally {
      // コンソール出力を元に戻す
      console.log = originalConsoleLog
      setIsRunning(false)
    }
  }

  const saveCode = () => {
    // 保存アクションをシミュレート
    setScore((prev) => prev + 10)

    // 保存メッセージ
    const message = document.createElement("div")
    message.className =
      "fixed top-4 left-1/2 transform -translate-x-1/2 bg-zinc-800 p-3 rounded-lg border border-zinc-700 text-zinc-300 font-mono z-50"
    message.innerHTML = "Code saved successfully! +10 points"
    document.body.appendChild(message)

    setTimeout(() => {
      message.style.opacity = "0"
      message.style.transition = "opacity 0.5s"
      setTimeout(() => {
        document.body.removeChild(message)
      }, 500)
    }, 2000)
  }

  const copyCode = () => {
    navigator.clipboard.writeText(code)

    // コピーメッセージ
    const message = document.createElement("div")
    message.className =
      "fixed top-4 left-1/2 transform -translate-x-1/2 bg-zinc-800 p-3 rounded-lg border border-zinc-700 text-zinc-300 font-mono z-50"
    message.innerHTML = "Code copied to clipboard!"
    document.body.appendChild(message)

    setTimeout(() => {
      message.style.opacity = "0"
      message.style.transition = "opacity 0.5s"
      setTimeout(() => {
        document.body.removeChild(message)
      }, 500)
    }, 2000)
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
        className="w-full max-w-4xl bg-zinc-900 rounded-lg border-2 border-zinc-700 overflow-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <div className="flex items-center justify-between p-3 bg-zinc-800 border-b border-zinc-700">
          <div className="flex items-center">
            <Code className="h-5 w-5 text-cyan-400 mr-2" />
            <span className="font-mono text-zinc-300">Code Editor</span>
            <div className="ml-4 hidden md:flex space-x-2">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="bg-zinc-700 text-zinc-300 text-xs rounded px-2 py-1 border border-zinc-600"
              >
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="html">HTML</option>
              </select>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as any)}
                className="bg-zinc-700 text-zinc-300 text-xs rounded px-2 py-1 border border-zinc-600"
              >
                <option value="dark">Dark Theme</option>
                <option value="light">Light Theme</option>
              </select>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600 transition-colors"
              aria-label="Close editor"
            >
              <X className="h-3 w-3 text-zinc-900" />
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row h-[60vh] md:h-[70vh]">
          {/* エディタ部分 */}
          <div className="flex-1 overflow-hidden border-r border-zinc-700">
            <div className="flex items-center justify-between p-2 bg-zinc-800 border-b border-zinc-700">
              <span className="text-xs font-mono text-zinc-400">main.js</span>
              <div className="flex space-x-2">
                <button
                  onClick={runCode}
                  disabled={isRunning}
                  className="flex items-center bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-1 rounded transition-colors disabled:opacity-50"
                  aria-label="Run code"
                >
                  <Play className="h-3 w-3 mr-1" />
                  <span className="hidden sm:inline">Run</span>
                </button>
                <button
                  onClick={saveCode}
                  className="flex items-center bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 rounded transition-colors"
                  aria-label="Save code"
                >
                  <Save className="h-3 w-3 mr-1" />
                  <span className="hidden sm:inline">Save</span>
                </button>
                <button
                  onClick={copyCode}
                  className="flex items-center bg-purple-600 hover:bg-purple-700 text-white text-xs px-2 py-1 rounded transition-colors"
                  aria-label="Copy code"
                >
                  <Copy className="h-3 w-3 mr-1" />
                  <span className="hidden sm:inline">Copy</span>
                </button>
              </div>
            </div>
            <textarea
              ref={editorRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={`w-full h-full p-4 font-mono text-sm resize-none outline-none ${
                theme === "dark" ? "bg-zinc-950 text-zinc-300" : "bg-zinc-100 text-zinc-800"
              }`}
              spellCheck={false}
            />
          </div>

          {/* 出力部分 - モバイルでは折りたたみ可能に */}
          <div className="flex-1 overflow-hidden">
            <div className="p-2 bg-zinc-800 border-b border-zinc-700">
              <span className="text-xs font-mono text-zinc-400">Console Output</span>
            </div>
            <div
              className={`w-full h-full p-4 font-mono text-sm overflow-auto whitespace-pre-wrap ${
                theme === "dark" ? "bg-black text-green-400" : "bg-white text-zinc-800"
              }`}
            >
              {isRunning ? "Running..." : output || "Run your code to see output here"}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
