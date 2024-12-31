import AboutPart from "./components/AboutPart";
import ContactPart from "./components/ContactPart";
import HeroPart from "./components/Hero/HeroPart";
import Navbar from "./components/Navbar";
import OffertPart from "./components/Offert/OffertPart";
import RecentPart from "./components/RecentPart";

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
