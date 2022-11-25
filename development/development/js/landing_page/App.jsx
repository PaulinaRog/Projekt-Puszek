import React from "react";
import { createRoot } from "react-dom/client";
import "../../scss/main.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "../signup-signin/Signup";
import Index from "./Index";
import CareApp from "../CareApp/CareApp";
import NotFound from "./nav/NotFound";
import ArticlesSite from "../articles/ArticlesSite";
import Sitters from "../CareApp/Sitters";
import Pets from "../CareApp/Pets";
import Adoptions from "../CareApp/Adoptions";
import Dashboard from "../dashboard/Dashboard";
import Profile from "../dashboard/Profile";
import EditProfile from "../dashboard/EditProfile";
import ViewProfile from "../dashboard/ViewProfile";
import Favourites from "../dashboard/Favourites";
import Messages from "../dashboard/Messages";

export default function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/care" element={<CareApp />}>
              <Route path="sitters" element={<Sitters />} />
              <Route path="pets" element={<Pets />} />
              <Route path="adoptions" element={<Adoptions />} />
            </Route>
            <Route path="/articles" element={<ArticlesSite />} />
            <Route path="/contact" element={<CareApp />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="favourites" element={<Favourites />} />
              <Route path="messages" element={<Messages />} />
            </Route>
            <Route path="/profile" element={<Profile />}>
              <Route path="edit" element={<EditProfile />} />
              <Route path="view" element={<ViewProfile />} />
            </Route>
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
