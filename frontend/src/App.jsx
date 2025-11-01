import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import CheckoutPage from "./pages/CheckoutPage";
import ElementsPage from "./pages/ElementsPage";
import SubscriptionForm from "./pages/SubscriptionForm";
import SuccessPage from "./pages/SuccessPage";
import FailurePage from "./pages/FailurePage";

function App() {
  return (
    <Routes>
      {/* Layout Wrapper */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/elements" element={<ElementsPage />} />
        <Route path="/subscription" element={<SubscriptionForm />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/failure" element={<FailurePage />} />
      </Route>
    </Routes>
  );
}

export default App;
