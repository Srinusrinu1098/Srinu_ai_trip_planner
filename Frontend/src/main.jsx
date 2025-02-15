import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/custom/headers";
import CreateTrip from "./create-trip";
import { Toaster } from "./components/ui/sonner";
import ViewTrip from './viewTrip/[tripId]/index.jsx'

import { GoogleOAuthProvider } from "@react-oauth/google";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create-trip",
    element: <CreateTrip />,
  },{
    path: "/view-trip/:tripId",
    element: <ViewTrip/>
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
 
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_LOGIN}>
      <Toaster />
      <Header />
      
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
);
