"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, useScroll, useSpring, useInView, AnimatePresence } from "framer-motion"
import { ArrowRight, Keyboard, Code, Terminal, Github } from "lucide-react"
import KeyboardKey from "@/components/keyboard-key"
import KeyCap from "@/components/key-cap"
import CommandLine from "@/components/command-line"
import CodeEditor from "@/components/code-editor"
import GameControls from "@/components/game-controls"

export default function Home() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false })
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const [showIntro, setShowIntro] = useState(true)
  const [typedText, setTypedText] = useState("")
  const [targetText] = useState("WELCOME TO MY PORTFOLIO")
  const [typingComplete, setTypingComplete] = useState(false)
  const [score, setScore] = useState(0)
  const [pressedKeys, setPressedKeys] = useState<string[]>([])
  const [showCommandLine, setShowCommandLine] = useState(false)
  const [showCodeEditor, setShowCodeEditor] = useState(false)
  const [konami, setKonami] = useState<string[]>([])
  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ]

  // タイピングアニメーション
  useEffect(() => {
    if (showIntro) return

    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex < targetText.length) {
        setTypedText(targetText.substring(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(interval)
        setTypingComplete(true)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [showIntro, targetText])

  // キーボードイベント
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // コナミコード検出
      setKonami((prev) => {
        const newKonami = [...prev, e.key]
        if (newKonami.length > konamiCode.length) {
          newKonami.shift()
        }

        // コナミコードが完成したらスコアを大幅アップ
        if (newKonami.join(",") === konamiCode.join(",")) {
          setScore((prev) => prev + 1000)
          // 画面をフラッシュさせる効果
          const flash = document.createElement("div")
          flash.style.position = "fixed"
          flash.style.top = "0"
          flash.style.left = "0"
          flash.style.right = "0"
          flash.style.bottom = "0"
          flash.style.backgroundColor = "white"
          flash.style.opacity = "0.8"
          flash.style.zIndex = "9999"
          flash.style.transition = "opacity 0.5s"
          document.body.appendChild(flash)

          setTimeout(() => {
            flash.style.opacity = "0"
            setTimeout(() => {
              document.body.removeChild(flash)
            }, 500)
          }, 100)
        }

        return newKonami
      })

      if (showIntro) {
        setShowIntro(false)
        return
      }

      // モバイルでは特殊キー処理をスキップ
      const isMobile = window.innerWidth < 768
      if (!isMobile) {
        // 特殊キーの処理
        if (e.ctrlKey && e.key === "`") {
          e.preventDefault()
          setShowCommandLine((prev) => !prev)
          return
        }

        if (e.ctrlKey && e.key === "e") {
          e.preventDefault()
          setShowCodeEditor((prev) => !prev)
          return
        }
      }

      // スコア加算（キーを押むたびに）
      setScore((prev) => prev + 10)

      // 押されたキーを記録
      if (!pressedKeys.includes(e.key.toUpperCase())) {
        setPressedKeys((prev) => [...prev, e.key.toUpperCase()])
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      // 離されたキーを記録から削除
      setPressedKeys((prev) => prev.filter((key) => key !== e.key.toUpperCase()))
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [showIntro, pressedKeys, konamiCode])

  return (
    <div className="bg-zinc-900">
      <main className="relative flex min-h-screen flex-col items-center justify-center bg-zinc-900/80 text-white overflow-hidden">
        {/* スクロールプログレスバー */}
        <motion.div className="fixed top-0 left-0 right-0 h-1 bg-cyan-500 origin-left z-40" style={{ scaleX }} />

        {/* 統合されたゲームコントロール */}
        <GameControls
          score={score}
          setScore={setScore}
          onOpenTerminal={() => setShowCommandLine(true)}
          onOpenEditor={() => setShowCodeEditor(true)}
        />

        {/* イントロ画面 */}
        <AnimatePresence>
          {showIntro && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => setShowIntro(false)}
            >
              <motion.div
                className="text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h1 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-mono">
                  KEYBOARD MASTER
                </h1>
                <div className="relative mb-12">
                  <KeyboardKey className="w-32 h-32 mx-auto" letter="⏎" />
                </div>
                <p className="text-xl text-zinc-300 mb-8 font-mono">Press any key to start...</p>
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                  className="text-sm text-zinc-400 font-mono"
                >
                  LOADING KEYBOARD INTERFACE...
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* コマンドライン */}
        <AnimatePresence>
          {showCommandLine && <CommandLine onClose={() => setShowCommandLine(false)} setScore={setScore} />}
        </AnimatePresence>

        {/* コードエディタ */}
        <AnimatePresence>
          {showCodeEditor && <CodeEditor onClose={() => setShowCodeEditor(false)} setScore={setScore} />}
        </AnimatePresence>

        {/* ヒーローセクション */}
        <div className="relative w-full min-h-screen flex items-center justify-center z-10">
          <div className="container px-4 py-16 md:py-24 z-10 main-content">
            <div className="mx-auto max-w-6xl">
              {/* タイピングアニメーション */}
              <div className="mb-16 mt-16 md:mt-0 text-center">
                <motion.div
                  className="inline-block bg-zinc-800 p-4 rounded-lg border-2 border-zinc-700 font-mono text-xl md:text-4xl mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="text-cyan-400">&gt; </span>
                  <span>{typedText}</span>
                  <motion.span
                    className="inline-block w-3 h-6 bg-cyan-400 ml-1"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                  />
                </motion.div>

                {typingComplete && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-zinc-400 font-mono"
                  >
                    Type any key to continue exploring...
                  </motion.div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="flex flex-col space-y-6"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="inline-block px-3 py-1 text-sm font-mono bg-zinc-800 border border-zinc-700 rounded-md text-cyan-400"
                  >
                    KEYBOARD ENTHUSIAST & DEVELOPER
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-4xl md:text-6xl font-bold tracking-tight leading-tight font-mono"
                  >
                    <span className="block">CODING WITH</span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                      MECHANICAL
                    </span>
                    <span className="block">PRECISION</span>
                  </motion.h1>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-blue-500"
                  />

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="text-lg md:text-xl text-zinc-300 font-mono"
                  >
                    キーボード愛好家であり、開発者。タイピングの心地よさとコーディングの美しさを追求しています。
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                  >
                    <Link href="/works" className="group">
                      <KeyCap color="cyan" size="large">
                        <span>作品を見る</span>
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </KeyCap>
                    </Link>

                    <Link href="/contact" className="group">
                      <KeyCap color="blue" size="large" variant="outline">
                        <span>CONTACT</span>
                      </KeyCap>
                    </Link>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="relative h-[400px] w-full"
                >
                  <div className="absolute inset-0 bg-zinc-800 rounded-lg overflow-hidden border-2 border-zinc-700">
                    {/* キーボードビジュアル */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="grid grid-cols-10 gap-1 p-4 w-full max-w-lg">
                        {[
                          "Q",
                          "W",
                          "E",
                          "R",
                          "T",
                          "Y",
                          "U",
                          "I",
                          "O",
                          "P",
                          "A",
                          "S",
                          "D",
                          "F",
                          "G",
                          "H",
                          "J",
                          "K",
                          "L",
                          ";",
                          "Z",
                          "X",
                          "C",
                          "V",
                          "B",
                          "N",
                          "M",
                          ",",
                          ".",
                          "/",
                        ].map((key, index) => (
                          <motion.div
                            key={index}
                            className={`col-span-1 ${index > 9 && index < 20 ? "ml-2" : ""} ${index > 19 ? "ml-4" : ""}`}
                            whileHover={{ y: -5 }}
                          >
                            <KeyboardKey
                              letter={key}
                              isPressed={pressedKeys.includes(key)}
                              onClick={() => {
                                setScore((prev) => prev + 5)
                              }}
                            />
                          </motion.div>
                        ))}
                        <motion.div className="col-span-10 mt-2">
                          <KeyboardKey
                            letter="SPACE"
                            className="w-full"
                            isPressed={pressedKeys.includes(" ")}
                            onClick={() => {
                              setScore((prev) => prev + 5)
                            }}
                          />
                        </motion.div>
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 bg-zinc-900/80 backdrop-blur-sm p-3 rounded border border-zinc-700">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Keyboard className="h-5 w-5 text-cyan-400 mr-2" />
                          <span className="text-sm font-mono text-zinc-300">CUSTOM MECHANICAL</span>
                        </div>
                        <div className="flex space-x-2">
                          <span className="inline-block w-3 h-3 bg-cyan-500 rounded-full"></span>
                          <span className="inline-block w-3 h-3 bg-blue-500 rounded-full"></span>
                          <span className="inline-block w-3 h-3 bg-purple-500 rounded-full"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* スキルセクション */}
        <section className="w-full py-24 bg-zinc-800/90 text-white">
          <div ref={ref} className="container px-4">
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-center mb-16 font-mono"
            >
              SKILLS & ABILITIES
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Keyboard className="h-10 w-10" />,
                  title: "KEYBOARD MODS",
                  description: "キーボードのカスタマイズ、組み立て、ファームウェア開発",
                  level: 90,
                },
                {
                  icon: <Code className="h-10 w-10" />,
                  title: "WEB DEVELOPMENT",
                  description: "React, TypeScript, Next.jsを使用したウェブ開発",
                  level: 85,
                },
                {
                  icon: <Terminal className="h-10 w-10" />,
                  title: "COMMAND LINE",
                  description: "Bash, Zsh, PowerShellなどのシェルスクリプト",
                  level: 88,
                },
                {
                  icon: <Github className="h-10 w-10" />,
                  title: "VERSION CONTROL",
                  description: "Git, GitHub, GitLabを使用したバージョン管理",
                  level: 92,
                },
              ].map((skill, index) => (
                <div key={index}>
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 * index }}
                    className="bg-zinc-900 p-6 rounded-lg border border-zinc-700 hover:border-cyan-500 transition-colors"
                  >
                    <div className="mb-4 text-cyan-400">{skill.icon}</div>
                    <h3 className="text-xl font-bold mb-2 font-mono">{skill.title}</h3>
                    <p className="text-zinc-300 mb-4">{skill.description}</p>
                    <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.5 + 0.1 * index }}
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                      />
                    </div>
                    <div className="mt-1 flex justify-between text-xs text-zinc-400 font-mono">
                      <span>LEVEL</span>
                      <span>{skill.level}/100</span>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* プロジェクトセクション */}
        <section className="w-full py-24">
          <div className="container px-4">
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center mb-4 text-white font-mono"
            >
              FEATURED PROJECTS
            </motion.h2>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-16"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "CUSTOM KEYBOARD",
                  category: "Hardware",
                  tech: "QMK / VIA",
                  image: "/placeholder.svg?height=400&width=600",
                  color: "from-cyan-500 to-blue-500",
                },
                {
                  title: "CLI TOOL",
                  category: "Developer Tool",
                  tech: "Node.js / TypeScript",
                  image: "/placeholder.svg?height=400&width=600",
                  color: "from-blue-500 to-purple-500",
                },
                {
                  title: "VS CODE EXTENSION",
                  category: "Developer Tool",
                  tech: "TypeScript / VS Code API",
                  image: "/placeholder.svg?height=400&width=600",
                  color: "from-purple-500 to-pink-500",
                },
              ].map((project, index) => (
                <div key={index}>
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10 }}
                    className="group relative overflow-hidden rounded-lg border border-zinc-700 hover:border-cyan-500 transition-colors bg-zinc-900"
                  >
                    <div className="relative overflow-hidden aspect-video">
                      <motion.div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end p-6">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2 font-mono">{project.title}</h3>
                          <p className="text-zinc-300">{project.tech}</p>
                        </div>
                      </motion.div>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r opacity-40"
                        style={{ backgroundImage: `linear-gradient(to right, ${project.color})` }}
                      />
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-bold text-white font-mono">{project.title}</h3>
                        <span className="inline-block px-2 py-1 text-xs bg-zinc-800 rounded text-zinc-300 font-mono">
                          {project.category}
                        </span>
                      </div>
                      <p className="text-zinc-300 mb-4 font-mono">{project.tech}</p>
                      <Link
                        href={`/works/${index + 1}`}
                        className="inline-flex items-center text-cyan-400 font-medium hover:text-cyan-300 font-mono"
                      >
                        VIEW PROJECT
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>

            <div>
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="text-center mt-12"
              >
                <Link href="/works" className="group">
                  <KeyCap color="cyan" size="large">
                    <span>VIEW ALL PROJECTS</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </KeyCap>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
