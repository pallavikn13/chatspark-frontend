export const APP_NAME = "AI Chat";
export const APP_VERSION = "v1.0.2";

/** Base URL of the future Java Spring Boot backend. */
export const API_BASE_URL = "/api";

/** Simulated latency for the mock services (ms). */
export const MOCK_LATENCY = 400;
export const MOCK_AI_LATENCY = 1200;

export const STORAGE_KEYS = {
  user: "aichat.user",
  token: "aichat.token",
  conversations: "aichat.conversations",
  messages: "aichat.messages",
} as const;

export const SUGGESTED_PROMPTS = [
  {
    title: "Explain Java",
    description: "Break down object-oriented programming concepts simply.",
    icon: "code",
    prompt: "Explain object-oriented programming in Java simply.",
  },
  {
    title: "Debug Code",
    description: "Help me find and fix errors in my current project.",
    icon: "bug",
    prompt: "Help me debug an error in my Spring Boot project.",
  },
  {
    title: "Study Plan",
    description: "Create a structured schedule for learning a new skill.",
    icon: "school",
    prompt: "Create a 4-week study plan for learning Java.",
  },
  {
    title: "Simplify Concept",
    description: "Explain complex topics as if I were a beginner.",
    icon: "lightbulb",
    prompt: "Explain dependency injection as if I were a beginner.",
  },
] as const;
