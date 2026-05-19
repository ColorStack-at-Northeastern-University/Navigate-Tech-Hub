import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import ContributionsDirectContact from './ContributionsDirectContact';
import ContributionsFooterCtas from './ContributionsFooterCtas';
import ContributionsHero from './ContributionsHero';
import type { ReactNode } from 'react';

type ContributionsPageShellProps = {
    children: ReactNode;
};

export default function ContributionsPageShell({ children }: ContributionsPageShellProps) {
    return (
        <>
            <Navbar />
            <main className="mt-16">
                <ContributionsHero />
                <div className="container-custom py-12">
                    <p className="text-gray-600 mb-6 text-lg max-w-3xl leading-relaxed">
                        Built for Northeastern ColorStack students, and open to anyone with GitHub access who wants to
                        improve the hub. Choose a lane below; each one has concrete steps and what happens after you
                        submit.
                    </p>
                    <ContributionsDirectContact />
                    {children}
                    <ContributionsFooterCtas />
                </div>
                <div className="container-custom pt-0 pb-8">
                    <p className="text-[#de0911] text-3xl md:text-4xl font-bold">&lt;/&gt;</p>
                </div>
            </main>
            <Footer />
        </>
    );
}
