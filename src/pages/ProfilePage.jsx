import { useState, useEffect } from 'react'

const SKILLS = ['Plumbing', 'Electrical Work', 'Carpentry', 'AC Repair', 'Home Cleaning', 'Painting', 'Waterproofing']

export default function ProfilePage() {
    const [editing, setEditing] = useState(false)
    const [role, setRole] = useState('jobseeker')
    const [form, setForm] = useState({
        name: '',
        title: 'Homeowner — Bangalore',
        location: 'Bangalore, Karnataka',
        email: 'user@example.com',
        phone: '+91 98765 43210',
        bio: 'Responsible professional looking for opportunities on WorkIndia.',
        experience: '1 Year',
        education: 'B.Com, Bangalore University',
    })

    useEffect(() => {
        const storedName = localStorage.getItem('userName') || 'User'
        const storedRole = localStorage.getItem('userRole') || 'jobseeker'
        setRole(storedRole)
        setForm(prev => ({ ...prev, name: storedName }))
    }, [])

    const handleChange = e => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div className="space-y-6 animate-fade-in max-w-4xl">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage your household profile and service preferences</p>
                </div>
                <button
                    id="edit-profile-btn"
                    onClick={() => setEditing(!editing)}
                    className={editing ? 'btn-primary py-2 px-5 text-sm' : 'btn-secondary py-2 px-5 text-sm'}
                >
                    {editing ? '💾 Save Changes' : '✏️ Edit Profile'}
                </button>
            </div>

            {/* Profile Header Card */}
            <div className="card">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-3xl font-extrabold shadow-xl">
                            {form.name.charAt(0).toUpperCase() || 'U'}
                        </div>
                        {editing && (
                            <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-xs shadow-md hover:bg-primary-700 transition-colors">
                                📷
                            </button>
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-center sm:text-left w-full">
                        {editing ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="label text-xs">Full Name</label>
                                    <input name="name" value={form.name} onChange={handleChange} className="input-field text-sm" />
                                </div>
                                <div>
                                    <label className="label text-xs">Area / City</label>
                                    <input name="title" value={form.title} onChange={handleChange} className="input-field text-sm" />
                                </div>
                                <div>
                                    <label className="label text-xs">Location</label>
                                    <input name="location" value={form.location} onChange={handleChange} className="input-field text-sm" />
                                </div>
                                <div>
                                    <label className="label text-xs">Experience</label>
                                    <input name="experience" value={form.experience} onChange={handleChange} className="input-field text-sm" />
                                </div>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-2xl font-bold text-gray-900">{form.name}</h3>
                                <p className="text-primary-600 font-semibold mt-0.5">{form.title}</p>
                                <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-3 text-sm text-gray-500">
                                    <span>📍 {form.location}</span>
                                    <span>💼 {form.experience} as Homeowner</span>
                                    <span>🏠 {form.education}</span>
                                </div>
                                <div className="flex gap-2 mt-4 justify-center sm:justify-start">
                                    <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">✅ Active</span>
                                    <span className="text-xs bg-primary-100 text-primary-700 px-3 py-1 rounded-full font-semibold">Verified Profile</span>
                                    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${role === 'employer' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                                        {role === 'employer' ? '💼 Job Provider' : '🔍 Job Seeker'}
                                    </span>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Profile Score */}
                    <div className="flex-shrink-0 text-center">
                        <div className="relative w-20 h-20">
                            <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E5E7EB" strokeWidth="3" />
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="url(#grad)" strokeWidth="3" strokeDasharray="72, 100" strokeLinecap="round" />
                                <defs>
                                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#4f46e5" />
                                        <stop offset="100%" stopColor="#7c3aed" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-lg font-extrabold text-primary-700">72%</span>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Profile Score</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* About */}
                <div className="card">
                    <h4 className="font-bold text-gray-900 mb-3">About Me</h4>
                    {editing ? (
                        <textarea
                            name="bio"
                            value={form.bio}
                            onChange={handleChange}
                            rows={4}
                            className="input-field resize-none text-sm"
                        />
                    ) : (
                        <p className="text-gray-600 text-sm leading-relaxed">{form.bio}</p>
                    )}
                </div>

                {/* Contact Info */}
                <div className="card">
                    <h4 className="font-bold text-gray-900 mb-3">Contact Information</h4>
                    <div className="space-y-3">
                        {[
                            { icon: '📧', label: 'Email', key: 'email' },
                            { icon: '📱', label: 'Phone', key: 'phone' },
                            { icon: '🏠', label: 'Home Address', key: 'education' },
                        ].map(item => (
                            <div key={item.key} className="flex items-start gap-3">
                                <span className="text-lg leading-none mt-0.5">{item.icon}</span>
                                <div className="flex-1">
                                    <p className="text-xs text-gray-400 font-medium">{item.label}</p>
                                    {editing ? (
                                        <input
                                            name={item.key}
                                            value={form[item.key]}
                                            onChange={handleChange}
                                            className="input-field text-sm mt-1 py-2"
                                        />
                                    ) : (
                                        <p className="text-sm text-gray-700 font-medium">{form[item.key]}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Skills */}
                <div className="card">
                    <h4 className="font-bold text-gray-900 mb-4">Service Preferences</h4>
                    <div className="flex flex-wrap gap-2">
                        {SKILLS.map(skill => (
                            <span key={skill} className="bg-primary-50 text-primary-700 text-sm px-4 py-1.5 rounded-full font-medium border border-primary-100 hover:bg-primary-100 transition-colors cursor-default">
                                {skill}
                            </span>
                        ))}
                        {editing && (
                            <button className="text-sm px-4 py-1.5 rounded-full border-2 border-dashed border-primary-300 text-primary-500 hover:border-primary-500 transition-colors">
                                + Add Skill
                            </button>
                        )}
                    </div>
                </div>

                {/* Resume */}
                <div className="card">
                    <h4 className="font-bold text-gray-900 mb-4">ID Proof / Documents</h4>
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-primary-300 transition-colors cursor-pointer group">
                        <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">📄</div>
                        <p className="font-semibold text-gray-700 text-sm">Priya_Sharma_Aadhaar.pdf</p>
                        <p className="text-xs text-gray-400 mt-1">Uploaded Feb 10, 2026 · 1.2 MB</p>
                        <div className="flex gap-2 justify-center mt-4">
                            <button className="text-xs bg-primary-50 text-primary-700 px-3 py-1.5 rounded-lg font-semibold hover:bg-primary-100 transition-colors">
                                Download
                            </button>
                            <button className="text-xs bg-gray-50 text-gray-600 px-3 py-1.5 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                                Replace
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
