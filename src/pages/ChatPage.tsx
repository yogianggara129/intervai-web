import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, User, Bot, Upload, Link2, Timer, Sparkles } from "lucide-react"

type Step = "setup" | "chat"

interface Message {
  id: number
  role: "ai" | "user"
  text: string
  time: string
}

export default function ChatPage() {
  const [step, setStep] = useState<Step>("setup")
  const [jobLink, setJobLink] = useState("")
  const [cvFile, setCvFile] = useState<File | null>(null)

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "ai",
      text: "Halo! Saya IntervAI. Kita akan mulai simulasi interview berdasarkan CV dan job yang kamu pilih.",
      time: "10:00",
    },
  ])

  /* ================= SETUP ================= */
  if (step === "setup") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <Card className="w-full max-w-xl rounded-2xl p-8 shadow-xl">
          <div className="mb-8 text-center">
            <Badge className="mb-3">Setup Interview</Badge>
            <h1 className="mb-2 text-2xl font-bold">
              Siapkan Simulasi Interview
            </h1>
            <p className="text-sm text-slate-500">
              Upload CV dan masukkan link lowongan agar AI bisa menyesuaikan
              pertanyaan
            </p>
          </div>

          {/* Upload CV */}
          <div className="mb-6">
            <p className="mb-2 text-sm font-medium">Upload CV</p>
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center hover:bg-slate-50">
              <Upload className="mb-2 h-6 w-6 text-slate-400" />
              <span className="text-sm text-slate-500">
                {cvFile ? cvFile.name : "Klik untuk upload CV (PDF)"}
              </span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => setCvFile(e.target.files?.[0] || null)}
              />
            </label>
          </div>

          {/* Job Link */}
          <div className="mb-6">
            <p className="mb-2 text-sm font-medium">Link Lowongan</p>
            <div className="flex items-center gap-2 rounded-xl border p-2">
              <Link2 className="ml-2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="https://..."
                value={jobLink}
                onChange={(e) => setJobLink(e.target.value)}
                className="border-none shadow-none focus-visible:ring-0"
              />
            </div>
          </div>

          <Button
            className="h-11 w-full text-base"
            disabled={!cvFile || !jobLink}
            onClick={() => setStep("chat")}
          >
            Mulai Interview
          </Button>
        </Card>
      </div>
    )
  }

  /* ================= CHAT ================= */
  return (
    <div className="flex h-screen bg-slate-50">
      {/* MAIN */}
      <main className="flex flex-1 flex-col">
        {/* HEADER */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">
          <div>
            <h2 className="text-sm font-semibold">
              IntervAI Chat
            </h2>
            <p className="flex items-center gap-2 text-xs text-slate-500">
              <Sparkles className="h-3 w-3 text-primary" />
              AI Generated Session
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
              <Timer className="h-3 w-3" />
              <span className="font-mono text-xs">12:45</span>
            </div>
            <Button variant="destructive" size="sm">
              Selesai
            </Button>
          </div>
        </header>

        {/* CHAT */}
        <ScrollArea className="flex-1 p-6">
          <div className="mx-auto max-w-3xl space-y-6 pb-24">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : ""}`}
              >
                <div className="flex max-w-[80%] gap-3">
                  {msg.role === "ai" && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                      <Bot size={16} />
                    </div>
                  )}

                  <div>
                    <div
                      className={`rounded-2xl p-4 text-sm leading-relaxed shadow-sm ${
                        msg.role === "ai"
                          ? "border bg-white"
                          : "bg-primary text-white"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="ml-1 text-[10px] text-slate-400">
                      {msg.time}
                    </span>
                  </div>

                  {msg.role === "user" && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-white">
                      <User size={16} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* INPUT */}
        <div className="bg-linear-to-t from-slate-50 to-transparent p-6">
          <div className="mx-auto max-w-3xl">
            <Card className="border-2 p-2 transition focus-within:border-primary">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Ketik jawabanmu..."
                  className="border-none focus-visible:ring-0"
                />
                <Button size="icon" className="rounded-xl">
                  <Send size={16} />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
