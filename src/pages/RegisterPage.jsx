import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function RegisterPage() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        fullName: '',
        phone: '',
        profession: '',
        password: '',
        role: 'jobseeker', // default role
    })
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const [showChatbot, setShowChatbot] = useState(false)
    const [chatbotStep, setChatbotStep] = useState(0)
    const [messages, setMessages] = useState([])
    const [chatInput, setChatInput] = useState('')
    const chatEndRef = useRef(null)

    const steps = [
        { field: 'fullName', question: "Hi! I'm your WorkIndia assistant. Let's get you registered. What's your **Full Name**?", placeholder: 'Enter your name...' },
        { field: 'phone', question: "Great! And what's your **Phone Number**?", placeholder: '10-digit mobile number...' },
        { field: 'role', question: "Are you here to **Hire** someone or **Find Work**? (Type 'Job Provider' or 'Job Seeker')", placeholder: "Type 'Job Provider' or 'Job Seeker'..." },
        { field: 'profession', question: "What is your **Profession**? (Painter, Electrician, or Plumber)", placeholder: 'Select your profession...' },
        { field: 'password', question: "Finally, set a **4-digit numeric PIN** as your password (digits only, e.g. 1234).", placeholder: 'Enter 4-digit PIN...', type: 'password' },
    ]

    useEffect(() => {
        if (showChatbot && messages.length === 0) {
            setMessages([{ role: 'bot', text: steps[0].question }])
        }
    }, [showChatbot])

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleChatSubmit = (e) => {
        e.preventDefault()
        if (!chatInput.trim()) return

        const currentStep = steps[chatbotStep]
        const userInput = chatInput.trim()

        // Special handling for role selection in chat
        let val = userInput
        if (currentStep.field === 'role') {
            if (userInput.toLowerCase().includes('provider')) val = 'employer'
            else if (userInput.toLowerCase().includes('seeker')) val = 'jobseeker'
        }

        // Update form state
        setForm(prev => ({ ...prev, [currentStep.field]: val }))

        // Update messages
        const newMessages = [...messages, { role: 'user', text: userInput }]
        setMessages(newMessages)
        setChatInput('')

        // Move to next step or finish
        let nextStepIdx = chatbotStep + 1

        // Skip Profession if Role is Job Provider (employer)
        if (currentStep.field === 'role' && val === 'employer') {
            nextStepIdx = steps.findIndex(s => s.field === 'password')
        }

        if (nextStepIdx < steps.length) {
            setChatbotStep(nextStepIdx)
            setTimeout(() => {
                setMessages(prev => [...prev, { role: 'bot', text: steps[nextStepIdx].question }])
            }, 600)
        } else {
            setTimeout(() => {
                setMessages(prev => [...prev, { role: 'bot', text: "Perfect! I've filled out the registration form for you. Please review your details and click the **'Create Account'** button below to finish! 🚀" }])
            }, 600)
        }
    }

    const validate = () => {
        const e = {}
        if (!form.fullName.trim()) e.fullName = 'Name is required'
        if (!/^\d{10}$/.test(form.phone)) e.phone = 'Enter a valid 10-digit phone number'
        if (form.role === 'jobseeker' && !form.profession) e.profession = 'Please select a profession'
        if (!form.password) {
            e.password = 'Password is required'
        } else if (!/^\d{4}$/.test(form.password)) {
            e.password = 'Password must be exactly 4 digits (numbers only)'
        }
        if (!form.role) e.role = 'Please select a role'
        return e
    }

    const handleChange = e => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
    }

    const handleSubmit = e => {
        e.preventDefault()
        const validationErrors = validate()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            setShowChatbot(false)
        } else {
            // Save user data (simulated)
            localStorage.setItem('userRole', form.role)
            localStorage.setItem('userName', form.fullName)
            setSubmitted(true)
        }
    }

    if (submitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-400/10 flex items-center justify-center p-4">
                <div className="card max-w-md w-full text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-4xl">🎉</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">Account Created!</h2>
                    <p className="text-gray-500 mb-6">Welcome to WorkIndia. Your profile is ready to go!</p>
                    <Link to="/login" className="btn-primary w-full inline-block text-center">
                        Continue to Login
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-400/10 flex items-center justify-center p-4">
            {/* Background Blobs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-200 rounded-full blur-3xl opacity-30" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent-400 rounded-full blur-3xl opacity-20" />
            </div>

            <div className="relative w-full max-w-lg">
                {/* Header */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-accent-400 flex items-center justify-center shadow-md">
                            <span className="text-white font-bold">W</span>
                        </div>
                        <span className="text-2xl font-bold gradient-text">WorkIndia</span>
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Create your account</h1>
                    <p className="text-gray-500 mt-2">Join millions of Indians on WorkIndia</p>
                </div>

                {/* Chatbot Toggle Button */}
                <div className="flex justify-center mb-6">
                    <button
                        onClick={() => setShowChatbot(!showChatbot)}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold transition-all shadow-md ${showChatbot
                            ? 'bg-gray-100 text-gray-600'
                            : 'bg-gradient-to-r from-primary-600 to-accent-400 text-white hover:shadow-lg scale-105 active:scale-100'
                            }`}
                    >
                        {showChatbot ? '❌ Close Chatbot' : '🤖 Fill with Chatbot'}
                    </button>
                </div>

                {/* Main Container */}
                <div className="card shadow-xl border-0 overflow-hidden p-0">
                    {showChatbot ? (
                        <div className="flex flex-col h-[500px] bg-gray-50">
                            {/* Chat Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messages.map((msg, idx) => (
                                    <div key={idx} className={`flex ${msg.role === 'bot' ? 'justify-start' : 'justify-end'} animate-fade-in`}>
                                        <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm ${msg.role === 'bot'
                                            ? 'bg-white text-gray-800 border border-gray-100 rounded-bl-sm shadow-sm'
                                            : 'bg-primary-600 text-white rounded-br-sm shadow-md'
                                            }`}>
                                            {msg.text.split('**').map((part, i) => (
                                                i % 2 === 1 ? <strong key={i} className="font-bold">{part}</strong> : part
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                <div ref={chatEndRef} />
                            </div>

                            {/* Chat Input */}
                            <form onSubmit={handleChatSubmit} className="p-4 bg-white border-t border-gray-100 flex gap-2">
                                <input
                                    type={steps[chatbotStep]?.type || 'text'}
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    placeholder={steps[chatbotStep]?.placeholder || 'Type here...'}
                                    className="flex-1 input-field py-2"
                                    autoFocus
                                />
                                <button
                                    type="submit"
                                    className="btn-primary px-5 py-2"
                                    disabled={!chatInput.trim()}
                                >
                                    Send
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="p-6 lg:p-8">
                            <form id="register-form" onSubmit={handleSubmit} noValidate className="space-y-5">
                                {/* Role Selection */}
                                <div className="space-y-3">
                                    <label className="label block text-center">I want to...</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setForm(prev => ({ ...prev, role: 'employer' }))}
                                            className={`p-4 rounded-2xl border-2 transition-all text-center group ${form.role === 'employer'
                                                ? 'border-primary-600 bg-primary-50 ring-2 ring-primary-100'
                                                : 'border-gray-100 hover:border-primary-200'
                                                }`}
                                        >
                                            <span className="text-2xl block mb-1 group-hover:scale-110 transition-transform">💼</span>
                                            <span className={`text-sm font-bold ${form.role === 'employer' ? 'text-primary-700' : 'text-gray-600'}`}>Job Provider</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setForm(prev => ({ ...prev, role: 'jobseeker' }))}
                                            className={`p-4 rounded-2xl border-2 transition-all text-center group ${form.role === 'jobseeker'
                                                ? 'border-primary-600 bg-primary-50 ring-2 ring-primary-100'
                                                : 'border-gray-100 hover:border-primary-200'
                                                }`}
                                        >
                                            <span className="text-2xl block mb-1 group-hover:scale-110 transition-transform">🔍</span>
                                            <span className={`text-sm font-bold ${form.role === 'jobseeker' ? 'text-primary-700' : 'text-gray-600'}`}>Job Seeker</span>
                                        </button>
                                    </div>
                                    {errors.role && <p className="text-red-500 text-xs text-center">{errors.role}</p>}
                                </div>

                                {/* Name */}
                                <div>
                                    <label htmlFor="reg-fullName" className="label">Name</label>
                                    <input
                                        id="reg-fullName"
                                        type="text"
                                        name="fullName"
                                        value={form.fullName}
                                        onChange={handleChange}
                                        placeholder="Your full name"
                                        className={`input-field ${errors.fullName ? 'border-red-400 ring-1 ring-red-400' : ''}`}
                                    />
                                    {errors.fullName && <p className="text-red-500 text-xs mt-1.5">{errors.fullName}</p>}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label htmlFor="reg-phone" className="label">Phone Number</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm">+91</span>
                                        <input
                                            id="reg-phone"
                                            type="tel"
                                            name="phone"
                                            value={form.phone}
                                            onChange={handleChange}
                                            placeholder="9876543210"
                                            className={`input-field pl-12 ${errors.phone ? 'border-red-400 ring-1 ring-red-400' : ''}`}
                                        />
                                    </div>
                                    {errors.phone && <p className="text-red-500 text-xs mt-1.5">{errors.phone}</p>}
                                </div>

                                {/* Profession */}
                                {form.role === 'jobseeker' && (
                                    <div>
                                        <label htmlFor="reg-profession" className="label">Profession</label>
                                        <select
                                            id="reg-profession"
                                            name="profession"
                                            value={form.profession}
                                            onChange={handleChange}
                                            className={`input-field ${errors.profession ? 'border-red-400 ring-1 ring-red-400' : ''}`}
                                        >
                                            <option value="">Select Profession</option>
                                            <option value="Painter">Painter</option>
                                            <option value="Electrician">Electrician</option>
                                            <option value="Plumber">Plumber</option>
                                        </select>
                                        {errors.profession && <p className="text-red-500 text-xs mt-1.5">{errors.profession}</p>}
                                    </div>
                                )}

                                {/* Password */}
                                <div>
                                    <label htmlFor="reg-password" className="label">Password</label>
                                    <input
                                        id="reg-password"
                                        type="password"
                                        name="password"
                                        value={form.password}
                                        onChange={e => {
                                            // Strip every character that is not a digit (0-9)
                                            const digitsOnly = e.target.value.replace(/\D/g, '')
                                            // Enforce max length of 4 at the input level
                                            setForm(prev => ({ ...prev, password: digitsOnly.slice(0, 4) }))
                                            if (errors.password) setErrors(prev => ({ ...prev, password: '' }))
                                        }}
                                        placeholder="Enter 4-digit PIN"
                                        inputMode="numeric"
                                        maxLength={4}
                                        autoComplete="new-password"
                                        className={`input-field tracking-widest text-lg ${errors.password ? 'border-red-400 ring-1 ring-red-400' : ''}`}
                                    />
                                    {errors.password && <p className="text-red-500 text-xs mt-1.5">{errors.password}</p>}
                                </div>

                                {/* Terms */}
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    By registering, you agree to our{' '}
                                    <a href="#" className="text-primary-600 hover:underline">Terms of Service</a> and{' '}
                                    <a href="#" className="text-primary-600 hover:underline">Privacy Policy</a>.
                                </p>

                                {/* Submit */}
                                <button id="register-submit" type="submit" className="btn-primary w-full text-base py-3.5">
                                    Create Account
                                </button>
                            </form>
                        </div>
                    )}

                    {!showChatbot && (
                        <div className="pb-8 text-center text-sm text-gray-500">
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                                Sign in
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
