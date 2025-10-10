/**
 * Home Page (Skeleton)
 * 
 * Landing page featuring hero section, featured resources, and about section.
 * Server component that statically generates at build time.
 */

import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';

/**
 * Home page component
 * Entry point for the Navigate Tech Hub application
 */
export default function Home() {
  /**
   * TODO: Get Featured Resources
   * 
   * Description: Extract first 6 resources from the resources array
   * Acceptance Criteria:
   * - [ ] Use array slice method to get first 6 items
   * - [ ] Store in a variable called featuredResources
   * 
   * Hint: resources.slice(0, 6)
   * 
   * Estimated Time: 45 minutes
   */
  const featuredResources = []; // Get featured resources here

  return (
    <>
      <Navbar />

      <main>
        <Hero />

        {/**
         * Featured Resources Section
         */}
        <section className="container-custom">
          {/**
           * TODO: Display Section Title
           * 
           * Description: Render "Featured Resources" heading
           * Acceptance Criteria:
           * - [ ] Use h3 element with section-title class
           * - [ ] Text should say "Featured Resources"
           * 
           * Estimated Time: 30 minutes
           */}
          <h3 className="section-title">
            {/* Section title here */}
          </h3>

          <div className="accent-bar"></div>

          {/**
           * TODO: Render Featured Resource Cards
           * 
           * Description: Create responsive grid of resource cards
           * Acceptance Criteria:
           * - [ ] Use grid layout with responsive columns
           * - [ ] 1 column on mobile, 2 on tablet, 3 on desktop
           * - [ ] Add gap between cards
           * - [ ] Map over featuredResources array
           * - [ ] Render Card component for each resource
           * - [ ] Pass resource prop to each Card
           * - [ ] Include unique key prop (use resource.slug)
           * 
           * Hint: Grid classes - grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
           * 
           * Resources:
           * - Tailwind Grid: https://tailwindcss.com/docs/grid-template-columns
           * 
           * Estimated Time: 120 minutes
           */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Map over featured resources here */}
          </div>
        </section>

        {/**
         * About Section
         */}
        <section className="container-custom">
          {/**
           * TODO: Display About Section Title
           * 
           * Description: Render "About Navigate Tech Hub" heading with anchor link
           * Acceptance Criteria:
           * - [ ] Use h3 element with section-title class
           * - [ ] Add id="about" for anchor link navigation
           * - [ ] Text should say "About Navigate Tech Hub"
           * 
           * Estimated Time: 45 minutes
           */}
          <h3 className="section-title" id="about">
            {/* About title here */}
          </h3>

          <div className="accent-bar"></div>

          {/**
           * TODO: Implement About Content
           * 
           * Description: Create styled container with about text
           * Acceptance Criteria:
           * - [ ] Use div with white background and rounded corners
           * - [ ] Add padding, shadow, and border styling
           * - [ ] Include 3-4 paragraphs about the project (see mock code for content)
           * - [ ] Emphasize key phrases with bold text (colorstack, student-led, etc.)
           * - [ ] Appropriate text size and line height for readability
           * 
           * Content to include:
           * - What Navigate Tech Hub is
           * - Mission statement
           * - Who it's for (Black and Latinx CS students at NEU)
           * - Built by students, for students
           * 
           * Hint: Copy content from mock code's about section
           * 
           * Resources:
           * - Mock code reference in project docs / on Github
           * 
           * Estimated Time: 2 hour
           */}
          <div className="bg-white rounded-xl p-12 shadow-card border-t-[5px] border-colorstack-teal">
            {/* About content paragraphs here */}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}