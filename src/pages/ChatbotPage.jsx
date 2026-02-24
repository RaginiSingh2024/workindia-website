import { useState, useRef, useEffect } from 'react'

const INITIAL_MESSAGES = [
    {
        id: 1,
        role: 'bot',
        text: 'Namaste Priya! 👋 I\'m your GharSeva Smart Assistant. I can help you find service professionals, get price estimates, book services, and much more. What do you need help with today?',
        time: '10:00 AM',
    },
]

const QUICK_PROMPTS = [
    '🔧 Find a plumber near Bangalore',
    '⚡ Book an electrician for tomorrow',
    '💰 What is the cost of AC servicing?',
    '🧹 Schedule a home deep cleaning',
]

const BOT_REPLIES = {
    default: [
        "Great! Based on your location, I'd recommend QuickFix Services and HomePro Experts who are available today for plumbing work. Shall I book one for you? 🔧",
        "I found 23 available professionals near you! Top picks include a Plumber from AssuredFix (₹499) and a Home Cleaner from CleanNest (₹799). Want to book?",
        "AC servicing typically costs ₹599–₹1,499 in Bangalore. This includes gas top-up, filter cleaning, and a full check. Shall I schedule it for you? 🧊",
        "For deep home cleaning, our professionals cover all rooms, kitchen, bathrooms, and sofa. Prices start at ₹799. I can book a slot for this weekend! 🧹",
        "Our verified electricians are available today in your area. Fan fitting, wiring, and switchboard repair services are all covered. Book now? ⚡",
    ],
}

function getBotReply() {
    const replies = BOT_REPLIES.default
    return replies[Math.floor(Math.random() * replies.length)]
}

function MessageBubble({ msg }) {
    const isBot = msg.role === 'bot'
    return (
        <div className={`flex gap-3 ${isBot ? 'justify-start' : 'justify-end'} animate-slide-up`}>
            {isBot && (
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-md self-end">
                    AI
                </div>
            )}
            <div className={`max-w-[75%] ${isBot ? 'order-2' : 'order-1'}`}>
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${isBot
                    ? 'bg-white text-gray-800 rounded-bl-sm border border-gray-100'
                    : 'bg-gradient-to-br from-primary-600 to-accent-500 text-white rounded-br-sm'
                    }`}>
                    {msg.text}
                </div>
                <p className={`text-xs text-gray-400 mt-1 ${isBot ? 'text-left' : 'text-right'}`}>{msg.time}</p>
            </div>
            {!isBot && (
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-md self-end order-2">
                    P
                </div>
            )}
        </div>
    )
}

function TypingIndicator() {
    return (
        <div className="flex gap-3 justify-start">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-md self-end">
                AI
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                <div className="flex gap-1 items-center h-4">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
            </div>
        </div>
    )
}

export default function ChatbotPage() {
    const [messages, setMessages] = useState(INITIAL_MESSAGES)
    const [input, setInput] = useState('')
    const [typing, setTyping] = useState(false)
    const bottomRef = useRef(null)

    const getTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    const sendMessage = (text) => {
        const userText = text || input.trim()
        if (!userText) return

        const userMsg = { id: Date.now(), role: 'user', text: userText, time: getTime() }
        setMessages(prev => [...prev, userMsg])
        setInput('')
        setTyping(true)

        setTimeout(() => {
            setTyping(false)
            const botMsg = { id: Date.now() + 1, role: 'bot', text: getBotReply(), time: getTime() }
            setMessages(prev => [...prev, botMsg])
        }, 1200 + Math.random() * 800)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, typing])

    return (
        <div className="flex flex-col h-full max-h-[calc(100vh-8rem)] animate-fade-in">
            {/* Chat Header */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-4 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white font-bold shadow-lg">
                    🤖
                </div>
                <div>
                    <h2 className="font-bold text-gray-900">GharSeva Smart Assistant</h2>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-xs text-gray-500">Online — responds instantly</span>
                    </div>
                </div>
                <div className="ml-auto">
                    <button
                        id="clear-chat-btn"
                        onClick={() => setMessages(INITIAL_MESSAGES)}
                        className="text-xs text-gray-400 hover:text-red-500 transition-colors font-medium"
                    >
                        Clear Chat
                    </button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto bg-gray-50 rounded-2xl border border-gray-100 p-4 space-y-4 min-h-0">
                {messages.map(msg => (
                    <MessageBubble key={msg.id} msg={msg} />
                ))}
                {typing && <TypingIndicator />}
                <div ref={bottomRef} />
            </div>

            {/* Quick Prompts */}
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {QUICK_PROMPTS.map(p => (
                    <button
                        key={p}
                        id={`quick-prompt-${QUICK_PROMPTS.indexOf(p)}`}
                        onClick={() => sendMessage(p)}
                        className="flex-shrink-0 text-xs bg-white border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-full transition-all duration-200 font-medium"
                    >
                        {p}
                    </button>
                ))}
            </div>

            {/* Input Area */}
            <div className="mt-3 bg-white rounded-2xl border border-gray-200 shadow-sm flex items-end gap-3 p-3 focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-100 transition-all duration-200">
                <textarea
                    id="chat-input"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me anything about services, pricing, bookings..." rows={1}
                    className="flex-1 resize-none outline-none text-sm text-gray-800 placeholder-gray-400 max-h-28 leading-relaxed bg-transparent"
                />
                <button
                    id="chat-send-btn"
                    onClick={() => sendMessage()}
                    disabled={!input.trim() || typing}
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white hover:from-primary-700 hover:to-accent-600 transition-all duration-200 shadow-md disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                    aria-label="Send message"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
