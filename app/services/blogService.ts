// services/blogService.ts
import axiosInstance from "@/app/utils/axios";
import { BASE_URL } from "@/app/utils/config";

export interface Blog {
  id: number;
  blogImage: string;
  blogHeading: string;
  createdAt: string;
  slug: string;
  status: string;
  // Add other fields if needed
}
export interface BlogDetail {
  id: number;
  blogHeading: string;
  blogContent: string;
  blogImage: string;
  slug: string;
  createdAt: string;
  meta_Title?: string;
  meta_Description?: string;
  meta_Keywords?: string;
  status: string;
}
export const fetchBlogs = async (): Promise<Blog[]> => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/blogs`);
    const allBlogs: Blog[] = response.data.data;
    const activeBlogs = allBlogs.filter((blog) => blog.status === "active");
    return activeBlogs;
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return [];
  }
};


export const fetchBlogDetail = async (slug: string): Promise<BlogDetail | null> => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/blog/slug/${slug}`);
    if (response.status === 200) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch blog detail:", error);
    return null;
  }
};