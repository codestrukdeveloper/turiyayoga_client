import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchClosestUpcomingCourses } from '@/app/services/categoryService';
import { fetchModuleWebPages } from '@/app/services/moduleService';
import SubCategoryClient from './SubCategoryClient';

interface PageProps {
    params: {
        slug: string;
    };
}

// Define the props expected by SubCategoryClient
interface SubCategoryClientProps {
    initialData: any; // You can replace 'any' with an actual type from your API
    initialClosestUpcomingCourse: any;
    slug: string;
}

// Server-side data fetching
async function getPageData(slug: string) {
    try {
        const [mainData, closestUpcomingCourse] = await Promise.all([
            fetchModuleWebPages(slug),
            fetchClosestUpcomingCourses()
        ]);
        console.log("closestUpcomingCourse", closestUpcomingCourse)
        return {
            mainData,
            closestUpcomingCourse: closestUpcomingCourse || []
        };
    } catch (error) {
        console.error('Error fetching page data:', error);
        return null;
    }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
     const [mainData] = await Promise.all([
            fetchModuleWebPages(params.slug)
        ]);

    return {
        title:
            mainData.metaTitle ||
            'Zertifizierte Yogalehrer Ausbildung bei Turiya Yoga | Starte Deine Karriere im Yoga',
        description:
            mainData.metaDescription ||
            'Entdecke die zertifizierte Yogalehrer Ausbildung bei Turiya Yoga – international anerkannt und umfassend. Ich werde ein professioneller Yogalehrer mit fundierten Kenntnissen und Praxis. Melde dich jetzt an und starte deine Reise zu einem erfüllten Yoga-Leben!',
        alternates: {
            canonical: mainData.canonicalLink,
        },
        openGraph: {
            title: mainData.metaTitle || 'Turiya Yoga - Yogalehrer Ausbildung',
            description: mainData.metaDescription || 'Zertifizierte Yogalehrer Ausbildung',
            type: 'website',
        },
    };
}

// Page component
export default async function SubCategoryPage({ params }: PageProps) {
    const { slug } = await (params);
    const [mainData, closestUpcomingCourse] = await Promise.all([
        fetchModuleWebPages(slug),
        fetchClosestUpcomingCourses()
    ]);
    return (
        <SubCategoryClient
            initialData={mainData}
            initialClosestUpcomingCourse={closestUpcomingCourse}
            slug={params.slug}
        />
    );
}
