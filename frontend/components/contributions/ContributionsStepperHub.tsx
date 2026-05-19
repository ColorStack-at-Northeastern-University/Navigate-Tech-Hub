'use client';

import { CONTRIBUTION_LANES } from '@/lib/contributions';
import LaneCtaButton from './LaneCtaButton';

export default function ContributionsStepperHub() {
    return (
        <div className="flex flex-col lg:flex-row gap-10 mb-12">
            <nav
                className="lg:w-56 shrink-0 lg:sticky lg:top-24 lg:self-start"
                aria-label="Contribution paths"
            >
                <ul className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
                    {CONTRIBUTION_LANES.map((lane) => (
                        <li key={lane.id}>
                            <a
                                href={`#${lane.anchor}`}
                                className="block whitespace-nowrap rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-neu-red hover:text-neu-red transition-colors"
                            >
                                {lane.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="flex-1 space-y-12 min-w-0">
                {CONTRIBUTION_LANES.map((lane, index) => (
                    <section key={lane.id} id={lane.anchor} className="scroll-mt-28">
                        <div className="flex items-baseline gap-3 mb-4">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neu-red text-white font-bold text-sm">
                                {index + 1}
                            </span>
                            <h2 className="font-display text-2xl font-bold text-brand-dark">{lane.title}</h2>
                        </div>
                        <div className="bg-white rounded-xl p-8 md:p-10 shadow-[0_2px_8px_rgba(0,0,0,0.1)] border-t-[3px] border-neu-red">
                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">{lane.summary}</p>
                            <ol className="space-y-4 mb-6">
                                {lane.steps.map((step, stepIndex) => (
                                    <li key={step} className="flex gap-4">
                                        <span className="text-neu-red font-bold tabular-nums">{stepIndex + 1}.</span>
                                        <span className="text-gray-700 leading-relaxed">{step}</span>
                                    </li>
                                ))}
                            </ol>
                            <p className="text-sm text-gray-500 mb-6 border-l-2 border-neu-red pl-3">{lane.afterSubmit}</p>
                            <LaneCtaButton cta={lane.primaryCta} />
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}
