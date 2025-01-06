import AboutPart from "@/components/homepage/AboutPart";
import ContactPart from "@/components/homepage/ContactPart";
import HeroPart from "@/components/homepage/Hero/HeroPart";
import Navbar from "@/components/homepage/Navbar";
import OffertPart from "@/components/homepage/Offert/OffertPart";
import RecentPart from "@/components/homepage/RecentPart";

export default function Home() {
  return (
    <div className="container">
      <Navbar />
      <HeroPart />
      <AboutPart />
      <OffertPart />
      <RecentPart />
      <ContactPart />
    </div>
  );
}
