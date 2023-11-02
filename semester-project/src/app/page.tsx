import Feature from "@/views/homepage/Feature";
import Navbar from "../components/Navbar";
import Hero from "@/views/homepage/Hero";
import FAQ from "@/views/homepage/FAQ";
import Footer from "@/views/homepage/Footer";
import LastCTA from "@/views/homepage/LastCTA";

export default function Home() {
  return (
    <>
      <div className="flex flex-col max-w-screen-xl mx-auto px-2 sm:px-4 lg:px-6">
        <Navbar />
      </div>
      <div className="bg-fixed bg-center bg-cover custom-img">
        <div className="flex flex-col max-w-screen-xl mx-auto px-2 sm:px-4 lg:px-6 py-44">
          <Hero />
        </div>
      </div>
      <div className="flex flex-col max-w-screen-xl mx-auto px-2 sm:px-4 lg:px-6 gap-44 mt-32">
        <Feature />
        <FAQ />
        <LastCTA />
      </div>
      <div className="bg-slate-300">
        <div className="flex flex-col max-w-screen-xl mx-auto px-2 sm:px-4 lg:px-6 mt-44">
          <Footer />
        </div>
      </div>
    </>
  );
}
