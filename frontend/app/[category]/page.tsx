/**
 * Category Page (Skeleton) TANIYA
 * 
 * Dynamic route that displays all resources for a specific category.
 * Handles: /interview-prep, /classes, /projects, /hackathons, /community
 */

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';

/**
 * Category page component
 * Shows all resources filtered by category
 */
export default function CategoryPage({ params }: { params: { category: string } }) {
    /**
     * TODO: Find Category Metadata
     * 
     * Description: Find the category object from CATEGORIES that matches params.category
     * Acceptance Criteria:
     * - [ ] Use array.find() to search CATEGORIES
     * - [ ] Match category.slug === params.category
     * - [ ] Store in categoryData variable
     * - [ ] Call notFound() if category doesn't exist
     * 
     * Hint: const categoryData = CATEGORIES.find(cat => cat.slug === params.category)
     * Then: if (!categoryData) notFound()
     */
    const categoryData = null; // Find category metadata here

    /**
     * TODO: Filter Resources by Category
     * 
     * Description: Get all resources that match this category
     * Acceptance Criteria:
     * - [ ] Filter resources array by category
     * - [ ] Match resource.category === params.category
     * - [ ] Store in categoryResources variable
     * 
     * Hint: const categoryResources = resources.filter(r => r.category === params.category)
     */
    const categoryResources = []; // Filter resources here

    return (
        <>
            <Navbar />

            <main>
                {/**
         * TODO: Category Hero Section
         * 
         * Description: Create hero section with gradient background
         * Acceptance Criteria:
         * - [ ] Use gradient-brand class from globals.css
         * - [ ] Display category label (from categoryData)
         * - [ ] Display category description (from categoryData)
         * - [ ] White text color
         * - [ ] Centered text
         * - [ ] Padding and proper spacing
         * 
         * Hint: Use categoryData.label and categoryData.description
         * Classes: gradient-brand text-white py-16 px-8 text-center
         */}
                <section className="mt-16 gradient-brand text-white py-16 px-8 text-center">
                    <div className="max-w-4xl mx-auto">
                        {/* Category title here */}
                        {/* Category description here */}
                    </div>
                </section>

                <div className="container-custom">
                    {/**
           * TODO: Breadcrumb Navigation
           * 
           * Description: Show navigation path (Home › Category Name)
           * Acceptance Criteria:
           * - [ ] "Home" is a clickable Link to "/"
           * - [ ] Category name is plain text (not clickable)
           * - [ ] Use › as separator
           * - [ ] Gray text color
           * - [ ] Margin bottom for spacing
           * 
           * Hint: <Link href="/">Home</Link> <span>›</span> <span>{categoryData.label}</span>
           */}
                    <div className="text-gray-600 mb-8">
                        {/* Breadcrumb here */}
                    </div>

                    {/**
           * TODO: Resource Count
           * 
           * Description: Display number of resources in this category
           * Acceptance Criteria:
           * - [ ] Show count: "Showing X resources in [Category]"
           * - [ ] Use categoryResources.length for count
           * - [ ] Gray text, medium size
           * - [ ] Margin bottom
           * 
           * Hint: Showing {categoryResources.length} resources in {categoryData.label}
           */}
                    <p className="text-gray-600 text-lg mb-8">
                        {/* Resource count here */}
                    </p>

                    {/**
           * TODO: Resources Grid
           * 
           * Description: Display all resources for this category in responsive grid
           * Acceptance Criteria:
           * - [ ] Grid with 1 col mobile, 2 tablet, 3 desktop
           * - [ ] Map over categoryResources
           * - [ ] Render ResourceCard for each resource
           * - [ ] Pass showCategory={false} (already filtered by category)
           * - [ ] Use resource.slug as key
           * 
           * Hint: Same grid pattern as Browse page
           */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {/* Map categoryResources here */}
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}