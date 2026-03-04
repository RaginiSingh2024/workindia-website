import { useEffect, useMemo, useRef, useState, useCallback } from 'react'

function MessageBubble({ msg }) {
    const isBot = msg.role === 'bot'
    return (
        <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} animate-slide-up`}>
            <div
                className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${isBot
                    ? 'bg-white text-gray-800 border border-gray-100 rounded-bl-sm shadow-sm'
                    : 'bg-gradient-to-br from-primary-600 to-accent-400 text-white rounded-br-sm shadow-md'
                    }`}
            >
                {msg.text}
            </div>
        </div>
    )
}

const ONBOARDING_STEPS = [
    { key: 'fullName', question: "Hi! I'm your Career Assistant AI 🤖\n\nLet's build your profile. What's your full name?", placeholder: 'Full name' },
    { key: 'title', question: 'What is your professional title or the type of work you do?', placeholder: 'e.g. Electrician, Plumber, Data Entry' },
    { key: 'salaryType', question: 'Do you prefer a monthly salary or hourly pay?', kind: 'salaryType' },
    { key: 'expectedSalary', question: 'What is your expected salary?', placeholder: 'e.g. ₹25,000/month or ₹150/hour', kind: 'salary' },
    { key: 'currentLocation', question: 'Which city are you currently based in?', placeholder: 'e.g. Mumbai' },
    { key: 'preferredLocation', question: 'Which city/area do you prefer to work in?', placeholder: 'e.g. Pune, Navi Mumbai' },
]

// ─── UTILS & BILINGUAL LAYER ───────────────────────────────────────────────────
const isHindiText = (text) => /[\u0900-\u097F]/.test(text)

function formatBilingualSeeker(englishText) {
    const HINDI_MAP = [
        ['salary range is', 'आपके क्षेत्र में प्रोफेशनल्स के लिए आमतौर पर वेतन सीमा ₹18,000–₹45,000/महीना होती है। आपका वेतन अपेक्षा बाजार के अनुरूप है। 💡 टिप: अधिक वेतन के लिए सर्टिफिकेशन जोड़ें।'],
        ['opportunities matching your', 'मुझे आपके क्षेत्र में आपकी स्किल्स से मेल खाती हुई नौकरियां मिलीं:\n\n🔧 QuickFix Services — ₹299–₹799/visit\n🏠 HomeHero India — ₹500–₹1,200/day\n⚡ PrimeWork — ₹22,000/month'],
        ['Here are my top tips', 'आप जैसे प्रोफेशनल्स के लिए मेरे शीर्ष सुझाव:\n1️⃣ अपनी प्रोफ़ाइल फ़ोटो पेशेवर रखें\n2️⃣ सरकारी आईडी जोड़ें\n3️⃣ हर काम के बाद रिव्यू मांगें\n4️⃣ 1 घंटे के भीतर जवाब दें\n5️⃣ अपना कार्यक्षेत्र बढ़ाएं'],
        ['You can update your profile', 'ज़रूर! आप अपनी प्रोफ़ाइल जानकारी कभी भी अपडेट कर सकते हैं। बस 📝 "Update My Info" पर क्लिक करें।'],
        ['Your current location', 'आपका वर्तमान स्थान और पसंदीदा कार्य क्षेत्र हमारे पास है। इसे बदलने के लिए प्रोफ़ाइल टैब पर जाएँ।'],
        ['How can I help you today', 'मैं आज आपकी कैसे मदद कर सकता हूँ? आप नौकरियों या वेतन के बारे में पूछ सकते हैं!'],
        ['explore the Browse', 'अधिक जानकारी के लिए सेवाएँ (Services) टैब देखें। आप मुझसे वेतन और सुझावों के बारे में भी पूछ सकते हैं। 😊'],
        ['Profile saved', '✅ प्रोफाइल सेव हो गई!\n\nयहाँ आपका सारांश है:'],
        ['Welcome back', 'वापसी पर स्वागत है! 👋\n\nआपकी प्रोफाइल तैयार है। मुझसे कुछ भी पूछें — नौकरियां, वेतन सुझाव या अवसर।']
    ]
    for (let [frag, hi] of HINDI_MAP) {
        if (englishText.includes(frag)) return `${hi}\n\n${englishText}`
    }
    return englishText
}

function extractProfileOneShot(text) {
    const textLower = text.toLowerCase()

    let fullName = 'User'
    let title = 'Professional'
    let expectedSalary = 'Negotiable'
    let location = 'India'

    // Name
    const nameMatch = text.match(/(?:nam|name is|naam|naam hai|i am|am|mera naam|my name is)\s+([A-Za-z]+)/i)
    if (nameMatch) fullName = nameMatch[1]

    // Job Title
    const knownJobs = ['plumber', 'electrician', 'driver', 'carpenter', 'painter', 'cleaner', 'data entry', 'maid']
    for (const job of knownJobs) {
        if (textLower.includes(job)) {
            title = job.charAt(0).toUpperCase() + job.slice(1)
            break
        }
    }

    // Salary
    const salaryMatch = text.match(/([\d,]{2,10}(?:\s*(?:k|thousand|000))?)/i)
    if (salaryMatch) expectedSalary = `₹${salaryMatch[0].replace(/k/i, '000')}`

    // Location
    const knownCities = ['mumbai', 'pune', 'delhi', 'bangalore', 'chennai', 'hyderabad', 'kolkata']
    for (const city of knownCities) {
        if (textLower.includes(city)) {
            location = city.charAt(0).toUpperCase() + city.slice(1)
            break
        }
    }

    return { fullName, title, salaryType: 'monthly', expectedSalary, currentLocation: location, preferredLocation: location }
}

// Simple AI response engine for post-onboarding queries
function generateAIResponse(userText, profile) {
    const lower = userText.toLowerCase()

    if (lower.includes('salary') || lower.includes('pay') || lower.includes('wage')) {
        return `Based on your profile as a ${profile.title || 'professional'} in ${profile.preferredLocation || 'your area'}, the typical salary range is ₹18,000–₹45,000/month depending on experience. Your expectation of ${profile.expectedSalary} is ${lower.includes('reasonable') ? '' : 'well '}within market range. 💡 Tip: Highlight certifications to command higher rates.`
    }
    if (lower.includes('job') || lower.includes('work') || lower.includes('service') || lower.includes('booking')) {
        return `I found opportunities matching your ${profile.title || 'skill set'} in ${profile.preferredLocation || 'your area'}:\n\n🔧 QuickFix Services — ₹299–₹799/visit\n🏠 HomeHero India — ₹500–₹1,200/day\n⚡ PrimeWork Contractors — ₹22,000/month\n\nVisit the Browse Services tab to apply!`
    }
    if (lower.includes('tip') || lower.includes('improve') || lower.includes('help') || lower.includes('advice')) {
        return `Here are my top tips for ${profile.title || 'professionals'} like you:\n\n1️⃣ Keep your profile photo professional\n2️⃣ Add verified government ID for trust\n3️⃣ Collect reviews after every job\n4️⃣ Be responsive — reply within 1 hour\n5️⃣ Expand your preferred service area`
    }
    if (lower.includes('update') || lower.includes('change') || lower.includes('edit') || lower.includes('redo')) {
        return `Sure! You can update your profile info anytime. Click "Update My Info" below to re-answer the setup questions, or visit the Profile tab to edit directly. 📝`
    }
    if (lower.includes('location') || lower.includes('area') || lower.includes('city')) {
        return `Your current location is set to ${profile.currentLocation || 'unknown'} and preferred work area is ${profile.preferredLocation || 'unknown'}. Want to update these? Just say "update my info" or visit your Profile tab.`
    }
    if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
        return `Hello ${profile.fullName?.split(' ')[0] || 'there'}! 👋 How can I help you today? You can ask me about jobs, salary tips, how to improve your profile, or anything work-related!`
    }
    return `Great question, ${profile.fullName?.split(' ')[0] || 'there'}! As a ${profile.title || 'professional'} in ${profile.preferredLocation || 'your area'}, I suggest exploring the Browse Services tab for the latest opportunities. You can also ask me about salary expectations, tips to grow, or how to update your information. 😊`
}

export default function SeekerOnboardingChat({ onProfileReady }) {
    const steps = useMemo(() => ONBOARDING_STEPS, [])

    const [messages, setMessages] = useState([])
    const [currentIdx, setCurrentIdx] = useState(0)
    const [input, setInput] = useState('')
    const [saving, setSaving] = useState(false)
    const [completed, setCompleted] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    const [minimized, setMinimized] = useState(false)

    const [answers, setAnswers] = useState({
        fullName: '',
        title: '',
        salaryType: 'monthly',
        expectedSalary: '',
        currentLocation: '',
        preferredLocation: '',
    })

    // Language Mode Sync
    const [languageMode, setLanguageMode] = useState(() => localStorage.getItem('chatLanguageMode') || 'english')

    useEffect(() => {
        const handleModeChange = () => setLanguageMode(localStorage.getItem('chatLanguageMode') || 'english')
        window.addEventListener('storage', handleModeChange)
        window.addEventListener('languageModeChanged', handleModeChange)
        return () => {
            window.removeEventListener('storage', handleModeChange)
            window.removeEventListener('languageModeChanged', handleModeChange)
        }
    }, [])

    const endRef = useRef(null)

    // Load persisted data & handle language mode onboarding swaps
    useEffect(() => {
        const stored = localStorage.getItem('seekerProfile')
        const done = localStorage.getItem('seekerOnboardingCompleted')
        if (stored && done) {
            const profile = JSON.parse(stored)
            setAnswers(profile)
            setCompleted(true)
            setCurrentIdx(steps.length)

            const engFree = `Welcome back, ${profile.fullName?.split(' ')[0] || 'there'}! 👋\n\nYour profile is all set. Ask me anything — jobs, salary tips, opportunities, or say "update my info" to refresh your profile.`
            const welcomeText = languageMode === 'bilingual' ? formatBilingualSeeker(engFree) : engFree
            setMessages([{ id: 1, role: 'bot', text: welcomeText }])
            onProfileReady?.(profile, false)
        } else {
            // Uncompleted onboarding start
            if (languageMode === 'bilingual') {
                setMessages([{ id: 1, role: 'bot', text: "नमस्ते! कृपया एक ही संदेश में अपना नाम, काम, अपेक्षित वेतन और शहर बताएं।\n\nHi! I'm your Career Assistant AI 🤖\nPlease tell me your name, profession, expected salary, and city in ONE single message. (e.g. 'I am Amit, Plumber, expecting 25k in Mumbai')" }])
            } else {
                setMessages([{ id: 1, role: 'bot', text: steps[0].question }])
            }
            setCurrentIdx(0) // reset progress if user toggled mid-way
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [languageMode])

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, saving, isTyping])

    const persistProfile = async (payload) => {
        await new Promise(res => setTimeout(res, 800))
        localStorage.setItem('seekerProfile', JSON.stringify(payload))
        localStorage.setItem('seekerOnboardingCompleted', 'true')
    }

    const botReply = useCallback((text, delay = 450) => {
        setIsTyping(true)
        setTimeout(() => {
            setIsTyping(false)
            setMessages(prev => [...prev, { id: Date.now() + Math.random(), role: 'bot', text }])
        }, delay)
    }, [])

    const finish = async (finalAnswers) => {
        setSaving(true)
        setIsTyping(true)
        try {
            await persistProfile(finalAnswers)
        } finally {
            setSaving(false)
            setIsTyping(false)
        }
        setCompleted(true)
        onProfileReady?.(finalAnswers, true)
        const name = finalAnswers.fullName?.split(' ')[0] || 'there'
        const engSummary = `✅ Profile saved, ${name}!\n\nHere's your summary:\n👤 ${finalAnswers.fullName}\n💼 ${finalAnswers.title}\n💰 ${finalAnswers.expectedSalary} (${finalAnswers.salaryType})\n📍 ${finalAnswers.currentLocation} → ${finalAnswers.preferredLocation}\n\nYour overview is ready below. Feel free to ask me anything anytime — I'm always here! 🚀`

        botReply(languageMode === 'bilingual' ? formatBilingualSeeker(engSummary) : engSummary, 600)
    }

    const advanceOnboarding = async (userText) => {
        const step = steps[currentIdx]
        setMessages(prev => [...prev, { id: Date.now(), role: 'user', text: userText }])

        let updatedAnswers = { ...answers }
        if (step.kind === 'salaryType') {
            updatedAnswers.salaryType = userText.toLowerCase().includes('hour') ? 'hourly' : 'monthly'
        } else {
            updatedAnswers[step.key] = userText
        }
        setAnswers(updatedAnswers)

        const nextIdx = currentIdx + 1
        if (nextIdx >= steps.length) {
            await finish(updatedAnswers)
            return
        }

        setCurrentIdx(nextIdx)
        botReply(steps[nextIdx].question)
    }

    const handleFreeChat = (userText) => {
        setMessages(prev => [...prev, { id: Date.now(), role: 'user', text: userText }])
        const englishResponse = generateAIResponse(userText, answers)
        const finalResponse = languageMode === 'bilingual' ? formatBilingualSeeker(englishResponse) : englishResponse
        botReply(finalResponse, 700)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (saving || isTyping) return
        const step = steps[currentIdx]
        const text = input.trim()
        if (!text) return

        if (!completed && languageMode === 'english' && step?.kind === 'salaryType') return

        if (languageMode === 'english' && isHindiText(text)) {
            setMessages(prev => [...prev, { id: Date.now(), role: 'bot', text: '⚠ Please enable Upgrade to chat in Hindi.', time: new Date().toLocaleTimeString() }])
            setInput('')
            return
        }

        setInput('')

        if (completed) {
            handleFreeChat(text)
        } else {
            if (languageMode === 'bilingual') {
                setMessages(prev => [...prev, { id: Date.now(), role: 'user', text }])
                const extractedProfile = extractProfileOneShot(text)
                setAnswers(extractedProfile)
                await finish(extractedProfile)
            } else {
                await advanceOnboarding(text)
            }
        }
    }

    const startOver = () => {
        setCompleted(false)
        setCurrentIdx(0)
        setAnswers({ fullName: '', title: '', salaryType: 'monthly', expectedSalary: '', currentLocation: '', preferredLocation: '' })
        if (languageMode === 'bilingual') {
            setMessages([{ id: Date.now(), role: 'bot', text: "ज़रूर! चलिए आपकी प्रोफ़ाइल अपडेट करते हैं। 📝\nकृपया एक ही संदेश में अपना नाम, काम, अपेक्षित वेतन और शहर बताएं।\n\nSure! Let's update your profile. 📝\nPlease tell me your name, profession, expected salary, and city in ONE single message." }])
        } else {
            setMessages([{ id: Date.now(), role: 'bot', text: "Sure! Let's update your profile. 📝\n\n" + steps[0].question }])
        }
    }

    const showSalaryButtons = !completed && languageMode === 'english' && steps[currentIdx]?.kind === 'salaryType'
    const inputDisabled = saving || isTyping || (!completed && showSalaryButtons)

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-accent-500 px-5 py-4 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-xl">🤖</div>
                    <div>
                        <p className="font-bold text-base leading-tight">Career Assistant AI</p>
                        <p className="text-primary-100 text-xs">
                            {completed ? '✦ Profile complete · Ask me anything' : `Step ${Math.min(currentIdx + 1, steps.length)} of ${steps.length}`}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {completed && (
                        <button
                            onClick={startOver}
                            className="text-xs bg-white/20 hover:bg-white/30 text-white font-semibold px-3 py-1.5 rounded-lg transition-colors"
                        >
                            ✏️ Update Info
                        </button>
                    )}
                    <button
                        onClick={() => setMinimized(m => !m)}
                        className="text-xs bg-white/20 hover:bg-white/30 text-white font-semibold w-7 h-7 rounded-lg transition-colors flex items-center justify-center"
                        aria-label={minimized ? 'Expand' : 'Minimise'}
                    >
                        {minimized ? '▲' : '▼'}
                    </button>
                </div>
            </div>

            {!minimized && (
                <div className="flex flex-col h-[420px] bg-gray-50">
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map(m => (
                            <MessageBubble key={m.id} msg={m} />
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex gap-1 items-center">
                                    <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce [animation-delay:0ms]" />
                                    <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce [animation-delay:150ms]" />
                                    <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce [animation-delay:300ms]" />
                                </div>
                            </div>
                        )}
                        <div ref={endRef} />
                    </div>

                    {/* Input area */}
                    {showSalaryButtons ? (
                        <div className="p-4 bg-white border-t border-gray-100">
                            <p className="text-xs text-gray-400 mb-2 font-medium">Choose your preferred pay type:</p>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => advanceOnboarding('Monthly')}
                                    disabled={saving}
                                    className="flex-1 btn-secondary py-2"
                                >
                                    📅 Monthly
                                </button>
                                <button
                                    type="button"
                                    onClick={() => advanceOnboarding('Hourly')}
                                    disabled={saving}
                                    className="flex-1 btn-secondary py-2"
                                >
                                    ⏱ Hourly
                                </button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-100 flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={
                                    completed
                                        ? (languageMode === 'bilingual' ? 'नौकरियों, वेतन, सुझावों के बारे में पूछें… / Ask me about jobs...' : 'Ask me about jobs, salary, tips…')
                                        : (languageMode === 'bilingual'
                                            ? 'e.g. I am Rahul, Plumber, expecting 20000 in Delhi'
                                            : (steps[currentIdx]?.placeholder || 'Type here…'))
                                }
                                className="flex-1 input-field py-2"
                                autoFocus
                                disabled={inputDisabled}
                            />
                            <button type="submit" className="btn-primary px-5 py-2" disabled={inputDisabled || !input.trim()}>
                                {saving ? '…' : '↑'}
                            </button>
                        </form>
                    )}
                </div>
            )}
        </div>
    )
}
