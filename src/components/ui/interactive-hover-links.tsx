"use client";

import { useMotionValue, motion, useSpring, useTransform, AnimatePresence } from "framer-motion";
import React, { useRef, useState } from "react";
import { ArrowRight, X } from "lucide-react";

interface InteractiveHoverLinksProps {
  links?: typeof INTERACTIVE_LINKS;
}

export function InteractiveHoverLinks({
  links = INTERACTIVE_LINKS,
}: InteractiveHoverLinksProps) {
  const [selectedLink, setSelectedLink] = useState<typeof INTERACTIVE_LINKS[0] | null>(null);

  return (
    <section className="bg-background px-4 py-12 sm:p-8 md:px-8 md:py-16 w-full">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-[10px] sm:text-xs font-mono tracking-widest text-volt-lime uppercase">
            [ НАШ ПОДХОД ]
          </h2>
          <h3 className="text-xl sm:text-2xl md:text-4xl font-bold uppercase mt-2 text-foreground tracking-tight">
            От идеи до релиза
          </h3>
        </div>
        {links.map((link, _index) => (
          <Link key={link.heading} {...link} onClick={() => setSelectedLink(link)} />
        ))}
      </div>

      <AnimatePresence>
        {selectedLink && (
          <Modal link={selectedLink} onClose={() => setSelectedLink(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

interface LinkProps {
  heading: string;
  imgSrc: string;
  subheading: string;
  href: string;
  onClick: () => void;
}

function Link({ heading, imgSrc, subheading, href, onClick }: LinkProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "40%"]);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const rect = ref.current!.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      onClick={onClick}
      initial="initial"
      whileHover="whileHover"
      className="group relative flex items-start sm:items-center justify-between border-b border-neutral-800 py-4 sm:py-6 md:py-8 transition-colors duration-500 hover:border-volt-lime gap-3 sm:gap-4 cursor-pointer"
    >
      <div className="flex-1 min-w-0">
        <motion.span
          variants={{
            initial: { x: 0 },
            whileHover: { x: -16 },
          }}
          transition={{
            type: "spring",
            staggerChildren: 0.075,
            delayChildren: 0.25,
          }}
          className="relative z-10 block text-base sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold uppercase text-neutral-400 transition-colors duration-500 group-hover:text-volt-lime leading-tight tracking-tight"
        >
          {heading.split("").map((l, i) => (
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: 16 },
              }}
              transition={{ type: "spring" }}
              className="inline-block"
              key={i}
            >
              {l === " " ? " " : l}
            </motion.span>
          ))}
        </motion.span>
        <span className="relative z-10 mt-1.5 sm:mt-2 block text-xs sm:text-sm text-neutral-500 transition-colors duration-500 group-hover:text-foreground max-w-xl font-mono leading-relaxed">
          {subheading}
        </span>
      </div>

      <div className="overflow-hidden shrink-0">
        <motion.div
          variants={{
            initial: {
              x: "100%",
              opacity: 0,
            },
            whileHover: {
              x: "0%",
              opacity: 1,
            },
          }}
          transition={{ type: "spring" }}
          className="relative z-10 p-4"
        >
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-volt-lime" />
        </motion.div>
      </div>
    </motion.div>
  );
}

interface ModalProps {
  link: typeof INTERACTIVE_LINKS[0];
  onClose: () => void;
}

function Modal({ link, onClose }: ModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-ink/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-concrete border-2 border-volt-lime rounded-sharp-md p-6 sm:p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-ash-gray rounded-pill transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4">
          <span className="font-mono text-[10px] tracking-widest text-volt-lime uppercase">
            [ ДЕТАЛИ ПРОЦЕССА ]
          </span>
        </div>

        <h3 className="font-bold text-2xl sm:text-3xl tracking-tight mb-4 pr-8">
          {link.heading}
        </h3>

        <p className="text-graphite text-sm sm:text-base leading-relaxed mb-6">
          {link.subheading}
        </p>

        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-volt-lime rounded-full"></span>
              Что мы делаем
            </h4>
            <ul className="space-y-2 text-sm text-graphite leading-relaxed ml-4">
              {link.details.tasks.map((task, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-volt-lime mt-1">→</span>
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-volt-lime rounded-full"></span>
              Взаимодействие с клиентом
            </h4>
            <ul className="space-y-2 text-sm text-graphite leading-relaxed ml-4">
              {link.details.interaction.map((item, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-volt-lime mt-1">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-ink/10">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-graphite">Длительность</span>
              <span className="font-mono text-sm font-bold">{link.details.duration}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export const INTERACTIVE_LINKS = [
  {
    heading: "Шаг 01: Аналитика & Архитектура",
    subheading: "Погружаемся в бизнес-логику. Проектируем структуру базы данных (PostgreSQL) и выбираем оптимальный стек под ваши задачи.",
    imgSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    href: "#",
    details: {
      tasks: [
        "Проводим бизнес-интервью и выявляем ключевые требования к проекту",
        "Анализируем конкурентов и лучшие практики в вашей нише",
        "Проектируем архитектуру системы и выбираем технологический стек",
        "Разрабатываем структуру базы данных с учетом масштабирования",
        "Создаем техническое задание и roadmap проекта"
      ],
      interaction: [
        "Проводим 2-3 встречи для глубокого погружения в задачу",
        "Отправляем вам детальную схему архитектуры на согласование",
        "Согласовываем технологический стек и инструменты",
        "Предоставляем доступ к общему рабочему пространству (Notion/Miro)"
      ],
      duration: "3-5 дней"
    }
  },
  {
    heading: "Шаг 02: Бэкенд & AI-логика",
    subheading: "Разрабатываем высоконагруженные API на FastAPI. Внедряем LLM-модели и AI-агентов для автоматизации рутины.",
    imgSrc: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop",
    href: "#",
    details: {
      tasks: [
        "Разрабатываем REST API на FastAPI с полной документацией",
        "Настраиваем PostgreSQL с оптимизированными индексами",
        "Интегрируем AI-модели (GPT, Claude, Gemini) под ваши задачи",
        "Реализуем систему аутентификации и авторизации",
        "Подключаем Redis для кэширования и очередей задач"
      ],
      interaction: [
        "Еженедельные демо работающего API в Postman/Swagger",
        "Предоставляем доступ к тестовому серверу для проверки",
        "Собираем обратную связь и корректируем логику",
        "Документируем все эндпоинты и бизнес-логику"
      ],
      duration: "1-3 недели"
    }
  },
  {
    heading: "Шаг 03: Фронтенд & Telegram",
    subheading: "Верстаем молниеносные интерфейсы на Next.js и собираем нативные Telegram Mini Apps с конверсионным дизайном.",
    imgSrc: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=1974&auto=format&fit=crop",
    href: "#",
    details: {
      tasks: [
        "Создаем адаптивный UI на Next.js с TypeScript",
        "Разрабатываем Telegram Mini App с нативным дизайном",
        "Настраиваем Telegram Bot с webhooks и платежами",
        "Оптимизируем производительность и скорость загрузки",
        "Тестируем на всех устройствах и браузерах"
      ],
      interaction: [
        "Отправляем прототипы в Figma на согласование дизайна",
        "Предоставляем тестовую версию бота для проверки",
        "Собираем фидбек и вносим корректировки UI/UX",
        "Проводим финальную приемку функционала"
      ],
      duration: "1-2 недели"
    }
  },
  {
    heading: "Шаг 04: Деплой & Мониторинг",
    subheading: "Контейнеризуем проект в Docker, разворачиваем на VPS серверах и обеспечиваем бесперебойную работу 24/7.",
    imgSrc: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
    href: "#",
    details: {
      tasks: [
        "Контейнеризуем весь проект в Docker для легкого развертывания",
        "Настраиваем CI/CD pipeline для автоматических обновлений",
        "Разворачиваем на VPS с настройкой Nginx и SSL-сертификатов",
        "Подключаем мониторинг (Grafana, Sentry) и логирование",
        "Настраиваем автоматические бэкапы базы данных"
      ],
      interaction: [
        "Передаем доступы к серверу и репозиторию",
        "Проводим обучение по обновлению и поддержке проекта",
        "Предоставляем документацию по развертыванию",
        "Остаемся на связи для технической поддержки 24/7"
      ],
      duration: "2-3 дня"
    }
  },
];
