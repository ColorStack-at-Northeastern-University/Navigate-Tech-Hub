import CircuitPattern from '@/components/ui/CircuitPattern';

interface AboutHeroProps {
    heading: string;
    subhead: string;
    compact?: boolean;
}

export default function AboutHero({ heading, subhead, compact = false }: AboutHeroProps) {
    const py = compact ? 'pt-10 pb-8' : 'pt-16 pb-12';
    return (
        <section className={`${py} bg-[#AA0F15] relative overflow-hidden`}>
            <CircuitPattern />
            <div className="container-custom !py-0 relative z-10">
                <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
                    {heading}
                </h1>
                <p className={`text-white/80 max-w-2xl ${compact ? 'text-base md:text-lg' : 'text-lg md:text-xl'}`}>
                    {subhead}
                </p>
            </div>
        </section>
    );
}
