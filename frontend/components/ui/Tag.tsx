interface TagProps {
    children: string;
    variant?: 'teal' | 'orange' | 'red' | 'dark';
}

export default function Tag({ children, variant = 'red' }: TagProps) {
    const variantStyles = {
        teal: 'bg-colorstack-teal',
        orange: 'bg-colorstack-orange',
        red: 'bg-neu-red',
        dark: 'bg-gray-800',
    };

    return (
        <span
            className={`inline-block ${variantStyles[variant]} text-white px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200`}
        >
            {children}
        </span>
    );
}
