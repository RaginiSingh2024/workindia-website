import { useState, useRef, useEffect } from 'react'

// ─── DATA ────────────────────────────────────────────────────────────────────

const PROFESSIONALS = [
    // Plumber
    { id: 1, name: 'Ramesh Kumar', service: 'plumber', price: 499, rating: 4.8, phone: '+91 98765 43210', location: 'Bangalore' },
    { id: 2, name: 'Suresh Patil', service: 'plumber', price: 449, rating: 4.6, phone: '+91 91234 56789', location: 'Hyderabad' },
    { id: 3, name: 'Mohan Yadav', service: 'plumber', price: 529, rating: 4.9, phone: '+91 93456 78901', location: 'Delhi' },

    // Electrician
    { id: 4, name: 'Vikram Singh', service: 'electrician', price: 599, rating: 4.7, phone: '+91 99887 65432', location: 'Bangalore' },
    { id: 5, name: 'Arun Mehta', service: 'electrician', price: 549, rating: 4.5, phone: '+91 87654 32109', location: 'Mumbai' },
    { id: 6, name: 'Dinesh Raju', service: 'electrician', price: 649, rating: 4.9, phone: '+91 80123 45678', location: 'Chennai' },

    // AC Technician
    { id: 7, name: 'Kiran Reddy', service: 'ac', price: 799, rating: 4.8, phone: '+91 95678 12345', location: 'Hyderabad' },
    { id: 8, name: 'Pradeep Nair', service: 'ac', price: 749, rating: 4.6, phone: '+91 78901 23456', location: 'Bangalore' },
    { id: 9, name: 'Sanjay Gupta', service: 'ac', price: 849, rating: 4.7, phone: '+91 96789 01234', location: 'Mumbai' },

    // Carpenter
    { id: 10, name: 'Deepak Sharma', service: 'carpenter', price: 399, rating: 4.6, phone: '+91 94567 89012', location: 'Delhi' },
    { id: 11, name: 'Ravi Verma', service: 'carpenter', price: 449, rating: 4.8, phone: '+91 82345 67890', location: 'Bangalore' },
    { id: 12, name: 'Ganesh Iyer', service: 'carpenter', price: 379, rating: 4.5, phone: '+91 71234 56789', location: 'Chennai' },

    // Painter
    { id: 13, name: 'Ajay Tiwari', service: 'painter', price: 1499, rating: 4.7, phone: '+91 97890 12345', location: 'Mumbai' },
    { id: 14, name: 'Manoj Pandey', service: 'painter', price: 1399, rating: 4.5, phone: '+91 86543 21098', location: 'Delhi' },
    { id: 15, name: 'Sunil Das', service: 'painter', price: 1599, rating: 4.9, phone: '+91 73456 78901', location: 'Bangalore' },

    // Cleaner
    { id: 16, name: 'Sunita Devi', service: 'cleaning', price: 799, rating: 4.8, phone: '+91 92345 67890', location: 'Delhi' },
    { id: 17, name: 'Kavita Rao', service: 'cleaning', price: 749, rating: 4.7, phone: '+91 81234 56789', location: 'Bangalore' },
    { id: 18, name: 'Rekha Joshi', service: 'cleaning', price: 849, rating: 4.6, phone: '+91 70234 56789', location: 'Mumbai' },
]

const SERVICES = [
    {
        key: 'plumber',
        label: 'Plumber',
        emoji: '🔧',
        price: '₹449–₹529',
        keywords: ['plumber', 'plumbing', 'leak', 'pipe', 'tap', 'toilet', 'drain', 'water'],
        jobTitle: 'Plumbing Repair & Installation',
        jobSalary: '₹299–₹799',
    },
    {
        key: 'electrician',
        label: 'Electrician',
        emoji: '⚡',
        price: '₹549–₹649',
        keywords: ['electrician', 'electric', 'wiring', 'light', 'fan', 'switch', 'power', 'socket'],
        jobTitle: 'Electrician — Wiring & Fitting',
        jobSalary: '₹499–₹1,499',
    },
    {
        key: 'ac',
        label: 'AC Technician',
        emoji: '❄️',
        price: '₹749–₹849',
        keywords: ['ac', 'air conditioner', 'air conditioning', 'cooling', 'ac repair', 'ac service', 'gas refill'],
        jobTitle: 'AC Service & Gas Recharge',
        jobSalary: '₹599–₹1,999',
    },
    {
        key: 'carpenter',
        label: 'Carpenter',
        emoji: '🪚',
        price: '₹379–₹449',
        keywords: ['carpenter', 'carpentry', 'furniture', 'door', 'wood', 'table', 'chair', 'bed', 'cabinet'],
        jobTitle: 'Carpenter — Furniture Repair',
        jobSalary: '₹399–₹1,299',
    },
    {
        key: 'painter',
        label: 'Painter',
        emoji: '🖌️',
        price: '₹1,399–₹1,599',
        keywords: ['painter', 'paint', 'painting', 'wall', 'color', 'interior', 'exterior', 'putty'],
        jobTitle: 'Wall Painting — Interior',
        jobSalary: '₹1,499–₹9,999',
    },
    {
        key: 'cleaning',
        label: 'Home Cleaner',
        emoji: '🧹',
        price: '₹749–₹849',
        keywords: ['cleaning', 'clean', 'cleaner', 'deep clean', 'sweep', 'mop', 'maid', 'sofa', 'sanitise', 'sanitize'],
        jobTitle: 'Home Deep Cleaning',
        jobSalary: '₹799–₹2,499',
    },
]

const JOB_KEYWORDS = ['job', 'work', 'employment', 'vacancy', 'career', 'apply', 'hiring', 'hire me', 'need work', 'looking for work', 'looking for job', 'get job', 'find job']
const CONTACT_KEYWORDS = ['contact', 'phone', 'number', 'call', 'mobile', 'reach', 'whatsapp', 'how can i contact', 'get in touch']
const GREETING_KEYWORDS = ['hi', 'hello', 'hey', 'namaste', 'hii', 'helo', 'howdy', 'good morning', 'good evening', 'good afternoon']
const PRICING_KEYWORDS = ['price', 'cost', 'rate', 'charge', 'fee', 'how much', 'pricing', 'charges', 'amount']
const LIST_KEYWORDS = ['available', 'list', 'show', 'find', 'near me', 'nearby', 'professionals', 'who', 'any', 'book']

// ─── INTENT DETECTION ────────────────────────────────────────────────────────

function detectService(input) {
    return SERVICES.find(s => s.keywords.some(kw => input.includes(kw))) || null
}

function detectIntent(input) {
    const i = input.toLowerCase()

    if (JOB_KEYWORDS.some(kw => i.includes(kw))) return 'job'
    if (CONTACT_KEYWORDS.some(kw => i.includes(kw))) return 'contact'
    if (GREETING_KEYWORDS.some(kw => i.includes(kw))) return 'greeting'
    if (PRICING_KEYWORDS.some(kw => i.includes(kw))) return 'pricing'
    if (LIST_KEYWORDS.some(kw => i.includes(kw))) return 'list'
    if (detectService(i)) return 'service'
    return 'unknown'
}

// ─── BOT BRAIN ───────────────────────────────────────────────────────────────

function getBotResponse(userInput, conversationState) {
    const input = userInput.toLowerCase().trim()
    const intent = detectIntent(input)
    const matchedService = detectService(input)

    // ── GREETING ──────────────────────────────────────
    if (intent === 'greeting') {
        const greetings = [
            "Namaste! 👋 Welcome to **WorkIndia Services**. Are you looking to **book a service** or **find a job**?",
            "Hello! Great to have you here. 😊 I can help you find service professionals or explore job opportunities. What do you need?",
            "Hi there! I'm your WorkIndia Assistant. Tell me — are you a **customer** looking for help at home, or a **professional** seeking work?",
        ]
        return { text: greetings[Math.floor(Math.random() * greetings.length)], state: {} }
    }

    // ── JOB SEEKER ────────────────────────────────────
    if (intent === 'job') {
        if (matchedService) {
            const s = matchedService
            return {
                text: `💼 Great news! We have active openings for **${s.label}s**:\n\n**${s.jobTitle}**\n💰 Salary: ${s.jobSalary} per job\n📍 Multiple cities available\n🕐 Flexible working hours\n\nTo apply, please **register as a Service Provider** from the top navigation bar. Would you like help with that?`,
                state: {},
            }
        }
        return {
            text: `💼 We're always hiring skilled professionals! WorkIndia has opportunities for **plumbers, electricians, AC technicians, carpenters, painters**, and **home cleaners**.\n\nWhich trade are you skilled in? I'll show you the relevant job openings.`,
            state: { awaitingJobCategory: true },
        }
    }

    // ── JOB CATEGORY FOLLOW-UP ───────────────────────
    if (conversationState.awaitingJobCategory) {
        const s = detectService(input) || SERVICES.find(sv => sv.label.toLowerCase().includes(input))
        if (s) {
            return {
                text: `💼 Here are active openings for **${s.label}s**:\n\n**${s.jobTitle}**\n💰 Salary: ${s.jobSalary} per job\n📍 Multiple cities — Bangalore, Delhi, Mumbai, Hyderabad & more\n🕐 Choose your own schedule\n\nClick **"Register"** in the nav bar to create a provider account and start receiving job leads. Need guidance on signing up?`,
                state: {},
            }
        }
    }

    // ── PRICING ───────────────────────────────────────
    if (intent === 'pricing') {
        if (matchedService) {
            const s = matchedService
            return {
                text: `${s.emoji} **${s.label} Service Pricing**\n\nStarting from **${s.price}** per visit.\n\nPrice depends on the scope of work. All visits include a free inspection. Would you like to **see available ${s.label}s** or **book one directly**?`,
                state: { lastService: s.key },
            }
        }
        // Generic pricing list
        const priceList = SERVICES.map(s => `${s.emoji} **${s.label}**: ${s.price}`).join('\n')
        return {
            text: `Here's our current pricing across all services:\n\n${priceList}\n\nWhich service would you like to know more about?`,
            state: {},
        }
    }

    // ── CONTACT DETAILS ───────────────────────────────
    if (intent === 'contact') {
        // Try to find a name mentioned
        const lastPros = conversationState.lastProfessionals || []
        const namedPro = lastPros.find(p => input.includes(p.name.split(' ')[0].toLowerCase()))
        if (namedPro) {
            return {
                text: `📞 You can contact **${namedPro.name}** at:\n\n**${namedPro.phone}**\n\nFeel free to call or WhatsApp them directly. Is there anything else I can help with?`,
                state: conversationState,
            }
        }
        if (lastPros.length > 0) {
            const nameList = lastPros.map((p, i) => `${i + 1}. ${p.name}`).join('\n')
            return {
                text: `Which professional would you like to contact? Please share the name:\n\n${nameList}`,
                state: conversationState,
            }
        }
        return {
            text: `Could you tell me which **service professional** you'd like to contact? For example — "contact details of Ramesh" or first ask me to list professionals for a service.`,
            state: {},
        }
    }

    // ── LIST / SHOW PROFESSIONALS ──────────────────────
    if (intent === 'list' || (matchedService && (intent === 'service' || intent === 'unknown'))) {
        const serviceToShow = matchedService || (conversationState.lastService ? SERVICES.find(s => s.key === conversationState.lastService) : null)
        if (serviceToShow) {
            const pros = PROFESSIONALS.filter(p => p.service === serviceToShow.key)
            const proList = pros.map(p => `**${p.name}** – ₹${p.price} – ⭐${p.rating}`).join('\n')
            return {
                text: `${serviceToShow.emoji} Here are the available **${serviceToShow.label}** professionals:\n\n${proList}\n\nWould you like to contact any of them? Just tell me the name!`,
                state: { lastService: serviceToShow.key, lastProfessionals: pros },
            }
        }
        // No specific service found — ask
        const serviceMenu = SERVICES.map(s => `${s.emoji} ${s.label}`).join('   ')
        return {
            text: `Which service professionals would you like to see?\n\n${serviceMenu}\n\nJust type the service name (e.g. "show plumbers" or "list electricians").`,
            state: {},
        }
    }

    // ── REGISTER / ACCOUNT ────────────────────────────
    if (input.includes('register') || input.includes('create account') || input.includes('sign up') || input.includes('join')) {
        return {
            text: `To get started, click **"Register"** in the top navigation bar. You can join as a:\n\n👤 **Customer** — to book home services\n🔧 **Service Provider** — to receive job leads\n\nThe sign-up takes less than 2 minutes!`,
            state: {},
        }
    }

    // ── BOOKING ───────────────────────────────────────
    if (input.includes('book') || input.includes('schedule') || input.includes('appointment')) {
        const svc = matchedService
        if (svc) {
            const pros = PROFESSIONALS.filter(p => p.service === svc.key)
            const proList = pros.map(p => `**${p.name}** – ₹${p.price} – ⭐${p.rating}`).join('\n')
            return {
                text: `${svc.emoji} To book a **${svc.label}**, here are our available professionals:\n\n${proList}\n\nTell me which one you'd like and I'll share their contact details!`,
                state: { lastService: svc.key, lastProfessionals: pros },
            }
        }
    }

    // ── THANK YOU ─────────────────────────────────────
    if (input.includes('thank') || input.includes('thanks') || input.includes('dhanyawad') || input.includes('shukriya')) {
        return {
            text: "You're welcome! 😊 It was my pleasure. If you need anything else — whether it's finding a professional, checking prices, or exploring job opportunities — I'm right here. Have a wonderful day! 🙏",
            state: {},
        }
    }

    // ── FALLBACK ──────────────────────────────────────
    const fallbacks = [
        "I'm here to help! You can ask me to:\n\n🔍 **List professionals** — _\"Show available plumbers\"_\n💰 **Check prices** — _\"What is the cost of AC service?\"_\n📞 **Get contact** — _\"Phone number of Ramesh\"_\n💼 **Find jobs** — _\"I'm looking for work as an electrician\"_\n\nWhat would you like to do?",
        "I didn't quite catch that. Here's what I can help with:\n\n• List available professionals for any service\n• Share pricing details\n• Provide contact numbers\n• Help job seekers find opportunities\n\nTry asking something like _\"Show electricians near me\"_ or _\"I need a plumber\"_.",
    ]
    return { text: fallbacks[Math.floor(Math.random() * fallbacks.length)], state: {} }
}

// ─── RICH TEXT RENDERER ──────────────────────────────────────────────────────
// Parses **bold** and newlines into JSX
function RichText({ text }) {
    return (
        <span>
            {text.split('\n').map((line, li) => {
                const parts = line.split(/(\*\*[^*]+\*\*)/g)
                return (
                    <span key={li}>
                        {parts.map((part, pi) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                                return <strong key={pi} className="font-semibold">{part.slice(2, -2)}</strong>
                            }
                            // Render italic-style underscores (for _example_)
                            const itParts = part.split(/(_[^_]+_)/g)
                            return itParts.map((ip, ii) =>
                                ip.startsWith('_') && ip.endsWith('_')
                                    ? <em key={ii} className="italic opacity-80">{ip.slice(1, -1)}</em>
                                    : <span key={ii}>{ip}</span>
                            )
                        })}
                        {li < text.split('\n').length - 1 && <br />}
                    </span>
                )
            })}
        </span>
    )
}

// ─── MESSAGE BUBBLE ──────────────────────────────────────────────────────────
function MessageBubble({ msg }) {
    const isBot = msg.role === 'bot'
    return (
        <div className={`flex gap-3 ${isBot ? 'justify-start' : 'justify-end'} animate-slide-up`}>
            {isBot && (
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-accent-400 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-md self-end">
                    🤖
                </div>
            )}
            <div className={`max-w-[78%] ${isBot ? 'order-2' : 'order-1'}`}>
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${isBot
                    ? 'bg-white text-gray-800 rounded-bl-sm border border-gray-100'
                    : 'bg-gradient-to-br from-primary-600 to-accent-400 text-white rounded-br-sm'
                    }`}>
                    {isBot ? <RichText text={msg.text} /> : msg.text}
                </div>
                <p className={`text-xs text-gray-400 mt-1 ${isBot ? 'text-left' : 'text-right'}`}>{msg.time}</p>
            </div>
            {!isBot && (
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-400 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-md self-end order-2">
                    U
                </div>
            )}
        </div>
    )
}

function TypingIndicator() {
    return (
        <div className="flex gap-3 justify-start">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-accent-400 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-md self-end">
                🤖
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                <div className="flex gap-1 items-center h-4">
                    <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
            </div>
        </div>
    )
}

// ─── QUICK PROMPTS ───────────────────────────────────────────────────────────
const QUICK_PROMPTS = [
    { label: '🔧 Available plumbers', value: 'Show available plumbers near me' },
    { label: '⚡ List electricians', value: 'List electricians near me' },
    { label: '❄️ AC technicians', value: 'Show available AC technicians' },
    { label: '💰 Service pricing', value: 'What are the prices for all services?' },
    { label: '🧹 Book a cleaner', value: 'Book a home cleaner' },
    { label: '💼 I need a job', value: 'I am looking for a job' },
]

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
const WELCOME_MSG = {
    id: 1,
    role: 'bot',
    text: "Namaste! 👋 Welcome to **WorkIndia Smart Assistant**.\n\nI can help you:\n🏠 **Book home services** — plumbers, electricians, AC repair & more\n📞 **Get contact details** of any professional\n💰 **Check service pricing**\n💼 **Find job opportunities** if you're a skilled professional\n\nWhat would you like to do today?",
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
}

export default function ChatbotPage() {
    const [messages, setMessages] = useState([WELCOME_MSG])
    const [input, setInput] = useState('')
    const [typing, setTyping] = useState(false)
    const [convState, setConvState] = useState({})
    const bottomRef = useRef(null)

    const getTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    const sendMessage = (text) => {
        const userText = (text || input).trim()
        if (!userText) return

        const userMsg = { id: Date.now(), role: 'user', text: userText, time: getTime() }
        setMessages(prev => [...prev, userMsg])
        setInput('')
        setTyping(true)

        setTimeout(() => {
            const { text: botText, state: newState } = getBotResponse(userText, convState)
            setConvState(prev => ({ ...prev, ...newState }))
            setTyping(false)
            const botMsg = { id: Date.now() + 1, role: 'bot', text: botText, time: getTime() }
            setMessages(prev => [...prev, botMsg])
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

            {/* ── Chat Header ─────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-4 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-600 to-accent-400 flex items-center justify-center text-xl shadow-lg">
                    🤖
                </div>
                <div>
                    <h2 className="font-bold text-gray-900">WorkIndia Smart Assistant</h2>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-xs text-gray-500">Online — responds instantly</span>
                    </div>
                </div>
                <div className="ml-auto flex items-center gap-3">
                    {/* Capability badges */}
                    <div className="hidden sm:flex gap-2">
                        {['Book Services', 'Find Jobs', 'Get Contacts'].map(cap => (
                            <span key={cap} className="text-xs bg-primary-50 text-primary-700 px-2.5 py-1 rounded-full font-medium border border-primary-100">
                                {cap}
                            </span>
                        ))}
                    </div>
                    <button
                        id="clear-chat-btn"
                        onClick={() => { setMessages([WELCOME_MSG]); setConvState({}) }}
                        className="text-xs text-gray-400 hover:text-red-500 transition-colors font-medium"
                    >
                        Clear
                    </button>
                </div>
            </div>

            {/* ── Messages Area ────────────────────────────── */}
            <div className="flex-1 overflow-y-auto bg-gray-50 rounded-2xl border border-gray-100 p-4 space-y-4 min-h-0">
                {messages.map(msg => (
                    <MessageBubble key={msg.id} msg={msg} />
                ))}
                {typing && <TypingIndicator />}
                <div ref={bottomRef} />
            </div>

            {/* ── Quick Prompts ────────────────────────────── */}
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {QUICK_PROMPTS.map((p, idx) => (
                    <button
                        key={p.value}
                        id={`quick-prompt-${idx}`}
                        onClick={() => sendMessage(p.value)}
                        disabled={typing}
                        className="flex-shrink-0 text-xs bg-white border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-full transition-all duration-200 font-medium disabled:opacity-50"
                    >
                        {p.label}
                    </button>
                ))}
            </div>

            {/* ── Input Area ───────────────────────────────── */}
            <div className="mt-3 bg-white rounded-2xl border border-gray-200 shadow-sm flex items-end gap-3 p-3 focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-100 transition-all duration-200">
                <textarea
                    id="chat-input"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder='Try "Show available plumbers" or "I need a job as electrician"...'
                    rows={1}
                    className="flex-1 resize-none outline-none text-sm text-gray-800 placeholder-gray-400 max-h-28 leading-relaxed bg-transparent"
                />
                <button
                    id="chat-send-btn"
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
