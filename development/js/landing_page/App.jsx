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
import ViewProfile from "../dashboard/profile/ViewProfile";
import Messages from "../dashboard/Messages";
import PickProfile from "../dashboard/profile/PickProfile";
import SetPetProfile from "../dashboard/profile/SetPetProfile";
import SetSitterProfile from "../dashboard/profile/SetSitterProfile";
import PetPf from "../CareApp/PetPf";
import SitPf from "../CareApp/SitPf";
import ProfilePhoto from "../dashboard/profile/ProfilePhoto";
import DeleteProfile from "../dashboard/profile/DeleteProfile";

export default function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/care" element={<CareApp />}>
              <Route path="sitterpf">
                <Route path=":id" element={<SitPf />} />
              </Route>
              <Route path="petpf">
                <Route path=":id" element={<PetPf />} />
              </Route>
              <Route path="sitters" element={<Sitters />} />
              <Route path="pets" element={<Pets />} />
              <Route path="adoptions" element={<Adoptions />} />
            </Route>

            <Route path="/articles" element={<ArticlesSite />}>
              <Route path=":artid" element={<ArticlesSite />} />
            </Route>
            <Route path="/contact" element={<CareApp />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="messages" element={<Messages />} />
              <Route path="viewprofile" element={<ViewProfile />} />
              <Route path="pfp" element={<ProfilePhoto />} />
              <Route path="deletepf" element={<DeleteProfile />} />
            </Route>
            <Route path="/setprofile" element={<PickProfile />} />
            <Route path="/sitterpf" element={<SetSitterProfile />} />
            <Route path="/petpf" element={<SetPetProfile />} />

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
