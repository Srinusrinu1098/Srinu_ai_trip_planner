import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "./components/custom/headers";
import CreateTrip from "./create-trip";
import { Toaster } from "./components/ui/sonner";
import ViewTrip from "./viewTrip/index.jsx";

import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_LOGIN}>
      <Toaster />
      <Header />

      <HashRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/create-trip" element={<CreateTrip />} />
          <Route path="/view-trip/:tripId" element={<ViewTrip />} />
        </Routes>
      </HashRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);
