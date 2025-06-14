// app/booking-details/[id]/page.tsx
import { Metadata } from "next";
import BookingDetailClient from "./BookingDetailClient";
import { fetchCourseById } from "@/app/services/categoryService";

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `Booking Details - ${params.id}`,
    description: "Course booking details and invoice information",
  };
}

const BookingDetailPage = async ({ params }: PageProps) => {
  const courseData = await fetchCourseById(params.id);

  if (!courseData) {
    return <div>Course not found or an error occurred.</div>;
  }

  return <BookingDetailClient courseId={params.id} initialCourseData={courseData} />;
};

export default BookingDetailPage;
