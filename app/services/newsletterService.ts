// services/newsletterService.ts
import axiosInstance from "@/app/utils/axios";

export const subscribeToNewsletter = async (email: string) => {
  const payload = { email };
  const response = await axiosInstance.post("/add_subscription", payload);
  return response.data;
};
