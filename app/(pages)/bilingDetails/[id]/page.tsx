import { notFound } from 'next/navigation';
import { fetchCourseById, fetchUserDetailById } from '@/app/services/categoryService';
import BillingDetailsClient from './BillingDetailsClient';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function BillingDetailsPage({ params }: PageProps) {
  const { id } = params;

  if (!id) {
    notFound();
  }

  try {
    // Fetch course data on server
    const courseData = await fetchCourseById(id);
    
    if (!courseData) {
      notFound();
    }

    // Note: User data will be fetched on client side since it depends on localStorage
    // which is not available on server side

    return (
      <BillingDetailsClient 
        courseId={id}
        initialCourseData={courseData}
      />
    );
  } catch (error) {
    console.error('Error fetching billing details:', error);
    notFound();
  }
}