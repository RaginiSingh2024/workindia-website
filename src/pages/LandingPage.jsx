import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const FEATURES = [
    {
        id: 'find-jobs',
        icon: '🔧',
        title: 'Book a Service',
        desc: 'Choose from trusted plumbers, electricians, carpenters, painters, AC repair, and home cleaning services near your area.',
        color: 'from-blue-500 to-primary-600',
    },
    {
        id: 'post-jobs',
        icon: '🏠',
        title: 'Verified Professionals',
        desc: 'All our service providers are background-checked, trained, and rated by real customers across India.',
        color: 'from-violet-500 to-accent-600',
    },
    {
        id: 'ai-assistant',
        icon: '⭐',
        title: 'Smart Booking Assistant',
        desc: 'Get instant service recommendations, fair price estimates, and slot bookings powered by our smart assistant.',
        color: 'from-pink-500 to-rose-500',
    },
]

const STEPS = [
    { step: '01', title: 'Choose Your Service', desc: 'Select the service you need — plumber, electrician, carpenter, painter, AC repair, or home cleaning.' },
    { step: '02', title: 'Pick a Time Slot', desc: 'Choose a convenient date and time. Our professionals arrive on schedule, right at your doorstep.' },
    { step: '03', title: 'Relax & Get It Done', desc: 'Sit back while our verified expert handles the job. Pay only after you are fully satisfied.' },
]

const STATS = [
    { value: '50K+', label: 'Services Done' },
    { value: '2M+', label: 'Happy Families' },
    { value: '10K+', label: 'Verified Experts' },
    { value: '98%', label: 'Satisfaction Rate' },
]

export default function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600" />
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-400 rounded-full blur-3xl" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full mb-6 animate-fade-in">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        India's #1 Home Services Platform — 50,000+ Bookings Completed
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight animate-slide-up">
                        Trusted Home Services at Your<br />
                        <span className="text-yellow-300">Doorstep</span> Across India
                    </h1>

                    <p className="mt-6 text-lg sm:text-xl text-primary-100 max-w-2xl mx-auto leading-relaxed animate-fade-in">
                        Whether you need a plumber, electrician, carpenter, or home cleaner, GharSeva connects your family with verified professionals — fast, safe, and affordable.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
                        <Link
                            id="hero-get-started"
                            to="/register"
                            className="inline-flex items-center justify-center gap-2 bg-white text-primary-700 hover:bg-yellow-300 hover:text-primary-900 font-bold px-8 py-4 rounded-xl text-lg transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                        >
                            Book a Service — It's Free
                            <span>→</span>
                        </Link>
                        <Link
                            to="/dashboard/jobs"
                            className="inline-flex items-center justify-center gap-2 border-2 border-white/50 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-200"
                        >
                            Browse Services
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                        {STATS.map(stat => (
                            <div key={stat.label} className="text-center">
                                <div className="text-2xl md:text-3xl font-extrabold text-white">{stat.value}</div>
                                <div className="text-primary-200 text-sm mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Wave Divider */}
                <div className="relative h-16 overflow-hidden">
                    <svg viewBox="0 0 1440 64" className="absolute bottom-0 w-full" preserveAspectRatio="none">
                        <path d="M0,32L120,26.7C240,21,480,11,720,16C960,21,1200,43,1320,48L1440,53L1440,64L1320,64C1200,64,960,64,720,64C480,64,240,64,120,64L0,64Z" fill="#F9FAFB" />
                    </svg>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Why GharSeva?</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Everything You Need at Home</h2>
                        <p className="text-gray-500 mt-3 max-w-xl mx-auto">Reliable, affordable, and professional home services all in one trusted platform.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {FEATURES.map(f => (
                            <div
                                key={f.id}
                                id={`feature-${f.id}`}
                                className="card group hover:-translate-y-2 transition-all duration-300 cursor-default"
                            >
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                    {f.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{f.desc}</p>
                                <div className="mt-5">
                                    <Link to="/register" className="text-primary-600 font-semibold text-sm hover:text-primary-700 transition-colors inline-flex items-center gap-1">
                                        Learn more <span>→</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Simple Process</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">How It Works</h2>
                        <p className="text-gray-500 mt-3 max-w-xl mx-auto">Get your home service done in 3 simple steps — no hassle, no waiting.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
                        {/* Connector Line */}
                        <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary-300 to-accent-400 z-0" />

                        {STEPS.map((s, i) => (
                            <div key={s.step} className="relative text-center z-10">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center mx-auto mb-6 shadow-xl">
                                    <span className="text-2xl font-black text-white">{s.step}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-14">
                        <Link to="/register" className="btn-primary text-base px-10 py-4 inline-flex items-center gap-2">
                            Book Your First Service <span>🏠</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-600">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                        Ready to Book a Home Service?
                    </h2>
                    <p className="text-primary-100 text-lg mb-8">
                        Join 2 million+ Indian families already trusting GharSeva for all their home needs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/register" className="inline-block bg-white text-primary-700 font-bold px-8 py-4 rounded-xl hover:bg-yellow-300 hover:text-primary-900 transition-all duration-200 shadow-xl hover:-translate-y-1">
                            Create Free Account
                        </Link>
                        <Link to="/dashboard/jobs" className="inline-block border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-200">
                            Browse Services
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
