import Link from 'next/link';
import { ABOUT_CTAS } from './aboutContent';

export default function AboutCtaBand() {
    return (
        <div className="bg-gray-50 border-y border-gray-200 py-10">
            <div className="container-custom !py-0 flex flex-col sm:flex-row flex-wrap gap-4 items-center justify-center">
                {ABOUT_CTAS.map((cta) =>
                    cta.primary ? (
                        <Link
                            key={cta.href}
                            href={cta.href}
                            className="px-8 py-3 bg-neu-red text-white rounded-full font-semibold text-sm hover:bg-red-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neu-red focus-visible:ring-offset-2"
                        >
                            {cta.label} →
                        </Link>
                    ) : (
                        <Link
                            key={cta.href}
                            href={cta.href}
                            className="px-8 py-3 border-2 border-brand-dark text-brand-dark rounded-full font-semibold text-sm hover:bg-brand-dark hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2"
                        >
                            {cta.label}
                        </Link>
                    )
                )}
            </div>
        </div>
    );
}
