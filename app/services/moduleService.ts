import axiosInstance from "@/app/utils/axios";

export const fetchUpcomingCoursesBySlug = async (slug: string) => {
  try {
    const response = await axiosInstance.get(`/getModuleBySlug/${slug}`);
    return response.data?.data || [];
  } catch (error) {
    console.log(`Error fetching upcoming courses for slug "${slug}":`, error);
    return [];
  }
};

export const fetchModuleWebPages = async (slug: string) => {
  try {
    const response = await axiosInstance.get(`/module_webpages_by_category/${slug}`);
    return response.data.data[0];
  } catch (error) {
    console.log(`Error fetching course web page for ${slug}:`, error);
    return [];
  }
};
