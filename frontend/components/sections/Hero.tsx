import { SITE_CONFIG } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';

const STATS = [
    { value: '12+', label: 'Resources', color: '#9C373B', offsetX: 'right-17' },
    { value: '31+', label: 'External Links', color: '#B9272C', offsetX: 'left-17 -mt-4' },
    { value: '5', label: 'Categories', color: '#AA0F15', offsetX: 'right-17' },
    { value: '100%', label: 'Free Access', color: '#6B080C', offsetX: 'left-17 -mt-4' },
];

function OrbCluster({ position }: { position: 'top-right' | 'bottom-left' }) {
    const base = position === 'top-right'
        ? 'top-2 right-2'
        : 'bottom-2 left-2';

    return (
        <div className={`absolute ${base} w-[50px] h-[50px] md:w-[70px] md:h-[70px] pointer-events-none`}>
            <div className="absolute top-0 left-0 w-[55%] h-[55%] rounded-full bg-gray-300/85" />
            <div className="absolute top-0 right-0 w-[55%] h-[55%] rounded-full bg-gray-300/85" />
            <div className="absolute bottom-0 left-0 w-[55%] h-[55%] rounded-full bg-gray-300/85" />
            <div className="absolute bottom-0 right-0 w-[55%] h-[55%] rounded-full bg-gray-300/85" />
        </div>
    );
}

function TitleBrackets() {
    const bracketColor = '#9C373B';
    return (
        <div className="relative inline-block px-10 py-6 mb-4">
            <span
                className="absolute top-0 left-0 w-8 h-8 border-t-[3px] border-l-[3px]"
                style={{ borderColor: bracketColor }}
            />
            <span
                className="absolute top-0 right-0 w-8 h-8 border-t-[3px] border-r-[3px]"
                style={{ borderColor: bracketColor }}
            />
            <span
                className="absolute bottom-0 left-0 w-8 h-8 border-b-[3px] border-l-[3px]"
                style={{ borderColor: bracketColor }}
            />
            <span
                className="absolute bottom-0 right-0 w-8 h-8 border-b-[3px] border-r-[3px]"
                style={{ borderColor: bracketColor }}
            />

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[0.95] text-brand-dark">
                Navigate<br />Tech Hub
            </h1>
        </div>
    );
}

export default function Hero() {
    return (
        <section className="mt-14 bg-white py-16 md:py-20 px-8 relative overflow-hidden">
            <OrbCluster position="top-right" />
            <OrbCluster position="bottom-left" />

            {/* Husky — absolutely positioned, out of flow */}
            <div className="hidden md:block absolute left-0 lg:left-4 top-[42%] -translate-y-1/2 z-0 pointer-events-none">
                <Image
                    src="/images/husky-head.png"
                    alt="King Husky mascot"
                    width={650}
                    height={750}
                    className="w-[250px] md:w-[288px] lg:w-[346px] h-auto opacity-70"
                    priority
                />
            </div>

            {/* Stat badges + S-icon — absolutely positioned, out of flow */}
            <div className="hidden md:block absolute right-12 lg:right-24 xl:right-32 top-1/2 -translate-y-1/2 z-0 pointer-events-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/images/colorstack-logo-red.png"
                    alt=""
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-none w-[400px] md:w-[480px] lg:w-[560px] h-auto"
                />

                <div className="relative flex flex-col gap-3">
                    {STATS.map((stat) => (
                        <div key={stat.label} className={`relative ${stat.offsetX}`}>
                            <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-xl bg-brand-dark" />
                            <div
                                className="relative rounded-xl w-[85px] h-[68px] md:w-[105px] md:h-[82px] flex flex-col justify-center px-3 text-white"
                                style={{ backgroundColor: stat.color }}
                            >
                                <span className="text-xl md:text-3xl font-bold leading-tight">{stat.value}</span>
                                <span className="text-[8px] md:text-[11px] font-medium opacity-90">{stat.label}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Center content — full width, truly centered */}
            <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
                <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-[400px] md:h-[400px] rounded-full bg-gray-300/50 -z-10" />

                <TitleBrackets />

                <p className="text-base md:text-lg text-gray-500 mb-8 max-w-md mx-auto">
                    {SITE_CONFIG.tagline}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                    <Link
                        href="/browse"
                        className="bg-[#AA0F15] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#8a0c11] transition-colors text-sm min-w-[180px] text-center"
                    >
                        Explore Articles
                    </Link>
                    <Link
                        href="/external-resources"
                        className="bg-[#6B080C] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#520609] transition-colors text-sm min-w-[180px] text-center"
                    >
                        Explore Resources
                    </Link>
                </div>

                <p className="text-sm text-gray-400">
                    A Northeastern X ColorStack Project
                </p>
            </div>
        </section>
    );
}
