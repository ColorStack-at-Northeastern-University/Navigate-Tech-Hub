import SuggestResourceForm from '@/components/ui/SuggestResourceForm';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';

export const metadata = {
    title: 'Suggest a Resource | Navigate Tech Hub',
    description: 'Know a tool or program that should be in the directory? Submit it here.',
};

export default function SuggestResourcePage() {
    return (
        <>
            <Navbar />
            <main className="container-custom mt-16">
                <div className="max-w-2xl mx-auto py-16">
                    <h1 className="font-display text-4xl font-bold text-brand-dark mb-3">
                        Suggest a Resource
                    </h1>
                    <p className="text-gray-600 mb-10 text-lg leading-relaxed">
                        Know a tool, community, or recurring program that belongs in the directory?
                        Fill in the form below. Your suggestion creates a GitHub Issue that we review weekly.
                    </p>
                    <SuggestResourceForm />
                </div>
            </main>
            <Footer />
        </>
    );
}
