/**
 * [DEMO UI ENHANCEMENTS - Phase 1]
 * [MOCK FEATURES INTEGRATED]
 * 
 * Home Page
 * 
 * Landing page featuring hero section, mock features, featured resources, and about section.
 * Server component that statically generates at build time.
 * 
 * Quick visual improvements for demo presentation.
 * Production implementation would require:
 * - Comprehensive accessibility audit
 * - Design system integration (shadcn/ui, Radix, etc.)
 * - User research and A/B testing
 */

import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import ColorStackOpportunities from '../components/sections/ColorStackOpportunities';
import LiveActivity from '../components/sections/LiveActivity';
import ResourceCard from '../components/ui/ResourceCard';
import { resources } from '../data/resources';

/**
 * Home page component
 * Entry point for the Navigate Tech Hub application
 */
export default function Home() {
  // Get first 6 resources for featured section
  const featuredResources = resources.slice(0, 6);

  return (
    <>
      <Navbar />

      <main>
        <Hero />

        {/* ColorStack Opportunities - Mock Feature */}
        <ColorStackOpportunities />

        {/* Featured Resources Section */}
        <section className="container-custom">
          <h3 className="section-title">
            Featured Resources
          </h3>

          <div className="accent-bar"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredResources.map((resource) => (
              <ResourceCard
                key={resource.slug}
                resource={resource}
                showCategory={false}
              />
            ))}
          </div>
        </section>

        {/* Live Activity - Mock Feature */}
        <LiveActivity />

        {/* About Section */}
        <section className="container-custom">
          <h3 className="section-title" id="about">
            About Navigate Tech Hub
          </h3>

          <div className="accent-bar"></div>

          <div className="bg-white rounded-xl p-12 shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300 border-t-[5px] border-colorstack-teal">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Navigate Tech Hub is a student-led initiative created by Adesola Odubiyi to support
              Black and Latinx computer science students at Northeastern University. Our mission is simple: centralize
              resources, share knowledge, and build community.
            </p>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Whether you're preparing for technical interviews, looking for project ideas, navigating course registration,
              or seeking career advice, Navigate Tech Hub is your single source of truth. We've compiled insights from ColorStack, Code: Black, and experienced students who've been where you are.
            </p>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              This platform is built by students, for students. All content is open-source and continuously
              updated by our community. If you have advice to share or resources to contribute, we want to hear from you.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed"></p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
