import ContributionsPageShell from '@/components/contributions/ContributionsPageShell';
import ContributionsStepperHub from '@/components/contributions/ContributionsStepperHub';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contributions | Navigate Tech Hub',
    description:
        'Suggest resources, report issues, open pull requests, or pitch guide topics. Student-led ways to help build the hub.',
};

export default function ContributionsPage() {
    return (
        <ContributionsPageShell>
            <ContributionsStepperHub />
        </ContributionsPageShell>
    );
}
