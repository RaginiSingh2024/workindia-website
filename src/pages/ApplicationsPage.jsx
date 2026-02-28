import { useState, useEffect } from 'react'

const SEEKER_APPLICATIONS = [
    { id: 1, title: 'Plumbing Repair', company: 'QuickFix Services', logo: 'P', logoColor: 'from-blue-500 to-blue-600', appliedDate: 'Feb 17, 2026', status: 'Interview Scheduled', statusColor: 'bg-blue-100 text-blue-700' },
    { id: 2, title: 'AC Service & Repair', company: 'CoolAir Solutions', logo: 'A', logoColor: 'from-orange-400 to-red-400', appliedDate: 'Feb 15, 2026', status: 'Under Review', statusColor: 'bg-yellow-100 text-yellow-700' },
    { id: 3, title: 'Electrical Wiring Work', company: 'PowerPro Experts', logo: 'E', logoColor: 'from-slate-600 to-slate-800', appliedDate: 'Feb 12, 2026', status: 'Application Sent', statusColor: 'bg-gray-100 text-gray-700' },
]

const EMPLOYER_CANDIDATES = [
    { id: 101, candidateName: 'Rahul Kumar', role: 'Electrician', experience: '4 Years', location: 'Bangalore', status: 'New Application', permissionStatus: 'none', avatarColor: 'from-green-400 to-teal-500' },
    { id: 102, candidateName: 'Sneha Gupta', role: 'Home Cleaning Worker', experience: '2 Years', location: 'Mumbai', status: 'Contacted', permissionStatus: 'pending', avatarColor: 'from-pink-400 to-rose-500' },
    { id: 103, candidateName: 'Anil Desai', role: 'Plumber', experience: '6 Years', location: 'Delhi', status: 'Interviewing', permissionStatus: 'approved', phone: '+91 98765 43210', email: 'anil@example.com', avatarColor: 'from-indigo-400 to-blue-600' },
]

const STEPS = ['Booked', 'Confirmed', 'In Progress', 'Done']
const STEP_MAP = { 'Application Sent': 0, 'Under Review': 1, 'Interview Scheduled': 2, 'Offer Received 🎉': 3, 'Rejected': -1 }

export default function ApplicationsPage() {
    const [role, setRole] = useState('jobseeker')
    const [candidates, setCandidates] = useState(EMPLOYER_CANDIDATES)

    // AI Permission Modal State
    const [showContactModal, setShowContactModal] = useState(false)
    const [contactStep, setContactStep] = useState(1)
    const [selectedCandidate, setSelectedCandidate] = useState(null)
    const [generatedMessage, setGeneratedMessage] = useState('')

    useEffect(() => {
        const storedRole = localStorage.getItem('userRole') || 'jobseeker'
        setRole(storedRole)
    }, [])

    const handleContactClick = (candidate) => {
        setSelectedCandidate(candidate)
        setShowContactModal(true)
        setContactStep(1)

        // Simulating AI generation delay
        setTimeout(() => {
            setGeneratedMessage(`Hello ${candidate.candidateName},\n\nYour profile for the ${candidate.role} role caught our eye. We are impressed by your ${candidate.experience} experience. Can we view your contact details to discuss an opportunity?`)
            setContactStep(2)
        }, 1500)
    }

    const sendPermissionRequest = () => {
        setCandidates(candidates.map(c =>
            c.id === selectedCandidate.id ? { ...c, permissionStatus: 'pending' } : c
        ))
        setContactStep(3)
    }

    // Mock candidate's response in real-time
    const mockCandidateResponse = (response) => {
        setCandidates(candidates.map(c => {
            if (c.id === selectedCandidate.id) {
                if (response === 'yes') {
                    return { ...c, permissionStatus: 'approved', phone: '+91 99999 00000', email: 'candidate@example.com' }
                } else {
                    return { ...c, permissionStatus: 'denied' }
                }
            }
            return c
        }))
        setShowContactModal(false)
    }

    return (
        <div className="space-y-6 animate-fade-in relative">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">
                    {role === 'employer' ? 'Candidate Applications' : 'My Bookings'}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                    {role === 'employer' ? 'Manage applicants and request contact permissions securely.' : 'Track all your home service bookings in one place'}
                </p>
            </div>

            {/* AI Permission Modal */}
            {showContactModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col p-6">
                        {contactStep === 1 && (
                            <div className="text-center py-10 space-y-4">
                                <div className="text-4xl animate-pulse">🤖</div>
                                <h3 className="text-xl font-bold text-gray-900">AI is drafting a personalized request...</h3>
                                <p className="text-gray-500 text-sm">We protect candidate privacy by requesting permission first.</p>
                            </div>
                        )}

                        {contactStep === 2 && (
                            <div className="space-y-5 animate-fade-in">
                                <h3 className="text-xl font-bold text-gray-900">Review AI Connection Request</h3>
                                <p className="text-gray-500 text-sm">This message will be sent to {selectedCandidate?.candidateName} to ask for contact permission.</p>

                                <textarea
                                    className="input-field min-h-[120px] text-sm leading-relaxed bg-gray-50"
                                    value={generatedMessage}
                                    onChange={(e) => setGeneratedMessage(e.target.value)}
                                />

                                <div className="flex gap-3 justify-end mt-4">
                                    <button onClick={() => setShowContactModal(false)} className="btn-secondary px-6">Cancel</button>
                                    <button onClick={sendPermissionRequest} className="btn-primary px-6 flex items-center gap-2">
                                        Send Request ➔
                                    </button>
                                </div>
                            </div>
                        )}

                        {contactStep === 3 && (
                            <div className="space-y-6 text-center py-6 animate-fade-in">
                                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl mx-auto">
                                    📩
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Request Sent Successfully!</h3>
                                    <p className="text-gray-500 text-sm">We will notify you once {selectedCandidate?.candidateName} approves or denies the request.</p>
                                </div>

                                {/* For testing purposes only: Simulator section */}
                                <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                    <p className="text-xs text-gray-400 font-semibold mb-3 uppercase tracking-wider">Test Simulator (Candidate's View)</p>
                                    <p className="text-sm font-medium text-gray-800 mb-3">"{generatedMessage}"</p>
                                    <p className="text-sm text-gray-600 mb-4">Do you allow this employer to view your phone and email?</p>
                                    <div className="flex gap-3 justify-center">
                                        <button onClick={() => mockCandidateResponse('no')} className="btn-secondary py-1.5 px-4 text-sm border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300">No, deny</button>
                                        <button onClick={() => mockCandidateResponse('yes')} className="bg-green-600 text-white font-semibold py-1.5 px-4 rounded-lg text-sm hover:bg-green-700 transition">Yes, allow</button>
                                    </div>
                                </div>
                                {/* End test simulator */}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* List */}
            <div className="space-y-4">
                {role === 'jobseeker' ? (
                    // JOB SEEKER VIEW
                    SEEKER_APPLICATIONS.map(app => {
                        const stepIdx = STEP_MAP[app.status]
                        const isRejected = app.status === 'Rejected'
                        return (
                            <div key={app.id} className="card hover:-translate-y-0.5 transition-all duration-200">
                                <div className="flex items-start gap-4">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${app.logoColor} flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md`}>
                                        {app.logo}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                            <div>
                                                <h3 className="font-bold text-gray-900">{app.title}</h3>
                                                <p className="text-gray-500 text-sm">{app.company} · Applied {app.appliedDate}</p>
                                            </div>
                                            <span className={`text-xs px-3 py-1.5 rounded-full font-semibold self-start sm:self-center ${app.statusColor}`}>
                                                {app.status}
                                            </span>
                                        </div>
                                        {!isRejected && (
                                            <div className="mt-4">
                                                <div className="flex items-center">
                                                    {STEPS.map((step, i) => (
                                                        <div key={step} className="flex items-center flex-1 last:flex-none">
                                                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${i <= stepIdx ? 'bg-primary-600 text-white shadow-md' : 'bg-gray-100 text-gray-400'}`}>
                                                                {i < stepIdx ? '✓' : i + 1}
                                                            </div>
                                                            {i < STEPS.length - 1 && <div className={`flex-1 h-1 mx-1 rounded-full ${i < stepIdx ? 'bg-primary-400' : 'bg-gray-100'}`} />}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    // EMPLOYER VIEW
                    candidates.map(candidate => (
                        <div key={candidate.id} className="card hover:-translate-y-0.5 transition-all duration-200">
                            <div className="flex items-start gap-4">
                                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${candidate.avatarColor} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                                    {candidate.candidateName.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-lg">{candidate.candidateName}</h3>
                                            <p className="text-primary-700 font-medium text-sm">{candidate.role}</p>
                                        </div>
                                    </div>
                                    <div className="mt-2 text-sm text-gray-600 flex gap-4">
                                        <span className="flex items-center gap-1">📍 {candidate.location}</span>
                                        <span className="flex items-center gap-1">⏱️ {candidate.experience}</span>
                                    </div>

                                    {/* Action Area */}
                                    <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
                                        {candidate.permissionStatus === 'none' && (
                                            <>
                                                <div className="text-sm">
                                                    <span className="font-semibold text-gray-700">Contact details hidden.</span>
                                                    <p className="text-gray-500 text-xs mt-0.5">Request permission to view phone & email.</p>
                                                </div>
                                                <button onClick={() => handleContactClick(candidate)} className="btn-primary py-2 px-4 shadow-sm text-sm">
                                                    Contact Candidate
                                                </button>
                                            </>
                                        )}
                                        {candidate.permissionStatus === 'pending' && (
                                            <div className="flex items-center gap-2 text-blue-600 text-sm font-semibold">
                                                <span className="animate-spin text-lg">⏳</span> Request Sent (Awaiting Approval)
                                            </div>
                                        )}
                                        {candidate.permissionStatus === 'denied' && (
                                            <div className="flex items-center gap-2 text-red-600 text-sm font-semibold">
                                                <span className="text-lg">❌</span> Permission Denied by Candidate
                                            </div>
                                        )}
                                        {candidate.permissionStatus === 'approved' && (
                                            <div className="w-full relative">
                                                <div className="absolute top-0 right-0 py-1 px-2 bg-green-100 text-green-700 text-xs font-bold rounded">
                                                    Permission Granted ✓
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                                                    <div className="flex flex-col">
                                                        <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Phone Number</span>
                                                        <span className="font-bold text-gray-800">{candidate.phone}</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Email Address</span>
                                                        <span className="font-bold text-gray-800">{candidate.email}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
