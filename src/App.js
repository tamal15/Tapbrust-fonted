// import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './Pages/Home/Home';
import BuyerDashboard from './Pages/Home/BuyerDashboard/BuyerDashboard';
import CartContextProvider from './Context/CartContext';
import Login from './Login/Login/Login';
import Register from './Login/Register/Register';
import AuthProvider from './Context/AuthProvider';
import ProductBuyer from './Pages/Dashboard/BuyerDashboard/ProductBuyer';
import ProductDetails from './Pages/Home/BuyerProduct/ProductDetails';
import Dashboard from './Pages/Dashboard/Dashboard';
import BuyerWelcome from './Pages/Dashboard/BuyerDashboard/BuyerWelcome/BuyerWelcome';
import UserProfile from './Pages/Dashboard/UserProfile/UserProfile';
import MakeAdmin from './Pages/Dashboard/AdminDashboard/MakeAdmin/MakeAdmin';
import BuyerProductUpdate from './Pages/Home/BuyerDashboard/BuyerProductUpdate/BuyerProductUpdate';
import UpdateProducts from './Pages/Home/BuyerDashboard/BuyerProductUpdate/UpdateProducts';
// import ProductsCategories from './Pages/ProductsCategories/ProductsCategories';
import MyOrder from './Pages/Dashboard/UserDashboard/MyOrder/MyOrder';
import Contact from './Pages/Contact/Contact';
import OrderShow from './Pages/Home/BuyerDashboard/OrderShow/OrderShow';
import PotterDataUpload from './Pages/Dashboard/BuyerDashboard/PotterDataUpload/PotterDataUpload';
import EditPotterData from './Pages/Dashboard/BuyerDashboard/PotterDataUpload/EditPotterData/EditPotterData';
import BuyerAllProduct from './Pages/Home/BuyerProduct/BuyerAllProduct';
import AdminAllProductUpload from './Pages/Dashboard/AdminDashboard/AdminAllProductUpload/AdminAllProductUpload';
import AdminAllProductShow from './Pages/Dashboard/AdminDashboard/AdminAllProductUpload/AdminAllProductShow';
import AdminProductDetails from './Pages/Dashboard/AdminDashboard/AdminAllProductUpload/AdminProductDetails';
import AdminProducts from './Pages/Dashboard/AdminDashboard/AdminProducts/AdminProducts';
import UserOrders from './Pages/Dashboard/AdminDashboard/UserOrders/UserOrders';
import DarkAndWhiteTheme from './Pages/Home/Mood/DarkAndWhiteTheme';

import { useState } from 'react';
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyle, GlobalTextStyle, LightTheme } from './Pages/Home/Mood/Theme';
import BuyerOrder from './Pages/Home/BuyerDashboard/BuyerOrder/BuyerOrder';
import ManageOrder from './Pages/Dashboard/AdminDashboard/ManageOrder/ManageOrder';
import UpdateOrder from './Pages/Dashboard/AdminDashboard/UpdateOrder/UpdateOrder';
import AdminPotterUpload from './Pages/Dashboard/AdminDashboard/AdminPotterUpload/AdminPotterUpload';
import UpdatePurchase from './Pages/Dashboard/UserProfile/UpdatePurchase';
import UserDesignOrder from './Pages/Dashboard/BuyerDashboard/userDesignOrder/UserDesignOrder';
import AdminSeeDesign from './Pages/Dashboard/BuyerDashboard/userDesignOrder/AdminseeDesign';
import RequireAuth from './Pages/Home/RequireAuth/RequireAuth';
import AdminOverView from './Pages/Dashboard/AdminDashboard/AdminOverView/AdminOverView';
import GraphShow from './Pages/Dashboard/AdminDashboard/AdminOverView/GraphShow';
import PotterService from './Pages/Dashboard/AdminDashboard/PotterService/PotterService';
import PotterserviceForm from './Pages/Dashboard/AdminDashboard/PotterService/PotterserviceForm';
import PotterServiceShow from './Pages/Dashboard/AdminDashboard/PotterService/PotterServiceShow';
import Services from './Pages/Dashboard/AdminDashboard/PotterService/Services/Services';
import DesignPotter from './Pages/Dashboard/AdminDashboard/PotterService/Services/DesignPotter';
import ServiceDetailsPart from './Pages/Dashboard/AdminDashboard/PotterService/Services/ServiceDetailsPart';
import OverView from './Pages/Home/BuyerDashboard/OverView/OverView';
import Error from './Shared/Error/Error';
import AdminPage from './Components/PaymentData/AdminPage';
import UsersDashboard from './Components/PaymentData/UserDashboard';
import AdminApprovalPage from './Components/PaymentData/AdminApprovalPage';
import FirstProfile from './Components/PaymentData/FirstProfile';
import ShowAdminProduct from './Pages/Dashboard/AdminDashboard/AdminAllProductUpload/ShowAdminProduct';
import TypesAdmin from './Pages/Dashboard/AdminDashboard/AdminAllProductUpload/TypesAdmin';
import CategoryDetails from './Pages/Dashboard/AdminDashboard/AdminAllProductUpload/CategoriesDetails';
import TypeCategoryDetail from './Pages/Home/HomeDataShow/TypeCategoryDetail';
import EditAdminProduct from './Pages/Dashboard/AdminDashboard/AdminProducts/EditAdminProduct';
import NewUserDashboard from './Components/PaymentData/UserDashboard';
import RefferPage from './Components/PaymentData/RefferPage';
import NewRegister from './Login/Register/NewRegister';
import AdminSeeSuport from './Pages/Dashboard/AdminSeeSupport';
import UserAllWithdraw from './Components/PaymentData/UserAllWithdraw';
import Notice from './Components/PaymentData/Notice';
import NoticeShow from './Components/PaymentData/NoticeShow';
import ShowEarn from './Components/PaymentData/ShowEarn';
import ShowWallet from './Components/PaymentData/ShowWallet/ShowWallet';
import Userdatacheck from './Components/PaymentData/Userdatacheck';
import NewShowNotice from './Components/PaymentData/NewShowNotice';
import AllUser from './Components/PaymentData/AllUser';
import VerifyEmail from './Components/PaymentData/VerifyEmail';
import GoogleAdds from './Components/PaymentData/GoogleAdds';

// import { darkTheme, LightTheme,GlobalStyle } from '';


const StyledApp=styled.div`
color: ${(props)=>props.theme.textColor};
`;
function App() {

  const  [theme,setTheme]=useState("light");

    

  const themeToggler=()=>{
        theme==="light" ? setTheme("dark") : setTheme("light");
  }
  return (
    <div className="App">
      <AuthProvider>
        <CartContextProvider>
          <BrowserRouter>
           
           <ThemeProvider
            theme={theme==="light" ? LightTheme : darkTheme}
           >
             <GlobalStyle></GlobalStyle>
             <GlobalTextStyle></GlobalTextStyle>
          {/* <StyledApp> */}
          {/* <button onClick={()=>themeToggler()}>Change Theme</button> */}
          <Routes>
             
              <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
              <Route path="/erro" element={<Error/>}/>
              {/* <Route path="/buyer" element={<BuyerDashboard />} /> */}
              <Route path="/login" element={<Login />} />
              <Route path="/theme" element={<DarkAndWhiteTheme />} />
              <Route path="/register" element={<Register />} />
              <Route path="/mainbalance" element={<UsersDashboard />} />
              <Route path="/firstProfile" element={<FirstProfile />} />
              <Route path="/category/:category" element={<CategoryDetails />} />
              <Route path="/editprofiles" element={<UserProfile />} />
              <Route path="/partcategories/:type" element={<TypeCategoryDetail />} />  
              <Route path="/newregister" element={<NewRegister />} />              
              <Route path="/showNotice" element={<NoticeShow />} />              
              {/* <Route path="/newshowNotice" element={<NewShowNotice />} />               */}
              <Route path="/showEarn" element={<ShowEarn />} />              
              <Route path="/showWallet" element={<ShowWallet />} />              
              <Route path="/verify-email" element={<VerifyEmail />} />              
              {/* <Route path="/google" element={<GoogleAdds />} />               */}
            
              {/* ---------------------------------------------------
              ------------------------------------------------
              --------------------------   tapbrust start             */}




               {/* -----------------------------------------------------------
              ------------------------------------------------
              --------------------------   tapbrust end             */}
              
              <Route path="/users/update/:id" element={<UpdateProducts />} />
              <Route path="/contact" element={<Contact></Contact>
             } />
              <Route path="/buyerAllproduct" element={<BuyerAllProduct />} />
              <Route path="/graph" element={<GraphShow />} />
              {/* <Route path="/potterservice" element={<PotterService />} /> */}
              <Route path="/services" element={<Services />} />
              <Route path="/design" element={<DesignPotter />} />
             
              <Route path="/adminsproducts" element={<AdminProducts />} />
              {/* <Route path="/serviceshow" element={<PotterServiceShow />} /> */}
              {/* <Route path="/sellerOverview" element={<OverView />} /> */}
             
             
              {/* <Route path="/potterupload" element={<PotterUpload />} /> */}
              <Route
              path="bookDetails/:id"
              element={<ProductDetails />}/>
              <Route
              path="servicesDetails/:id"
              element={<ServiceDetailsPart />}/>
              <Route
              path="service/:id"
              element={<PotterserviceForm />}/>
             
              <Route
              path="adminbookDetails/:id"
              element={<AdminProductDetails />}/>

              {/* buyer dashboard  */}

              <Route path="/dashboard" element={<Dashboard/>}>
              <Route path="/dashboard" element={<BuyerWelcome/>} />
              <Route path="/dashboard/welcome" element={<BuyerWelcome/>} />
              <Route path="/dashboard/userProfile" element={<UserProfile/>} />
              <Route path="/dashboard/makeadmin" element={<MakeAdmin/>} />
              <Route path="/dashboard/adminCheck" element={<ManageOrder/>} />
              <Route path="/dashboard/sellerOverview" element={<OverView/>} />
              <Route path="/dashboard/userdesignsee" element={<AdminSeeDesign/>} />
              <Route path="/dashboard/buyerOrder" element={<BuyerOrder/>} />
              <Route path="/dashboard/uploadProduct" element={<ProductBuyer />} />
              <Route path="/dashboard/potterupload" element={<PotterService />} />
              <Route path="/dashboard/adminPotters" element={<AdminPotterUpload />} />
              <Route path="/dashboard/buyer" element={<BuyerDashboard />} />
              <Route path="/dashboard/adminpotterupload" element={<PotterServiceShow />} />
              <Route path="/dashboard/myorder" element={<MyOrder/>} />
              <Route path="/dashboard/userdesign" element={<UserDesignOrder/>} />
              <Route path="/dashboard/adminUpdateOrder" element={<UpdateOrder/>} />
              <Route path="/dashboard/showadminsproduct" element={<ShowAdminProduct />} />
              <Route path="/dashboard/typesadmin" element={<TypesAdmin />} />
              <Route path="/dashboard/adminpage" element={<AdminPage />} />
              <Route path="/dashboard/adminapproval" element={<AdminApprovalPage />} />
              <Route path="/dashboard/newuserdashboard" element={<NewUserDashboard />} />
              <Route path="/dashboard/rafferinfo" element={<RefferPage />} />
              <Route path="/dashboard/adminsupport" element={<AdminSeeSuport />} />
              <Route path="/dashboard/userallwithdraw" element={<UserAllWithdraw />} />
              <Route path="/dashboard/userdatacheck" element={<Userdatacheck />} />
              <Route path="/dashboard/addnotice" element={<Notice />} />
              <Route path="/dashboard/newshowNotice" element={<NewShowNotice />} />
              {/* <Route path="/dashboard/sellerwelcome" element={<SellerWelcome />} /> */}



              {/* <Route path="/dashboard/featuresProductUpload" element={<FeaturesProductUpload/>} /> */}
              <Route path="/dashboard/updateProduct" element={<BuyerProductUpdate />} />
              <Route path="/dashboard/customerorder" element={<OrderShow />} />
              <Route path="/dashboard/usercustomerorder" element={<UserOrders />} />
              <Route path="/dashboard/potterDataUpload" element={<PotterDataUpload />} />
              <Route path="/dashboard/users/update/:id" element={<UpdateProducts />} />
              <Route path="/dashboard/userspotter/updatepotter/:id" element={<EditPotterData />} />
              <Route path="/dashboard/updateadminproducts/:parentId/:index" element={<EditAdminProduct />} />

              <Route path="/dashboard/userPurchase/updatepotter/:id" element={<UpdatePurchase />} />
              <Route path="/dashboard/adminsproducts" element={<AdminProducts />} />
              <Route path="/dashboard/adminAllProduct" element={<AdminAllProductUpload />} />
              <Route path="/dashboard/overview" element={<AdminOverView />} />
              <Route path="/dashboard/alluser" element={<AllUser />} />

              </Route>
             {/* product categories  */}
              {/* <Route path="/categories" element={<ProductsCategories/>}>
              <Route path="/categories" element={<BuyerWelcome/>} />

              </Route> */}
    
            </Routes>
          {/* </StyledApp> */}
           </ThemeProvider>
          </BrowserRouter>
        </CartContextProvider>
      </AuthProvider>
    </div>
    
  );
  
}

export  default  App;
