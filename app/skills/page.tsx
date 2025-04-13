"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import {
  Code,
  Figma,
  Layers,
  Zap,
  Globe,
  Palette,
  Database,
  GitBranch,
  Monitor,
  Cpu,
  BarChart,
  Smartphone,
} from "lucide-react"
import GameControls from "@/components/game-controls"

export default function SkillsPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [score, setScore] = useState(0)

  const skillCategories = [
    {
      title: "フロントエンド開発",
      icon: <Code className="h-8 w-8" />,
      skills: [
        { name: "HTML5/CSS3", level: 95 },
        { name: "JavaScript/TypeScript", level: 95 },
        { name: "React", level: 95 },
        { name: "Next.js", level: 90 },
        { name: "Vue.js", level: 85 },
        { name: "Tailwind CSS", level: 90 },
      ],
    },
    {
      title: "アニメーション",
      icon: <Zap className="h-8 w-8" />,
      skills: [
        { name: "GSAP", level: 90 },
        { name: "Framer Motion", level: 95 },
        { name: "CSS Animations", level: 90 },
        { name: "Lottie", level: 85 },
        { name: "Motion Graphics", level: 80 },
      ],
    },
    {
      title: "3D開発",
      icon: <Layers className="h-8 w-8" />,
      skills: [
        { name: "Three.js", level: 85 },
        { name: "React Three Fiber", level: 85 },
        { name: "WebGL", level: 80 },
        { name: "3D Modeling (Blender)", level: 75 },
        { name: "Shader Programming", level: 70 },
      ],
    },
    {
      title: "UI/UXデザイン",
      icon: <Figma className="h-8 w-8" />,
      skills: [
        { name: "Figma", level: 90 },
        { name: "Adobe XD", level: 85 },
        { name: "Prototyping", level: 90 },
        { name: "Wireframing", level: 85 },
        { name: "User Testing", level: 80 },
      ],
    },
    {
      title: "パフォーマンス最適化",
      icon: <Cpu className="h-8 w-8" />,
      skills: [
        { name: "Lazy Loading", level: 90 },
        { name: "Code Splitting", level: 85 },
        { name: "Bundle Optimization", level: 85 },
        { name: "Image Optimization", level: 90 },
        { name: "Performance Metrics", level: 85 },
      ],
    },
    {
      title: "その他のスキル",
      icon: <Globe className="h-8 w-8" />,
      skills: [
        { name: "Git/GitHub", level: 90 },
        { name: "Responsive Design", level: 95 },
        { name: "Accessibility (a11y)", level: 85 },
        { name: "SEO", level: 80 },
        { name: "Testing (Jest, Cypress)", level: 80 },
      ],
    },
  ]

  const technologies = [
    { name: "React", icon: <Code /> },
    { name: "Next.js", icon: <Monitor /> },
    { name: "TypeScript", icon: <Code /> },
    { name: "Three.js", icon: <Layers /> },
    { name: "GSAP", icon: <Zap /> },
    { name: "Framer Motion", icon: <Zap /> },
    { name: "Tailwind CSS", icon: <Palette /> },
    { name: "Node.js", icon: <Database /> },
    { name: "Git", icon: <GitBranch /> },
    { name: "Figma", icon: <Figma /> },
    { name: "WebGL", icon: <Layers /> },
    { name: "D3.js", icon: <BarChart /> },
    { name: "Responsive Design", icon: <Smartphone /> },
  ]

  return (
    <main className="flex min-h-screen flex-col bg-zinc-900 pt-24 pb-16">
      <GameControls score={score} setScore={setScore} />

      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-5xl"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 text-3xl font-bold tracking-tight text-white md:text-5xl"
          >
            スキル & 技術
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
            className="mb-16 text-lg text-zinc-300 max-w-3xl"
          >
            最新のフロントエンド技術とクリエイティブなアニメーションを駆使して、印象的なウェブ体験を創造することに情熱を持っています。
            以下は私が専門とする技術とスキルの一覧です。
          </motion.p>

          <div className="grid gap-16">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
                onClick={() => setScore((prev) => prev + 5)}
              >
                <div className="flex items-center mb-8">
                  <div className="mr-4 text-cyan-400">{category.icon}</div>
                  <h2 className="text-2xl font-bold text-white">{category.title}</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * skillIndex }}
                      viewport={{ once: true }}
                      className="mb-2"
                    >
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium text-white">{skill.name}</h3>
                        <span className="text-sm text-zinc-400">{skill.level}%</span>
                      </div>
                      <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          viewport={{ once: true }}
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-24"
          >
            <h2 className="text-2xl font-bold text-white mb-8 text-center">使用技術</h2>

            <div className="flex flex-wrap justify-center gap-4">
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: 0.05 * index }}
                  className="bg-zinc-800 px-6 py-4 flex items-center space-x-2 shadow-md"
                  onClick={() => setScore((prev) => prev + 2)}
                >
                  <span className="text-cyan-400">{tech.icon}</span>
                  <span className="font-medium text-zinc-300">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
