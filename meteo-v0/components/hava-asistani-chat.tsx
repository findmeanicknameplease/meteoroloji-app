"use client"

import type React from "react"

import { useState } from "react"
import { MessageSquare, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function HavaAsistaniChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    {
      role: "assistant",
      content:
        "Merhaba! Ben Hava Asistanı. Size hava durumu ve giyinme/aktivite tavsiyeleri konusunda yardımcı olabilirim. Nasıl yardımcı olabilirim?",
    },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: input }])

    // TODO: Implement actual OpenAI integration
    // For now, simulate a response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Şu anda hava durumu bilgilerine göre, bugün hafif yağmurlu ve serin bir gün olacak. Yanınıza şemsiye almanızı ve ince bir mont giymenizi öneririm. Açık hava aktiviteleri için uygun bir gün değil, kapalı mekanlarda vakit geçirmeniz daha iyi olabilir.",
        },
      ])
    }, 1000)

    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  return (
    <>
      {/* Chat button */}
      <Button
        className={cn(
          "fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg z-20",
          "bg-[#047481] hover:bg-[#047481]/90",
          isOpen && "hidden",
        )}
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare className="h-6 w-6" />
        <span className="sr-only">Hava Asistanı</span>
      </Button>

      {/* Chat panel */}
      <div
        className={cn(
          "fixed bottom-0 right-0 w-full sm:w-96 h-[500px] max-h-[80vh] z-20 flex flex-col",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-y-0" : "translate-y-full",
        )}
      >
        <div className="glass-card rounded-t-xl flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-white/20 flex justify-between items-center">
            <h3 className="text-white font-medium">Hava Asistanı</h3>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Kapat</span>
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "max-w-[80%] p-3 rounded-lg",
                  message.role === "user" ? "bg-[#047481] ml-auto" : "bg-white/20 mr-auto",
                )}
              >
                <p className="text-white text-sm">{message.content}</p>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/20">
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Mesajınızı yazın..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus-visible:ring-offset-0 focus-visible:ring-white/30"
              />
              <Button onClick={handleSend} className="bg-[#047481] hover:bg-[#047481]/90">
                <Send className="h-4 w-4" />
                <span className="sr-only">Gönder</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
