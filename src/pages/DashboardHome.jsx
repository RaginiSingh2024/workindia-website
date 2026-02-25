import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function DashboardHome() {
    const [role, setRole] = useState('jobseeker')
    const [userName, setUserName] = useState('Priya Sharma')

    useEffect(() => {
        const storedRole = localStorage.getItem('userRole') || 'jobseeker'
        const storedName = localStorage.getItem('userName') || 'Priya Sharma'
        setRole(storedRole)
        setUserName(storedName)
    }, [])

    const STATS = [
        {
            label: role === 'employer' ? 'Total Inquiries' : 'Total Bookings',
            value: '1,284',
            change: '+12% this week',
            icon: '🏠',
            color: 'from-blue-500 to-primary-600'
        },
        ...(role === 'employer' ? [
            { label: 'Active Services', value: '8', change: '2 new today', icon: '🔧', color: 'from-violet-500 to-accent-600' },
        ] : [
            { label: 'Active Requests', value: '23', change: '3 pending confirmation', icon: '📋', color: 'from-violet-500 to-accent-600' },
        ]),
        {
            label: role === 'employer' ? 'Account Rating' : 'Saved Services',
            value: role === 'employer' ? '4.9' : '47',
            change: role === 'employer' ? '280 reviews' : '5 expiring soon',
            icon: role === 'employer' ? '⭐' : '🔖',
            color: 'from-pink-500 to-rose-500'
        },
    ]

    const RECENT_JOBS = [
        {
            id: 1,
            title: 'Plumbing Repair',
            company: 'QuickFix Services',
            location: 'Bangalore, KA',
            salary: '₹299–₹799',
            type: 'Same Day',
            logo: 'P',
            logoColor: 'from-blue-500 to-blue-600',
            posted: '2 days ago',
            badge: 'Hot 🔥',
            badgeColor: 'bg-red-100 text-red-600',
        },
        {
            id: 2,
            title: 'Electrical Work',
            company: 'PowerPro Experts',
            location: 'Hyderabad, TS',
            salary: '₹499–₹1,499',
            type: 'On-site',
            logo: 'E',
            logoColor: 'from-yellow-400 to-orange-500',
            posted: '1 day ago',
            badge: 'Urgent',
            badgeColor: 'bg-orange-100 text-orange-600',
        },
        {
            id: 3,
            title: 'AC Service & Repair',
            company: 'CoolAir Solutions',
            location: 'Mumbai, MH',
            salary: '₹599–₹1,999',
            type: 'On-site',
            logo: 'A',
            logoColor: 'from-orange-400 to-red-400',
            posted: '3 days ago',
            badge: 'New ✨',
            badgeColor: 'bg-green-100 text-green-600',
        },
        {
            id: 4,
            title: 'Home Deep Cleaning',
            company: 'CleanNest India',
            location: 'Delhi, DL',
            salary: '₹799–₹2,499',
            type: 'Scheduled',
            logo: 'C',
            logoColor: 'from-red-400 to-red-600',
            posted: '5 days ago',
            badge: 'Popular',
            badgeColor: 'bg-blue-100 text-blue-600',
        },
    ]

    const ACTIVITIES = role === 'employer' ? [
        { text: 'New booking request for AC Repair', time: '2h ago', icon: '📥' },
        { text: 'Service "Home Cleaning" updated successfully', time: '1d ago', icon: '✏️' },
        { text: 'Payout of ₹4,500 processed', time: '2d ago', icon: '💰' },
        { text: 'New 5-star review from Amit K.', time: '3d ago', icon: '⭐' },
    ] : [
        { text: 'Booked Plumbing service with Ramesh Kumar', time: '2h ago', icon: '✅' },
        { text: 'Saved Carpenter service from WoodCraft Experts', time: '1d ago', icon: '🔖' },
        { text: 'Profile viewed by CleanNest India team', time: '2d ago', icon: '👁️' },
        { text: 'Service review submitted successfully', time: '3d ago', icon: '📄' },
    ]

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold">Good evening, {userName.split(' ')[0]}! 👋</h2>
                    <p className="text-primary-100 text-sm mt-1">
                        {role === 'employer'
                            ? "You have 5 new booking requests waiting for your approval."
                            : "You have 3 new services available in your area. Book now!"}
                    </p>
                </div>
                <Link to="/dashboard/jobs" className="bg-white text-primary-700 hover:bg-yellow-300 hover:text-primary-900 font-semibold px-5 py-2.5 rounded-xl text-sm transition-all duration-200 shadow-lg whitespace-nowrap">
                    {role === 'employer' ? 'Manage Services →' : 'View Services →'}
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {STATS.map(stat => (
                    <div key={stat.label} id={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`} className="card group hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                                <p className="text-3xl font-extrabold text-gray-900 mt-1">{stat.value}</p>
                                <p className="text-xs text-gray-400 mt-1">{stat.change}</p>
                            </div>
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Two Column: Recent Jobs + Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Job Listings */}
                <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-900">
                            {role === 'employer' ? 'Your Active Services' : 'Recent Service Matches'}
                        </h3>
                        <Link to="/dashboard/jobs" className="text-sm text-primary-600 font-semibold hover:text-primary-700 transition-colors">View All →</Link>
                    </div>
                    <div className="space-y-4">
                        {(role === 'employer' ? RECENT_JOBS.slice(0, 2) : RECENT_JOBS).map(job => (
                            <div key={job.id} id={`job-card-${job.id}`} className="card hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                                <div className="flex items-start gap-4">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${job.logoColor} flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md`}>
                                        {job.logo}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h4 className="font-bold text-gray-900">{job.title}</h4>
                                            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${job.badgeColor}`}>{job.badge}</span>
                                        </div>
                                        <p className="text-gray-500 text-sm mt-0.5">{job.company}</p>
                                        <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-400">
                                            <span>📍 {job.location}</span>
                                            <span>💰 {job.salary}</span>
                                            <span>🕐 {job.type}</span>
                                            <span>🗓️ {job.posted}</span>
                                        </div>
                                    </div>
                                    <button className="btn-primary py-2 px-4 text-sm flex-shrink-0 hidden sm:block">
                                        {role === 'employer' ? 'Edit Service' : 'Apply'}
                                    </button>
                                </div>
                                <button className="btn-primary w-full py-2 text-sm mt-3 sm:hidden">
                                    {role === 'employer' ? 'Edit Service' : 'Apply Now'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="card space-y-4">
                        {ACTIVITIES.map((act, i) => (
                            <div key={i} className="flex items-start gap-3 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                                <span className="text-lg leading-none mt-0.5">{act.icon}</span>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-700 leading-snug">{act.text}</p>
                                    <p className="text-xs text-gray-400 mt-1">{act.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Profile Completeness */}
                    <div className="card mt-5">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-900">
                                {role === 'employer' ? 'Provider Score' : 'Profile Score'}
                            </h4>
                            <span className="text-primary-600 font-bold">72%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                            <div className="bg-gradient-to-r from-primary-600 to-accent-400 h-2 rounded-full transition-all duration-300" style={{ width: '72%' }} />
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                            {role === 'employer'
                                ? "Complete your business verification to reach more customers."
                                : "Add your service areas and availability to boost visibility"}
                        </p>
                        <Link to="/dashboard/profile" className="text-xs text-primary-600 font-semibold hover:text-primary-700 mt-2 inline-block">
                            Complete Profile →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
