// src/app/category/[slug]/page.tsx
import CategoryContent from './CategoryContent';
import { fetchClosestUpcomingCourses, fetchCourseWebPage } from '@/app/services/categoryService';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await (params);
  
  // Fetch data in parallel
  const [closestUpcomingCourse, mainData] = await Promise.all([
    fetchClosestUpcomingCourses(),
    fetchCourseWebPage(slug),
  ]);

  return (
    <CategoryContent 
      slug={slug}
      closestUpcomingCourse={closestUpcomingCourse}
      mainData={mainData}
    />
  );
}