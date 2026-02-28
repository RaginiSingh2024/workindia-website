import { useState, useEffect } from 'react'

const ALL_JOBS = [
    { id: 1, title: 'Plumbing Repair & Installation', company: 'QuickFix Services', location: 'Bangalore, KA', salary: '₹299–₹799', type: 'Same Day', logo: 'P', logoColor: 'from-blue-500 to-blue-600', posted: '2d ago', badge: 'Hot 🔥', badgeColor: 'bg-red-100 text-red-600', tags: ['Pipe Repair', 'Leakage Fix', 'Tap Change'] },
    { id: 2, title: 'Electrician — Wiring & Fitting', company: 'PowerPro Experts', location: 'Hyderabad, TS', salary: '₹499–₹1,499', type: 'On-site', logo: 'E', logoColor: 'from-yellow-400 to-orange-500', posted: '1d ago', badge: 'Urgent', badgeColor: 'bg-orange-100 text-orange-600', tags: ['Wiring', 'Fan Fitting', 'Switchboard'] },
    { id: 3, title: 'AC Service & Gas Recharge', company: 'CoolAir Solutions', location: 'Mumbai, MH', salary: '₹599–₹1,999', type: 'On-site', logo: 'A', logoColor: 'from-orange-400 to-red-400', posted: '3d ago', badge: 'New ✨', badgeColor: 'bg-green-100 text-green-600', tags: ['AC Repair', 'Gas Refill', 'Service'] },
    { id: 4, title: 'Home Deep Cleaning', company: 'CleanNest India', location: 'Delhi, DL', salary: '₹799–₹2,499', type: 'Scheduled', logo: 'C', logoColor: 'from-red-400 to-red-600', posted: '5d ago', badge: 'Popular', badgeColor: 'bg-blue-100 text-blue-600', tags: ['Bathroom', 'Kitchen', 'Sofa Clean'] },
]

const FILTERS = ['All', 'Same Day', 'On-site', 'Scheduled']

export default function JobsPage() {
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('All')
    const [saved, setSaved] = useState([])
    const [role, setRole] = useState('jobseeker')
    const [jobs, setJobs] = useState(ALL_JOBS)

    // AI Assisted Job Posting States
    const [showAIModal, setShowAIModal] = useState(false)
    const [aiStep, setAiStep] = useState(1)
    const [isGenerating, setIsGenerating] = useState(false)
    const [generatedJD, setGeneratedJD] = useState(null)
    const [jobData, setJobData] = useState({
        title: '',
        skills: '',
        experience: '',
        salary: '',
        location: '',
        type: 'Full-time'
    })

    useEffect(() => {
        const storedRole = localStorage.getItem('userRole') || 'jobseeker'
        setRole(storedRole)
    }, [])

    const filteredJobs = jobs.filter(j => {
        const matchSearch = j.title.toLowerCase().includes(search.toLowerCase()) ||
            j.company.toLowerCase().includes(search.toLowerCase()) ||
            j.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
        const matchFilter = filter === 'All' || j.type === filter
        return matchSearch && matchFilter
    })

    const toggleSave = (id) => {
        setSaved(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
    }

    const handleFormChange = (e) => {
        setJobData({ ...jobData, [e.target.name]: e.target.value })
    }

    const generateJD = () => {
        setIsGenerating(true)
        setTimeout(() => {
            setGeneratedJD(`**Job Title:** ${jobData.title}
**Location:** ${jobData.location} | **Type:** ${jobData.type}
**Experience:** ${jobData.experience} | **Salary:** ${jobData.salary}

**About the Role:**
We are looking for a highly skilled professional to join our dynamic team. As a ${jobData.title}, you will be responsible for delivering top-notch home services and ensuring customer satisfaction.

**Key Responsibilities:**
- Perform tasks related to ${jobData.skills}.
- Maintain high standards of quality and safety.
- Communicate effectively with clients.

**Requirements:**
- Proven experience of ${jobData.experience}.
- Expertise in ${jobData.skills}.
- Strong problem-solving skills.`)
            setIsGenerating(false)
            setAiStep(3)
        }, 2000)
    }

    const saveJob = () => {
        const newJob = {
            id: Date.now(),
            title: jobData.title,
            company: 'Your Company',
            location: jobData.location,
            salary: jobData.salary,
            type: jobData.type,
            logo: jobData.title.charAt(0).toUpperCase(),
            logoColor: 'from-primary-500 to-accent-500',
            posted: 'Just now',
            badge: 'New ✨',
            badgeColor: 'bg-green-100 text-green-600',
            tags: jobData.skills.split(',').slice(0, 3)
        }
        setJobs([newJob, ...jobs])
        setShowAIModal(false)
        setAiStep(1)
        setJobData({ title: '', skills: '', experience: '', salary: '', location: '', type: 'Full-time' })
        setGeneratedJD(null)
    }

    return (
        <div className="space-y-6 animate-fade-in relative">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        {role === 'employer' ? 'Manage Your Services' : 'Browse Services'}
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        {role === 'employer'
                            ? 'Update or add new home services to your business profile'
                            : 'Find trusted home service professionals near you'}
                    </p>
                </div>
                {role === 'employer' && (
                    <button onClick={() => setShowAIModal(true)} className="btn-primary py-2 px-6 text-sm shadow-lg hover:scale-105 transition-transform active:scale-95 flex items-center gap-2">
                        ✨ AI Assisted Job Post
                    </button>
                )}
            </div>

            {/* AI Job Posting Modal */}
            {showAIModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="bg-gradient-to-r from-primary-600 to-accent-600 p-5 px-6 text-white flex justify-between items-center flex-shrink-0">
                            <h3 className="font-bold text-lg flex items-center gap-2">
                                🤖 AI Job Post Builder
                            </h3>
                            <button onClick={() => { setShowAIModal(false); setAiStep(1); }} className="text-white hover:text-gray-200 text-xl font-bold">&times;</button>
                        </div>

                        <div className="p-6 overflow-y-auto flex-1">
                            {aiStep === 1 && (
                                <div className="space-y-4 animate-fade-in">
                                    <p className="text-gray-600 text-sm mb-4">Hello! I am your AI assistant. Tell me a bit about the role you want to post, and I'll write an optimized professional job description for you.</p>

                                    <div>
                                        <label className="label">1. Job Role / Title</label>
                                        <input type="text" name="title" value={jobData.title} onChange={handleFormChange} placeholder="e.g. Senior Electrician" className="input-field" />
                                    </div>
                                    <div>
                                        <label className="label">2. Required Skills (comma separated)</label>
                                        <input type="text" name="skills" value={jobData.skills} onChange={handleFormChange} placeholder="e.g. Wiring, MCB fitting, AC repair" className="input-field" />
                                    </div>
                                    <div>
                                        <label className="label">3. Experience Level</label>
                                        <input type="text" name="experience" value={jobData.experience} onChange={handleFormChange} placeholder="e.g. 3-5 years" className="input-field" />
                                    </div>
                                    <div className="flex justify-end mt-6">
                                        <button onClick={() => setAiStep(2)} disabled={!jobData.title || !jobData.skills} className="btn-primary py-2 px-6">Next ➔</button>
                                    </div>
                                </div>
                            )}

                            {aiStep === 2 && (
                                <div className="space-y-4 animate-fade-in">
                                    <p className="text-gray-600 text-sm mb-4">Great! Just a few more details to generate the description.</p>

                                    <div>
                                        <label className="label">4. Salary Range</label>
                                        <input type="text" name="salary" value={jobData.salary} onChange={handleFormChange} placeholder="e.g. ₹15,000 - ₹25,000 / month" className="input-field" />
                                    </div>
                                    <div>
                                        <label className="label">5. Location</label>
                                        <input type="text" name="location" value={jobData.location} onChange={handleFormChange} placeholder="e.g. Remote, Bangalore, etc." className="input-field" />
                                    </div>
                                    <div>
                                        <label className="label">6. Job Type</label>
                                        <select name="type" value={jobData.type} onChange={handleFormChange} className="input-field">
                                            <option>Full-time</option>
                                            <option>Part-time</option>
                                            <option>Contract</option>
                                            <option>Same Day</option>
                                        </select>
                                    </div>
                                    <div className="flex justify-between mt-6">
                                        <button onClick={() => setAiStep(1)} className="btn-secondary py-2 px-6">⬅ Back</button>
                                        <button onClick={generateJD} disabled={isGenerating} className="btn-primary py-2 px-6 flex items-center gap-2">
                                            {isGenerating ? <span className="animate-spin text-lg">⚙️</span> : '✨ Gerenate Job Post'}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {aiStep === 3 && (
                                <div className="space-y-4 animate-fade-in">
                                    <div className="bg-green-50 border border-green-200 text-green-800 p-3 rounded-xl text-sm mb-4 flex items-center gap-2">
                                        <span>✅</span> Job description successfully generated and optimized!
                                    </div>
                                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 min-h-[200px] whitespace-pre-wrap font-sans text-sm text-gray-800">
                                        {generatedJD}
                                    </div>
                                    <div className="flex justify-between mt-6">
                                        <button onClick={() => setAiStep(2)} className="btn-secondary py-2 px-6 font-semibold">✏️ Edit Details</button>
                                        <button onClick={saveJob} className="btn-primary py-2 px-6 font-bold shadow-lg bg-green-600 hover:bg-green-700">🚀 Publish Job</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Search + Filter */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                        </svg>
                        <input
                            id="jobs-search"
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder={role === 'employer' ? 'Search your services...' : 'Search by service, provider, or type...'}
                            className="input-field pl-10"
                        />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {FILTERS.map(f => (
                            <button
                                key={f}
                                id={`filter-${f.toLowerCase()}`}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${filter === f
                                    ? 'bg-primary-600 text-white shadow-md'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Results Count */}
            <p className="text-sm text-gray-500">
                Found <span className="font-semibold text-gray-900">{filteredJobs.length}</span> {role === 'employer' ? 'active services' : 'services'}
            </p>

            {/* Jobs Grid */}
            {filteredJobs.length === 0 ? (
                <div className="card text-center py-16">
                    <span className="text-5xl mb-4 block">🔍</span>
                    <h3 className="text-lg font-semibold text-gray-600">No services found</h3>
                    <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {filteredJobs.map(job => (
                        <div key={job.id} id={`jobs-listing-${job.id}`} className="card hover:-translate-y-1 transition-all duration-200">
                            <div className="flex items-start gap-4">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${job.logoColor} flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md`}>
                                    {job.logo}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <h3 className="font-bold text-gray-900 leading-tight">{job.title}</h3>
                                        {role === 'jobseeker' && (
                                            <button
                                                id={`save-job-${job.id}`}
                                                onClick={() => toggleSave(job.id)}
                                                className="text-lg flex-shrink-0 hover:scale-125 transition-transform"
                                                aria-label={saved.includes(job.id) ? 'Unsave job' : 'Save job'}
                                            >
                                                {saved.includes(job.id) ? '🔖' : '🤍'}
                                            </button>
                                        )}
                                    </div>
                                    <p className="text-gray-500 text-sm">{job.company}</p>
                                    <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-400">
                                        <span>📍 {job.location}</span>
                                        <span>💰 {job.salary}</span>
                                        <span>🕐 {job.type}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 mt-3">
                                        {job.tags.map(tag => (
                                            <span key={tag} className="text-xs bg-primary-50 text-primary-700 px-2.5 py-1 rounded-full font-medium">
                                                {tag}
                                            </span>
                                        ))}
                                        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${job.badgeColor}`}>{job.badge}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 flex gap-2">
                                <button className="btn-primary flex-1 py-2.5 text-sm">
                                    {role === 'employer' ? 'Edit Service' : 'Book Now'}
                                </button>
                                <button className="btn-secondary py-2.5 px-4 text-sm">
                                    {role === 'employer' ? 'View Stats' : 'View Details'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
