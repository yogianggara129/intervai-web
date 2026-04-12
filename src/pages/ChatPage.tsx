import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, User, Bot, Upload, Link2, ChevronLeft } from "lucide-react"

import {
  useStartInterview,
  useSendAnswer,
  useSummary,
} from "@/hooks/useInterview"
import { useNavigate } from "react-router-dom"

const now = () =>
  new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })

type Step = "setup" | "chat"

interface Message {
  id: number
  role: "ai" | "user"
  text: string
  time: string
}

export default function ChatPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>("setup")
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [url, setUrl] = useState("")
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "ai",
      text: "Halo! Saya IntervAI. Kita akan mulai simulasi interview berdasarkan CV dan job yang kamu pilih.",
      time: now(),
    },
  ])
  const [isFinished, setIsFinished] = useState(false)

  const handleBack = () => {
    const confirmLeave = confirm("Interview akan hilang. Yakin mau keluar?")

    if (confirmLeave) {
      navigate("/")
    }
  }

  /* ================= API ================= */
  const { mutate: startInterviewMutate, isPending } = useStartInterview()

  const { mutate: sendAnswerMutate, isPending: isSending } = useSendAnswer()

  const { data: summary, isLoading: isSummaryLoading } = useSummary(isFinished)

  /* ================= START ================= */
  const handleStart = () => {
    if (!cvFile || !setUrl) return

    startInterviewMutate(
      { cv: cvFile, url },
      {
        onSuccess: (data) => {
          setMessages([
            {
              id: Date.now(),
              role: "ai",
              text: data.feedback,
              time: now(),
            },
            {
              id: Date.now() + 1,
              role: "ai",
              text: data.question,
              time: now(),
            },
          ])

          setStep("chat")
        },
      }
    )
  }

  /* ================= SEND ================= */
  const handleSend = () => {
    if (!input.trim() || isFinished) return

    const text = input
    setInput("")

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      text,
      time: now(),
    }

    setMessages((prev) => [...prev, userMsg])

    sendAnswerMutate(
      { answer: text },
      {
        onSuccess: (res) => {
          if (!res) {
            setMessages((prev) => [
              ...prev,
              {
                id: Date.now(),
                role: "ai",
                text: "Interview selesai. Sedang menyiapkan hasil...",
                time: now(),
              },
            ])

            setIsFinished(true)
            return
          }

          setMessages((prev) => [
            ...prev,
            {
              id: Date.now(),
              role: "ai",
              text: res.feedback,
              time: now(),
            },
            {
              id: Date.now() + 1,
              role: "ai",
              text: res.question,
              time: now(),
            },
          ])
        },
      }
    )
  }

  /* ================= SETUP UI ================= */
  if (step === "setup") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <Card className="w-full max-w-xl space-y-6 p-8">
          <h1 className="text-xl font-bold">Setup Interview</h1>

          {/* Upload */}
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6">
            <Upload className="mb-2" />
            <span className="text-sm text-slate-500">
              {cvFile ? cvFile.name : "Upload CV (PDF)"}
            </span>
            <input
              type="file"
              className="hidden"
              onChange={(e) => setCvFile(e.target.files?.[0] || null)}
            />
          </label>

          {/* Job Link */}
          <div className="flex items-center gap-2 rounded-xl border p-2">
            <Link2 className="h-4 w-4 text-slate-400" />
            <Input
              placeholder="https://..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="border-none focus-visible:ring-0"
            />
          </div>

          <Button onClick={handleStart} disabled={!cvFile || !url || isPending}>
            {isPending ? "Memulai..." : "Mulai Interview"}
          </Button>
        </Card>
      </div>
    )
  }

  /* ================= CHAT UI ================= */
  return (
    <div className="flex h-screen flex-col bg-slate-50">
      <header className="flex items-center justify-between border-b bg-white px-6 py-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div>
            <h2 className="text-sm font-semibold">Interview Session</h2>
            <p className="text-xs text-slate-500">IntervAI Simulation</p>
          </div>
        </div>
      </header>
      {/* MESSAGES */}
      <ScrollArea className="flex-1 p-6">
        <div className="mx-auto max-w-3xl space-y-6 pb-24">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="flex max-w-[80%] gap-3">
                {msg.role === "ai" && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                    <Bot size={16} />
                  </div>
                )}

                <div>
                  <div
                    className={`rounded-2xl p-4 text-sm ${
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
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border">
                    <User size={16} />
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing */}
          {isSending && !isFinished && (
            <p className="text-sm text-slate-400">
              IntervAI sedang mengetik...
            </p>
          )}

          {isFinished && isSummaryLoading && (
            <div className="mt-6 rounded-xl border bg-white p-6 text-center">
              <p className="text-sm text-slate-500">
                Menyusun hasil interview...
              </p>
            </div>
          )}

          {/* SUMMARY */}
          {summary && (
            <div className="mt-6 rounded-xl border bg-white p-6">
              <h2 className="mb-4 text-lg font-bold">Hasil Interview</h2>

              <p>Overall: {summary.overallScore}/10</p>
              <p>Technical: {summary.technicalScore}/10</p>
              <p>Communication: {summary.communicationScore}/10</p>

              <div className="mt-4">
                <p className="font-semibold">Strengths:</p>
                <ul className="ml-5 list-disc text-sm">
                  {summary.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <p className="font-semibold">Weaknesses:</p>
                <ul className="ml-5 list-disc text-sm">
                  {summary.weaknesses.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>

              <p className="mt-4 text-sm">{summary.summary}</p>

              <p className="mt-2 font-bold">
                Recommendation: {summary.recommendation}
              </p>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* INPUT */}
      <div className="border-t bg-white p-6">
        <div className="mx-auto flex max-w-3xl gap-2">
          <Input
            placeholder="Ketik jawaban..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isSending || isFinished}
          />
          <Button onClick={handleSend} disabled={isSending || isFinished}>
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
}
