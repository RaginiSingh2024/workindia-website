import { useState, useEffect } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'

export default function DashboardLayout() {
    const location = useLocation()
    const navigate = useNavigate()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [notifOpen, setNotifOpen] = useState(false)
    const [role, setRole] = useState('jobseeker')
    const [userName, setUserName] = useState('Priya Sharma')

    useEffect(() => {
        const storedRole = localStorage.getItem('userRole') || 'jobseeker'
        const storedName = localStorage.getItem('userName') || 'Priya Sharma'
        setRole(storedRole)
        setUserName(storedName)
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

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
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
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center shadow-md">
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
                <div className="m-3 p-4 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 text-white">
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
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
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
