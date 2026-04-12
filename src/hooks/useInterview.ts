import { useMutation, useQuery } from "@tanstack/react-query"
import {
  startInterview,
  sendAnswer,
  getSummary,
} from "@/services/interview-api"

export const useStartInterview = () => {
  return useMutation({
    mutationFn: startInterview,
  })
}

export const useSendAnswer = () => {
  return useMutation({
    mutationFn: sendAnswer,
  })
}

export const useSummary = (enabled: boolean) => {
  return useQuery({
    queryKey: ["summary"],
    queryFn: () => getSummary(),
    enabled,
  })
}
