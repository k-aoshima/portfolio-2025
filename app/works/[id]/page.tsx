"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import GameControls from "@/components/game-controls"

interface WorkPageProps {
  params: {
    id: string
  }
}

export default function WorkPage({ params }: WorkPageProps) {
  const { id } = params
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })
  const [score, setScore] = useState(0)

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50])

  const projects = [
    {
      id: "1",
      title: "インタラクティブ3Dショーケース",
      category: "Three.js / WebGL / React",
      year: "2023",
      description: [
        "Three.jsとReact Three Fiberを使用した没入型3Dウェブサイト。ユーザーは製品を360度回転させて詳細を確認できます。",
        "このプロジェクトでは、複雑な3Dモデルを最適化し、モバイルデバイスでもスムーズに動作するよう工夫しました。また、直感的なユーザーインターフェースを設計し、3D空間での操作を簡単にしています。",
        "パフォーマンスを最大化するために、モデルのLOD（Level of Detail）を実装し、視点からの距離に応じて詳細度を調整しています。また、テクスチャの圧縮とシェーダーの最適化により、読み込み時間を短縮しました。",
      ],
      technologies: ["React", "Three.js", "React Three Fiber", "GSAP", "WebGL", "Blender"],
      links: {
        live: "https://example.com/project1",
        github: "https://github.com/username/project1",
      },
    },
    {
      id: "2",
      title: "パララックスポートフォリオ",
      category: "アニメーション / Framer Motion",
      year: "2023",
      description: [
        "Framer Motionを活用した滑らかなパララックス効果を持つポートフォリオサイト。スクロールに合わせてコンテンツが美しくアニメーションします。",
        "このプロジェクトでは、スクロールベースのアニメーションを実装し、ユーザーの操作に応じてコンテンツが自然に動くよう設計しました。視差効果を使用することで、奥行きのある視覚体験を提供しています。",
        "パフォーマンスを考慮し、アニメーションはGPUアクセラレーションを活用。また、Intersection Observer APIを使用して、画面内に要素が入ったときのみアニメーションを実行することで、リソースを効率的に使用しています。",
      ],
      technologies: ["Next.js", "Framer Motion", "GSAP", "TypeScript", "Tailwind CSS"],
      links: {
        live: "https://example.com/project2",
        github: "https://github.com/username/project2",
      },
    },
    {
      id: "3",
      title: "クリエイティブウェブアプリ",
      category: "インタラクティブ / アニメーション",
      year: "2022",
      description: [
        "Canvas APIとWebGLを使用したインタラクティブなウェブアプリケーション。ユーザーの操作に応じてリアルタイムでグラフィックが変化します。",
        "このプロジェクトでは、マウスやタッチの動きに反応するパーティクルシステムを実装。ユーザーの操作に応じて、パーティクルの動きや色が変化する仕組みを構築しました。",
        "パフォーマンスを最適化するために、WebWorkerを使用して計算処理をメインスレッドから分離。また、requestAnimationFrameを使用してアニメーションをスムーズに実行し、60FPSを維持しています。",
      ],
      technologies: ["React", "Canvas API", "WebGL", "Anime.js", "Web Workers"],
      links: {
        live: "https://example.com/project3",
        github: "https://github.com/username/project3",
      },
    },
    {
      id: "4",
      title: "没入型ブランドエクスペリエンス",
      category: "3D / アニメーション",
      year: "2023",
      description: [
        "高度なアニメーションと3D要素を組み合わせたブランドサイト。製品の特徴を視覚的に魅力的な方法で紹介します。",
        "このプロジェクトでは、ブランドのアイデンティティを反映した3Dエクスペリエンスを構築。製品の特徴を直感的に理解できるインタラクティブな要素を取り入れました。",
        "3Dモデルの最適化とプログレッシブローディングを実装し、初期読み込み時間を短縮。また、デバイスの性能に応じて自動的に品質を調整する機能を追加しています。",
      ],
      technologies: ["Three.js", "React Three Fiber", "GSAP", "Blender", "Lottie"],
      links: {
        live: "https://example.com/project4",
        github: "https://github.com/username/project4",
      },
    },
    {
      id: "5",
      title: "データ可視化ダッシュボード",
      category: "データビジュアライゼーション",
      year: "2022",
      description: [
        "複雑なデータを直感的に理解できるインタラクティブなダッシュボード。アニメーションを活用してデータの変化を視覚的に表現します。",
        "このプロジェクトでは、大量のデータを効率的に処理し、美しいビジュアライゼーションとして表示する仕組みを構築。フィルタリングやソート機能を実装し、ユーザーが必要な情報にすばやくアクセスできるようにしました。",
        "データの更新をリアルタイムで反映し、変化をアニメーションで表現することで、トレンドや異常値を視覚的に把握しやすくしています。また、レスポンシブデザインにより、様々なデバイスで最適な表示を実現しました。",
      ],
      technologies: ["D3.js", "React", "SVG", "TypeScript", "Redux"],
      links: {
        live: "https://example.com/project5",
        github: "https://github.com/username/project5",
      },
    },
    {
      id: "6",
      title: "モバイルゲームウェブアプリ",
      category: "ゲーム開発 / インタラクティブ",
      year: "2022",
      description: [
        "HTML5とCanvasを使用したモバイルフレンドリーなウェブゲーム。流れるようなアニメーションと楽しいユーザー体験を提供します。",
        "このプロジェクトでは、Phaser.jsを使用してゲームロジックを実装。物理エンジンを活用したリアルな動きと、カスタムアニメーションによる視覚効果を組み合わせました。",
        "オフライン機能を実装し、インターネット接続がない環境でもプレイ可能にしています。また、ゲームの状態をローカルストレージに保存することで、プレイヤーの進行状況を維持しています。",
      ],
      technologies: ["Phaser.js", "Canvas API", "Howler.js", "JavaScript", "Service Workers"],
      links: {
        live: "https://example.com/project6",
        github: "https://github.com/username/project6",
      },
    },
  ]

  const project = projects.find((p) => p.id === id) || projects[0]

  return (
    <main ref={containerRef} className="flex min-h-screen flex-col bg-zinc-900">
      <GameControls score={score} setScore={setScore} />

      <div className="h-screen relative flex items-center justify-center overflow-hidden">
        <motion.div style={{ opacity, scale, y }} className="absolute inset-0 z-0">
          <Image
            src={`/placeholder.svg?height=1080&width=1920`}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-zinc-900/50" />
        </motion.div>

        <div className="container px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              {project.title}
            </motion.h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-0.5 bg-cyan-500 mx-auto mb-8"
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex justify-center space-x-4 mb-8 text-sm"
            >
              <span>{project.category}</span>
              <span>•</span>
              <span>{project.year}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex justify-center space-x-4"
            >
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-cyan-600 text-white px-6 py-3 flex items-center font-medium hover:bg-cyan-700 transition-colors"
                onClick={() => setScore((prev) => prev + 20)}
              >
                サイトを見る <ExternalLink className="ml-2 h-4 w-4" />
              </a>
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border border-white text-white px-6 py-3 flex items-center font-medium hover:bg-white/10 transition-colors"
                onClick={() => setScore((prev) => prev + 20)}
              >
                GitHub <Github className="ml-2 h-4 w-4" />
              </a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-sm flex flex-col items-center"
        >
          <span className="mb-2">スクロールして詳細を見る</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            className="h-10 w-0.5 bg-white"
          />
        </motion.div>
      </div>

      <div className="container px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/works"
            className="inline-flex items-center text-cyan-400 font-medium hover:text-cyan-300 mb-12"
            onClick={() => setScore((prev) => prev + 5)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            作品一覧に戻る
          </Link>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-2xl font-bold text-white mb-6"
              >
                プロジェクト概要
              </motion.h2>

              <div className="space-y-4">
                {project.description.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    className="text-zinc-300"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="mt-12 grid gap-6"
              >
                <Image
                  src={`/placeholder.svg?height=600&width=1000`}
                  alt={`${project.title} スクリーンショット 1`}
                  width={1000}
                  height={600}
                  className="w-full"
                />
                <div className="grid grid-cols-2 gap-6">
                  <Image
                    src={`/placeholder.svg?height=300&width=500`}
                    alt={`${project.title} スクリーンショット 2`}
                    width={500}
                    height={300}
                    className="w-full"
                  />
                  <Image
                    src={`/placeholder.svg?height=300&width=500`}
                    alt={`${project.title} スクリーンショット 3`}
                    width={500}
                    height={300}
                    className="w-full"
                  />
                </div>
              </motion.div>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-zinc-800 p-6 sticky top-24"
              >
                <h3 className="text-lg font-bold text-white mb-4">技術スタック</h3>
                <ul className="space-y-2 mb-8">
                  {project.technologies.map((tech, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      viewport={{ once: true }}
                      className="flex items-center text-zinc-300"
                    >
                      <span className="h-1.5 w-1.5 bg-cyan-500 rounded-full mr-2" />
                      {tech}
                    </motion.li>
                  ))}
                </ul>

                <h3 className="text-lg font-bold text-white mb-4">リンク</h3>
                <div className="space-y-3">
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-cyan-400 hover:text-cyan-300"
                    onClick={() => setScore((prev) => prev + 10)}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    ライブデモ
                  </a>
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-cyan-400 hover:text-cyan-300"
                    onClick={() => setScore((prev) => prev + 10)}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    ソースコード
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
