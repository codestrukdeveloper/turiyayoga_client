import { fetchOurStory, fetchClosestUpcomingCourses, fetchGoaCourses } from "@/app/services/categoryService";
import OurStoryClient from "./OurStoryClient";

export async function generateMetadata() {
  const ourStoryData = await fetchOurStory();
  
  return {
    title: ourStoryData.meta_Title || 'Our Story - Turiya Yoga',
    description: ourStoryData.meta_Description || 'Learn about our yoga journey and mission',
    keywords: ourStoryData.meta_Keywords || 'yoga, our story, turiya yoga',
  };
}

export default async function OurStoryPage() {
  // Fetch all data in parallel
  const [ourStoryData, closestUpcomingCourses, goaCourses] = await Promise.all([
    fetchOurStory(),
    fetchClosestUpcomingCourses(),
    fetchGoaCourses(),
  ]);

  return (
    <OurStoryClient
      initialOurStoryData={ourStoryData}
      initialClosestUpcomingCourses={closestUpcomingCourses}
      initialGoaCourses={goaCourses}
    />
  );
}