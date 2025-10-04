```jsx
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Confetti from 'react-confetti'

export default function App() {
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)
  const [showConfetti, setShowConfetti] = useState(false)
  const [reveal, setReveal] = useState(false)

  useEffect(() => {
    function onResize() {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setReveal(true), 800)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 overflow-hidden">
      {showConfetti && <Confetti width={width} height={height} />}

      <div className="max-w-3xl mx-auto p-8 rounded-3xl backdrop-blur-md bg-white/60 shadow-2xl border border-white/30">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center gap-6"
        >
          <div className="w-56 h-56 rounded-2xl flex items-center justify-center relative">
            <motion.div
              className="absolute inset-0"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
            >
              <svg viewBox="0 0 120 120" className="w-full h-full">
                <defs>
                  <linearGradient id="g1" x1="0" x2="1">
                    <stop offset="0%" stopColor="#ff9a9e" />
                    <stop offset="100%" stopColor="#fad0c4" />
                  </linearGradient>
                </defs>
                <circle cx="60" cy="60" r="54" stroke="url(#g1)" strokeWidth="6" fill="transparent" strokeLinecap="round" strokeDasharray="10 8" />
              </svg>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="relative z-10 w-40 h-40 rounded-xl bg-gradient-to-br from-pink-300 to-red-400 flex items-center justify-center shadow-lg"
            >
              <Heart />
            </motion.div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900"
            >
              Для самой любимой ❤️
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-4 text-lg text-gray-700 leading-relaxed"
            >
              {reveal ? (
                <span>Ты — моё вдохновение. Спасибо, что ты есть рядом.</span>
              ) : (
                <TypingText text="Ты — моё вдохновение. Спасибо, что ты есть рядом." />
              )}
            </motion.p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <button
                onClick={() => { setShowConfetti(true); setTimeout(() => setShowConfetti(false), 6000) }}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-md hover:scale-105 transition-transform"
              >
                Запустить конфетти
              </button>

              <a href="#surprise" onClick={() => setReveal(true)} className="px-6 py-3 rounded-full border border-pink-200 font-medium hover:bg-pink-50 transition">
                Открыть сюрприз
              </a>
            </div>

            <motion.div id="surprise" initial={{ opacity: 0 }} animate={{ opacity: reveal ? 1 : 0 }} transition={{ delay: 0.6 }} className="mt-6">
              {reveal && (
                <div className="p-4 rounded-xl bg-white/80 border border-white/30 shadow-inner">
                  <p className="text-sm text-gray-600">Подарок внутри — ты можешь вставить фото, Lottie-анимацию или ссылку на плейлист.</p>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>

        <FloatingPetals />
      </div>

      <footer className="absolute bottom-6 text-xs text-gray-600">Сделано с ❤️</footer>
    </div>
  )
}

function Heart() {
  return (
    <svg viewBox="0 0 24 24" className="w-20 h-20">
      <path fill="white" d="M12 21s-7.5-4.8-10-8.1C-0.3 7.7 4.1 2 8.8 4.2 10.5 5 12 6.4 12 6.4s1.5-1.4 3.2-2.2C19.9 2 24.3 7.7 22 12.9 19.5 16.2 12 21 12 21z" />
    </svg>
  )
}

function TypingText({ text }) {
  const [shown, setShown] = useState('')
  useEffect(() => {
    let i = 0
    const t = setInterval(() => {
      setShown(prev => prev + text[i])
      i++
      if (i >= text.length) clearInterval(t)
    }, 40)
    return () => clearInterval(t)
  }, [text])
  return <span>{shown}</span>
}

function FloatingPetals() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -40 - i * 20, x: Math.random() * 500 - 250, opacity: 0 }}
          animate={{ y: 600 + Math.random() * 200, opacity: [0, 1, 0.6, 0] }}
          transition={{ delay: i * 0.6, duration: 8 + Math.random() * 4, repeat: Infinity }}
          className="absolute w-6 h-6 bg-pink-300 rounded-full blur-sm"
          style={{ left: `${10 + i * 12}%`, transform: `rotate(${i * 45}deg)` }}
        />
      ))}
    </div>
  )
}
```
