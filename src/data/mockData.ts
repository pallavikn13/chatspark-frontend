import type { Conversation, Message, User } from "@/types";

export const mockUser: User = {
  id: "u_1",
  fullName: "Ada Lovelace",
  email: "ada@example.com",
  plan: "Pro Plan",
};

const now = Date.now();
const minutesAgo = (m: number) => new Date(now - m * 60_000).toISOString();

export const mockConversations: Conversation[] = [
  {
    id: "c_1",
    title: "Java Debugging",
    createdAt: minutesAgo(90),
    updatedAt: minutesAgo(12),
  },
  {
    id: "c_2",
    title: "Learn Java Arrays",
    createdAt: minutesAgo(600),
    updatedAt: minutesAgo(540),
  },
  {
    id: "c_3",
    title: "Spring Boot REST basics",
    createdAt: minutesAgo(1500),
    updatedAt: minutesAgo(1440),
  },
  {
    id: "c_4",
    title: "PostgreSQL indexing tips",
    createdAt: minutesAgo(3000),
    updatedAt: minutesAgo(2900),
  },
  {
    id: "c_5",
    title: "Study plan for interviews",
    createdAt: minutesAgo(5000),
    updatedAt: minutesAgo(4800),
  },
];

export const mockMessages: Message[] = [
  {
    id: "m_1",
    conversationId: "c_1",
    role: "user",
    content:
      "I'm getting a NullPointerException when trying to access the user object in my Spring Boot controller. Here's the relevant part of the code:\n\n```java\n@GetMapping(\"/profile/{id}\")\npublic ResponseEntity<UserProfile> getProfile(@PathVariable Long id) {\n    User user = userService.findById(id);\n    String email = user.getEmail();\n    return ResponseEntity.ok(new UserProfile(user));\n}\n```",
    createdAt: minutesAgo(14),
  },
  {
    id: "m_2",
    conversationId: "c_1",
    role: "assistant",
    content:
      "The NullPointerException occurs because `userService.findById(id)` is likely returning null when a user with that ID doesn't exist. Calling `.getEmail()` on a null reference throws the exception.\n\nIn Spring Boot it's best practice to handle this gracefully, usually by returning a 404:\n\n```java\n@GetMapping(\"/profile/{id}\")\npublic ResponseEntity<UserProfile> getProfile(@PathVariable Long id) {\n    return userService.findById(id)\n        .map(user -> ResponseEntity.ok(new UserProfile(user)))\n        .orElse(ResponseEntity.notFound().build());\n}\n```\n\nMake sure `findById` returns an `Optional<User>` for this pattern to work.",
    createdAt: minutesAgo(12),
  },
  {
    id: "m_3",
    conversationId: "c_2",
    role: "user",
    content: "Can you explain arrays in Java?",
    createdAt: minutesAgo(560),
  },
  {
    id: "m_4",
    conversationId: "c_2",
    role: "assistant",
    content:
      "Sure! An array in Java is a fixed-size collection of elements of the same type, stored in contiguous memory.\n\n```java\nint[] numbers = new int[5];\nnumbers[0] = 42;\nString[] names = { \"Ada\", \"Alan\", \"Grace\" };\n```\n\nKey points:\n- Indexes start at 0 and end at `length - 1`.\n- The size is fixed once created; use `ArrayList` if you need to grow.\n- Accessing an invalid index throws `ArrayIndexOutOfBoundsException`.",
    createdAt: minutesAgo(540),
  },
  {
    id: "m_5",
    conversationId: "c_3",
    role: "user",
    content: "What is the difference between @Controller and @RestController?",
    createdAt: minutesAgo(1460),
  },
  {
    id: "m_6",
    conversationId: "c_3",
    role: "assistant",
    content:
      "`@RestController` is simply `@Controller` combined with `@ResponseBody`. With `@Controller` the return value is resolved as a view name, while `@RestController` serializes the returned object straight to the response body as JSON.",
    createdAt: minutesAgo(1440),
  },
  {
    id: "m_7",
    conversationId: "c_4",
    role: "user",
    content: "When should I add an index in PostgreSQL?",
    createdAt: minutesAgo(2950),
  },
  {
    id: "m_8",
    conversationId: "c_4",
    role: "assistant",
    content:
      "Add an index when a column is frequently used in WHERE, JOIN or ORDER BY clauses on a large table. Avoid indexing small tables or columns with very low selectivity, since every index slows down writes.",
    createdAt: minutesAgo(2900),
  },
  {
    id: "m_9",
    conversationId: "c_5",
    role: "user",
    content: "Build me a 2-week backend interview study plan.",
    createdAt: minutesAgo(4850),
  },
  {
    id: "m_10",
    conversationId: "c_5",
    role: "assistant",
    content:
      "Week 1: Java fundamentals, collections, concurrency basics, and OOP design questions.\nWeek 2: Spring Boot, REST design, SQL and PostgreSQL tuning, plus two mock interviews.",
    createdAt: minutesAgo(4800),
  },
];

/** Canned assistant replies used until the real backend is connected. */
export const mockAiReplies: string[] = [
  "Good question. Here's a concise breakdown:\n\n1. Start with the smallest reproducible example.\n2. Check the inputs and their types.\n3. Add logging around the failing call.\n\nWant me to go deeper on any of these steps?",
  "Here's an example that illustrates the idea:\n\n```java\npublic class Example {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from the mock AI\");\n    }\n}\n```\n\nThis is a mock response — connect your Spring Boot API to get real answers.",
  "In short: prefer the simplest solution that satisfies the requirement, then optimize once you have measurements. Premature optimization tends to add complexity without measurable benefit.",
  "That usually comes down to three things: the data model, the access pattern, and the error handling. If you share more context I can tailor the answer.",
];
