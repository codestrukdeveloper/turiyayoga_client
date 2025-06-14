import React from "react";
import { fetchClosestUpcomingCourses } from "@/app/services/categoryService";
import { fetchCustomerTestimonials } from "@/app/services/testimonialService";
import CustomerTestimonialsClient from "./CustomerTestimonialsClient";
import { CourseData, CustomerTestimonial } from "@/app/types/testimonials";

export interface CustomerTestimonialsPageProps {
  courses: CourseData[];
  testimonials: CustomerTestimonial;
}

// Generate metadata for SEO
export async function generateMetadata() {
  try {
    const customerData = await fetchCustomerTestimonials();
    
    return {
      title: customerData?.meta_Title || "Customer Testimonials",
      description: customerData?.meta_Description || "Customer testimonials and feedback",
      keywords: customerData?.meta_Keywords || "testimonials, feedback, reviews",
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: "Customer Testimonials",
      description: "Customer testimonials and feedback",
    };
  }
}

const CustomerTestimonialsPage = async () => {
  let courses: CourseData[] = [];
  let testimonials: CustomerTestimonial = {
    Slide_Image: "",
    Slider_Heading: "",
    Slider_Paragraph: "",
    Slider_videolink: "",
    about_First_Section_Peragraph_Content: "",
    about_First_Section_Sub_Peragraph: "",
    about_First_Section_heading: "",
    about_Second_Section_Heading: "",
    about_Second_Section_Peragraph_Content: "",
    about_Second_Section_Sub_Peragraph: "",
    meta_Description: "",
    meta_Keywords: "",
    meta_Title: "",
    status: "",
  };

  try {
    // Fetch data in parallel for better performance
    const [coursesData, customerData] = await Promise.all([
      fetchClosestUpcomingCourses(),
      fetchCustomerTestimonials(),
    ]);

    courses = coursesData || [];
    
    if (customerData) {
      testimonials = {
        Slide_Image: customerData.Slide_Image ?? "",
        Slider_Heading: customerData.Slider_Heading ?? "",
        Slider_Paragraph: customerData.Slider_Paragraph ?? "",
        Slider_videolink: customerData.Slider_videolink ?? "",
        about_First_Section_Peragraph_Content: customerData.about_First_Section_Peragraph_Content ?? "",
        about_First_Section_Sub_Peragraph: customerData.about_First_Section_Sub_Peragraph ?? "",
        about_First_Section_heading: customerData.about_First_Section_heading ?? "",
        about_Second_Section_Heading: customerData.about_Second_Section_Heading ?? "",
        about_Second_Section_Peragraph_Content: customerData.about_Second_Section_Peragraph_Content ?? "",
        about_Second_Section_Sub_Peragraph: customerData.about_Second_Section_Sub_Peragraph ?? "",
        meta_Description: customerData.meta_Description ?? "",
        meta_Keywords: customerData.meta_Keywords ?? "",
        meta_Title: customerData.meta_Title ?? "",
        status: customerData.status ?? "",
      };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    // Continue with default empty data
  }

  return (
    <CustomerTestimonialsClient 
      courses={courses} 
      testimonials={testimonials} 
    />
  );
};

export default CustomerTestimonialsPage;