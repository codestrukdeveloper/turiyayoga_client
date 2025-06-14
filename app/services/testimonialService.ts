import axiosInstance from "@/app/utils/axios";

import { BASE_URL } from "@/app/utils/config";

export interface Testimonial {
  id: number; // or string depending on API
  profileImage: string;
  feedbackContent: string;
  name: string;
}

export interface VideoData {
  youtubeLink: string;
  feedbackType: string;
  feedbackContent: string;
  name: string;
}

export interface CustomerTestimonial {
  Slide_Image?: string;
  Slider_Heading?: string;
  Slider_Paragraph?: string;
  Slider_videolink?: string;
  about_First_Section_Peragraph_Content?: string;
  about_First_Section_Sub_Peragraph?: string;
  about_First_Section_heading?: string;
  about_Second_Section_Heading?: string;
  about_Second_Section_Peragraph_Content?: string;
  about_Second_Section_Sub_Peragraph?: string;
  meta_Description?: string;
  meta_Keywords?: string;
  meta_Title?: string;
  status?: string;
}
export const fetchTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/testimonials`);
    return response.data.data; // assuming API returns { data: [...] }
  } catch (error) {
    console.log("Failed to fetch testimonials", error);
    return [];
  }
};

export const fetchVideoTestimonials = async (): Promise<VideoData[]> => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/video_testimonials`);
    return response.data.data; // assuming API returns { data: [...] }
  } catch (error) {
    console.log("Failed to fetch testimonials", error);
    return [];
  }
};


export const fetchCustomerTestimonials = async (): Promise<CustomerTestimonial | null> => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/customer_testimonials`);
    if (response.status === 200) {
      return response.data.data[0]; // returns the first testimonial
    }
    return null;
  } catch (error) {
    console.log("Failed to fetch customer testimonials", error);
    return null;
  }
};