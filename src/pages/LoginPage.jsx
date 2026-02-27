import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function LoginPage() {
    const [form, setForm] = useState({ phoneNumber: '', password: '' })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const validate = () => {
        const e = {}
        if (!form.phoneNumber.trim()) {
            e.phoneNumber = 'Phone number is required'
        } else if (!/^\d{10}$/.test(form.phoneNumber)) {
            e.phoneNumber = 'Please enter a valid 10-digit phone number'
        }

        if (!form.password) {
            e.password = 'Password is required'
        } else if (form.password.length < 6) {
            e.password = 'Password must be at least 6 characters'
        }
        return e
    }

    const handleChange = e => {
        const { name, value } = e.target

        if (name === 'phoneNumber') {
            // Only allow digits and limit to 10
            const val = value.replace(/\D/g, '').slice(0, 10)
            setForm(prev => ({ ...prev, [name]: val }))
        } else {
            setForm(prev => ({ ...prev, [name]: value }))
        }

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
            // Save phone number or a mock name for UI purposes
            localStorage.setItem('userName', 'User ' + form.phoneNumber.slice(-4))
            localStorage.setItem('userPhone', form.phoneNumber)
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
                        {/* Phone Number */}
                        <div>
                            <label htmlFor="login-phoneNumber" className="label">Phone Number</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">+91</span>
                                <input
                                    id="login-phoneNumber"
                                    type="text"
                                    name="phoneNumber"
                                    value={form.phoneNumber}
                                    onChange={handleChange}
                                    placeholder="Enter 10 digit number"
                                    className={`input-field pl-14 ${errors.phoneNumber ? 'border-red-400 ring-1 ring-red-400' : ''}`}
                                />
                            </div>
                            {errors.phoneNumber && <p className="text-red-500 text-xs mt-1.5">{errors.phoneNumber}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label htmlFor="login-password" className="label mb-0">Password</label>
                                <a id="forgot-password-link" href="#" className="text-xs text-primary-600 hover:text-primary-700 hover:underline font-medium transition-colors">
                                    Forgot password?
                                </a>
                            </div>
                            <input
                                id="login-password"
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className={`input-field ${errors.password ? 'border-red-400 ring-1 ring-red-400' : ''}`}
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

