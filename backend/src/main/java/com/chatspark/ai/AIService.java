package com.chatspark.ai;

import com.chatspark.entity.Message;

import java.util.List;

public interface AIService {

    /**
     * Generates an AI response given the past conversation message history and the user's latest prompt.
     *
     * @param history Previous messages in the conversation (oldest to newest)
     * @param userPrompt Latest prompt from user
     * @return Generated AI reply text
     */
    String generateReply(List<Message> history, String userPrompt);

    /**
     * Generates a short conversation title from the first prompt.
     *
     * @param firstPrompt User's initial prompt
     * @return Short title (e.g. 2-5 words)
     */
    String generateTitle(String firstPrompt);
}
