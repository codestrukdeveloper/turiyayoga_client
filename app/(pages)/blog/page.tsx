import { fetchBlogs } from "@/app/services/blogService";
import BlogClient from "./BlogClient"; // move UI logic here

const BlogPage = async () => {
  const blogs = await fetchBlogs(); // Runs on the server
  return <BlogClient blogs={blogs} />;
};

export default BlogPage;
