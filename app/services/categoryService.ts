import axiosInstance from "@/app/utils/axios";
import { BASE_URL } from "../utils/config";

export interface ModuleWebPageData {
  yogaTeamSlideImage?: string;
  yogaTeamSliderHeading?: string;
  yogaTeamSliderParagraph?: string;
  yogaTeamSliderVideoLink?: string;
  about_first_section_sub_Paragraph?: string;
  about_first_section_Heading?: string;
  about_first_section_Paragraph_Content?: string;
  // Add other properties as needed
}

export const fetchClosestUpcomingCourses = async () => {
  try {
    const response = await axiosInstance.get("/getClosestUpcomingCourseswithNull");
    return response?.data?.data || [];
  } catch (error) {
    console.log("Error fetching closest upcoming courses:", error);
    return [];
  }
};

export const fetchCourseWebPage = async (slug: string) => {
  try {
    const response = await axiosInstance.get(`/course_web_page_by_course_category/${slug}`);
    return response?.data?.data[0];
  } catch (error) {
    console.log(`Error fetching course web page for ${slug}:`, error);
    return [];
  }
};


export const fetchUpcomingCourses = async (): Promise<any[]> => {
  try {
    const response = await axiosInstance.get("/getupcoming_course");
    return response?.data?.data || [];
  } catch (error) {
    console.log("Error fetching upcoming courses:", error);
    return [];
  }
};

export const fetchModuleCategories = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/module_categories_latest`);
    return response?.data?.data ?? [];
  } catch (error) {
    console.log("Error fetching module categories:", error);
    return [];
  }
};

export const fetchClosestUpcomingCourse = async (): Promise<any[]> => {
  try {
    const response = await axiosInstance.get("/get_closest_upcoming_courses");
    return response?.data?.data || [];
  } catch (error) {
    console.log("Error fetching upcoming courses:", error);
    return [];
  }
};

export const addCourseToCart = async (courseId: string, userId: string) => {
  try {
    const payload = {
      moduleId: courseId,
      userId,
      status: "active",
    };
    const response = await axiosInstance.post("/add_course_in_cart", payload);
    return response?.data;
  } catch (error) {
    return [];
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const payload = { email, password };
    const response = await axiosInstance.post("/loginnew", payload);
    return response?.data;
  } catch (error) {
    return [];
  }
};

// Add to your service file
export const registerUser = async (formData: any) => {
  try {
    const response = await axiosInstance.post("/register", formData);
    return response?.data;
  } catch (error) {
    console.log("Error registering user:", error);
    return null;

  }
};

export const forgotPassword = async (email: string) => {
  const response = await axiosInstance.post("/forgot-password", { email });
  return response?.data;
};

export const verifyEmailToken = async (token: string) => {
  try {
    const response = await axiosInstance.post("/verify-email", { token });
    return response?.data;
  } catch (error: any) {
    throw error?.data || "Invalid or expired token";
  }
};

export const resetPassword = async (token: string, newPassword: string) => {
  const response = await axiosInstance.post("/reset-password", {
    token,
    newPassword,
  });
  return response?.data;
};

export const fetchOurStory = async () => {
  try {
    const response = await axiosInstance.get("/our_stories");
    return response?.data?.data?.[0] ?? {};
  } catch (error) {
    console.log("Error fetching our story data:", error);
    return {};
  }
};

export const fetchGoaCourses = async () => {
  try {
    const response = await axiosInstance.get("/getModuleByLocation/Goa");
    return response?.data?.data ?? [];
  } catch (error: any) {
    return [];
  }
};

export const fetchOurPhilosophy = async () => {
  try {
    const response = await axiosInstance.get("/our_philosophy");
    return response?.data?.data?.[0] ?? {};
  } catch (error) {
    console.log("Error fetching philosophy data:", error);
    return {};
  }
};



export const fetchModuleWebpageByCategory = async (
  category: string
): Promise<ModuleWebPageData[]> => {
  try {
    const response = await axiosInstance.get(`/module_webpages_by_category/${category}`);
    return response?.data?.data || [];
  } catch (error) {
    console.log("Error fetching module webpage:", error);
    return [];
  }
};


export const fetchCartItemsByUser = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/getAllModuleWithId/${userId}`);
    return response?.data?.data || [];
  } catch (error) {
    console.log("Error fetching cart items:", error);
    return [];
  }
};

export const fetchCourseCategories = async () => {
  try {
    const response = await axiosInstance.get("/course_categories_latest");
    return response?.data?.data || [];
  } catch (error) {
    console.log("Error fetching module webpage:", error);
    return [];
  }
};

export const fetchUserDetailById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/getUserDetailById/${id}`);
    return response?.data;
  } catch (error) {
    console.log("Error fetching module webpage:", error);
    return [];
  }
};

export const fetchPurchasedCourses = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/get_purchasedModule/${userId}`);
    return response?.data?.data;
  } catch (error) {
    console.log("Error fetching module webpage:", error);
    return [];
  }
};

export const deleteCartItemById = async (id: string) => {
  try {
    await axiosInstance.delete(`/delete_cart/${id}`);
  } catch (error) {
    console.log("Error fetching module webpage:", error);
    return [];
  }
};

// Download Agreement PDF
export const fetchAgreementPDF = async (invoiceId: string): Promise<Blob | null> => {
  try {
    const response = await axiosInstance.get(`/getAgreement_invoice/${invoiceId}`, {
      responseType: "blob",
    });
    return response?.data;
  } catch (error) {
    console.log("Error fetching agreement PDF:", error);
    return null;
  }
};

// Download Invoice PDF
export const fetchPurchasedInvoicePDF = async (invoiceId: string): Promise<Blob | null> => {
  try {
    const response = await axiosInstance.get(`/get_purchasedModule_invoice/${invoiceId}`, {
      responseType: "blob",
    });
    return response?.data;
  } catch (error) {
    console.log("Error fetching invoice PDF:", error);
    return null;
  }
};

// Submit Profile Modal Query
export const submitProfileQuery = async (formData: {
  transportMode: string;
  arrivalTime: string;
  taxi: string;
}): Promise<any> => {
  try {
    const response = await axiosInstance.post(`/add_profile_query`, formData);
    return response?.data;
  } catch (error) {
    console.log("Error submitting profile query:", error);
    return null;

  }
};


export const fetchCourseById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/getModuleById/${id}`);
    return response?.data?.data;
  } catch (error) {
    console.log("Error fetching course by ID:", error);
    return null;
  }
};

// Additional billing-specific API functions
export const fetchOtherAddress = async (userAuthId: string) => {
  try {
    const response = await axiosInstance.get(`/getOtherAddress/${userAuthId}`);
    return response?.data?.data;
  } catch (error) {
    console.log("Error fetching other address:", error);
    return null;

  }
};

export const generateInvoice = async (payload: any) => {
  try {
    const response = await axiosInstance.post(`/generateInvoice`, payload);
    return response?.data?.data;
  } catch (error) {
    console.log("Error generating invoice:", error);
    return null;

  }
};

export const deleteCartData = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/delete_cart/${id}`);
    return response?.data;
  } catch (error) {
    console.log("Error deleting cart data:", error);
    return null;

  }
};

export const reducePlace = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/reduce-places/${id}`);
    return response?.data;
  } catch (error) {
    console.log("Error reducing places:", error);
    return null;

  }
};