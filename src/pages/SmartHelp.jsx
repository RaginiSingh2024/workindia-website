import { useState, useRef, useEffect } from 'react'

// Language content
const CONTENT = {
    en: {
        welcome: "Namaste! 👋 Welcome to **WorkIndia Smart Help**.\n\nI can help you:\n🏠 **Book home services** — plumbers, electricians, AC repair & more\n📞 **Get contact details** of any professional\n💰 **Check service pricing**\n💼 **Find job opportunities** if you're a skilled professional\n\nWhat would you like to do today?",
        quickPrompts: [
            { label: '🔧 Available plumbers', value: 'Show available plumbers near me' },
            { label: '⚡ List electricians', value: 'List electricians near me' },
            { label: '❄️ AC technicians', value: 'Show available AC technicians' },
            { label: '💰 Service pricing', value: 'What are the prices for all services?' },
            { label: '🧹 Book a cleaner', value: 'Book a home cleaner' },
            { label: '💼 I need a job', value: 'I am looking for a job' },
        ],
        placeholder: 'Try "Show available plumbers" or "I need a job as electrician"...',
        clearBtn: 'Clear',
        capabilities: ['Book Services', 'Find Jobs', 'Get Contacts'],
        assistantTitle: 'WorkIndia Smart Help',
        onlineStatus: 'Online — responds instantly'
    },
    hi: {
        welcome: "नमस्ते! 👋 **वर्कइंडिया स्मार्ट हेल्प** में आपका स्वागत है।\n\nमैं आपकी मदद कर सकता हूं:\n🏠 **घरेलू सेवाएं बुक करें** — प्लंबर, इलेक्ट्रीशियन, AC मरम्मत और अधिक\n📞 किसी भी पेशेवर के **संपर्क विवरण प्राप्त करें**\n💰 **सेवा मूल्य जांचें**\n💼 यदि आप एक कुशल पेशेवर हैं तो **नौकरी के अवसर खोजें**\n\nआप आज क्या करना चाहेंगे?",
        quickPrompts: [
            { label: '🔧 उपलब्ध प्लंबर', value: 'Show available plumbers near me' },
            { label: '⚡ इलेक्ट्रीशियन सूची', value: 'List electricians near me' },
            { label: '❄️ AC तकनीशियन', value: 'Show available AC technicians' },
            { label: '💰 सेवा मूल्य', value: 'What are the prices for all services?' },
            { label: '🧹 क्लीनर बुक करें', value: 'Book a home cleaner' },
            { label: '💼 मुझे नौकरी चाहिए', value: 'I am looking for a job' },
        ],
        placeholder: '"उपलब्ध प्लंबर दिखाएं" या "मुझे इलेक्ट्रीशियन की नौकरी चाहिए" आज़माएं...',
        clearBtn: 'साफ़ करें',
        capabilities: ['सेवाएं बुक करें', 'नौकरियां खोजें', 'संपर्क प्राप्त करें'],
        assistantTitle: 'वर्कइंडिया स्मार्ट हेल्प',
        onlineStatus: 'ऑनलाइन — तुरंत जवाब देता है'
    }
}

// Message bubble component
const MessageBubble = ({ msg }) => {
    const isUser = msg.role === 'user'
    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                isUser 
                    ? 'bg-primary-600 text-white rounded-br-sm' 
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm'
            }`}>
                <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>') }} />
                <div className={`text-xs mt-1 ${isUser ? 'text-primary-100' : 'text-gray-400'}`}>
                    {msg.time}
                </div>
            </div>
        </div>
    )
}

// Typing indicator component
const TypingIndicator = () => (
    <div className="flex justify-start animate-fade-in">
        <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm shadow-sm px-4 py-3">
            <div className="flex gap-1">
                <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
        </div>
    </div>
)

export default function SmartHelp() {
    const [language, setLanguage] = useState(() => localStorage.getItem('smartHelpLanguage') || 'en')
    const [messages, setMessages] = useState([{
        id: 1,
        role: 'bot',
        text: CONTENT[language].welcome,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }])
    const [input, setInput] = useState('')
    const [typing, setTyping] = useState(false)
    const bottomRef = useRef(null)

    useEffect(() => {
        localStorage.setItem('smartHelpLanguage', language)
        setMessages([{
            id: 1,
            role: 'bot',
            text: CONTENT[language].welcome,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }])
    }, [language])

    const getTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    const sendMessage = (text) => {
        const userText = (text || input).trim()
        if (!userText) return

        const userMsg = { id: Date.now(), role: 'user', text: userText, time: getTime() }
        setMessages(prev => [...prev, userMsg])
        setInput('')
        setTyping(true)

        setTimeout(() => {
            const botResponse = language === 'hi' 
                ? "मैं आपकी मदद के लिए यहां हूं। कृपया बताएं कि आप क्या चाहते हैं।"
                : "I'm here to help you. Please let me know what you need assistance with."
            
            const botMsg = { id: Date.now() + 1, role: 'bot', text: botResponse, time: getTime() }
            setMessages(prev => [...prev, botMsg])
            setTyping(false)
        }, 900 + Math.random() * 500)
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
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-600 to-accent-400 flex items-center justify-center text-xl shadow-lg">
                    🤖
                </div>
                <div className="flex-1">
                    <h2 className="font-bold text-gray-900">{CONTENT[language].assistantTitle}</h2>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-xs text-gray-500">{CONTENT[language].onlineStatus}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setLanguage('en')}
                        className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                            language === 'en'
                                ? 'bg-primary-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        English
                    </button>
                    <button
                        onClick={() => setLanguage('hi')}
                        className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                            language === 'hi'
                                ? 'bg-primary-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        हिंदी
                    </button>
                </div>
                <div className="ml-auto flex items-center gap-3">
                    <div className="hidden sm:flex gap-2">
                        {CONTENT[language].capabilities.map(cap => (
                            <span key={cap} className="text-xs bg-primary-50 text-primary-700 px-2.5 py-1 rounded-full font-medium border border-primary-100">
                                {cap}
                            </span>
                        ))}
                    </div>
                    <button
                        onClick={() => { setMessages([{ id: 1, role: 'bot', text: CONTENT[language].welcome, time: getTime() }]); }}
                        className="text-xs text-gray-400 hover:text-red-500 transition-colors font-medium"
                    >
                        {CONTENT[language].clearBtn}
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
                {CONTENT[language].quickPrompts.map((p, idx) => (
                    <button
                        key={p.value}
                        onClick={() => sendMessage(p.value)}
                        disabled={typing}
                        className="flex-shrink-0 text-xs bg-white border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-full transition-all duration-200 font-medium disabled:opacity-50"
                    >
                        {p.label}
                    </button>
                ))}
            </div>

            {/* Input Area */}
            <div className="mt-3 bg-white rounded-2xl border border-gray-200 shadow-sm flex items-end gap-3 p-3 focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-100 transition-all duration-200">
                <textarea
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={CONTENT[language].placeholder}
                    rows={1}
                    className="flex-1 resize-none outline-none text-sm text-gray-800 placeholder-gray-400 max-h-28 leading-relaxed bg-transparent"
                />
                <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim() || typing}
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-accent-400 flex items-center justify-center text-white hover:from-primary-700 hover:to-accent-600 transition-all duration-200 shadow-md disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
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
