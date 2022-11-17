import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "../signup-signin/Signup";
import Index from "./Index";
import CareApp from "./nav/careApp";
import NotFound from "./nav/NotFound";

export default function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/care" element={<CareApp />}>
              <Route path="sitters" element={<CareApp />} />
              <Route path="pets" element={<CareApp />} />
              <Route path="adoptions" element={<CareApp />} />
            </Route>
            <Route path="/articles" element={<CareApp />} />
            <Route path="/contact" element={<CareApp />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="documents"
              element={<h1 style={{ color: "black" }}>dokumenty</h1>}
            >
              <Route
                path="privacypolicy"
                element={
                  <h1 style={{ color: "black" }}>Polityka prywatności</h1>
                }
              />
              <Route
                path="regulations"
                element={<h1 style={{ color: "black" }}>Regulamin</h1>}
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
