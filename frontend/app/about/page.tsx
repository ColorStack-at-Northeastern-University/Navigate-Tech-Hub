/**
 * About Page (Skeleton)
 * 
 * Detailed information about Navigate Tech Hub, its mission, values, and team.
 * Expanded version of the landing page about section.
 */

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';

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
                    {/**
           * TODO: Mission Section
           * 
           * Description: Explain the mission and purpose of Navigate Tech Hub
           * Acceptance Criteria:
           * - [ ] White background container with rounded corners
           * - [ ] Padding, shadow, border-top styling
           * - [ ] Section title (h2) - "Our Mission"
           * - [ ] 2-3 paragraphs explaining mission
           * - [ ] Use placeholder content (Lorem ipsum or similar)
           * - [ ] Bold key phrases for emphasis
           * 
           * Content Structure:
           * - What is Navigate Tech Hub?
           * - Why it was created
           * - Who it serves
           * 
           * Hint: Use same styling as landing page about section
           */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-neu-red mb-6">Our Mission</h2>
                        <div className="bg-white rounded-xl p-12 shadow-[0_2px_8px_rgba(0,0,0,0.1)] border-t-[5px] border-colorstack-teal">
                            {/* Mission content paragraphs here */}
                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                [PLACEHOLDER: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Navigate Tech Hub was created to address the need for centralized resources specifically tailored to Black and Latinx computer science students at Northeastern University.]
                            </p>
                        </div>
                    </section>

                    {/**
           * TODO: Values Section
           * 
           * Description: Highlight core values and principles
           * Acceptance Criteria:
           * - [ ] Section title (h2) - "Our Values"
           * - [ ] White background container
           * - [ ] 3-4 value items (can use grid for layout)
           * - [ ] Each value has a title and description
           * - [ ] Use placeholder content
           * 
           * Content Structure:
           * - Student-Led
           * - Open Source
           * - Community-Driven
           * - Inclusive
           */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-neu-red mb-6">Our Values</h2>
                        <div className="bg-white rounded-xl p-12 shadow-[0_2px_8px_rgba(0,0,0,0.1)] border-t-[5px] border-colorstack-orange">
                            {/* Values content here */}
                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                [PLACEHOLDER: Lorem ipsum dolor sit amet. Student-led, open-source, community-driven, and inclusive are the pillars of our approach.]
                            </p>
                        </div>
                    </section>

                    {/**
           * TODO: Origin Story Section
           * 
           * Description: Tell the story of how Navigate Tech Hub was created
           * Acceptance Criteria:
           * - [ ] Section title (h2) - "Our Story"
           * - [ ] White background container
           * - [ ] 2-3 paragraphs about origin
           * - [ ] Mention Daniel Adesola Odubiyi as founder
           * - [ ] Mention ColorStack and Northeastern partnership
           * - [ ] Use placeholder content for now
           * 
           * Content Structure:
           * - How it started
           * - Why it was needed
           * - The partnership (ColorStack x NEU)
           */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-neu-red mb-6">Our Story</h2>
                        <div className="bg-white rounded-xl p-12 shadow-[0_2px_8px_rgba(0,0,0,0.1)] border-t-[5px] border-neu-red">
                            {/* Origin story content here */}
                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                [PLACEHOLDER: Lorem ipsum dolor sit amet. Founded by Daniel Adesola Odubiyi in partnership with ColorStack and Northeastern University, Navigate Tech Hub emerged from a need to centralize resources for underrepresented students in tech.]
                            </p>
                        </div>
                    </section>

                    {/**
           * TODO: How to Contribute Section
           * 
           * Description: Call to action for students to contribute
           * Acceptance Criteria:
           * - [ ] Section title (h2) - "Get Involved"
           * - [ ] White background container
           * - [ ] Explanation of how to contribute
           * - [ ] Link to GitHub repository
           * - [ ] Link to contact form or email (can be placeholder)
           * - [ ] Use placeholder content
           * 
           * Content Structure:
           * - We welcome contributions
           * - How to submit resources
           * - How to report issues
           * - GitHub link
           * 
           * Hint: Use Link component for GitHub, style as button
           */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-neu-red mb-6">Get Involved</h2>
                        <div className="bg-white rounded-xl p-12 shadow-[0_2px_8px_rgba(0,0,0,0.1)] border-t-[5px] border-colorstack-teal">
                            {/* Contribution content here */}
                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                [PLACEHOLDER: Lorem ipsum dolor sit amet. We're always looking for contributions from students who want to share their knowledge and experiences.]
                            </p>

                            {/* Call to action button */}
                            {/**
               * TODO: GitHub Repository Link Button
               * 
               * Description: Create button that links to GitHub repo
               * Acceptance Criteria:
               * - [ ] Use Link component pointing to GitHub
               * - [ ] Button styling (rounded-full, teal background)
               * - [ ] Opens in new tab (target="_blank")
               * - [ ] Text: "View on GitHub" or "Contribute on GitHub"
               * 
               * Hint: href from SITE_CONFIG.social.github
               */}
                            {/* GitHub button here */}
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </>
    );
}