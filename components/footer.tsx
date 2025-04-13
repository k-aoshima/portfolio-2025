"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Github, Twitter, Linkedin, Mail, Keyboard, Globe, Code, Heart } from "lucide-react"

export default function Footer() {
  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: "https://github.com", label: "GitHub" },
    { icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com", label: "Twitter" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: <Mail className="h-5 w-5" />, href: "mailto:contact@example.com", label: "Email" },
  ]

  return (
    <footer className="mt-auto bg-zinc-900 py-12 text-white border-t border-zinc-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="col-span-2"
          >
            <Link href="/" className="text-2xl font-bold font-mono flex items-center">
              <Keyboard className="mr-2 h-6 w-6 text-cyan-400" />
              <span>KEYBOARD DEV</span>
            </Link>
            <p className="mt-4 text-zinc-300 max-w-md font-mono">
              キーボード愛好家であり、開発者。メカニカルキーボードのカスタマイズとプログラミングの両方に情熱を注いでいます。
              タイピングの心地よさとコーディングの美しさを追求しています。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 font-mono flex items-center">
              <Globe className="mr-2 h-5 w-5 text-cyan-400" />
              NAVIGATION
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/works" className="text-zinc-300 hover:text-white transition-colors flex items-center">
                  <span className="font-mono">PROJECTS</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-zinc-300 hover:text-white transition-colors flex items-center">
                  <span className="font-mono">ABOUT</span>
                </Link>
              </li>
              <li>
                <Link href="/skills" className="text-zinc-300 hover:text-white transition-colors flex items-center">
                  <span className="font-mono">SKILLS</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-zinc-300 hover:text-white transition-colors flex items-center">
                  <span className="font-mono">CONTACT</span>
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 font-mono flex items-center">
              <Code className="mr-2 h-5 w-5 text-cyan-400" />
              CONNECT
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-zinc-800 p-3 rounded-lg text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors flex items-center"
                  whileHover={{ y: -5 }}
                  aria-label={link.label}
                >
                  {link.icon}
                  <span className="font-mono text-sm ml-2">{link.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 pt-6 border-t border-zinc-800 text-center text-sm text-zinc-400 font-mono"
        >
          <div className="flex items-center justify-center">
            <span>Made with</span>
            <Heart className="h-4 w-4 mx-1 text-pink-500" />
            <span>and</span>
            <Keyboard className="h-4 w-4 mx-1 text-cyan-500" />
            <span>by あなたの名前 &copy; {new Date().getFullYear()}</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
