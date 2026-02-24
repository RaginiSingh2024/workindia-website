export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center">
                                <span className="text-white font-bold text-sm">W</span>
                            </div>
                            <span className="text-xl font-bold text-white">GharSeva</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Connecting Indian households with trusted, verified service professionals. Your comfort is our priority.
                        </p>
                        <div className="flex gap-3 mt-5">
                            {['LinkedIn', 'Twitter', 'Instagram'].map(s => (
                                <button
                                    key={s}
                                    className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-primary-600 flex items-center justify-center transition-colors duration-200 text-xs font-semibold"
                                >
                                    {s[0]}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            {['Our Services', 'Book a Professional', 'Service Areas', 'Customer Reviews'].map(item => (
                                <li key={item}>
                                    <a href="#" className="hover:text-primary-400 transition-colors duration-200">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm">
                            {['Help Center', 'Privacy Policy', 'Terms of Use', 'Contact Us'].map(item => (
                                <li key={item}>
                                    <a href="#" className="hover:text-primary-400 transition-colors duration-200">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
                    <p>© 2026 GharSeva. All rights reserved.</p>
                    <p>Made with ❤️ for Indian households</p>
                </div>
            </div>
        </footer>
    )
}
