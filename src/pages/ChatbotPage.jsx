import { useState, useRef, useEffect } from 'react'

// Language content
const CONTENT = {
    en: {
        welcome: "Namaste! 👋 Welcome to **WorkIndia Smart Assistant**.\n\nI can help you:\n🏠 **Book home services** — plumbers, electricians, AC repair & more\n📞 **Get contact details** of any professional\n💰 **Check service pricing**\n💼 **Find job opportunities** if you're a skilled professional\n\nWhat would you like to do today?",
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
        assistantTitle: 'WorkIndia Smart Assistant',
        onlineStatus: 'Online — responds instantly'
    },
    hi: {
        welcome: "नमस्ते! 👋 **वर्कइंडिया स्मार्ट असिस्टेंट** में आपका स्वागत है।\n\nमैं आपकी मदद कर सकता हूं:\n🏠 **घरेलू सेवाएं बुक करें** — प्लंबर, इलेक्ट्रीशियन, AC मरम्मत और अधिक\n📞 किसी भी पेशेवर के **संपर्क विवरण प्राप्त करें**\n💰 **सेवा मूल्य जांचें**\n💼 यदि आप एक कुशल पेशेवर हैं तो **नौकरी के अवसर खोजें**\n\nआप आज क्या करना चाहेंगे?",
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
        assistantTitle: 'वर्कइंडिया स्मार्ट असिस्टेंट',
        onlineStatus: 'ऑनलाइन — तुरंत जवाब देता है'
    }
}

// ─── DATA ────────────────────────────────────────────────────────────────────

const SERVICES = [
    {
        key: 'plumber',
        label: 'Plumber',
        emoji: '🔧',
        price: '₹449–₹529',
        keywords: ['plumber', 'plumbing', 'leak', 'pipe', 'tap', 'toilet', 'drain', 'water'],
    },
    {
        key: 'electrician',
        label: 'Electrician',
        emoji: '⚡',
        price: '₹549–₹649',
        keywords: ['electrician', 'electric', 'wiring', 'light', 'fan', 'switch', 'power', 'socket'],
    },
    {
        key: 'driver',
        label: 'Driver',
        emoji: '🚗',
        price: '₹500–₹1000',
        keywords: ['driver', 'driving', 'car', 'chauffeur', 'cab', 'drive'],
    },
    {
        key: 'carpenter',
        label: 'Carpenter',
        emoji: '🪚',
        price: '₹379–₹449',
        keywords: ['carpenter', 'carpentry', 'furniture', 'door', 'wood', 'table', 'chair', 'bed', 'cabinet'],
    },
    {
        key: 'ac',
        label: 'AC Technician',
        emoji: '❄️',
        price: '₹749–₹849',
        keywords: ['ac', 'air conditioner', 'air conditioning', 'cooling', 'ac repair', 'ac service', 'gas refill'],
    },
    {
        key: 'painter',
        label: 'Painter',
        emoji: '🖌️',
        price: '₹1,399–₹1,599',
        keywords: ['painter', 'paint', 'painting', 'wall', 'color', 'interior', 'exterior', 'putty'],
    },
    {
        key: 'cleaning',
        label: 'Home Cleaner',
        emoji: '🧹',
        price: '₹749–₹849',
        keywords: ['cleaning', 'clean', 'cleaner', 'deep clean', 'sweep', 'mop', 'maid', 'sofa', 'sanitise'],
    },
]

const JOB_LISTINGS = [
    // Electrician
    { id: 'E1', category: 'electrician', title: 'Senior Electrician', company: 'PowerPro Experts', location: 'Bangalore', desc: 'Looking for an experienced electrician for residential wiring and panel installation.', salary: '₹25,000/mo' },
    { id: 'E2', category: 'electrician', title: 'Maintenance Electrician', company: 'City Mall Corp', location: 'Mumbai', desc: 'Full-time electrician needed for daily maintenance of mall lighting and power systems.', salary: '₹22,000/mo' },
    { id: 'E3', category: 'electrician', title: 'Apprentice Electrician', company: 'VoltTech Solutions', location: 'Delhi', desc: 'Great opportunity for freshers to learn commercial wiring and AC installations.', salary: '₹15,000/mo' },
    { id: 'E4', category: 'electrician', title: 'Industrial Electrician', company: 'Steel Works Ltd', location: 'Hyderabad', desc: 'Urgent requirement for heavy machinery electrical maintenance.', salary: '₹30,000/mo' },

    // Plumber
    { id: 'P1', category: 'plumber', title: 'Expert Plumber', company: 'QuickFix Services', location: 'Bangalore', desc: 'Need a plumber for pipeline repairs, bathroom fittings, and leak fixes.', salary: '₹20,000/mo' },
    { id: 'P2', category: 'plumber', title: 'Commercial Plumber', company: 'AquaTech Builders', location: 'Chennai', desc: 'Looking for a plumber for a new commercial building project.', salary: '₹28,000/mo' },
    { id: 'P3', category: 'plumber', title: 'Maintenance Plumber', company: 'Grand Hotel', location: 'Mumbai', desc: 'In-house plumber for hotel room maintenance and water systems.', salary: '₹24,000/mo' },
    { id: 'P4', category: 'plumber', title: 'Plumbing Assistant', company: 'Local Pipes & Co', location: 'Delhi', desc: 'Assist senior plumbers in residential projects. Training provided.', salary: '₹14,000/mo' },

    // Driver
    { id: 'D1', category: 'driver', title: 'Personal Driver', company: 'Private Family', location: 'Mumbai', desc: 'Looking for a reliable personal driver for daily commute. Must have valid license.', salary: '₹18,000/mo' },
    { id: 'D2', category: 'driver', title: 'Delivery Driver', company: 'FastCart Logistics', location: 'Bangalore', desc: 'Delivery driver needed for e-commerce parcel distribution in local areas.', salary: '₹22,000/mo' },
    { id: 'D3', category: 'driver', title: 'Company Chauffeur', company: 'TechNova', location: 'Hyderabad', desc: 'Corporate driver for executives. Minimum 5 years experience required.', salary: '₹25,000/mo' },
    { id: 'D4', category: 'driver', title: 'School Bus Driver', company: 'St. Marys Academy', location: 'Delhi', desc: 'Experienced heavy vehicle driver required for morning and afternoon school routes.', salary: '₹20,000/mo' },

    // Carpenter
    { id: 'C1', category: 'carpenter', title: 'Furniture Carpenter', company: 'WoodArt Studio', location: 'Mumbai', desc: 'Skilled carpenter for custom wooden furniture crafting and polishing.', salary: '₹26,000/mo' },
    { id: 'C2', category: 'carpenter', title: 'Site Carpenter', company: 'BuildRight Construction', location: 'Bangalore', desc: 'Carpenter needed for door frames, window fittings, and interior woodwork.', salary: '₹24,000/mo' },
    { id: 'C3', category: 'carpenter', title: 'Modular Kitchen Expert', company: 'HomeSpace Interiors', location: 'Pune', desc: 'Specialist required for modular kitchen cutting, edge banding, and assembly.', salary: '₹28,000/mo' },
    { id: 'C4', category: 'carpenter', title: 'Repair Carpenter', company: 'FixIt Now', location: 'Delhi', desc: 'Daily repair works including sofa fixing, bed repairs, and lock replacements.', salary: '₹15,000/mo' }
]

const JOB_KEYWORDS = ['job', 'work', 'employment', 'vacancy', 'career', 'apply', 'hiring', 'hire me', 'need work', 'looking for work', 'looking for job', 'get job', 'find job']
const CONTACT_KEYWORDS = ['contact', 'phone', 'number', 'call', 'mobile', 'reach', 'whatsapp']
const GREETING_KEYWORDS = ['hi', 'hello', 'hey', 'namaste', 'hii', 'helo', 'howdy', 'good morning', 'good evening', 'good afternoon']
const PRICING_KEYWORDS = ['price', 'cost', 'rate', 'charge', 'fee', 'how much', 'pricing']
const LIST_KEYWORDS = ['available', 'list', 'show', 'find', 'near me', 'nearby', 'professionals', 'book']

// ─── INTENT DETECTION ────────────────────────────────────────────────────────

function detectService(input) {
    return SERVICES.find(s => s.keywords.some(kw => input.includes(kw))) || null
}

function detectIntent(input) {
    const i = input.toLowerCase()

    if (i === 'i will contact myself') return 'contact_self'
    if (i === 'you contact for me') return 'contact_bot'
    if (i.includes('get contact details for')) return 'contact_request'

    if (JOB_KEYWORDS.some(kw => i.includes(kw))) return 'job'
    if (CONTACT_KEYWORDS.some(kw => i.includes(kw))) return 'contact'
    if (GREETING_KEYWORDS.some(kw => i.includes(kw))) return 'greeting'
    if (PRICING_KEYWORDS.some(kw => i.includes(kw))) return 'pricing'
    if (LIST_KEYWORDS.some(kw => i.includes(kw))) return 'list'
    if (detectService(i)) return 'service_mention'
    return 'unknown'
}

// ─── BOT BRAIN ───────────────────────────────────────────────────────────────

function getBotResponse(userInput, conversationState, userRole) {
    const input = userInput.toLowerCase().trim()
    const intent = detectIntent(input)
    const matchedService = detectService(input)

    // ── GREETING ──────────────────────────────────────
    if (intent === 'greeting') {
        return { text: "Hello! 👋 I'm your WorkIndia Smart Assistant.\n\nI can help you find job openings (like electricians, plumbers, drivers) or provide professional contacts. What are you looking for today?", state: {} }
    }

    // ── CONTACT WORKFLOW ─────────────────────────────
    if (intent === 'contact_request' || intent === 'contact') {
        const match = input.match(/get contact details for\s+(.+)/i)
        const company = match ? match[1].trim() : conversationState.lastCompany || 'the employer'

        return {
            text: `You requested contact details for **${company}**.\n\nWould you like to contact them yourself, or should I contact them on your behalf?`,
            options: ['I will contact myself', 'You contact for me'],
            state: { ...conversationState, lastCompany: company }
        }
    }

    if (intent === 'contact_self') {
        const company = conversationState.lastCompany || 'the employer'
        const phone = '+91 ' + Math.floor(1000000000 + Math.random() * 9000000000)
        return {
            text: `📞 Here are the contact details for **${company}**:\n\n**Contact Name:** HR Manager\n**Phone Number:** ${phone}\n\nYou can call or WhatsApp them directly. Best of luck with your application!`,
            state: { lastCompany: null }
        }
    }

    if (intent === 'contact_bot') {
        const company = conversationState.lastCompany || 'the employer'
        return {
            text: `✅ Done! I have securely sent your profile and expressed your interest to **${company}** on your behalf.\n\nI will notify you in your dashboard as soon as they reply!`,
            state: { lastCompany: null }
        }
    }

    // ── JOB / CATEGORY SEARCH ─────────────────────────
    if (intent === 'job' || intent === 'service_mention') {
        if (matchedService) {
            const s = matchedService
            const matchingJobs = JOB_LISTINGS.filter(j => j.category === s.key)
            if (matchingJobs.length > 0) {
                return {
                    text: `💼 Here are some relevant **${s.label}** openings I found for you:`,
                    jobs: matchingJobs,
                    state: { lastService: s.key }
                }
            } else {
                return {
                    text: `I couldn't find any specific jobs for ${s.label} right now, but I'll keep looking. You can try searching for 'electrician', 'plumber', 'driver', or 'carpenter'.`,
                    state: {}
                }
            }
        }

        if (intent === 'job') {
            return {
                text: `💼 We have open roles for **electricians, plumbers, drivers, carpenters**, and more.\n\nWhich type of job are you looking for?`,
                state: { awaitingJobCategory: true }
            }
        }
    }

    // ── FALLBACK ──────────────────────────────────────
    return {
        text: "I didn't quite catch that. Try asking for specific jobs like:\n\n• _\"Find driver jobs\"_\n• _\"I need an electrician job\"_\n• _\"Show carpenter openings\"_",
        state: conversationState
    }
}

// ─── RICH TEXT RENDERER ──────────────────────────────────────────────────────
function RichText({ text }) {
    if (!text) return null
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
function MessageBubble({ msg, onSend }) {
    const isBot = msg.role === 'bot'
    return (
        <div className={`flex gap-3 ${isBot ? 'justify-start' : 'justify-end'} animate-slide-up`}>
            {isBot && (
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-accent-400 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-md self-end">
                    🤖
                </div>
            )}
            <div className={`w-full max-w-[85%] ${isBot ? 'order-2' : 'order-1'} flex flex-col gap-2`}>
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm w-fit ${isBot || !isBot ? (isBot && isBot ? (isBot ? 'bg-white text-gray-800 rounded-bl-sm border border-gray-100' : '') : '') : ''} ${!isBot ? 'bg-gradient-to-br from-primary-600 to-accent-400 text-white rounded-br-sm ml-auto' : ''}`}>
                    {isBot ? <RichText text={msg.text} /> : msg.text}
                </div>

                {/* Job Cards */}
                {msg.jobs && (
                    <div className="flex flex-col gap-3 mt-1 w-full max-w-sm">
                        {msg.jobs.map(job => (
                            <div key={job.id} className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-sm flex flex-col gap-1.5 hover:border-primary-300 transition-colors">
                                <div className="flex justify-between items-start gap-2">
                                    <h4 className="font-bold text-gray-900 leading-tight">{job.title}</h4>
                                    <span className="text-xs bg-primary-100 text-primary-700 font-semibold px-2 py-0.5 rounded-full flex-shrink-0 whitespace-nowrap">{job.salary}</span>
                                </div>
                                <p className="text-sm font-semibold text-gray-700">{job.company}</p>
                                <p className="text-xs text-gray-500 mb-2 leading-snug">{job.location} • {job.desc}</p>
                                <button
                                    onClick={() => onSend(`Get contact details for ${job.company}`)}
                                    className="text-xs btn-primary py-2 w-full mt-auto font-bold tracking-wide shadow-sm"
                                >
                                    Get Contact Details
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Options / Action Buttons */}
                {msg.options && (
                    <div className="flex flex-wrap gap-2 mt-1">
                        {msg.options.map(opt => (
                            <button
                                key={opt}
                                onClick={() => onSend(opt)}
                                className="text-sm border-2 border-primary-500 text-primary-600 font-semibold px-4 py-2 rounded-xl hover:bg-primary-50 hover:shadow-sm transition-all text-left"
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                )}

                <p className={`text-xs text-gray-400 mt-0.5 ${isBot ? 'text-left' : 'text-right'}`}>{msg.time}</p>
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
                    <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
            </div>
        </div>
    )
}

// ─── QUICK PROMPTS ───────────────────────────────────────────────────────────
const QUICK_PROMPTS = [
    { label: '⚡ Electrician Jobs', value: 'Show electrician jobs' },
    { label: '🔧 Plumber Jobs', value: 'Find plumber jobs' },
    { label: '🚗 Driver Jobs', value: 'I need a job as a driver' },
    { label: '🪚 Carpenter Jobs', value: 'Show carpenter openings' },
]

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
const WELCOME_MSG = {
    id: 1,
    role: 'bot',
    text: "Namaste! 👋 Welcome to **WorkIndia Smart Help AI**.\n\nI can help you find relevant job listings. Try searching for specific jobs like electrician, plumber, driver, or carpenter.\n\nYou can also click the microphone icon to speak your request!",
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
}

export default function ChatbotPage() {
    const [language, setLanguage] = useState(() => localStorage.getItem('chatLanguage') || 'en')
    const [messages, setMessages] = useState([{
        id: 1,
        role: 'bot',
        text: CONTENT[language].welcome,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }])
    const [input, setInput] = useState('')
    const [typing, setTyping] = useState(false)
    const [convState, setConvState] = useState({})
    const [userRole, setUserRole] = useState('jobseeker')
    const [listening, setListening] = useState(false)
    const bottomRef = useRef(null)

    // Speech Recognition Setup
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || false;
    const recognition = useRef(null)

    useEffect(() => {
        if (SpeechRecognition) {
            recognition.current = new SpeechRecognition()
            recognition.current.continuous = false
            recognition.current.interimResults = false
            recognition.current.lang = 'en-IN'

            recognition.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript
                setInput(transcript)
            }

            recognition.current.onerror = (event) => {
                console.error('Speech recognition error', event.error)
                setListening(false)
            }

            recognition.current.onend = () => {
                setListening(false)
            }
        }
    }, [])

    useEffect(() => {
        const storedRole = localStorage.getItem('userRole') || 'jobseeker'
        setUserRole(storedRole)
    }, [])

    useEffect(() => {
        localStorage.setItem('chatLanguage', language)
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
        if (listening && recognition.current) {
            recognition.current.stop()
            setListening(false)
        }
        setTyping(true)

        setTimeout(() => {
            const { text: botText, state: newState, options, jobs } = getBotResponse(userText, convState, userRole)
            setConvState(prev => ({ ...prev, ...newState }))
            setTyping(false)
            const botMsg = { id: Date.now() + 1, role: 'bot', text: botText, options, jobs, time: getTime() }
            setMessages(prev => [...prev, botMsg])
        }, 800 + Math.random() * 400)
    }

    const toggleListening = () => {
        if (!recognition.current) {
            alert("Your browser does not support Speech Recognition. Please try using Google Chrome.")
            return
        }
        if (listening) {
            recognition.current.stop()
        } else {
            setInput('')
            recognition.current.start()
            setListening(true)
        }
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
                    <button
                        id="clear-chat-btn"
                        onClick={() => { setMessages([{ id: 1, role: 'bot', text: CONTENT[language].welcome, time: getTime() }]); setConvState({}) }}
                        className="text-xs text-gray-400 hover:text-red-500 transition-colors font-medium bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200"
                    >
                        {CONTENT[language].clearBtn}
                    </button>
                </div>
            </div>

            {/* ── Messages Area ────────────────────────────── */}
            <div className="flex-1 overflow-y-auto bg-gray-50 rounded-2xl border border-gray-100 p-4 space-y-4 min-h-0">
                {messages.map(msg => (
                    <MessageBubble key={msg.id} msg={msg} onSend={sendMessage} />
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
                        className="flex-shrink-0 text-xs bg-white border border-primary-200 text-primary-700 hover:bg-primary-50 px-3.5 py-2 rounded-full transition-all duration-200 font-semibold disabled:opacity-50 shadow-sm"
                    >
                        {p.label}
                    </button>
                ))}
            </div>

            {/* ── Input Area ───────────────────────────────── */}
            <div className="mt-3 bg-white rounded-2xl border border-gray-200 shadow-sm flex items-end gap-2 p-2 focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-100 transition-all duration-200">
                <button
                    onClick={toggleListening}
                    className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 shadow-sm flex-shrink-0 ${listening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    aria-label="Voice Input"
                    title={listening ? "Listening..." : "Click to speak"}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                </button>

                <textarea
                    id="chat-input"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={listening ? (language === 'hi' ? "सुन रहा हूं... अब बोलें" : "Listening... speak now") : CONTENT[language].placeholder}
                    rows={1}
                    className="flex-1 resize-none outline-none text-sm text-gray-800 placeholder-gray-400 max-h-28 leading-relaxed bg-transparent py-3 px-2"
                />

                <button
                    id="chat-send-btn"
                    onClick={() => sendMessage()}
                    disabled={!input.trim() || typing}
                    className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-600 to-accent-400 flex items-center justify-center text-white hover:from-primary-700 hover:to-accent-600 transition-all duration-200 shadow-md disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                    aria-label="Send message"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
