import { useSelector } from "react-redux";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  BrowserRouter as Router,
  Outlet,
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
import { SubCategoryPage } from "./pages/SubCategoryPage";
import { AboutUsPage } from "./pages/AboutUsPage";
import { TermsConditionsPage } from "./pages/TermsConditionsPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { ReturnPolicyPage } from "./pages/ReturnPolicyPage";
import Loader from "./features/navigation/components/Loader";
import CategoryDetailsPage from "./pages/CategoryDetailsPage";
import ScrollManager from "./components/ScrollManager";
import globals from "./globals.css"; // Assuming you have a global CSS file
import { ViewBrandsPage } from "./pages/ViewBrandsPage";
import { AddBrandPage } from "./pages/AddBrandPage";

function App() {
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const loggedInUser = useSelector(selectLoggedInUser);

  useAuthCheck();
  useFetchLoggedInUserDetails(loggedInUser);

  // Create a layout component that includes ScrollManager
  const Layout = () => (
    <>
      <ScrollManager />
      <Outlet />
    </>
  );

  // Create routes configuration
  const routes = [
    // Public routes
    { path: "/signup", element: <SignupPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/verify-otp", element: <OtpVerificationPage /> },
    { path: "/forgot-password", element: <ForgotPasswordPage /> },
    {
      path: "/reset-password/:userId/:passwordResetToken",
      element: <ResetPasswordPage />,
    },

    // Public routes that don't require authentication
    { path: "/", element: <HomePage /> },
    { path: "/cart", element: <CartPage /> },
    { path: "/checkout", element: <CheckoutPage /> },
    { path: "/order-success/:id", element: <OrderSuccessPage /> },
    { path: "/subcategory/:subcategoryId", element: <SubCategoryPage /> },
    { path: "/category/:id", element: <CategoryDetailsPage /> },
    { path: "/product-details/:id", element: <ProductDetailsPage /> },
    { path: "/products", element: <ProductsPage /> },
    { path: "/about-us", element: <AboutUsPage /> },
    { path: "/terms-conditions", element: <TermsConditionsPage /> },
    { path: "/privacy-policy", element: <PrivacyPolicyPage /> },
    { path: "/return-policy", element: <ReturnPolicyPage /> },

    // Protected routes that require authentication (but not admin)
    {
      path: "/profile",
      element: (
        <Protected>
          <UserProfilePage />
        </Protected>
      ),
    },
    {
      path: "/orders",
      element: (
        <Protected>
          <UserOrdersPage />
        </Protected>
      ),
    },
    {
      path: "/wishlist",
      element: (
        <Protected>
          <WishlistPage />
        </Protected>
      ),
    },
    {
      path: "/logout",
      element: (
        <Protected>
          <Logout />
        </Protected>
      ),
    },

    // Admin routes (protected and only accessible by admin users)
    {
      path: "/admin/dashboard",
      element: (
        <Protected adminOnly={true}>
          <AdminDashboardPage />
        </Protected>
      ),
    },
    {
      path: "/admin/product-update/:id",
      element: (
        <Protected adminOnly={true}>
          <ProductUpdatePage />
        </Protected>
      ),
    },
    {
      path: "/admin/add-product",
      element: (
        <Protected adminOnly={true}>
          <AddProductPage />
        </Protected>
      ),
    },
    {
      path: "/admin/product-table",
      element: (
        <Protected adminOnly={true}>
          <ProductTablePage />
        </Protected>
      ),
    },
    {
      path: "/admin/orders",
      element: (
        <Protected adminOnly={true}>
          <AdminOrdersPage />
        </Protected>
      ),
    },
    {
      path: "/admin/add-category",
      element: (
        <Protected adminOnly={true}>
          <AddCategoryPage />
        </Protected>
      ),
    },
    {
      path: "/admin/add-brand",
      element: (
        <Protected adminOnly={true}>
          <AddBrandPage />
        </Protected>
      ),
    },
    {
      path: "/admin/edit-category/:id",
      element: (
        <Protected adminOnly={true}>
          <AddCategoryPage />
        </Protected>
      ),
    },
    {
      path: "/admin/view-category",
      element: (
        <Protected adminOnly={true}>
          <ViewCategoryPage />
        </Protected>
      ),
    },
    {
      path: "/admin/view-brands",
      element: (
        <Protected adminOnly={true}>
          <ViewBrandsPage />
        </Protected>
      ),
    },

    // 404 route - must be last
    {
      path: "*",
      element: (
        <Navigate
          to={loggedInUser?.isAdmin ? "/admin/dashboard" : "/"}
          replace
        />
      ),
    },
  ];

  // Create the router
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: routes.map((route) => ({
        path: route.path,
        element: route.element,
      })),
    },
  ]);

  // 🟡 Show loader until auth check is complete
  return isAuthChecked ? <RouterProvider router={router} /> : <Loader />;
}

export default App;
