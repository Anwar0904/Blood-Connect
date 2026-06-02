import BlogSection from "@/components/Sections/BlogSection";
import Hero from "@/components/Sections/Hero";
import ImpactSection from "@/components/Sections/Impact";
import Initiatives from "@/components/Sections/Initiatives";
import TeamSection from "@/components/Sections/TeamSection";


export default function Home() {
  return (
  <>
  <Hero/>
  <ImpactSection/>
  <TeamSection/>
  <Initiatives/>
  <BlogSection/>
  </>
  );
}
