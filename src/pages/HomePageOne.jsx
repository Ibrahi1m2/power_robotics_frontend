import React, { useEffect, useRef } from "react";
import Preloader from "../helper/Preloader";
import HeaderOne from "../components/HeaderOne";
import BannerOne from "../components/BannerOne";
import FeatureOne from "../components/FeatureOne";
import PromotionalOne from "../components/PromotionalOne";
import FlashSalesOne from "../components/FlashSalesOne";
import ProductListOne from "../components/ProductListOne";
import OfferOne from "../components/OfferOne";
import BestSellsOne from "../components/BestSellsOne";
import DeliveryOne from "../components/DeliveryOne";
import OrganicOne from "../components/OrganicOne";
import ShippingOne from "../components/ShippingOne";
import ReactLazy from "react";
const BrandOne = React.lazy(() => import("../components/BrandOne"));
const NewArrivalOne = React.lazy(() => import("../components/NewArrivalOne"));
const NewsletterOne = React.lazy(() => import("../components/NewsletterOne"));
import FooterOne from "../components/FooterOne";
import BottomFooter from "../components/BottomFooter";
import ScrollToTop from "react-scroll-to-top";
import ColorInit from "../helper/ColorInit";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import TextSlider from "../components/TextSlider";
import BannerTwo from "../components/BannerTwo";

const HomePageOne = () => {

  const aosInitialized = useRef(false);
  useEffect(() => {
    if (aosInitialized.current) return;
    // Respect reduced motion preferences
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      aosInitialized.current = true;
      return;
    }
    const initAOS = () => {
      try {
        AOS.init({ duration: 800, once: true, offset: 80, easing: 'ease-out' });
        aosInitialized.current = true;
      } catch {}
    };
    // Defer heavy work until idle/next tick
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(initAOS, { timeout: 1000 });
    } else {
      setTimeout(initAOS, 0);
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <Preloader />
      <ScrollToTop smooth color="#299E60" />
      <ColorInit color={false} />

      <motion.div variants={itemVariants}>
      <BannerTwo />
      </motion.div>

      <motion.div variants={itemVariants}>
      <HeaderOne />
      </motion.div>

      <motion.div variants={itemVariants}>
      <BannerOne />
      </motion.div>

      <div data-aos="fade-up">
      <FeatureOne />
      </div>
      {/* Advertisement Section Animation */}
      <motion.div variants={itemVariants} initial={{ opacity: 0, x: 80 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
      <PromotionalOne />
      </motion.div>
      <motion.div variants={itemVariants} initial={{ opacity: 0, x: -80 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
        <React.Suspense fallback={null}>
          <NewArrivalOne />
        </React.Suspense>
      </motion.div>
      <div data-aos="zoom-in-up">
      <FlashSalesOne />
      </div>
      {/* Our Products Section Animation */}
      <motion.div variants={itemVariants} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
      <ProductListOne />
      </motion.div>
      <div data-aos="fade-in">
      <TextSlider />
      </div>
      <div data-aos="fade-left">
      <OfferOne />
      </div>
      <div data-aos="fade-right">
      <BestSellsOne />
      </div>
      <div data-aos="fade-up">
      <DeliveryOne />
      </div>
      <div data-aos="fade-in">
      <OrganicOne />
      </div>
      <div data-aos="fade-in">
        <React.Suspense fallback={null}>
          <BrandOne />
        </React.Suspense>
      </div>
      <div data-aos="fade-in">
        <React.Suspense fallback={null}>
          <NewsletterOne />
        </React.Suspense>
      </div>
      <div data-aos="fade-in">
      <FooterOne />
      </div>
      <div data-aos="fade-in">
      <BottomFooter />
      </div>
    </motion.div>
  );
};

export default HomePageOne;
