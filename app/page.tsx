import HeroPart from "./components/HeroPart";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div className="container">
      <Navbar />
      <HeroPart />
    </div>
  );
}
