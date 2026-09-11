"use client";

import { motion, Variants } from "framer-motion";
import { useState } from "react";
import { Database, Cpu, Smartphone, Rocket } from "lucide-react";

const processSteps = [
  {
    number: "01",
    title: "АНАЛИТИКА & АРХИТЕКТУРА",
    description: "Погружаемся в бизнес-логику. Проектируем структуру базы данных (PostgreSQL) и выбираем оптимальный стек под ваши задачи.",
    icon: Database,
  },
  {
    number: "02",
    title: "БЭКЕНД & AI-ЛОГИКА",
    description: "Разрабатываем высоконагруженные API на FastAPI. Внедряем LLM-модели и AI-агентов для автоматизации рутины.",
    icon: Cpu,
  },
  {
    number: "03",
    title: "ФРОНТЕНД & TELEGRAM",
    description: "Верстаем молниеносные интерфейсы на Next.js и собираем нативные Telegram Mini Apps с конверсионным дизайном.",
    icon: Smartphone,
  },
  {
    number: "04",
    title: "ДЕПЛОЙ & МОНИТОРИНГ",
    description: "Контейнеризуем проект в Docker, разворачиваем на VPS серверах и обеспечиваем бесперебойную работу 24/7.",
    icon: Rocket,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export function WorkProcess() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full max-w-6xl mx-auto py-8 sm:py-12">
      {/* Section Header */}
      <div className="mb-8 sm:mb-12">
        <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl tracking-ultra-tight mb-3">
          НАШ ПОДХОД: ОТ ИДЕИ ДО РЕЛИЗА
        </h2>
        <p className="text-graphite text-sm sm:text-base tracking-tight">
          Производственный конвейер НейроЦеха — от концепции до продакшена
        </p>
      </div>

      {/* Process Grid with Connection Lines */}
      <motion.div
        className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Connection Lines - Desktop Only */}
        <div className="hidden sm:block absolute inset-0 pointer-events-none">
          {/* Horizontal line between 01 and 02 */}
          <motion.div
            className="absolute top-[calc(25%-0.5px)] left-[50%] w-6 h-0.5 bg-gradient-to-r from-volt-lime/60 to-volt-lime/20"
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            viewport={{ once: true }}
          />

          {/* Vertical line on the right between 02 and 04 */}
          <motion.div
            className="absolute top-[25%] right-[calc(50%-12px)] w-0.5 h-[25%] bg-gradient-to-b from-volt-lime/20 to-volt-lime/60"
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ delay: 0.9, duration: 0.4 }}
            viewport={{ once: true }}
          />

          {/* Horizontal line between 03 and 04 */}
          <motion.div
            className="absolute top-[calc(75%-0.5px)] left-[50%] w-6 h-0.5 bg-gradient-to-r from-volt-lime/60 to-volt-lime/20"
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 1.3, duration: 0.4 }}
            viewport={{ once: true }}
          />

          {/* Vertical line on the left between 01 and 03 */}
          <motion.div
            className="absolute top-[25%] left-[calc(50%-12px)] w-0.5 h-[25%] bg-gradient-to-b from-volt-lime/20 to-volt-lime/60"
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ delay: 1.7, duration: 0.4 }}
            viewport={{ once: true }}
          />
        </div>

        {/* Mobile Connection Arrows */}
        <div className="sm:hidden absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 pointer-events-none">
          <motion.div
            className="w-full h-full bg-gradient-to-b from-volt-lime/40 via-volt-lime/60 to-volt-lime/40"
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ delay: 0.5, duration: 1.2 }}
            viewport={{ once: true }}
          />
        </div>

        {/* Process Cards */}
        {processSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={index}
              variants={cardVariants}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`
                relative bg-concrete border rounded-sharp-md p-6 transition-all duration-300
                ${hoveredIndex === index ? "border-volt-lime shadow-[0_0_20px_rgba(161,255,98,0.2)] -translate-y-1" : "border-ink"}
              `}
            >
              {/* Step Number Badge */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-volt-lime rounded-full flex items-center justify-center border-2 border-ink">
                <span className="font-mono text-xs font-black text-ink">
                  {step.number}
                </span>
              </div>

              {/* Icon */}
              <div className="mb-4">
                <Icon
                  className={`w-8 h-8 transition-colors duration-300 ${
                    hoveredIndex === index ? "text-volt-lime" : "text-graphite"
                  }`}
                />
              </div>

              {/* Title */}
              <h3 className="font-bold text-lg sm:text-xl leading-tight tracking-tight text-ink mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed text-graphite tracking-tight">
                {step.description}
              </p>

              {/* Progress Indicator on Hover */}
              {hoveredIndex === index && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-volt-lime rounded-b-sharp-md"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
