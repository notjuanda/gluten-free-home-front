import React, { Suspense, lazy } from "react";
import HeroSection from "../components/HeroSection.tsx";
import FeatureStrip from "../components/FeatureStrip.tsx";
import { Helmet } from 'react-helmet-async';

// Lazy load non-critical components
const AboutUs = lazy(() => import("../components/AboutUs.tsx"));
const HeroDelivery = lazy(() => import("../components/HeroDelivery.tsx"));
const FAQSection = lazy(() => import("../components/FAQSection.tsx"));

// Loading component
const ComponentLoader = () => (
    <div className="w-full py-12">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
    </div>
);

const Home: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Gluten Free Home - Productos Sin Gluten</title>
                <meta name="description" content="Tu tienda libre de Gluten de confianza con productos certificados y de alta calidad. Envíos a todo el país." />
                <meta property="og:title" content="Gluten Free Home - Productos Sin Gluten" />
                <meta property="og:description" content="Tu tienda libre de Gluten de confianza con productos certificados y de alta calidad. Envíos a todo el país." />
            </Helmet>
            <div className="w-full flex flex-col items-center">
                {/* Critical components - load immediately */}
                <HeroSection />
                <FeatureStrip />
                
                {/* Non-critical components - lazy load */}
                <Suspense fallback={<ComponentLoader />}>
                    <AboutUs />
                </Suspense>
                
                <Suspense fallback={<ComponentLoader />}>
                    <HeroDelivery />
                </Suspense>
                
                <Suspense fallback={<ComponentLoader />}>
                    <FAQSection />
                </Suspense>
            </div>
        </>
    );
};

export default Home;
