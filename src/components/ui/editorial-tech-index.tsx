"use client";

import { ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useState } from "react";

const techFeatures = [
  {
    number: "01",
    title: "TELEGRAM ECOSYSTEM",
    subtitle: "Telegram Mini Apps & Боты любой сложности",
    description: "Высококонверсионные веб-приложения внутри Telegram и сложные боты (Aiogram) с мгновенным откликом, нативной логикой и интеграцией платежей.",
  },
  {
    number: "02",
    title: "AI АГЕНТЫ & ИНТЕГРАЦИИ",
    subtitle: "Умные системы и нейросетевые агенты",
    description: "Кастомные LLM-решения, RAG-пайплайны, автоответчики и AI-агенты, которые берут на себя рутину и автоматизируют работу с клиентами.",
  },
  {
    number: "03",
    title: "ВЕБ-РАЗРАБОТКА & ЛЕНДИНГИ",
    subtitle: "Современные сайты и Next.js приложения",
    description: "Быстрые одностраничники, промо-сайты, лендинги и веб-сервисы. Адаптивная верстка, премиальный дизайн и высокая скорость загрузки.",
  },
  {
    number: "04",
    title: "ИНФРАСТРУКТУРА & БЭКЕНД",
    subtitle: "FastAPI, PostgreSQL и 24/7 Аптайм",
    description: "Надежная серверная логика, чистый API, контейнеризация в Docker, деплой на VPS и постоянный мониторинг стабильности.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export function EditorialTechIndex() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full max-w-5xl mx-auto py-8 sm:py-12">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-neutral-800 rounded-xl overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {techFeatures.map((feature, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`
              relative p-5 sm:p-6 transition-all duration-300
              ${index === 0 || index === 2 ? "sm:border-r border-neutral-800" : ""}
              ${index < 2 ? "border-b border-neutral-800" : ""}
              bg-concrete
              ${hoveredIndex === index ? "shadow-[0_0_20px_rgba(161,255,98,0.3)]" : ""}
            `}
            style={{
              borderColor: hoveredIndex === index ? "#a1ff62" : undefined,
            }}
          >
            {/* Green pulse badge */}
            {hoveredIndex === index && (
              <motion.div
                className="absolute top-3 right-3"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-volt-lime opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-volt-lime"></span>
                </span>
              </motion.div>
            )}

            {/* Number */}
            <div className="font-mono text-[10px] text-steel mb-2 tracking-wider">
              {feature.number}
            </div>

            {/* Title */}
            <h3 className="font-bold text-lg sm:text-xl leading-tight tracking-tight text-ink mb-1.5">
              {feature.title}
            </h3>

            {/* Subtitle */}
            <h4 className="text-sm font-medium text-graphite mb-3 tracking-tight">
              {feature.subtitle}
            </h4>

            {/* Description */}
            <p className="text-xs sm:text-sm leading-relaxed text-graphite tracking-tight mb-4">
              {feature.description}
            </p>

            {/* Hover CTA */}
            <motion.div
              className="inline-flex items-center gap-2"
              initial={{ opacity: 0.3 }}
              animate={{
                opacity: hoveredIndex === index ? 1 : 0.3,
                x: hoveredIndex === index ? 4 : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              <span className="font-mono text-[10px] text-ink tracking-wider font-bold">
                ПОДРОБНЕЕ
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-volt-lime" />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
