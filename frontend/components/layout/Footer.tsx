import { SITE_CONFIG } from "@/lib/constants";

/**
 * Footer component for site-wide navigation and social links
 * Appears at the bottom of every page via root layout
 */
export default function Footer() {
    return (
        <footer className="bg-neu-black text-white py-8 mt-16">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 text-center md:text-left">

                    <p className="text-neu-gray">
                        {SITE_CONFIG.footer.copyright}
                    </p>

                    <div className="flex gap-8 justify-center md:justify-end">
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
            </div>
        </footer>
    );
}
