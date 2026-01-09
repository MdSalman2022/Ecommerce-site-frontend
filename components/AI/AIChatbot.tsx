'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles, User, Bot, Minimize2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthProvider';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

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
  role: 'user' | 'model';
  parts: [{ text: string }];
  products?: Product[];
}

export default function AIChatbot() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Get or create a session ID for guests
  const getChatKey = () => {
    if (user?.email) return `dealbot_chat_${user.email}`;
    
    // For guests, use a session ID stored in localStorage
    let guestId = localStorage.getItem('dealbot_guest_id');
    if (!guestId) {
      guestId = `guest_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      localStorage.setItem('dealbot_guest_id', guestId);
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
      console.error('Failed to load chat history:', e);
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
        console.error('Failed to save chat history:', e);
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
    setInput('');
    
    const newUserMessage: Message = { role: 'user', parts: [{ text: userMessage }] };
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: messages.map(m => ({ role: m.role, parts: m.parts })),
          context: {
            userName: user?.name || 'Guest',
          }
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessages(prev => [...prev, { 
          role: 'model', 
          parts: [{ text: data.message }],
          products: data.products 
        }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', parts: [{ text: "Oops! I encountered an error. Please try again." }] }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: "Sorry, I'm having trouble connecting right now." }] }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Product Card Component
  const ProductCard = ({ product }: { product: Product }) => (
    <Link 
      href={product.link}
      onClick={() => setIsOpen(false)}
      className="flex gap-2 bg-gray-50 hover:bg-primary/5 rounded-lg p-2 transition-colors border border-gray-100 hover:border-primary/30 group"
    >
      <div className="relative w-12 h-12 bg-white rounded shrink-0">
        <Image 
          src={product.image || '/placeholder.png'} 
          alt={product.name} 
          fill 
          className="object-contain p-1"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-gray-800 line-clamp-1 group-hover:text-[hsl(var(--primary))]">{product.name}</p>
        <p className="text-[10px] text-gray-500">{product.brand}</p>
        <p className="text-xs font-bold text-[hsl(var(--primary))]">${product.price}</p>
      </div>
      <ExternalLink className="w-3 h-3 text-gray-300 group-hover:text-[hsl(var(--primary))] shrink-0 mt-1" />
    </Link>
  );

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-hover))] text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-[9999] group"
        title="Chat with DealBot"
      >
        <MessageCircle className="w-7 h-7 group-hover:hidden" />
        <Sparkles className="w-7 h-7 hidden group-hover:block animate-pulse" />
      </button>
    );
  }

  return (
    <div className={cn(
      "fixed bottom-6 right-6 w-[350px] sm:w-[400px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col transition-all z-[9999] overflow-hidden",
      isMinimized ? "h-14" : "h-[550px]"
    )}>
      {/* Header */}
      <div className="bg-[hsl(var(--primary))] p-4 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-1.5 rounded-lg">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-sm leading-tight">DealBot</h3>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-[10px] opacity-90">AI Shopping Assistant</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {messages.length > 0 && (
            <button 
              onClick={() => {
                setMessages([]);
                try {
                  localStorage.removeItem(getChatKey());
                } catch {}
              }}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-[10px] font-bold"
              title="Clear chat"
            >
              Clear
            </button>
          )}
          <button 
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
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
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-orange-50 max-w-[85%] mx-auto">
                  <p className="text-sm text-gray-800">
                    👋 Hi {user?.name || 'there'}! I&apos;m <strong>DealBot</strong>. Ask me about products, deals, or anything about our store!
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {["Show me laptops", "What's on sale?", "Shipping info", "Best headphones?"].map(q => (
                    <button
                      key={q}
                      onClick={() => { setInput(q); }}
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
                    m.role === 'user' ? "ml-auto flex-row-reverse" : ""
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm",
                    m.role === 'user' ? "bg-gray-200" : "bg-primary/10"
                  )}>
                    {m.role === 'user' ? <User className="w-4 h-4 text-gray-600" /> : <Bot className="w-4 h-4 text-[hsl(var(--primary))]" />}
                  </div>
                  <div className={cn(
                    "p-3 rounded-2xl text-sm shadow-sm",
                    m.role === 'user' 
                      ? "bg-[hsl(var(--primary))] text-white rounded-tr-none" 
                      : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
                  )}>
                    {m.parts[0].text || (m.products?.length ? "Here's what I found:" : "...")}
                  </div>
                </div>
                
                {/* Product Cards - Grid Layout */}
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
              <div className="flex gap-3 max-w-[85%] animate-pulse">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-[hsl(var(--primary))]" />
                </div>
                <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-[hsl(var(--primary))]" />
                  <span className="text-xs text-gray-400">Thinking...</span>
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
                className="absolute right-1 top-1 h-8 w-8 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-hover))]"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-[9px] text-gray-400 mt-2 text-center flex items-center justify-center gap-1">
              <Sparkles className="w-2 h-2" /> Powered by AI • Can show products directly
            </p>
          </form>
        </>
      )}
    </div>
  );
}

