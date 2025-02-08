import React, { Suspense, lazy, useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./Protected/ProtectedRoute";
import { useDispatch } from "react-redux";
import { checkAuthentication } from "./slices/userSlice";
import MobileMenu from "./Components/Common/MobileMenu";
import ScrollToTop from "./ScrollToTop";
import BlogSection from "./Components/ProductSection/BlogSection";
import Checkout from "./Pages/Checkout";

// Lazy loading components
const Index = lazy(() => import("./Pages/Index"));
const FilterPage = lazy(() => import("./Pages/FilterPage"));
const ContactUs = lazy(() => import("./Pages/ContactUs"));
const About = lazy(() => import("./Pages/About"));
const Faq = lazy(() => import("./Pages/Faq"));
const Order = lazy(() => import("./Pages/Order"));
const Tracking = lazy(() => import("./Pages/Tracking"));
const Login = lazy(() => import("./Pages/Login"));
const SignUp = lazy(() => import("./Pages/SignUp"));

const Account = lazy(() => import("./Pages/Account"));
const Page404 = lazy(() => import("./Pages/Page404"));
const Whislist = lazy(() => import("./Pages/Whislist"));
const Cart = lazy(() => import("./Pages/Cart"));
const DetailPage = lazy(() => import("./Pages/DetailPage"));
const BannerProductDetails = lazy(() => import("./Pages/BannerProductDetails"));
const OtpVerify = lazy(() => import("./Pages/OtpVerify"));
const KumbhInfo = lazy(() => import("./Pages/KumbhInfo"));
const BusinessInfo = lazy(() => import("./Pages/BusinessInfo"));
const ProductList = lazy(() => import("./Components/Header/ProductList"));
const MyInvoice = lazy(() => import("./Pages/MyInvoice"));
const ComboCardCarousel = lazy(() => import("./Components/ComboCards/ComboCardCarousel"));
const PrivacyPolicy = lazy(() => import("./Terms & Conditions/PrivacyPolicy"))
const DataEncryptionPolicy = lazy (() => import("./Terms & Conditions/Data&EncryptionPolicy"))
const RefundAndRewardsPolicy = lazy (()=> import("./Terms & Conditions/RefundAndRewardsPolicy "))
const LoyaltyRewardsPolicy = lazy (()=> import("./Terms & Conditions/LoyaltyRewardsPolicy"))
const BusinessTermsConditions = lazy (()=> import("./Terms & Conditions/BusinessTermsConditions"))
const ShippingPolicy = lazy (() => import("./Terms & Conditions/ShippingPolicy"))
const PannelPage = lazy(()=> import("./Components/ComponentPannel/PannelPage")) 

// Skeleton Loader as a fallback
const SkeletonLoader = () => (
  <div
    className="skeleton-loader d-flex justify-content-center align-items-center"
    style={{ height: "100vh" }}
  >
    <div className="text-center">
      <div className="spinner-grow text-danger" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  </div>
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthentication())
      .unwrap()
      .then(() => {
        console.log('User is authenticated');
      })
      .catch((error) => {
        console.error('Error on app initialization:', error);
      });
  }, [dispatch]);

  const { user, authenticated, cart, wishlists, rewards } = useSelector(
    (state) => state.user
  );


  console.log("rewards : " + rewards)

  useEffect(() => {}, [user, authenticated, cart, wishlists, rewards]); // Run effect when these values change

  return (
    <Router>
      <Suspense fallback={<SkeletonLoader />}>
      <ScrollToTop/>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/filter" element={<FilterPage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/order" element={<ProtectedRoute element={<Order />} />} />
          <Route path="/tracking/:orderId" element={<ProtectedRoute element={<Tracking />} />} />
          <Route path="/myaccount" element={<ProtectedRoute element={<Account />} />} />
          <Route path="/404" element={<Page404 />} />
          <Route path="/cart" element={<ProtectedRoute element={<Checkout />} />} />
          <Route path="/mywhishlist" element={<ProtectedRoute element={<Whislist />} />} />
          <Route path="/detail_page/:id" element={<DetailPage />} />
          <Route
            path="/bannerProductDetails"
            element={<BannerProductDetails />}
          />
          <Route path="/privacypolicy" element={< PrivacyPolicy />} />
          <Route path="/dataencryptionpolicy" element={<DataEncryptionPolicy />} />
          <Route path="/refundAndrewardspolicy" element={<RefundAndRewardsPolicy />} />
          <Route path="/loyaltyrewardspolicy" element={<LoyaltyRewardsPolicy />} />
          <Route path="/businesstermsconditions" element={<BusinessTermsConditions />} />
          <Route path="/shippingpolicy" element={<ShippingPolicy />} />
          <Route path="combocardcarousel" element={<ComboCardCarousel />} />
          <Route path="/kumbhinfo" element={<KumbhInfo />} />
          <Route path="/businessInfo" element={<BusinessInfo />} />
          <Route path="/filters/:query" element={<ProductList />} />
          <Route path="/myInvoice/:orderId" element={<ProtectedRoute element={<MyInvoice />} />} />
          <Route path="/blogsection" element={<BlogSection/>}/>
          <Route path="/pannelpage/:category" element={<PannelPage/>}/>
        
        </Routes>
      </Suspense>
      <MobileMenu/>
      <ToastContainer autoClose={1000} />
    </Router>
  );
}

export default App;
