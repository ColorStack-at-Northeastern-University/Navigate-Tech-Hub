import { SITE_CONFIG } from '@/lib/constants';
import {
    DirectContactLink,
    FooterCopyright,
    FooterHubLinksRow,
    SocialLinksRow,
} from './footerShared';

export default function SiteFooter() {
    return (
        <footer className="bg-neu-black text-white py-10 mt-16">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
                    <div className="space-y-3">
                        <p className="font-display text-lg font-bold text-white">Navigate Tech Hub</p>
                        <p className="text-base text-neu-gray leading-relaxed">{SITE_CONFIG.footer.tagline}</p>
                        <FooterCopyright />
                    </div>
                    <div className="md:border-x md:border-gray-800 md:px-8">
                        <p className="text-sm uppercase tracking-wide text-neu-gray mb-3">Direct line</p>
                        <DirectContactLink />
                    </div>
                    <div className="space-y-5">
                        <div>
                            <p className="text-sm uppercase tracking-wide text-neu-gray mb-3">Chapter socials</p>
                            <SocialLinksRow />
                        </div>
                        <FooterHubLinksRow />
                    </div>
                </div>
            </div>
        </footer>
    );
}
