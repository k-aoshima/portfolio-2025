"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll } from "framer-motion"
import { ArrowRight } from "lucide-react"
import GameControls from "@/components/game-controls"

export default function WorksPage() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })
  const [score, setScore] = useState(0)

  const projects = [
    {
      id: 1,
      title: "インタラクティブ3Dショーケース",
      category: "Three.js / WebGL / React",
      description: "Three.jsを使用した没入型3Dウェブサイト。ユーザーは製品を360度回転させて詳細を確認できます。",
      technologies: ["React", "Three.js", "GSAP", "WebGL"],
    },
    {
      id: 2,
      title: "パララックスポートフォリオ",
      category: "アニメーション / Framer Motion",
      description:
        "Framer Motionを活用した滑らかなパララックス効果を持つポートフォリオサイト。スクロールに合わせてコンテンツが美しくアニメーションします。",
      technologies: ["Next.js", "Framer Motion", "GSAP", "TypeScript"],
    },
    {
      id: 3,
      title: "クリエイティブウェブアプリ",
      category: "インタラクティブ / アニメーション",
      description:
        "Canvas APIとWebGLを使用したインタラクティブなウェブアプリケーション。ユーザーの操作に応じてリアルタイムでグラフィックが変化します。",
      technologies: ["React", "Canvas API", "WebGL", "Anime.js"],
    },
    {
      id: 4,
      title: "没入型ブランドエクスペリエンス",
      category: "3D / アニメーション",
      description:
        "高度なアニメーションと3D要素を組み合わせたブランドサイト。製品の特徴を視覚的に魅力的な方法で紹介します。",
      technologies: ["Three.js", "React Three Fiber", "GSAP", "Blender"],
    },
    {
      id: 5,
      title: "データ可視化ダッシュボード",
      category: "データビジュアライゼーション",
      description:
        "複雑なデータを直感的に理解できるインタラクティブなダッシュボード。アニメーションを活用してデータの変化を視覚的に表現します。",
      technologies: ["D3.js", "React", "SVG", "TypeScript"],
    },
    {
      id: 6,
      title: "モバイルゲームウェブアプリ",
      category: "ゲーム開発 / インタラクティブ",
      description:
        "HTML5とCanvasを使用したモバイルフレンドリーなウェブゲーム。流れるようなアニメーションと楽しいユーザー体験を提供します。",
      technologies: ["Phaser.js", "Canvas API", "Howler.js", "JavaScript"],
    },
  ]

  return (
    <div className="bg-zinc-900">
      <main ref={containerRef} className="flex min-h-screen flex-col bg-zinc-900/80 pt-24 pb-16">
        <GameControls score={score} setScore={setScore} />

        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-4xl"
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6 text-3xl font-bold tracking-tight text-white md:text-5xl"
            >
              作品集
            </motion.h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "4rem" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-0.5 bg-cyan-500 mb-12"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-16 text-lg text-zinc-300 max-w-2xl"
            >
              最新のフロントエンド技術とアニメーションを駆使して制作した作品をご紹介します。
              各プロジェクトでは、ユーザー体験を向上させるための革新的なアプローチを追求しています。
            </motion.p>

            <div className="grid gap-12">
              {projects.map((project, index) => (
                <div key={project.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="group"
                    onClick={() => setScore((prev) => prev + 10)}
                  >
                    <Link href={`/works/${project.id}`} className="grid md:grid-cols-2 gap-6 items-center">
                      <div className="overflow-hidden">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.4 }}
                          className="relative aspect-video overflow-hidden"
                        >
                          <Image
                            src={`/placeholder.svg?height=400&width=600`}
                            alt={project.title}
                            width={600}
                            height={400}
                            className="w-full h-full object-cover"
                          />
                          <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 bg-cyan-800/60 flex items-center justify-center"
                          >
                            <span className="text-white font-medium flex items-center">
                              詳細を見る <ArrowRight className="ml-2 h-4 w-4" />
                            </span>
                          </motion.div>
                        </motion.div>
                      </div>

                      <div>
                        <span className="inline-block text-sm font-medium text-cyan-400 mb-2">{project.category}</span>
                        <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                          {project.title}
                        </h2>
                        <p className="text-zinc-300 mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="inline-block bg-zinc-800 text-cyan-300 px-2 py-1 text-xs font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
