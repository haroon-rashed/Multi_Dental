import { useSelector } from "react-redux";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import {
  selectIsAuthChecked,
  selectLoggedInUser,
} from "./features/auth/AuthSlice";
import { Logout } from "./features/auth/components/Logout";
import { Protected } from "./features/auth/components/Protected";
import { useAuthCheck } from "./hooks/useAuth/useAuthCheck";
import { useFetchLoggedInUserDetails } from "./hooks/useAuth/useFetchLoggedInUserDetails";
import {
  AddProductPage,
  AdminOrdersPage,
  CartPage,
  CheckoutPage,
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  OrderSuccessPage,
  OtpVerificationPage,
  ProductDetailsPage,
  ProductUpdatePage,
  ResetPasswordPage,
  SignupPage,
  UserOrdersPage,
  UserProfilePage,
  WishlistPage,
  ProductsPage,
} from "./pages";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import ProductTablePage from "./pages/ProductTablePage";
import { AddCategoryPage } from "./pages/AddCategoryPage";
import { ViewCategoryPage } from "./pages/ViewCategoryPage";
import { AddSubCategoryPage } from "./pages/AddSubCategoryPage";
import { ViewSubCategoryPage } from "./pages/ViewSubCategoryPage";
import { SubCategoryPage } from "./pages/SubCategoryPage";
import { AboutUsPage } from "./pages/AboutUsPage";
import { TermsConditionsPage } from "./pages/TermsConditionsPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { ReturnPolicyPage } from "./pages/ReturnPolicyPage";
import Loader from "./features/navigation/components/Loader";
import CategoryDetailsPage from "./pages/CategoryDetailsPage";
import globals from "./globals.css"; // Assuming you have a global CSS file

function App() {
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const loggedInUser = useSelector(selectLoggedInUser);

  useAuthCheck();
  useFetchLoggedInUserDetails(loggedInUser);

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-otp" element={<OtpVerificationPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/reset-password/:userId/:passwordResetToken"
          element={<ResetPasswordPage />}
        />
        <Route
          exact
          path="/logout"
          element={
            <Protected>
              <Logout />
            </Protected>
          }
        />
        <Route
          exact
          path="/product-details/:id"
          element={
            <Protected>
              <ProductDetailsPage />
            </Protected>
          }
        />
        <Route
          path="/products"
          element={
            <Protected>
              <ProductsPage />
            </Protected>
          }
        />

        {loggedInUser?.isAdmin ? (
          <>
            <Route
              path="/admin/dashboard"
              element={
                <Protected>
                  <AdminDashboardPage />
                </Protected>
              }
            />
            <Route
              path="/admin/product-update/:id"
              element={
                <Protected>
                  <ProductUpdatePage />
                </Protected>
              }
            />
            <Route
              path="/admin/add-product"
              element={
                <Protected>
                  <AddProductPage />
                </Protected>
              }
            />
            <Route
              path="/admin/product-table"
              element={
                <Protected>
                  <ProductTablePage />
                </Protected>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <Protected>
                  <AdminOrdersPage />
                </Protected>
              }
            />
            <Route
              path="/admin/add-category"
              element={
                <Protected>
                  <AddCategoryPage />
                </Protected>
              }
            />
            <Route
              path="/admin/edit-category/:id"
              element={
                <Protected>
                  <AddCategoryPage />
                </Protected>
              }
            />
            <Route
              path="/admin/add-sub-category"
              element={
                <Protected>
                  <AddSubCategoryPage />
                </Protected>
              }
            />
            <Route
              path="/admin/view-category"
              element={
                <Protected>
                  <ViewCategoryPage />
                </Protected>
              }
            />
            <Route
              path="/admin/view-subcategory"
              element={
                <Protected>
                  <ViewSubCategoryPage />
                </Protected>
              }
            />
            <Route path="*" element={<Navigate to={"/admin/dashboard"} />} />
          </>
        ) : (
          <>
            <Route
              path="/"
              element={
                <Protected>
                  <HomePage />
                </Protected>
              }
            />
            <Route
              path="/cart"
              element={
                <Protected>
                  <CartPage />
                </Protected>
              }
            />
            <Route
              path="/profile"
              element={
                <Protected>
                  <UserProfilePage />
                </Protected>
              }
            />
            <Route
              path="/checkout"
              element={
                <Protected>
                  <CheckoutPage />
                </Protected>
              }
            />
            <Route
              path="/order-success/:id"
              element={
                <Protected>
                  <OrderSuccessPage />
                </Protected>
              }
            />
            <Route
              path="/orders"
              element={
                <Protected>
                  <UserOrdersPage />
                </Protected>
              }
            />
            <Route
              path="/wishlist"
              element={
                <Protected>
                  <WishlistPage />
                </Protected>
              }
            />
            <Route
              path="/subcategory/:subcategoryId"
              element={
                <Protected>
                  <SubCategoryPage />
                </Protected>
              }
            />
            <Route
              path="/category/:id"
              element={
                <Protected>
                  <CategoryDetailsPage />
                </Protected>
              }
            />
            <Route
              path="/about-us"
              element={
                <Protected>
                  <AboutUsPage />
                </Protected>
              }
            />
            <Route
              path="/terms-conditions"
              element={
                <Protected>
                  <TermsConditionsPage />
                </Protected>
              }
            />
            <Route
              path="/privacy-policy"
              element={
                <Protected>
                  <PrivacyPolicyPage />
                </Protected>
              }
            />
            <Route
              path="/return-policy"
              element={
                <Protected>
                  <ReturnPolicyPage />
                </Protected>
              }
            />
          </>
        )}

        <Route path="*" element={<NotFoundPage />} />
      </>
    )
  );

  // 🟡 Show loader until auth check is complete
  return isAuthChecked ? <RouterProvider router={routes} /> : <Loader />;
}

export default App;
