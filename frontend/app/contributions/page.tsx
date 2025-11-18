/**
 * [MOCK FEATURE]
 * 
 * Community Contributions Page
 * 
 * Dedicated page displaying community contributions and how to get involved.
 */

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import CommunityContributions from '@/components/sections/CommunityContributions';

export default function ContributionsPage() {
  return (
    <>
      <Navbar />

      <main className="container-custom mt-16">
        <div className="text-center mb-12 mt-12 animate-fade-in">
          <h1 className="page-title">Community Contributions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            By students, for students. Every contribution makes Navigate Tech Hub better for the next person.
          </p>
          <div className="accent-bar max-w-md mx-auto"></div>
        </div>

        <CommunityContributions />
      </main>

      <Footer />
    </>
  );
}

