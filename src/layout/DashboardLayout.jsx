import { useState, useEffect } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'

export default function DashboardLayout() {
    const location = useLocation()
    const navigate = useNavigate()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [notifOpen, setNotifOpen] = useState(false)
    const [role, setRole] = useState('jobseeker')
    const [userName, setUserName] = useState('Priya Sharma')

    // AI Onboarding State
    const [showAIOnboarding, setShowAIOnboarding] = useState(false)
    const [aiStep, setAiStep] = useState(1)
    const [salaryType, setSalaryType] = useState('monthly') // 'monthly' | 'hourly'
    const [seekerData, setSeekerData] = useState({
        name: '', role: '', salary: '', currentLocation: '', preferredLocation: ''
    })

    useEffect(() => {
        const storedRole = localStorage.getItem('userRole') || 'jobseeker'
        const storedName = localStorage.getItem('userName') || 'Priya Sharma'
        setRole(storedRole)
        setUserName(storedName)

        if (storedRole === 'jobseeker' && !localStorage.getItem('aiOnboardingCompleted')) {
            setShowAIOnboarding(true)
            setSeekerData(prev => ({ ...prev, name: storedName }))
        }
    }, [])

    const NAV_ITEMS = [
        { path: '/dashboard', label: 'Overview', icon: '🏠', exact: true },
        {
            path: '/dashboard/jobs',
            label: role === 'employer' ? 'My Services' : 'Services',
            icon: '🔧'
        },
        ...(role === 'employer' ? [
            { path: '/dashboard/applications', label: 'Bookings', icon: '📋' }
        ] : []),
        { path: '/dashboard/profile', label: 'Profile', icon: '👤' },
        { path: '/dashboard/chatbot', label: 'Smart Help', icon: '🤖' },
    ]

    const isActive = (item) => {
        if (item.exact) return location.pathname === item.path
        return location.pathname.startsWith(item.path)
    }

    const currentPage = NAV_ITEMS.find(item => isActive(item))?.label || 'Dashboard'

    const handleSeekerForm = (e) => {
        setSeekerData({ ...seekerData, [e.target.name]: e.target.value })
    }

    const completeOnboarding = () => {
        localStorage.setItem('aiOnboardingCompleted', 'true')
        setShowAIOnboarding(false)
    }

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden relative">
            {/* AI Onboarding Modal — Job Seekers only */}
            {showAIOnboarding && role === 'jobseeker' && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gradient-to-br from-indigo-900/80 to-blue-900/80 backdrop-blur-md animate-fade-in">
                    <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col p-8 text-center relative border border-white/20">
                        {/* Avatar */}
                        <div className="w-20 h-20 bg-gradient-to-tr from-primary-500 to-accent-400 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl shadow-xl shadow-primary-500/30">
                            🤖
                        </div>

                        {aiStep === 1 && (
                            <div className="space-y-6 animate-fade-in">
                                <h3 className="text-2xl font-bold text-gray-900">Hi {seekerData.name || 'there'}! 👋</h3>
                                <p className="text-gray-500 text-lg">I'm your AI career assistant. Let's quickly set up your profile so I can match you with the best opportunities.</p>

                                <div className="text-left mt-6">
                                    <label className="font-semibold text-gray-700 block mb-2">What's your full name?</label>
                                    <input type="text" name="name" value={seekerData.name} onChange={handleSeekerForm} className="input-field text-lg py-3" placeholder="Enter your full name" />
                                </div>
                                <button onClick={() => setAiStep(2)} disabled={!seekerData.name} className="btn-primary w-full py-3.5 text-lg mt-4 shadow-lg">Continue ➔</button>
                            </div>
                        )}

                        {aiStep === 2 && (
                            <div className="space-y-6 animate-fade-in">
                                <h3 className="text-2xl font-bold text-gray-900">Your Goals 🎯</h3>
                                <div className="text-left space-y-5 mt-4">
                                    <div>
                                        <label className="font-semibold text-gray-700 block mb-2">What is your desired job role?</label>
                                        <input type="text" name="role" value={seekerData.role} onChange={handleSeekerForm} className="input-field text-lg py-3" placeholder="e.g. Electrician, Data Entry" />
                                    </div>
                                    <div>
                                        {/* ── Salary Type Toggle ── */}
                                        <label className="font-semibold text-gray-700 block mb-2">
                                            Expected Salary ({salaryType === 'monthly' ? 'Monthly' : 'Per Hour'})
                                        </label>
                                        <div className="flex gap-0 mb-3 rounded-xl overflow-hidden border border-gray-200 w-fit">
                                            <button
                                                type="button"
                                                id="salary-toggle-monthly"
                                                onClick={() => setSalaryType('monthly')}
                                                className={`px-5 py-2 text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${salaryType === 'monthly'
                                                        ? 'bg-primary-600 text-white shadow-inner'
                                                        : 'bg-white text-gray-500 hover:bg-gray-50'
                                                    }`}
                                            >
                                                <span className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${salaryType === 'monthly' ? 'border-white' : 'border-gray-400'
                                                    }`}>
                                                    {salaryType === 'monthly' && <span className="w-1.5 h-1.5 bg-white rounded-full block" />}
                                                </span>
                                                Monthly
                                            </button>
                                            <button
                                                type="button"
                                                id="salary-toggle-hourly"
                                                onClick={() => setSalaryType('hourly')}
                                                className={`px-5 py-2 text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${salaryType === 'hourly'
                                                        ? 'bg-primary-600 text-white shadow-inner'
                                                        : 'bg-white text-gray-500 hover:bg-gray-50'
                                                    }`}
                                            >
                                                <span className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${salaryType === 'hourly' ? 'border-white' : 'border-gray-400'
                                                    }`}>
                                                    {salaryType === 'hourly' && <span className="w-1.5 h-1.5 bg-white rounded-full block" />}
                                                </span>
                                                Hourly
                                            </button>
                                        </div>
                                        <input
                                            type="text"
                                            name="salary"
                                            value={seekerData.salary}
                                            onChange={handleSeekerForm}
                                            className="input-field text-lg py-3"
                                            placeholder={salaryType === 'monthly' ? 'e.g. ₹25,000 / month' : 'e.g. ₹150 / hour'}
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-4 mt-6">
                                    <button onClick={() => setAiStep(1)} className="btn-secondary py-3.5 px-6 shrink-0">Back</button>
                                    <button onClick={() => setAiStep(3)} disabled={!seekerData.role || !seekerData.salary} className="btn-primary flex-1 py-3.5 text-lg shadow-lg">Next Step ➔</button>
                                </div>
                            </div>
                        )}

                        {aiStep === 3 && (
                            <div className="space-y-6 animate-fade-in">
                                <h3 className="text-2xl font-bold text-gray-900">Almost done! 📍</h3>
                                <div className="text-left space-y-5 mt-4">
                                    <div>
                                        <label className="font-semibold text-gray-700 block mb-2">Current Location</label>
                                        <input type="text" name="currentLocation" value={seekerData.currentLocation} onChange={handleSeekerForm} className="input-field text-lg py-3" placeholder="e.g. Mumbai" />
                                    </div>
                                    <div>
                                        <label className="font-semibold text-gray-700 block mb-2">Preferred Job Location</label>
                                        <input type="text" name="preferredLocation" value={seekerData.preferredLocation} onChange={handleSeekerForm} className="input-field text-lg py-3" placeholder="Where do you want to work?" />
                                    </div>
                                </div>
                                <div className="flex gap-4 mt-6">
                                    <button onClick={() => setAiStep(2)} className="btn-secondary py-3.5 px-6 shrink-0">Back</button>
                                    <button onClick={completeOnboarding} disabled={!seekerData.currentLocation || !seekerData.preferredLocation} className="bg-gradient-to-r from-green-500 to-emerald-600 text-white flex-1 py-3.5 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                                        Finish & View Dashboard ✨
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Progress Dots */}
                        <div className="flex justify-center gap-2 mt-8">
                            {[1, 2, 3].map(step => (
                                <div key={step} className={`h-2 rounded-full transition-all duration-300 ${aiStep === step ? 'w-8 bg-primary-600' : 'w-2 bg-gray-200'}`} />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-100 flex flex-col shadow-sm transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                {/* Logo */}
                <div className="px-6 py-5 border-b border-gray-100">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-accent-400 flex items-center justify-center shadow-md">
                            <span className="text-white font-bold text-sm">W</span>
                        </div>
                        <span className="text-xl font-bold gradient-text">WorkIndia</span>
                    </Link>
                </div>

                {/* Nav Items */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                    {NAV_ITEMS.map(item => (
                        <Link
                            key={item.path}
                            id={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                            to={item.path}
                            onClick={() => setSidebarOpen(false)}
                            className={isActive(item) ? 'sidebar-item-active' : 'sidebar-item'}
                        >
                            <span className="text-lg">{item.icon}</span>
                            <span>{item.label}</span>
                            {item.label === 'Bookings' && (
                                <span className="ml-auto text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full font-semibold">3</span>
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Upgrade Banner */}
                <div className="m-3 p-4 rounded-xl bg-gradient-to-br from-primary-600 to-accent-400 text-white">
                    <p className="text-sm font-semibold mb-1">Upgrade to Premium</p>
                    <p className="text-xs text-primary-100 mb-3">Get priority access and exclusive offers.</p>
                    <button className="w-full bg-white text-primary-700 text-xs font-bold py-1.5 rounded-lg hover:bg-yellow-300 hover:text-primary-900 transition-colors">
                        Upgrade Now
                    </button>
                </div>

                {/* Logout */}
                <div className="px-3 py-4 border-t border-gray-100">
                    <button
                        id="sidebar-logout"
                        onClick={() => {
                            localStorage.removeItem('userRole')
                            localStorage.removeItem('userName')
                            localStorage.removeItem('aiOnboardingCompleted')
                            navigate('/')
                        }}
                        className="sidebar-item w-full text-red-500 hover:bg-red-50 hover:text-red-600"
                    >
                        <span className="text-lg">🚪</span>
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top Navbar */}
                <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-3.5 flex items-center justify-between shadow-sm z-10">
                    {/* Left: Hamburger + Breadcrumb */}
                    <div className="flex items-center gap-4">
                        <button
                            id="sidebar-toggle"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            aria-label="Toggle sidebar"
                        >
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <div>
                            <p className="text-xs text-gray-400">WorkIndia</p>
                            <h1 className="text-base font-semibold text-gray-900">{currentPage}</h1>
                        </div>
                    </div>

                    {/* Right: Search + Notif + Profile */}
                    <div className="flex items-center gap-3">
                        {/* Search */}
                        <div className="hidden sm:flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search here..."
                                className="bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none w-36"
                            />
                        </div>

                        {/* Notifications */}
                        <div className="relative">
                            <button
                                id="notif-btn"
                                onClick={() => setNotifOpen(!notifOpen)}
                                className="relative p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6.002 6.002 0 0 0-4-5.659V5a2 2 0 1 0-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9" />
                                </svg>
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                            </button>
                            {notifOpen && (
                                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 animate-fade-in">
                                    <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                                        <h3 className="font-semibold text-gray-900">Notifications</h3>
                                        <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-semibold">3 new</span>
                                    </div>
                                    {[
                                        { title: 'New Message', desc: 'You have a new inquiry about your service', time: '2m ago', icon: '💬' },
                                        { title: 'System Update', desc: 'WorkIndia platform has been updated', time: '1h ago', icon: '🚀' },
                                        { title: 'Reminders', desc: 'Check your upcoming schedule for tomorrow', time: '3h ago', icon: '📅' },
                                    ].map((n, i) => (
                                        <div key={i} className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 flex gap-3">
                                            <span className="text-xl mt-0.5">{n.icon}</span>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-gray-800">{n.title}</p>
                                                <p className="text-xs text-gray-500 truncate">{n.desc}</p>
                                                <p className="text-xs text-primary-500 mt-0.5">{n.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Profile Avatar */}
                        <Link to="/dashboard/profile" className="flex items-center gap-2 hover:bg-gray-100 rounded-xl p-1.5 pr-3 transition-colors">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-400 flex items-center justify-center text-white font-bold text-sm shadow-md">
                                {userName.charAt(0)}
                            </div>
                            <div className="hidden sm:block text-left">
                                <p className="text-sm font-semibold text-gray-900">{userName}</p>
                                <p className="text-xs text-gray-400 capitalize">{role === 'employer' ? 'Job Provider' : 'Job Seeker'}</p>
                            </div>
                        </Link>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
