export default function CircuitPattern() {
    return (
        <svg
            className="absolute right-0 top-0 h-full w-[300px] md:w-[450px] lg:w-[550px] pointer-events-none select-none"
            viewBox="0 0 550 250"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMaxYMid slice"
        >
            <g stroke="#de0911" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.45">
                {/* Main horizontal bus lines */}
                <path d="M180 60 H400 L440 100 H520" />
                <path d="M220 130 H360 L390 160 H510" />
                <path d="M250 200 H380 L410 170 H480" />

                {/* Vertical connectors */}
                <path d="M400 60 V30" />
                <path d="M440 100 V140" />
                <path d="M360 130 V90" />
                <path d="M380 200 V230" />
                <path d="M510 160 V200" />

                {/* Diagonal branches */}
                <path d="M300 60 L270 30 H220" />
                <path d="M300 130 L330 100 H370" />
                <path d="M310 200 L280 230 H240" />
                <path d="M470 100 L500 70 H540" />

                {/* Short stubs */}
                <path d="M480 170 V150" />
                <path d="M520 60 V40" />
                <path d="M220 130 L200 110" />
                <path d="M250 200 L230 180" />
            </g>

            {/* Circuit nodes (dots at junctions) */}
            <g fill="#de0911" opacity="0.55">
                <circle cx="400" cy="60" r="5" />
                <circle cx="440" cy="100" r="5" />
                <circle cx="360" cy="130" r="5" />
                <circle cx="380" cy="200" r="5" />
                <circle cx="510" cy="160" r="5" />
                <circle cx="300" cy="60" r="4" />
                <circle cx="300" cy="130" r="4" />
                <circle cx="310" cy="200" r="4" />
                <circle cx="480" cy="170" r="4" />
                <circle cx="520" cy="60" r="4" />
                <circle cx="470" cy="100" r="4" />
                <circle cx="220" cy="130" r="4" />
                <circle cx="250" cy="200" r="4" />

                {/* Terminal squares */}
                <rect x="215" y="26" width="10" height="10" rx="2" />
                <rect x="535" y="66" width="10" height="10" rx="2" />
                <rect x="235" y="226" width="10" height="10" rx="2" />
                <rect x="505" y="196" width="10" height="10" rx="2" />
            </g>
        </svg>
    );
}
