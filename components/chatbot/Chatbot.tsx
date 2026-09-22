"use client";

import { useEffect, useRef, useState } from "react";
import {
    Bot,
    ChevronDown,
    PawPrint,
    Send,
    Sparkles,
    X,
} from "lucide-react";

import styles from "./Chatbot.module.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Message = {
    id: number;
    role: "assistant" | "user";
    text: string;
};

const suggestions = [
    "What is PetCard?",
    "How does PetCard work?",
    "What features does PetCard have?",
    "What is the Emergency Card?",
];

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000/api";

const INITIAL_MESSAGE: Message = {
    id: 1,
    role: "assistant",
    text: "Hi! I'm PetCard AI. I can help you with questions about PetCard, its features, and how it works.",
};

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const [messages, setMessages] = useState<Message[]>([
        INITIAL_MESSAGE,
    ]);

const textareaRef =
    useRef<HTMLTextAreaElement>(null);

const messagesEndRef =
    useRef<HTMLDivElement>(null);

    /* =====================================================
   AUTO SCROLL CHAT TO LATEST MESSAGE
   ===================================================== */

useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }, 50);

    return () => clearTimeout(timer);
}, [messages, isTyping, isOpen]);


/* =====================================================
   LOCK BACKGROUND SCROLL WHEN CHAT IS OPEN
   ===================================================== */

useEffect(() => {
    if (!isOpen) return;

    const originalBodyOverflow =
        document.body.style.overflow;

    const originalHtmlOverflow =
        document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
        document.body.style.overflow =
            originalBodyOverflow;

        document.documentElement.style.overflow =
            originalHtmlOverflow;
    };
}, [isOpen]);
    /* =====================================================
       SEND MESSAGE
       ===================================================== */

    const sendMessage = async (text?: string) => {
        const value = (text ?? message).trim();

        if (!value || isTyping) return;

        /* Backend allows maximum 500 characters */
        if (value.length > 500) {
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    role: "assistant",
                    text: "Please keep your message under 500 characters.",
                },
            ]);

            return;
        }

        /* ===================================================
           USER MESSAGE
           =================================================== */

        const userMessage: Message = {
            id: Date.now(),
            role: "user",
            text: value,
        };

        setMessages((prev) => [
            ...prev,
            userMessage,
        ]);

        setMessage("");
        setIsTyping(true);

        try {
            /* =================================================
               BACKEND REQUEST
               ================================================= */

            const response = await fetch(
                `${API_URL}/chatbot`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        message: value,
                    }),
                }
            );

            const data = await response.json();

            /* =================================================
               BACKEND ERROR
               ================================================= */

            if (!response.ok) {
                throw new Error(
                    data?.message ||
                    "Failed to get a response."
                );
            }

            /* =================================================
               ASSISTANT RESPONSE
               ================================================= */

            const assistantMessage: Message = {
                id: Date.now() + 1,
                role: "assistant",
                text:
                    data?.answer ||
                    "I couldn't generate a response right now. Please try again.",
            };

            setMessages((prev) => [
                ...prev,
                assistantMessage,
            ]);
        } catch (error) {
            console.error(
                "Chatbot frontend error:",
                error
            );

            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + 1,
                    role: "assistant",
                    text: "PetCard AI is temporarily unavailable. Please try again in a moment.",
                },
            ]);
        } finally {
            setIsTyping(false);

            /* Return focus to input */
            setTimeout(() => {
                textareaRef.current?.focus();
            }, 50);
        }
    };

    /* =====================================================
       KEYBOARD
       ===================================================== */

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {
            event.preventDefault();

            sendMessage();
        }
    };

    const closeChat = () => {
        setIsOpen(false);
        setMessage("");
        setIsTyping(false);

        setMessages([
            {
                ...INITIAL_MESSAGE,
                id: Date.now(),
            },
        ]);
    };
    /* =====================================================
       RENDER
       ===================================================== */

    return (
        <>
            {/* =================================================
          FLOATING BUTTON
          ================================================= */}

            <button
                type="button"
                className={`${styles.chatTrigger} ${isOpen
                    ? styles.chatTriggerOpen
                    : ""
                    }`}
                onClick={() => {
                    if (isOpen) {
                        closeChat();
                    } else {
                        setIsOpen(true);
                    }
                }}
                aria-label={
                    isOpen
                        ? "Close PetCard AI"
                        : "Open PetCard AI"
                }
                aria-expanded={isOpen}
            >
                {isOpen ? (
                    <X
                        size={24}
                        strokeWidth={2.4}
                    />
                ) : (
                    <>
                        <span
                            className={styles.triggerGlow}
                        />

                        <img
                            src="/images/paw-white.png"
                            className={styles.pawIcon}
                        />
                    </>
                )}

                
            </button>

            {/* =================================================
          CHAT WINDOW
          ================================================= */}

            <div
                className={`${styles.chatWindow} ${isOpen
                    ? styles.chatWindowOpen
                    : ""
                    }`}
                aria-hidden={!isOpen}
            >
                {/* =================================================
            HEADER
            ================================================= */}

                <div className={styles.chatHeader}>
                    <div
                        className={styles.headerIdentity}
                    >
                        <div className={styles.botAvatar}>
                           <img src="/images/paw-white.png"
                           width={42}
                           height={42}
/>
                          
                        </div>

                        <div>
                            <div
                                className={
                                    styles.headerTitleRow
                                }
                            >
                                <h3>PetCard AI</h3>

                               
                            </div>

                            <p>
                                Here to help with PetCard
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        className={styles.closeButton}
                        onClick={closeChat}
                        aria-label="Close chatbot"
                    >
                        <ChevronDown size={20} />
                    </button>
                </div>

                {/* =================================================
            BODY
            ================================================= */}

                <div className={styles.chatBody}>
                    <div
                        className={styles.welcomeLabel}
                    >
                        <span />

                        PetCard Assistant

                        <span />
                    </div>

                    {/* =================================================
              MESSAGES
              ================================================= */}

                    <div className={styles.messages}>
                        {messages.map((item) => (
                            <div
                                key={item.id}
                                className={`${styles.messageRow} ${item.role === "user"
                                    ? styles.userRow
                                    : styles.assistantRow
                                    }`}
                            >
                                {item.role ===
                                    "assistant" && (
                                        <div
                                            className={
                                                styles.messageAvatar
                                            }
                                        >
                                            <Bot size={15} />
                                        </div>
                                    )}

                                <div
                                    className={`${styles.messageBubble} ${item.role === "user"
                                            ? styles.userBubble
                                            : styles.assistantBubble
                                        }`}
                                >
                                    {item.role === "assistant" ? (
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                        >
                                            {item.text}
                                        </ReactMarkdown>
                                    ) : (
                                        item.text
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* =================================================
                TYPING INDICATOR
                ================================================= */}

                        {isTyping && (
                            <div
                                className={`${styles.messageRow} ${styles.assistantRow}`}
                            >
                                <div
                                    className={
                                        styles.messageAvatar
                                    }
                                >
                                    <Bot size={15} />
                                </div>

                                <div
                                    className={`${styles.messageBubble} ${styles.assistantBubble}`}
                                >
                                    <div
                                        className={styles.typing}
                                    >
                                        <span />
                                        <span />
                                        <span />
                                    </div>
                                </div>
                               
                            </div>
                        )}
                          {/* Auto-scroll target */}
    <div ref={messagesEndRef} />
                    </div>

                    {/* =================================================
              SUGGESTIONS
              ================================================= */}

                    {messages.length === 1 && (
                        <div
                            className={styles.suggestions}
                        >
                            <p>Try asking</p>

                            <div
                                className={
                                    styles.suggestionList
                                }
                            >
                                {suggestions.map(
                                    (item) => (
                                        <button
                                            key={item}
                                            type="button"
                                            onClick={() =>
                                                sendMessage(item)
                                            }
                                            disabled={isTyping}
                                        >
                                            {item}
                                        </button>
                                    )
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* =================================================
            FOOTER / INPUT
            ================================================= */}

                <div
                    className={styles.chatFooter}
                >
                    <div
                        className={styles.inputWrapper}
                    >
                        <textarea
                            ref={textareaRef}
                            value={message}
                            onChange={(event) =>
                                setMessage(
                                    event.target.value
                                )
                            }
                            onKeyDown={handleKeyDown}
                            placeholder="Ask about PetCard..."
                            rows={1}
                            maxLength={500}
                            disabled={isTyping}
                            aria-label="Ask PetCard AI"
                        />

                        <button
                            type="button"
                            className={
                                styles.sendButton
                            }
                            onClick={() =>
                                sendMessage()
                            }
                            disabled={
                                !message.trim() ||
                                isTyping
                            }
                            aria-label="Send message"
                        >
                            <Send
                                size={18}
                                strokeWidth={2.3}
                            />
                        </button>
                    </div>


                </div>
            </div>
        </>
    );
}