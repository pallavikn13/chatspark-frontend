export const APP_NAME = "ChatSpark AI";
export const APP_VERSION = "v1.0.0";

/** Base URL of the Java Spring Boot backend. */
export const API_BASE_URL: string =
  (import.meta.env['VITE_API_BASE_URL'] as string) || "https://chatspark-frontend.onrender.com/api";

export const STORAGE_KEYS = {
  user: "chatspark.user",
  token: "chatspark.token",
  conversations: "chatspark.conversations",
  messages: "chatspark.messages",
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
