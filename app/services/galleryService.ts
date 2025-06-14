import axiosInstance from "@/app/utils/axios";

export const fetchGalleryImages = async () => {
  const response = await axiosInstance.get("/galleries");
  console.log('resposne',response)
  return response.data.data; // assuming data is under `data`
};
