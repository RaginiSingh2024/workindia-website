import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function LoginPage() {
    const [form, setForm] = useState({ fullName: '', password: '' })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const validate = () => {
        const e = {}
        if (!form.fullName.trim()) e.fullName = 'Name is required'
        if (!/^\d{4}$/.test(form.password)) e.password = 'Password must be exactly 4 digits'
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
            return
        }
        setLoading(true)

        // Simulate login delay
        setTimeout(() => {
            setLoading(false)
            // Always save the name the user typed at login.
            // Only set a default role if one wasn't already stored from registration.
            localStorage.setItem('userName', form.fullName)
            if (!localStorage.getItem('userRole')) {
                localStorage.setItem('userRole', 'jobseeker')
            }
            navigate('/dashboard')
        }, 1200)
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
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center shadow-md">
                            <span className="text-white font-bold">W</span>
                        </div>
                        <span className="text-2xl font-bold gradient-text">WorkIndia</span>
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Sign in</h1>
                    <p className="text-gray-500 mt-2">Enter your credentials to access your account</p>
                </div>

                {/* Card */}
                <div className="card shadow-xl border-0">
                    <form id="login-form" onSubmit={handleSubmit} noValidate className="space-y-5">
                        {/* Name */}
                        <div>
                            <label htmlFor="login-fullName" className="label">Name</label>
                            <input
                                id="login-fullName"
                                type="text"
                                name="fullName"
                                value={form.fullName}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className={`input-field ${errors.fullName ? 'border-red-400 ring-1 ring-red-400' : ''}`}
                            />
                            {errors.fullName && <p className="text-red-500 text-xs mt-1.5">{errors.fullName}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label htmlFor="login-password" className="label mb-0">4-Digit numeric Password</label>
                                <a id="forgot-password-link" href="#" className="text-xs text-primary-600 hover:text-primary-700 hover:underline font-medium transition-colors">
                                    Forgot password?
                                </a>
                            </div>
                            <input
                                id="login-password"
                                type="password"
                                name="password"
                                maxLength={4}
                                value={form.password}
                                onChange={e => {
                                    const val = e.target.value.replace(/\D/g, '')
                                    if (val.length <= 4) handleChange({ target: { name: 'password', value: val } })
                                }}
                                placeholder="● ● ● ●"
                                className={`input-field text-center tracking-[1em] font-bold ${errors.password ? 'border-red-400 ring-1 ring-red-400' : ''}`}
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1.5">{errors.password}</p>}
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center gap-2">
                            <input id="remember-me" type="checkbox" className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500" />
                            <label htmlFor="remember-me" className="text-sm text-gray-600">Remember me for 30 days</label>
                        </div>

                        {/* Submit */}
                        <button
                            id="login-submit"
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full text-base py-3.5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Signing in...
                                </>
                            ) : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                            Create one free
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
