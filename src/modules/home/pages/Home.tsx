import React from "react";
import HeroSection from "../components/HeroSection.tsx";
import FeatureStrip from "../components/FeatureStrip.tsx";
import AboutUs from "../components/AboutUs.tsx";
import HeroDelivery from "../components/HeroDelivery.tsx";
import FAQSection from "../components/FAQSection.tsx";

const Home: React.FC = () => {
    return (
        <div className="w-full flex flex-col items-center">
            <HeroSection />
            <FeatureStrip />
            <AboutUs />
            <HeroDelivery />
            <FAQSection />
        </div>
    );
};

export default Home;
