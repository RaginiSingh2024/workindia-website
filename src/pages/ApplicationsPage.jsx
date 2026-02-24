const APPLICATIONS = [
    { id: 1, title: 'Plumbing Repair', company: 'QuickFix Services', logo: 'P', logoColor: 'from-blue-500 to-blue-600', appliedDate: 'Feb 17, 2026', status: 'Interview Scheduled', statusColor: 'bg-blue-100 text-blue-700' },
    { id: 2, title: 'AC Service & Repair', company: 'CoolAir Solutions', logo: 'A', logoColor: 'from-orange-400 to-red-400', appliedDate: 'Feb 15, 2026', status: 'Under Review', statusColor: 'bg-yellow-100 text-yellow-700' },
    { id: 3, title: 'Electrical Wiring Work', company: 'PowerPro Experts', logo: 'E', logoColor: 'from-slate-600 to-slate-800', appliedDate: 'Feb 12, 2026', status: 'Application Sent', statusColor: 'bg-gray-100 text-gray-700' },
    { id: 4, title: 'Wall Painting — Interior', company: 'ColourKraft Painters', logo: 'K', logoColor: 'from-yellow-400 to-orange-500', appliedDate: 'Feb 10, 2026', status: 'Rejected', statusColor: 'bg-red-100 text-red-600' },
    { id: 5, title: 'Home Deep Cleaning', company: 'CleanNest India', logo: 'C', logoColor: 'from-red-400 to-red-600', appliedDate: 'Feb 8, 2026', status: 'Offer Received 🎉', statusColor: 'bg-green-100 text-green-700' },
]

const STEPS = ['Booked', 'Confirmed', 'In Progress', 'Done']
const STEP_MAP = { 'Application Sent': 0, 'Under Review': 1, 'Interview Scheduled': 2, 'Offer Received 🎉': 3, 'Rejected': -1 }

export default function ApplicationsPage() {
    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">My Bookings</h2>
                <p className="text-gray-500 text-sm mt-1">Track all your home service bookings in one place</p>
            </div>

            {/* Summary pills */}
            <div className="flex flex-wrap gap-3">
                {[
                    { label: 'Total Booked', value: APPLICATIONS.length, color: 'bg-primary-50 text-primary-700' },
                    { label: 'Pending Confirm', value: 1, color: 'bg-yellow-50 text-yellow-700' },
                    { label: 'In Progress', value: 1, color: 'bg-blue-50 text-blue-700' },
                    { label: 'Completed', value: 1, color: 'bg-green-50 text-green-700' },
                ].map(p => (
                    <div key={p.label} className={`flex items-center gap-2 ${p.color} px-4 py-2 rounded-xl font-semibold text-sm`}>
                        <span className="text-lg font-extrabold">{p.value}</span>
                        <span className="font-medium opacity-80">{p.label}</span>
                    </div>
                ))}
            </div>

            {/* Applications List */}
            <div className="space-y-4">
                {APPLICATIONS.map(app => {
                    const stepIdx = STEP_MAP[app.status]
                    const isRejected = app.status === 'Rejected'
                    return (
                        <div key={app.id} id={`application-${app.id}`} className="card hover:-translate-y-0.5 transition-all duration-200">
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

                                    {/* Progress Tracker */}
                                    {!isRejected && (
                                        <div className="mt-4">
                                            <div className="flex items-center">
                                                {STEPS.map((step, i) => (
                                                    <div key={step} className="flex items-center flex-1 last:flex-none">
                                                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${i <= stepIdx
                                                            ? 'bg-primary-600 text-white shadow-md'
                                                            : 'bg-gray-100 text-gray-400'
                                                            }`}>
                                                            {i < stepIdx ? '✓' : i + 1}
                                                        </div>
                                                        {i < STEPS.length - 1 && (
                                                            <div className={`flex-1 h-1 mx-1 rounded-full transition-colors ${i < stepIdx ? 'bg-primary-400' : 'bg-gray-100'}`} />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex mt-1 text-xs text-gray-400">
                                                {STEPS.map((step, i) => (
                                                    <span key={step} className={`flex-1 first:text-left last:text-right text-center ${i <= stepIdx ? 'text-primary-600 font-medium' : ''}`}>
                                                        {step}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {isRejected && (
                                        <p className="mt-3 text-xs text-red-400 flex items-center gap-1">
                                            ❌ Service could not be booked. Please try again or choose another professional!
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
