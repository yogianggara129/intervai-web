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

// Extended responses that may include retryable flag
export interface StartInterviewResponseExt extends StartInterviewResponse {
  retryable?: boolean
}
export interface SendAnswerResponseExt extends SendAnswerResponse {
  retryable?: boolean
}
export interface SummaryResponseExt extends SummaryResponse {
  retryable?: boolean
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

const fetchWithSession = async <T>(url: string, options: RequestInit = {}): Promise<T & { retryable?: boolean }> => {
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
    return null as unknown as T & { retryable?: boolean }
  }

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    // If server returned retryable flag or status is 503, mark as retryable
    const isRetryable = res.status === 503 || data.retryable === true
    const err = new Error(data?.error ?? 'Request failed') as Error & { retryable: boolean; status: number }
    err.retryable = isRetryable
    err.status = res.status
    throw err
  }

  return res.json()
}

export const startInterview = async (
  payload: StartInterviewPayload
): Promise<StartInterviewResponseExt> => {
  const formData = new FormData()
  formData.append("cv", payload.cv)
  formData.append("url", payload.url)

  const res = await fetch(`${VITE_BASE_URL}/interview/start`, {
    method: "POST",
    body: formData,
  })

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    const isRetryable = res.status === 503 || data.retryable === true
    const err = new Error(data?.error ?? 'Failed to start interview') as Error & { retryable: boolean; status: number }
    err.retryable = isRetryable
    err.status = res.status
    throw err
  }

  const data = await res.json()
  setSessionId(data.sessionId)

  return data
}

export const sendAnswer = async (
  payload: SendAnswerPayload
): Promise<SendAnswerResponseExt> => {
  return fetchWithSession<SendAnswerResponse>(`${VITE_BASE_URL}/interview/answer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
}

export const getSummary = async (): Promise<SummaryResponseExt> => {
  return fetchWithSession<SummaryResponse>(`${VITE_BASE_URL}/interview/summary`)
}