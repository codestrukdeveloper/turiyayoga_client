import React from "react";
import BlogDetailClient from "./BlogDetailClient";
import { fetchBlogDetail } from "@/app/services/blogService";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps) {
  const blog = await fetchBlogDetail(params.slug);
  return {
    title: blog?.meta_Title || "Blog Detail",
    description: blog?.meta_Description,
    keywords: blog?.meta_Keywords,
  };
}

const BlogDetailPage = async ({ params }: PageProps) => {
  const blog = await fetchBlogDetail(params.slug);

  if (!blog) {
    return (
      <div className="container text-center py-10">
        <h2>Blog not found</h2>
      </div>
    );
  }

  return <BlogDetailClient blog={blog} />;
};

export default BlogDetailPage;
