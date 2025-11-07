/**
 * About Page (Skeleton)
 *
 * Detailed information about Navigate Tech Hub, its mission, values, and team.
 * Expanded version of the landing page about section.
 */

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { SITE_CONFIG } from '@/lib/constants';
import Link from 'next/link';

/**
 * About page component
 * Provides in-depth information about the project and team
 */
export default function AboutPage() {
    return (
        <>
            <Navbar />

            <main className="mt-16">
                {/* Hero Section */}
                <section className="gradient-brand text-white py-16 px-8 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            About Navigate Tech Hub
                        </h1>
                        <p className="text-lg md:text-xl font-light">
                            Built by students, for students. Empowering the next generation of Black and Latinx technologists.
                        </p>
                    </div>
                </section>

                {/* Main Content */}
                <div className="container-custom">

                    {/* Mission Section – purpose, goals, and audience of Navigate Tech Hub */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-neu-red mb-6">Our Mission</h2>
                        <div className="bg-white rounded-xl p-12 shadow-[0_2px_8px_rgba(0,0,0,0.1)] border-top-[5px] border-colorstack-teal">
                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                Navigate Tech Hub serves as a <strong>centralized platform</strong> for Black and Latinx computer science students at Northeastern University. Our mission is to provide accessible resources, foster community connections, and support academic success in technology fields.
                            </p>
                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                We believe that <strong>representation matters</strong> in tech. By creating a dedicated space for underrepresented students, we aim to bridge the resource gap and empower the next generation of diverse technologists.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Whether you're looking for internship opportunities, technical tutorials, or community support, Navigate Tech Hub is here to help you <strong>navigate your journey</strong> in computer science.
                            </p>
                        </div>
                    </section>

                    {/* Values Section – core values and guiding principles */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-neu-red mb-6">Our Values</h2>
                        <div className="bg-white rounded-xl p-12 shadow-[0_2px_8px_rgba(0,0,0,0.1)] border-top-[5px] border-colorstack-orange">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xl font-bold text-colorstack-teal mb-3">Student-Led</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Built and maintained by students who understand the challenges of navigating tech education. Our peer-to-peer approach ensures relevant, relatable content.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-colorstack-orange mb-3">Open Source</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Transparency and collaboration are at our core. All our code is publicly available, welcoming contributions from the community.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-neu-red mb-3">Community-Driven</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        We grow through collective knowledge sharing. Every resource added strengthens our community and helps future students succeed.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-colorstack-teal mb-3">Inclusive</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Creating a welcoming space for all students, with particular focus on supporting Black and Latinx technologists in their academic journey.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Origin Story Section – how and why the platform was created */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-neu-red mb-6">Our Story</h2>
                        <div className="bg-white rounded-xl p-12 shadow-[0_2px_8px_rgba(0,0,0,0.1)] border-top-[5px] border-neu-red">
                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                Navigate Tech Hub was founded by <strong>Adesola Odubiyi</strong>, Software Project Lead at ColorStack @ Northeastern University. Recognizing the need for a centralized resource hub specifically designed for underrepresented students in tech, Adesola envisioned a platform where students could easily find opportunities, tutorials, and community support.
                            </p>
                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                Through the partnership between <strong>ColorStack and Northeastern University</strong>, Navigate Tech Hub emerged as a student-driven initiative to address the resource gap faced by Black and Latinx computer science students. What started as a small collection of links has grown into a comprehensive platform serving the entire community.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Today, Navigate Tech Hub continues to evolve with contributions from students like <strong>Taniya, Bryce, Branden, and Ayaan</strong>, who work together to expand and improve the platform for future generations of technologists.
                            </p>
                        </div>
                    </section>

                    {/* Contribution Section – invitation to participate and links to GitHub/contact */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-neu-red mb-6">Get Involved</h2>
                        <div className="bg-white rounded-xl p-12 shadow-[0_2px_8px_rgba(0,0,0,0.1)] border-top-[5px] border-colorstack-teal">
                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                Navigate Tech Hub thrives on <strong>community contributions</strong>. Whether you've discovered a great resource, want to fix a bug, or have ideas for new features, we welcome your input. Every contribution helps build a stronger platform for current and future students.
                            </p>
                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                Contributing is easy: fork our repository, make your changes, and submit a pull request. You can add new resources, improve existing content, enhance the UI, or report issues. No contribution is too small!
                            </p>
                            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                                Join us in building something meaningful for the community. Check out our GitHub repository to get started today.
                            </p>

                            {/* Contact Button */}
                            <Link
                                href="mailto:contact@navigatetechhub.com"
                                className="bg-neu-red text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors inline-flex items-center justify-center gap-2"
                            >
                                <span>Contact Us</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </Link>

                            {/* GitHub Link Button */}
                            <Link
                                href={SITE_CONFIG.social.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-colorstack-teal text-white px-8 py-3 rounded-full font-semibold hover:bg-teal-600 transition-colors inline-flex items-center justify-center gap-2"
                            >
                                <span>Contribute on GitHub</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </Link>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </>
    );
}