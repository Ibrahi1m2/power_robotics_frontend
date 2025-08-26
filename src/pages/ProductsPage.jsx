import React, { useState } from "react";
import { motion } from "framer-motion";
import Preloader from "../helper/Preloader";
import ColorInit from "../helper/ColorInit";
import HeaderTwo from "../components/HeaderTwo";
import Breadcrumb from "../components/Breadcrumb";
import DealsOne from "../components/DealsOne";
import FooterTwo from "../components/FooterTwo";
import BottomFooter from "../components/BottomFooter";
import ScrollToTop from "react-scroll-to-top";

const ProductsPage = () => {
  const [search, setSearch] = useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const sectionVariants = {
    hidden: { 
      opacity: 0, 
      y: 30
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
      <HeaderTwo category={true} search={search} setSearch={setSearch} />

      {/* Breadcrumb */}
      <Breadcrumb title={"Products"} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          background: 'linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%)',
          minHeight: '100vh',
          paddingBottom: '40px'
        }}
      >
        {/* Products Section */}
        <motion.div variants={sectionVariants}>
          <DealsOne search={search} />
        </motion.div>
      </motion.div>

      {/* FooterTwo */}
      <FooterTwo />

      {/* BottomFooter */}
      <BottomFooter />
    </>
  );
};

export default ProductsPage;
