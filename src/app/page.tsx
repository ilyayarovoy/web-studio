'use client'

import { Menu, ArrowRight, Zap, Bot, Wrench, MessageSquare, Sparkles, X, Sun, Moon } from 'lucide-react'
import { InteractiveHoverLinks } from '@/components/ui/interactive-hover-links'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check localStorage for saved theme
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    if (!isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Floating Navigation */}
      <nav className="fixed top-2 sm:top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1rem)] sm:w-[95%] max-w-6xl">
        <div className="bg-concrete border border-ink rounded-pill px-3 sm:px-6 py-2 sm:py-3 flex items-center justify-between gap-2">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-1 sm:p-2 hover:opacity-70 transition-opacity shrink-0"
          >
            <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <div className="font-display font-bold text-sm sm:text-lg tracking-tighter whitespace-nowrap">НЕЙРОЦЕХ</div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-1 sm:p-2 hover:opacity-70 transition-opacity shrink-0"
              aria-label="Переключить тему"
            >
              {isDark ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
            <a
              href="https://t.me/avarde808"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-volt-lime text-ink px-3 sm:px-6 py-1.5 sm:py-2 rounded-pill font-medium text-xs sm:text-sm tracking-tight hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
            >
              <span className="hidden sm:inline">Запустить проект</span>
              <span className="sm:hidden">Запустить</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-ink/95 backdrop-blur-md z-[100] flex items-center justify-center p-4"
            onClick={() => setIsMenuOpen(false)}
          >
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 sm:top-8 sm:right-8 p-2 hover:bg-concrete/20 rounded-pill transition-colors"
            >
              <X className="w-6 h-6 sm:w-8 sm:h-8 text-concrete" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ delay: 0.1 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full"
            >
              <nav className="space-y-2 sm:space-y-4">
                {[
                  { label: 'Услуги', href: '#services' },
                  { label: 'Наш подход', href: '#approach' },
                  { label: 'Кейсы', href: '#cases' },
                  { label: 'Контакты', href: '#contacts' },
                ].map((item, idx) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + idx * 0.1 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="block group"
                  >
                    <div className="text-concrete hover:text-volt-lime font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-ultra-tight transition-colors">
                      {item.label}
                    </div>
                  </motion.a>
                ))}
              </nav>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 sm:mt-16 pt-8 border-t border-concrete/20"
              >
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-steel font-mono text-xs sm:text-sm">
                  <a href="mailto:ponomorevilya@gmail.com" className="hover:text-volt-lime transition-colors">
                    ponomorevilya@gmail.com
                  </a>
                  <a href="https://t.me/avarde808" className="hover:text-volt-lime transition-colors">
                    Telegram
                  </a>
                  <a href="https://github.com/ilyayarovoy" className="hover:text-volt-lime transition-colors">
                    GitHub
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Marquee Strip */}
      <div className="fixed top-14 sm:top-20 left-0 right-0 z-40 bg-volt-lime overflow-hidden">
        <div className="flex whitespace-nowrap">
          <div className="marquee inline-flex py-1.5 sm:py-2 font-mono text-[10px] sm:text-xs font-bold text-ink tracking-wider">
            <span className="px-4 sm:px-8">СОБИРАЕМ АВТОМАТИЗАЦИЮ КАК НА КОНВЕЙЕРЕ ✱ ОТ ИДЕИ ДО ПРОДАКШЕНА ✱</span>
            <span className="px-4 sm:px-8">СОБИРАЕМ АВТОМАТИЗАЦИЮ КАК НА КОНВЕЙЕРЕ ✱ ОТ ИДЕИ ДО ПРОДАКШЕНА ✱</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-28 sm:pt-40 pb-8 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display font-black text-[9vw] sm:text-[7vw] md:text-[6vw] lg:text-[5.5vw] xl:text-[7rem] leading-[1.1] sm:leading-[1.05] tracking-[-0.03em] sm:tracking-[-0.05em] mb-6 sm:mb-8 text-center max-w-5xl mx-auto">
            РАЗРАБОТКА.<br />
            АВТОМАТИЗАЦИЯ.<br />
            ИСКУССТВЕННЫЙ ИНТЕЛЛЕКТ.
          </h1>

          <p className="text-graphite text-base sm:text-lg md:text-xl tracking-tight max-w-3xl mb-8 sm:mb-12 leading-relaxed mx-auto text-center px-4">
            Собираем умные продукты на стыке веба, Telegram и AI. От концепции до запуска.
          </p>
        </div>
      </section>

      {/* Interactive Process Links */}
      <InteractiveHoverLinks />

      {/* Services Grid */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 bg-ash-gray">
        <div className="max-w-7xl mx-auto">
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 bg-ash-gray">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-ultra-tight mb-8 sm:mb-16">
            УСЛУГИ
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Service 1 */}
            <div className="bg-concrete border border-ink rounded-sharp-md p-6 sm:p-8 hover:-translate-y-1 transition-transform flex flex-col">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-volt-lime rounded-pill flex items-center justify-center mb-4 sm:mb-6 shrink-0">
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-ink" />
              </div>
              <h3 className="font-bold text-lg sm:text-xl md:text-2xl tracking-tight mb-3 sm:mb-4">Telegram Mini Apps и боты</h3>
              <p className="text-graphite text-sm tracking-tight mb-4 sm:mb-6 leading-relaxed">
                Полнофункциональные приложения внутри Telegram. Магазины, бронирования, игры и сервисы — без App Store. Aiogram, нативный UI, платежи, вебхуки.
              </p>
              <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                <span className="font-mono text-[10px] bg-volt-lime text-[#201d1d] px-2 sm:px-3 py-1 rounded-pill whitespace-nowrap font-bold">[AIOGRAM]</span>
                <span className="font-mono text-[10px] bg-volt-lime text-[#201d1d] px-2 sm:px-3 py-1 rounded-pill whitespace-nowrap font-bold">[TELEGRAM API]</span>
                <span className="font-mono text-[10px] bg-volt-lime text-[#201d1d] px-2 sm:px-3 py-1 rounded-pill whitespace-nowrap font-bold">[WEBHOOKS]</span>
                <span className="font-mono text-[10px] bg-volt-lime text-[#201d1d] px-2 sm:px-3 py-1 rounded-pill whitespace-nowrap font-bold">[MINI APPS]</span>
              </div>
              <div className="mt-auto pt-4 border-t border-ink/10">
                <span className="font-mono text-[11px] sm:text-[12px] tracking-wider bg-volt-lime text-[#201d1d] px-3 sm:px-4 py-1.5 sm:py-2 rounded-pill inline-block font-bold">
                  20 000 - 120 000 ₽
                </span>
              </div>
            </div>

            {/* Service 2 */}
            <div className="bg-concrete border border-ink rounded-sharp-md p-6 sm:p-8 hover:-translate-y-1 transition-transform flex flex-col">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-volt-lime rounded-pill flex items-center justify-center mb-4 sm:mb-6 shrink-0">
                <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-ink" />
              </div>
              <h3 className="font-bold text-lg sm:text-xl md:text-2xl tracking-tight mb-3 sm:mb-4">AI-агенты и LLM-интеграции</h3>
              <p className="text-graphite text-sm tracking-tight mb-4 sm:mb-6 leading-relaxed">
                Умные чат-боты, автоматизация поддержки, RAG-системы для работы с документами. Интеграция GPT, Claude, Gemini под ваши задачи.
              </p>
              <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                <span className="font-mono text-[10px] bg-volt-lime text-[#201d1d] px-2 sm:px-3 py-1 rounded-pill whitespace-nowrap font-bold">[OPENAI]</span>
                <span className="font-mono text-[10px] bg-volt-lime text-[#201d1d] px-2 sm:px-3 py-1 rounded-pill whitespace-nowrap font-bold">[CLAUDE API]</span>
                <span className="font-mono text-[10px] bg-volt-lime text-[#201d1d] px-2 sm:px-3 py-1 rounded-pill whitespace-nowrap font-bold">[GEMINI]</span>
                <span className="font-mono text-[10px] bg-volt-lime text-[#201d1d] px-2 sm:px-3 py-1 rounded-pill whitespace-nowrap font-bold">[RAG]</span>
              </div>
              <div className="mt-auto pt-4 border-t border-ink/10">
                <span className="font-mono text-[11px] sm:text-[12px] tracking-wider bg-volt-lime text-[#201d1d] px-3 sm:px-4 py-1.5 sm:py-2 rounded-pill inline-block font-bold">
                  5 000 - 80 000 ₽
                </span>
              </div>
            </div>

            {/* Service 3 */}
            <div className="bg-concrete border border-ink rounded-sharp-md p-6 sm:p-8 hover:-translate-y-1 transition-transform flex flex-col">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-volt-lime rounded-pill flex items-center justify-center mb-4 sm:mb-6 shrink-0">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-ink" />
              </div>
              <h3 className="font-bold text-lg sm:text-xl md:text-2xl tracking-tight mb-3 sm:mb-4">Бэкенд-системы и API</h3>
              <p className="text-graphite text-sm tracking-tight mb-4 sm:mb-6 leading-relaxed">
                Масштабируемые REST API, автоматизированные воркфлоу, интеграции с внешними сервисами. FastAPI, PostgreSQL, Redis, Docker. 24/7 аптайм.
              </p>
              <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                <span className="font-mono text-[10px] bg-volt-lime text-[#201d1d] px-2 sm:px-3 py-1 rounded-pill whitespace-nowrap font-bold">[FASTAPI]</span>
                <span className="font-mono text-[10px] bg-volt-lime text-[#201d1d] px-2 sm:px-3 py-1 rounded-pill whitespace-nowrap font-bold">[POSTGRES]</span>
                <span className="font-mono text-[10px] bg-volt-lime text-[#201d1d] px-2 sm:px-3 py-1 rounded-pill whitespace-nowrap font-bold">[REDIS]</span>
                <span className="font-mono text-[10px] bg-volt-lime text-[#201d1d] px-2 sm:px-3 py-1 rounded-pill whitespace-nowrap font-bold">[DOCKER]</span>
              </div>
              <div className="mt-auto pt-4 border-t border-ink/10">
                <span className="font-mono text-[11px] sm:text-[12px] tracking-wider bg-volt-lime text-[#201d1d] px-3 sm:px-4 py-1.5 sm:py-2 rounded-pill inline-block font-bold">
                  10 000 - 120 000 ₽
                </span>
              </div>
            </div>

            {/* Service 4 */}
            <div className="bg-[#151313] border border-[#312e2e] rounded-sharp-md p-6 sm:p-8 sm:col-span-2 lg:col-span-3 hover:-translate-y-1 transition-transform flex flex-col">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-volt-lime rounded-pill flex items-center justify-center mb-4 sm:mb-6 shrink-0">
                <Wrench className="w-5 h-5 sm:w-6 sm:h-6 text-[#201d1d]" />
              </div>
              <h3 className="text-[#f4f4f4] font-bold text-lg sm:text-xl md:text-2xl tracking-tight mb-3 sm:mb-4">Веб-разработка на Next.js</h3>
              <p className="text-[#8a8787] text-sm tracking-tight mb-4 sm:mb-6 leading-relaxed">
                Современные лендинги, корпоративные сайты и веб-приложения. React, TypeScript, адаптивный дизайн, быстрая загрузка, SEO из коробки.
              </p>
              <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                <span className="font-mono text-[10px] bg-volt-lime text-[#201d1d] px-2 sm:px-3 py-1 rounded-pill whitespace-nowrap font-bold">[NEXT.JS]</span>
                <span className="font-mono text-[10px] bg-volt-lime text-[#201d1d] px-2 sm:px-3 py-1 rounded-pill whitespace-nowrap font-bold">[REACT]</span>
                <span className="font-mono text-[10px] bg-volt-lime text-[#201d1d] px-2 sm:px-3 py-1 rounded-pill whitespace-nowrap font-bold">[TAILWIND]</span>
                <span className="font-mono text-[10px] bg-volt-lime text-[#201d1d] px-2 sm:px-3 py-1 rounded-pill whitespace-nowrap font-bold">[TYPESCRIPT]</span>
              </div>
              <div className="mt-auto pt-4 border-t border-[#8a8787]/20">
                <span className="font-mono text-[11px] sm:text-[12px] tracking-wider bg-volt-lime text-[#201d1d] px-3 sm:px-4 py-1.5 sm:py-2 rounded-pill inline-block font-bold">
                  5 000 - 60 000 ₽
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Testimonial/Case Study */}
      <section className="py-12 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-ultraviolet border-2 border-ink rounded-sharp-md p-6 sm:p-12 relative overflow-hidden">
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
              <span className="bg-volt-lime text-ink font-mono text-[9px] sm:text-[10px] font-bold px-2 sm:px-4 py-1 sm:py-2 rounded-pill">
                [ЖИВОЙ ПРОЕКТ]
              </span>
            </div>

            <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-volt-lime mb-4 sm:mb-6" />

            <h2 className="text-concrete font-display font-black text-2xl sm:text-4xl tracking-ultra-tight mb-4 sm:mb-6 max-w-2xl leading-tight">
              СОЗДАЛИ TELEGRAM MINI APP С 10K+ ПОЛЬЗОВАТЕЛЕЙ В ДЕНЬ ЗА 3 НЕДЕЛИ
            </h2>

            <p className="text-concrete/80 text-base sm:text-lg tracking-tight max-w-2xl mb-6 sm:mb-8 leading-relaxed">
              Полноценный e-commerce внутри Telegram с обработкой платежей, управлением складом
              и отслеживанием заказов в реальном времени. Без трений с app store.
            </p>

            <a
              href="https://t.me/avarde808"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-volt-lime text-ink px-6 sm:px-8 py-2.5 sm:py-3 rounded-pill font-bold text-xs sm:text-sm tracking-tight hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            >
              Смотреть кейс
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>

            {/* Editorial Annotation */}
            <div className="hidden sm:block absolute bottom-8 right-12 font-['Caveat',_cursive] text-vermillion text-2xl rotate-[-5deg]">
              Создано для скорости →
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 bg-ink">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-concrete font-display font-black text-3xl sm:text-5xl tracking-ultra-tight mb-6 sm:mb-8 leading-tight">
            ДАВАЙТЕ СОЗДАДИМ<br />ЧТО-ТО ВМЕСТЕ
          </h2>

          <p className="text-steel text-base sm:text-lg tracking-tight mb-8 sm:mb-12">
            Расскажите нам о своём проекте, и мы ответим в течение 24 часов.
          </p>

          <a
            href="https://t.me/avarde808"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-volt-lime text-ink px-8 sm:px-12 py-3 sm:py-4 rounded-pill font-bold text-sm sm:text-base tracking-tight hover:opacity-90 transition-opacity inline-flex items-center gap-2 sm:gap-3"
          >
            Запустить проект
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>

          <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-graphite/30 flex flex-col sm:flex-row justify-center gap-3 sm:gap-8 text-steel font-mono text-xs">
            <span>© 2026 НЕЙРОЦЕХ</span>
            <span className="hidden sm:inline">•</span>
            <span>ponomorevilya@gmail.com</span>
          </div>
        </div>
      </section>
    </main>
  )
}
