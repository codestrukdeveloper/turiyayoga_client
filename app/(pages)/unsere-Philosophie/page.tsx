import { Metadata } from "next";
import OurPhilosophyClient from "./OurPhilosophyClient";
import { fetchClosestUpcomingCourses, fetchOurPhilosophy } from "@/app/services/categoryService";

export async function generateMetadata(): Promise<Metadata> {
  const philosophyData = await fetchOurPhilosophy();

  return {
    title: philosophyData.meta_Title || "Unsere Philosophie als Yoga Akademie",
    description:
      philosophyData.meta_Description ||
      "Hoher Standard, weil wir deine Zeit respektieren. Leidenschaft, weil wir uns nicht von Gier leiten lassen.",
    keywords:
      philosophyData.meta_Keywords ||
      "Yoga, Philosophie, Ausbildung, Akademie",
  };
}

export default async function OurPhilosophyPage() {
  const [upcomingCourses, philosophyData] = await Promise.all([
    fetchClosestUpcomingCourses(),
    fetchOurPhilosophy(),
  ]);

  return (
    <OurPhilosophyClient
      initialUpcomingCourses={upcomingCourses}
      initialPhilosophyData={philosophyData}
    />
  );
}
