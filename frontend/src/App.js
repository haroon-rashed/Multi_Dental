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
import { AddSubCategoryPage } from "./pages/AddSubCategoryPage";
import { ViewSubCategoryPage } from "./pages/ViewSubCategoryPage";
import { SubCategoryPage } from "./pages/SubCategoryPage";
import { AboutUsPage } from "./pages/AboutUsPage";
import { TermsConditionsPage } from "./pages/TermsConditionsPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { ReturnPolicyPage } from "./pages/ReturnPolicyPage";
import Loader from "./features/navigation/components/Loader";
import CategoryDetailsPage from "./pages/CategoryDetailsPage";
import ScrollManager from "./components/ScrollManager";
import globals from "./globals.css"; // Assuming you have a global CSS file

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
    { path: "/reset-password/:userId/:passwordResetToken", element: <ResetPasswordPage /> },
    
    // Protected routes
    { path: "/", element: <Protected><HomePage /></Protected> },
    { path: "/cart", element: <Protected><CartPage /></Protected> },
    { path: "/profile", element: <Protected><UserProfilePage /></Protected> },
    { path: "/checkout", element: <Protected><CheckoutPage /></Protected> },
    { path: "/order-success/:id", element: <Protected><OrderSuccessPage /></Protected> },
    { path: "/orders", element: <Protected><UserOrdersPage /></Protected> },
    { path: "/wishlist", element: <Protected><WishlistPage /></Protected> },
    { path: "/subcategory/:subcategoryId", element: <Protected><SubCategoryPage /></Protected> },
    { path: "/category/:id", element: <Protected><CategoryDetailsPage /></Protected> },
    { path: "/product-details/:id", element: <Protected><ProductDetailsPage /></Protected> },
    { path: "/products", element: <Protected><ProductsPage /></Protected> },
    { path: "/about-us", element: <Protected><AboutUsPage /></Protected> },
    { path: "/terms-conditions", element: <Protected><TermsConditionsPage /></Protected> },
    { path: "/privacy-policy", element: <Protected><PrivacyPolicyPage /></Protected> },
    { path: "/return-policy", element: <Protected><ReturnPolicyPage /></Protected> },
    { path: "/logout", element: <Protected><Logout /></Protected> },

    // Admin routes (only if user is admin)
    ...(loggedInUser?.isAdmin ? [
      { path: "/admin/dashboard", element: <Protected><AdminDashboardPage /></Protected> },
      { path: "/admin/product-update/:id", element: <Protected><ProductUpdatePage /></Protected> },
      { path: "/admin/add-product", element: <Protected><AddProductPage /></Protected> },
      { path: "/admin/product-table", element: <Protected><ProductTablePage /></Protected> },
      { path: "/admin/orders", element: <Protected><AdminOrdersPage /></Protected> },
      { path: "/admin/add-category", element: <Protected><AddCategoryPage /></Protected> },
      { path: "/admin/edit-category/:id", element: <Protected><AddCategoryPage /></Protected> },
      { path: "/admin/add-sub-category", element: <Protected><AddSubCategoryPage /></Protected> },
      { path: "/admin/view-category", element: <Protected><ViewCategoryPage /></Protected> },
      { path: "/admin/view-subcategory", element: <Protected><ViewSubCategoryPage /></Protected> },
    ] : []),

    // 404 route - must be last
    { path: "*", element: <Navigate to={loggedInUser?.isAdmin ? "/admin/dashboard" : "/"} replace /> },
  ];

  // Create the router
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: routes.map(route => ({
        path: route.path,
        element: route.element
      }))
    }
  ]);

  // 🟡 Show loader until auth check is complete
  return isAuthChecked ? <RouterProvider router={router} /> : <Loader />;
}

export default App;
