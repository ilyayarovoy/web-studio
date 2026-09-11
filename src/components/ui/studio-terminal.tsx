"use client";

import { useState, useEffect } from "react";

const tabs = [
  { id: 1, label: "01. TMA_SHOP.TSX", type: "tma" },
  { id: 2, label: "02. AI_AGENT.PY", type: "ai" },
  { id: 3, label: "03. PIPELINE.JSON", type: "automation" },
];

export function StudioTerminal() {
  const [activeTab, setActiveTab] = useState(1);
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  const aiResponse = `import anthropic

client = anthropic.Anthropic(api_key="...")

response = client.messages.create(
    model="claude-sonnet-4",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Помоги с заказом"}
    ]
)

# Результат: "Конечно! Что вы хотите заказать?"`;

  useEffect(() => {
    if (activeTab === 2) {
      let index = 0;
      setTypedText("");
      const interval = setInterval(() => {
        if (index < aiResponse.length) {
          setTypedText(aiResponse.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-obsidian border border-[#312e2e] rounded-[5px] overflow-hidden">
        {/* Terminal Header */}
        <div className="bg-[#1a1818] border-b border-[#312e2e] px-4 py-3 flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-vermillion"></div>
            <div className="w-3 h-3 rounded-full bg-[#f4bd4e]"></div>
            <div className="w-3 h-3 rounded-full bg-volt-lime"></div>
          </div>
          <div className="flex gap-1 ml-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`font-mono text-[11px] px-4 py-1.5 rounded-sharp transition-all ${
                  activeTab === tab.id
                    ? "bg-volt-lime text-ink font-bold"
                    : "text-steel hover:text-concrete"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Terminal Content */}
        <div className="p-6 min-h-[400px]">
          {activeTab === 1 && <TMAContent />}
          {activeTab === 2 && (
            <AIContent typedText={typedText} showCursor={showCursor} />
          )}
          {activeTab === 3 && <AutomationContent />}
        </div>
      </div>
    </div>
  );
}

function TMAContent() {
  const [cartItems, setCartItems] = useState(2);
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className="space-y-4">
      <div className="font-mono text-[10px] text-steel mb-4">
        // Telegram Mini App — Shop Interface
      </div>
      <div
        className={`border rounded-sharp p-6 transition-all ${
          isDarkMode
            ? "bg-[#1a1818] border-[#312e2e]"
            : "bg-concrete border-ink"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <h3
            className={`font-bold text-xl tracking-tight ${
              isDarkMode ? "text-concrete" : "text-ink"
            }`}
          >
            Магазин
          </h3>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="font-mono text-[10px] bg-volt-lime text-ink px-3 py-1 rounded-pill hover:opacity-80 transition-opacity"
          >
            {isDarkMode ? "LIGHT" : "DARK"}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {["Товар А", "Товар Б", "Товар В", "Товар Г"].map((item, i) => (
            <div
              key={i}
              className={`p-4 rounded-sharp border ${
                isDarkMode
                  ? "bg-obsidian border-[#312e2e]"
                  : "bg-ash-gray border-graphite"
              }`}
            >
              <div
                className={`h-20 rounded-sharp mb-2 ${
                  isDarkMode ? "bg-[#312e2e]" : "bg-steel/20"
                }`}
              ></div>
              <div
                className={`font-mono text-[11px] ${
                  isDarkMode ? "text-concrete" : "text-ink"
                }`}
              >
                {item}
              </div>
              <div
                className={`text-[10px] ${
                  isDarkMode ? "text-steel" : "text-graphite"
                }`}
              >
                1 990 ₽
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCartItems(Math.max(0, cartItems - 1))}
              className="w-8 h-8 bg-volt-lime text-ink rounded-pill font-mono text-sm hover:opacity-80"
            >
              −
            </button>
            <span
              className={`font-mono text-sm ${
                isDarkMode ? "text-concrete" : "text-ink"
              }`}
            >
              Корзина: {cartItems}
            </span>
            <button
              onClick={() => setCartItems(cartItems + 1)}
              className="w-8 h-8 bg-volt-lime text-ink rounded-pill font-mono text-sm hover:opacity-80"
            >
              +
            </button>
          </div>
          <button className="bg-volt-lime text-ink px-6 py-2 rounded-pill font-mono text-[11px] font-bold hover:opacity-80 transition-opacity">
            ОФОРМИТЬ
          </button>
        </div>
      </div>
    </div>
  );
}

function AIContent({
  typedText,
  showCursor,
}: {
  typedText: string;
  showCursor: boolean;
}) {
  return (
    <div>
      <div className="font-mono text-[10px] text-steel mb-4">
        // AI Agent Response — Claude Sonnet 4
      </div>
      <pre className="font-mono text-[13px] text-concrete leading-relaxed">
        <code>
          {typedText}
          {showCursor && <span className="text-volt-lime">▋</span>}
        </code>
      </pre>
    </div>
  );
}

function AutomationContent() {
  const logs = [
    { time: "21:15:32", event: "POST /api/orders", status: "200 OK", color: "volt-lime" },
    { time: "21:15:33", event: "Query: SELECT * FROM users", status: "PostgreSQL", color: "ultraviolet" },
    { time: "21:15:33", event: "Cache: SET order:1234", status: "Redis", color: "vermillion" },
    { time: "21:15:34", event: "Webhook → Telegram", status: "Sent", color: "volt-lime" },
    { time: "21:15:35", event: "POST /api/payment", status: "200 OK", color: "volt-lime" },
  ];

  return (
    <div>
      <div className="font-mono text-[10px] text-steel mb-4">
        // Real-time Pipeline Logs
      </div>
      <div className="space-y-2">
        {logs.map((log, i) => (
          <div key={i} className="flex items-center gap-3 font-mono text-[12px]">
            <span className="text-steel">[{log.time}]</span>
            <span className="text-concrete">{log.event}</span>
            <span className={`text-${log.color} ml-auto`}>→ {log.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
