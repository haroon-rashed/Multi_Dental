import React from "react";
import { AddProduct } from "../features/admin/components/AddProduct";
import UserNavbar from "../../../../frontend/src/features/navigation/components/UserNavbar";

export const AddProductPage = () => {
  return (
    <>
      <UserNavbar />
      <AddProduct />
    </>
  );
};
