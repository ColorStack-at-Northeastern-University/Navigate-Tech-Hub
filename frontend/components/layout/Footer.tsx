import { NATIONAL_COLORSTACK, SITE_CONFIG, getSubmitResourceUrl } from "@/lib/constants";

/**
 * Footer component for site-wide navigation and social links
 * Appears at the bottom of every page via root layout
 */
export default function Footer() {
    const submitUrl = getSubmitResourceUrl();

    return (
        <footer className="bg-neu-black text-white py-8 mt-16">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 text-center md:text-left">

                    <p className="text-neu-gray">
                        {SITE_CONFIG.footer.copyright}
                    </p>

                    <div className="flex flex-wrap gap-6 justify-center md:justify-end">
                        {Object.entries(SITE_CONFIG.social).map(([label, url]) => (
                            <a
                                key={label}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-neu-gray hover:text-white transition-colors duration-200"
                            >
                                {label}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-800 flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 justify-center md:justify-between items-center text-sm text-neu-gray">
                    <div className="flex flex-wrap gap-4 sm:gap-6 justify-center">
                        <a
                            href={NATIONAL_COLORSTACK.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors"
                        >
                            ColorStack (National)
                        </a>
                        <a
                            href={NATIONAL_COLORSTACK.becomeMember}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors"
                        >
                            Become a member
                        </a>
                        <a
                            href={NATIONAL_COLORSTACK.getInvolved}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors"
                        >
                            Get involved
                        </a>
                    </div>
                    <a
                        href={submitUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-colorstack-teal hover:text-white transition-colors font-medium"
                    >
                        Suggest a resource
                    </a>
                </div>
            </div>
        </footer>
    );
}
