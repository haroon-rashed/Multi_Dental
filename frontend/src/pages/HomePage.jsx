import React, { useEffect } from "react";
import { Box } from "@mui/material";
import UserNavbar from "../features/navigation/components/UserNavbar";
import { ProductList } from "../features/products/components/ProductList";
import {
  resetAddressStatus,
  selectAddressStatus,
} from "../features/address/AddressSlice";
import { useDispatch, useSelector } from "react-redux";
import { Footer } from "../features/footer/Footer";
import DentalServices from "../features/products/components/DentalServices";
import AboutUsSection from "../features/products/components/AboutUsSection";
import VideoHero from "../features/products/components/VideoHero";

export const HomePage = () => {
  const dispatch = useDispatch();
  const addressStatus = useSelector(selectAddressStatus);

  useEffect(() => {
    if (addressStatus === "fulfilled") {
      dispatch(resetAddressStatus());
    }
  }, [addressStatus]);

  return (
    <>
      <UserNavbar />
      <Box sx={{ paddingTop: 0 }}>
        <VideoHero />
        <AboutUsSection />
        <DentalServices />
        <ProductList />
        <Footer />
      </Box>
    </>
  );
};
