import { SITE_CONFIG } from '@/lib/constants';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="mt-16 gradient-brand text-white py-20 px-8 text-center">
            <div className="max-w-4xl mx-auto">
                {/* Site Title */}
                <h1 className="text-3xl md:text-5xl font-bold mb-6">
                    {SITE_CONFIG.name}
                </h1>

                {/* Tagline */}
                <p className="text-lg md:text-xl font-light mb-8 max-w-3xl mx-auto">
                    {SITE_CONFIG.tagline}
                </p>

                {/* Call-to-Action Button */}
                <Link
                    href="/browse"
                    className="
                        inline-block
                        bg-neu-black text-white
                        px-10 py-4
                        rounded-full
                        text-lg font-semibold
                        transition-all duration-300
                        hover:bg-colorstack-orange hover:scale-105
                    "
                >
                    Explore Resources
                </Link>
            </div>
        </section>
    );
}