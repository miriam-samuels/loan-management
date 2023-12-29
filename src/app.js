import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import AdminLayout from "layouts/admin";
import LenderLayout from "layouts/lender";
import BorrowerLayout from "layouts/borrower";

import Auth from "views/auth";
import { useSelector } from 'react-redux';
function App() {
   const logged = useSelector((state) => state?.logged?.data)
   console.log(logged)
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Auth />} />
            {
               logged?.user?.role === "admin" &&
               <Route path="/admin/*" element={<AdminLayout />} />
            }
            {
               logged?.user?.role === "lender" &&
               <Route path="/lender/*" element={<LenderLayout />} />

            }
            {
               logged?.user?.role === "borrower" &&
               <Route path="/borrower/*" element={<BorrowerLayout />} />

            }

            {/* TODO: Create a 404 page not found */}
            <Route
               path="*"
               element={<Navigate to="/" replace />}
            />
         </Routes>
      </BrowserRouter>
   )
}

export default App