import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Preloader from "../helper/Preloader";
import HeaderTwo from "../components/HeaderTwo";
import BannerTwo from "../components/BannerTwo";
import PromotionalTwo from "../components/PromotionalTwo";
import DealsOne from "../components/DealsOne";
import TopSellingOne from "../components/TopSellingOne";
import TrendingOne from "../components/TrendingOne";
import DiscountOne from "../components/DiscountOne";
import FeaturedOne from "../components/FeaturedOne";
import BigDealOne from "../components/BigDealOne";
import TopSellingTwo from "../components/TopSellingTwo";
import PopularProductsOne from "../components/PopularProductsOne";
import TopVendorsTwo from "../components/TopVendorsTwo";
import DaySaleOne from "../components/DaySaleOne";
import RecentlyViewedOne from "../components/RecentlyViewedOne";
import BrandTwo from "../components/BrandTwo";
import ShippingTwo from "../components/ShippingTwo";
import NewsletterTwo from "../components/NewsletterTwo";
import FooterTwo from "../components/FooterTwo";
import BottomFooter from "../components/BottomFooter";
import ColorInit from "../helper/ColorInit";
import ScrollToTop from "react-scroll-to-top";
import RecommendedOne from "../components/RecommendedOne";

const HomePageTwo = () => {
  const [search, setSearch] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Animation variants for different sections
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const sectionVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const bannerVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9,
      y: 30
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 80,
        damping: 20
      }
    }
  };

  const fadeInUpVariants = {
    hidden: { 
      opacity: 0, 
      y: 40
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      {/* ColorInit */}
      <ColorInit color={true} />

      {/* ScrollToTop */}
      <ScrollToTop smooth color="#FA6400" />

      {/* Preloader */}
      <Preloader />

      {/* HeaderTwo */}
      <HeaderTwo category={false} search={search} setSearch={setSearch} />

      <AnimatePresence>
        {isLoaded && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* BannerTwo */}
            <motion.div variants={bannerVariants}>
              <BannerTwo />
            </motion.div>

            {/* PromotionalTwo */}
            <motion.div variants={sectionVariants}>
              <PromotionalTwo />
            </motion.div>

            {/* DealsOne (Product Grid) */}
            <motion.div 
              variants={sectionVariants}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <DealsOne search={search} />
            </motion.div>

            {/* TopSellingOne */}
            <motion.div 
              variants={sectionVariants}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <TopSellingOne />
            </motion.div>

            {/* DaySaleOne */}
            <motion.div 
              variants={sectionVariants}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <DaySaleOne />
            </motion.div>

            {/* ShippingTwo */}
            <motion.div 
              variants={fadeInUpVariants}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <ShippingTwo />
            </motion.div>

            {/* NewsletterTwo */}
            <motion.div 
              variants={fadeInUpVariants}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <NewsletterTwo />
            </motion.div>

            {/* FooterTwo */}
            <motion.div 
              variants={fadeInUpVariants}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <FooterTwo />
            </motion.div>

            {/* BottomFooter */}
            <motion.div variants={fadeInUpVariants}>
              <BottomFooter />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HomePageTwo;
