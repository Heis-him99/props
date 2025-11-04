// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RestaurantLanding from "./component/RestaurantLanding";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/PaymentPage";
import Menu from "./component/Menu";
import OrderPage from "./Pages/OrderPage";
import PaymentPage from "./Pages/PaymentPage";
import PaymentSuccessPage from "./Pages/PaymentSuccessPage";
import OrdersHistoryPage from "./Pages/OrdersHistoryPage";
function App() {
  return (


    <Router>
      <Routes>
        <Route path="/" element={<RestaurantLanding />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/Order" element={<OrderPage />} />
        <Route path="/Payment" element={<PaymentPage />} />
        <Route path="/PaymentSuccess" element={<PaymentSuccessPage />} />
       <Route path="/ordersHistory" element={<OrdersHistoryPage />} />

      </Routes>
    </Router>
  );
}

export default App;
