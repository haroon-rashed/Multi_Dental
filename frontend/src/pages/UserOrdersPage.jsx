import React from "react";
import { UserOrders } from "../features/order/components/UserOrders";
import { Footer } from "../features/footer/Footer";
import UserNavbar from "../features/navigation/components/UserNavbar";

export const UserOrdersPage = () => {
  return (
    <>
      <UserNavbar />
      <UserOrders />
      <Footer />
    </>
  );
};
