import CircuitPattern from '@/components/ui/CircuitPattern';

export default function ContributionsHero() {
    return (
        <section className="pt-16 pb-12 bg-[#AA0F15] relative overflow-hidden">
            <CircuitPattern />
            <div className="container-custom !py-0 relative z-10">
                <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
                    Help build the hub
                </h1>
                <p className="text-lg md:text-xl text-white/80 max-w-2xl">
                    Navigate Tech Hub is student-led and open source. Pick how you want to contribute, no single path fits everyone.
                </p>
            </div>
        </section>
    );
}
