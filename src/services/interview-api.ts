import { VITE_BASE_URL } from "@/config"

export interface StartInterviewPayload {
  cv: File
  url: string
}

export interface StartInterviewResponse {
  sessionId: string
  feedback: string
  question: string
}

export interface SendAnswerPayload {
  answer: string
}

export interface SendAnswerResponse {
  feedback: string
  question: string
}

export interface SummaryResponse {
  overallScore: number
  technicalScore: number
  communicationScore: number
  strengths: string[]
  weaknesses: string[]
  summary: string
  recommendation: "strong_hire" | "hire" | "maybe" | "no_hire"
}

let sessionId: string | null = null

export const setSessionId = (id: string) => {
  sessionId = id
  localStorage.setItem("sessionId", id)
}

export const loadSessionId = () => {
  const stored = localStorage.getItem("sessionId")
  if (stored) sessionId = stored
}

const fetchWithSession = async (url: string, options: RequestInit = {}) => {
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  }

  loadSessionId()

  if (sessionId) {
    headers["X-Session-ID"] = sessionId
  }

  const res = await fetch(url, {
    ...options,
    headers,
  })

  if (res.status === 204) {
    return null
  }

  if (!res.ok) throw new Error("Request failed")

  return res.json()
}

export const startInterview = async (
  payload: StartInterviewPayload
): Promise<StartInterviewResponse> => {
  const formData = new FormData()
  formData.append("cv", payload.cv)
  formData.append("url", payload.url)

  const res = await fetch(`${VITE_BASE_URL}/interview/start`, {
    method: "POST",
    body: formData,
  })

  if (!res.ok) throw new Error("Failed to start interview")

  const data = await res.json()

  setSessionId(data.sessionId)

  return data
}

export const sendAnswer = async (
  payload: SendAnswerPayload
): Promise<SendAnswerResponse> => {
  return fetchWithSession(`${VITE_BASE_URL}/interview/answer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
}

export const getSummary = async (): Promise<SummaryResponse> => {
  return fetchWithSession(`${VITE_BASE_URL}/interview/summary`)
}
