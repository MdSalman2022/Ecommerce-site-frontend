"use client";

import React, {useState, useEffect, useRef} from "react";
import {
  MessageCircle,
  X,
  Send,
  Loader2,
  Sparkles,
  User,
  Bot,
  Minimize2,
  ExternalLink,
} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useAuth} from "@/contexts/AuthProvider";
import {cn} from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {AIBotLottie} from "./AIBotLottie";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
  category: string;
  rating: number;
  link: string;
}

interface Message {
  role: "user" | "model";
  parts: [{text: string}];
  products?: Product[];
}

export default function AIChatbot() {
  const {user} = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Get or create a session ID for guests
  const getChatKey = () => {
    if (user?.email) return `dealbot_chat_${user.email}`;

    // For guests, use a session ID stored in localStorage
    let guestId = localStorage.getItem("dealbot_guest_id");
    if (!guestId) {
      guestId = `guest_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      localStorage.setItem("dealbot_guest_id", guestId);
    }
    return `dealbot_chat_${guestId}`;
  };

  // Load chat history from localStorage on mount
  useEffect(() => {
    try {
      const key = getChatKey();
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setMessages(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to load chat history:", e);
    }
  }, [user]);

  // Save chat history to localStorage when messages change
  useEffect(() => {
    if (messages.length > 0) {
      try {
        const key = getChatKey();
        // Keep only last 50 messages to avoid storage limits
        const toSave = messages.slice(-50);
        localStorage.setItem(key, JSON.stringify(toSave));
      } catch (e) {
        console.error("Failed to save chat history:", e);
      }
    }
  }, [messages, user]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");

    const newUserMessage: Message = {
      role: "user",
      parts: [{text: userMessage}],
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ai/chat`,
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            message: userMessage,
            history: messages.map((m) => ({role: m.role, parts: m.parts})),
            context: {
              userName: user?.name || "Guest",
            },
          }),
        }
      );

      const data = await res.json();
      if (data.success) {
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            parts: [{text: data.message}],
            products: data.products,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            parts: [{text: "Oops! I encountered an error. Please try again."}],
          },
        ]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          parts: [{text: "Sorry, I'm having trouble connecting right now."}],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Product Card Component
  const ProductCard = ({product}: {product: Product}) => (
    <Link
      href={product.link}
      onClick={() => setIsOpen(false)}
      className="flex gap-2 bg-gray-50 hover:bg-primary/5 rounded-lg p-2 transition-colors border border-gray-100 hover:border-primary/30 group"
    >
      <div className="relative w-12 h-12 bg-white rounded shrink-0">
        <Image
          src={product.image || "/placeholder.png"}
          alt={product.name}
          fill
          className="object-contain p-1"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-gray-800 line-clamp-1 group-hover:text-[hsl(var(--primary))]">
          {product.name}
        </p>
        <p className="text-[10px] text-gray-500">{product.brand}</p>
        <p className="text-xs font-bold text-[hsl(var(--primary))]">
          {product.price.toLocaleString()}৳
        </p>
      </div>
      <ExternalLink className="w-3 h-3 text-gray-300 group-hover:text-[hsl(var(--primary))] shrink-0 mt-1" />
    </Link>
  );

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-[80px] md:bottom-6 right-3 md:right-6 w-12 h-12 md:w-14 md:h-14 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-[9999] group"
        title="Chat with DealBot"
      >
        <div className="w-full h-full rounded-full bg-black overflow-hidden flex items-center justify-center">
          <AIBotLottie style={{width: "100%", height: "100%"}} />
        </div>
      </button>
    );
  }

  return (
    <div
      className={cn(
        "fixed bottom-[120px] md:bottom-6 right-3 md:right-6 w-[90vw] md:w-[350px] sm:w-[400px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col transition-all z-[9999]",
        isMinimized
          ? "h-auto overflow-hidden"
          : "h-[500px] md:h-[550px] overflow-hidden"
      )}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-3 flex items-center justify-between text-white shrink-0 relative overflow-hidden rounded-t-2xl">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm pointer-events-none" />
        <div className="flex items-center gap-2 relative z-10">
          <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-md border border-white/30 shadow-inner">
            <div className="w-6 h-6 rounded-full bg-black overflow-hidden flex items-center justify-center">
              <AIBotLottie style={{width: "100%", height: "100%"}} />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-tight">DealBot</h3>
            {!isMinimized && (
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[10px] font-medium opacity-90 tracking-wide uppercase">
                  AI Assistant
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1 relative z-10">
          {messages.length > 0 && (
            <button
              onClick={() => {
                setMessages([]);
                try {
                  localStorage.removeItem(getChatKey());
                } catch {}
              }}
              className="px-2 py-1 hover:bg-white/20 rounded-lg transition-all text-[10px] font-bold border border-transparent hover:border-white/30"
              title="Clear chat"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-all"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50"
          >
            {messages.length === 0 && (
              <div className="text-center py-6 space-y-4">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-primary/10 max-w-[90%] mx-auto relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500" />
                  <p className="text-sm text-gray-800 leading-relaxed">
                    👋 Hi {user?.name || "there"}! I&apos;m{" "}
                    <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      DealBot
                    </span>
                    . Your AI-powered shopping companion.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {[
                    "Show me laptops",
                    "What's on sale?",
                    "Shipping info",
                    "Best headphones?",
                  ].map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        setInput(q);
                      }}
                      className="text-[10px] bg-white border border-gray-200 px-3 py-1.5 rounded-full hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))] transition-colors shadow-sm"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className="space-y-2">
                <div
                  className={cn(
                    "flex gap-3 max-w-[85%]",
                    m.role === "user" ? "ml-auto flex-row-reverse" : ""
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm",
                      m.role === "user" ? "bg-gray-200" : ""
                    )}
                  >
                    {m.role === "user" ? (
                      <User className="w-7 h-7 text-gray-600" />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-black overflow-hidden flex items-center justify-center">
                        <AIBotLottie style={{width: "100%", height: "100%"}} />
                      </div>
                    )}
                  </div>
                  <div
                    className={cn(
                      "p-3 rounded-2xl text-sm shadow-sm transition-all animate-in fade-in slide-in-from-bottom-2 duration-300",
                      m.role === "user"
                        ? "bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-tr-none"
                        : "bg-white text-gray-800 border border-gray-100 rounded-tl-none ring-1 ring-black/[0.02]"
                    )}
                  >
                    {m.parts[0].text ||
                      (m.products?.length ? "Here's what I found:" : "...")}
                  </div>
                </div>
                {m.products && m.products.length > 0 && (
                  <div className="ml-11 space-y-2">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      🛒 {m.products.length} Products Found
                    </p>
                    <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-1">
                      {m.products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 max-w-[85%] animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0 shadow-lg animate-pulse">
                  <div className="w-5 h-5 rounded-full bg-black overflow-hidden flex items-center justify-center">
                    <AIBotLottie style={{width: "100%", height: "100%"}} />
                  </div>
                </div>
                <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 flex items-center gap-3 shadow-sm ring-1 ring-black/[0.02]">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce" />
                  </div>
                  <span className="text-xs font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    DealBot is thinking...
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSend}
            className="p-3 border-t bg-white shrink-0"
          >
            <div className="flex gap-2 relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about products, deals, orders..."
                className="pr-12 bg-gray-50 border-gray-200 focus-visible:ring-[hsl(var(--primary))] text-sm"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading}
                className="absolute right-1 top-1 h-8 w-8 bg-gradient-to-br from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 transition-all shadow-md"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-[9px] text-gray-400 mt-2 text-center flex items-center justify-center gap-1 opacity-75">
              <div className="w-3 h-3 flex items-center justify-center bg-black rounded-full overflow-hidden mr-1">
                <AIBotLottie style={{width: "100%", height: "100%"}} />
              </div>
              Powered by Advanced AI • Real-time Data
            </p>
          </form>
        </>
      )}
    </div>
  );
}
