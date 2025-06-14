// app/types/testimonials.ts (Optional: Extract types to separate file)
export interface CourseData {
  Ausbildung: string;
  Offerprice: number;
  OfferEndDate: string;
  price: number;
  Location: string;
  StartDate: string;
  EndDate: string;
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

export interface CustomerTestimonialsPageProps {
  courses: CourseData[];
  testimonials: CustomerTestimonial;
}