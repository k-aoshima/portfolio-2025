"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Github, Twitter, Linkedin, Mail, Send, CheckCircle } from "lucide-react"
import GameControls from "@/components/game-controls"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const formRef = useRef<HTMLFormElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // フォーム送信のシミュレーション
    setTimeout(() => {
      console.log(formData)
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ name: "", email: "", subject: "", message: "" })
      setScore((prev) => prev + 100) // フォーム送信でスコア加算

      // 成功メッセージを3秒後に非表示
      setTimeout(() => {
        setIsSubmitted(false)
      }, 3000)
    }, 1500)
  }

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: "https://github.com", label: "GitHub" },
    { icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com", label: "Twitter" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: <Mail className="h-5 w-5" />, href: "mailto:contact@example.com", label: "Email" },
  ]

  return (
    <main className="flex min-h-screen flex-col bg-zinc-900 pt-24 pb-16">
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
            お問い合わせ
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "4rem" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-0.5 bg-cyan-500 mb-12"
          />

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4">お気軽にご連絡ください</h2>
              <p className="text-zinc-300 mb-8">
                プロジェクトのご相談やお問い合わせは、以下のフォームまたはSNSからお気軽にご連絡ください。
                通常、24時間以内にご返信いたします。
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">連絡先</h3>
                  <p className="text-zinc-300">contact@example.com</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">所在地</h3>
                  <p className="text-zinc-300">東京都渋谷区</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">SNS</h3>
                  <div className="flex space-x-4">
                    {socialLinks.map((link, index) => (
                      <motion.a
                        key={index}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-zinc-800 p-3 rounded-full text-cyan-400 hover:bg-zinc-700 transition-colors shadow-md"
                        whileHover={{ y: -5 }}
                        aria-label={link.label}
                        onClick={() => setScore((prev) => prev + 10)}
                      >
                        {link.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="relative"
            >
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-zinc-900/80 backdrop-blur-sm z-10"
                >
                  <div className="text-center">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">送信完了</h3>
                    <p className="text-zinc-300">
                      お問い合わせありがとうございます。
                      <br />
                      できるだけ早くご返信いたします。
                    </p>
                  </div>
                </motion.div>
              )}

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 bg-zinc-800 p-8 shadow-lg">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    お名前
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border-zinc-700 focus:border-cyan-500 focus:ring-cyan-500 bg-zinc-900 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    メールアドレス
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border-zinc-700 focus:border-cyan-500 focus:ring-cyan-500 bg-zinc-900 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-white">
                    件名
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="border-zinc-700 focus:border-cyan-500 focus:ring-cyan-500 bg-zinc-900 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white">
                    メッセージ
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="border-zinc-700 focus:border-cyan-500 focus:ring-cyan-500 bg-zinc-900 text-white"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-none bg-cyan-600 hover:bg-cyan-700 py-6 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {isSubmitting ? "送信中..." : "送信する"}
                    <Send className="ml-2 h-4 w-4" />
                  </span>
                  <motion.span
                    className="absolute inset-0 bg-cyan-700"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                </Button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
