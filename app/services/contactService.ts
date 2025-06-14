// services/contactService.ts
import axiosInstance from "../utils/axios";

interface ContactPayload {
  name: string;
  email: string;
  number: string;
  message: string;
}

export const sendContactForm = async (payload: ContactPayload) => {
  const response = await axiosInstance.post("/add_query/", payload);
  return response.data;
};

export const getContactDetails = async () => {
  const response = await axiosInstance.get("/contact");
  return response.data;
};