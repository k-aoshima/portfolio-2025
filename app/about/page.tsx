"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Code, Figma, Globe, Layers, Palette, Zap } from "lucide-react"
import GameControls from "@/components/game-controls"

export default function AboutPage() {
  const [score, setScore] = useState(0)

  const skills = [
    { name: "フロントエンド開発", icon: <Code className="h-6 w-6" />, level: 95 },
    { name: "UI/UXデザイン", icon: <Figma className="h-6 w-6" />, level: 90 },
    { name: "3Dウェブ開発", icon: <Layers className="h-6 w-6" />, level: 85 },
    { name: "アニメーション", icon: <Zap className="h-6 w-6" />, level: 95 },
    { name: "レスポンシブデザイン", icon: <Globe className="h-6 w-6" />, level: 90 },
    { name: "クリエイティブコーディング", icon: <Palette className="h-6 w-6" />, level: 85 },
  ]

  const experiences = [
    {
      period: "2021 - 現在",
      title: "シニアフロントエンドエンジニア",
      company: "クリエイティブウェブスタジオ",
      description:
        "最新のフロントエンド技術を活用した革新的なウェブサイトの開発。Three.jsとWebGLを使用した3Dエクスペリエンスの構築。",
    },
    {
      period: "2019 - 2021",
      title: "フロントエンドデベロッパー",
      company: "デジタルエージェンシー",
      description:
        "React、Vue.jsを使用したインタラクティブなウェブアプリケーションの開発。アニメーションとマイクロインタラクションの実装。",
    },
    {
      period: "2017 - 2019",
      title: "ウェブデベロッパー",
      company: "テックスタートアップ",
      description: "レスポンシブウェブサイトの開発とパフォーマンス最適化。モダンなフロントエンドフレームワークの導入。",
    },
  ]

  return (
    <div className="bg-zinc-900">
      <main className="flex min-h-screen flex-col bg-zinc-900/80 pt-24 pb-16">
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
              プロフィール
            </motion.h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "4rem" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-0.5 bg-cyan-500 mb-12"
            />

            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-1">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=600&width=400"
                      alt="プロフィール写真"
                      width={400}
                      height={600}
                      className="w-full aspect-[2/3] object-cover"
                    />
                    <motion.div
                      initial={{ height: "100%" }}
                      animate={{ height: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="absolute inset-0 bg-cyan-800 origin-top"
                    />
                  </div>
                </motion.div>
              </div>

              <div className="md:col-span-2">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-4">あなたの名前</h2>
                  <p className="text-lg text-zinc-300 mb-8">フロントエンドエンジニア / クリエイティブデベロッパー</p>

                  <div className="space-y-4 text-zinc-300 mb-8">
                    <p>
                      最新のフロントエンド技術とクリエイティブなアニメーションを駆使して、印象的なウェブ体験を創造することに情熱を持っています。
                      React、Three.js、WebGL、Framer
                      Motionなどを活用し、技術とデザインの境界を押し広げる挑戦を続けています。
                    </p>
                    <p>
                      ユーザー体験を最優先に考え、パフォーマンスとアクセシビリティを損なうことなく、視覚的に魅力的なインターフェースを構築することを得意としています。
                      常に新しい技術やアプローチを学び、クリエイティブな問題解決を通じて、ウェブの可能性を広げることを目指しています。
                    </p>
                  </div>

                  <div className="mb-12">
                    <h3 className="text-xl font-bold text-white mb-6">スキル</h3>
                    <div className="space-y-4">
                      {skills.map((skill, index) => (
                        <div key={index}>
                          <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 * index }}
                            className="mb-4"
                            onClick={() => setScore((prev) => prev + 5)}
                          >
                            <div className="flex items-center mb-2">
                              <div className="mr-3 text-cyan-400">{skill.icon}</div>
                              <h4 className="font-medium text-white">{skill.name}</h4>
                            </div>
                            <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 1, delay: 0.5 + 0.1 * index }}
                                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                              />
                            </div>
                          </motion.div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-6">経歴</h3>
                    <div className="space-y-8">
                      {experiences.map((exp, index) => (
                        <div key={index}>
                          <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 * index }}
                            viewport={{ once: true }}
                            className="relative pl-8 border-l-2 border-zinc-700"
                          >
                            <div className="absolute top-0 left-[-9px] h-4 w-4 rounded-full bg-cyan-500" />
                            <span className="text-sm text-zinc-400">{exp.period}</span>
                            <h4 className="text-lg font-bold text-white mt-1">{exp.title}</h4>
                            <p className="text-zinc-300 font-medium">{exp.company}</p>
                            <p className="mt-2 text-zinc-400">{exp.description}</p>
                          </motion.div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
