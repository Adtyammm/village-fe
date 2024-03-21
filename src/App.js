import React from "react";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavbarPage from "./components/Navs/NavbarPage";
import HomeScreen from "./components/Homes/HomeScreen";
import RegisterScreen from "./components/Auths/RegisterScreen";
import LoginScreen from "./components/Auths/LoginScreen";
import AdminPanel from "./components/Admins/AdminPanel";
import CreateReporting from "./components/Reportings/CreateReportings";
import DetailsReporting from "./components/Reportings/DetailsReportings";
import Welcome from "./components/Homes/WelcomeScreen";
import RegisterUser from "./components/Auths/Villagers/RegisterUser";
import LoginUser from "./components/Auths/Villagers/LoginUser";
import NavbarUser from "./components/Navs/NavbarUser";
import ProfileScreen from "./components/Homes/ProfileScreen";
import ProfileVillageScreen from "./components/Homes/ProfileVillageScreen";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Welcome />} />
          <Route
            path="/home"
            element={
              <>
                <NavbarUser />
                <HomeScreen />
              </>
            }
          />
          <Route path="/profilevillage" element={<ProfileVillageScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/tambahkeluhan" element={<CreateReporting />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/reguser" element={<RegisterUser />} />
          <Route path="/loguser" element={<LoginUser />} />

          <Route
            path="/admin"
            element={
              <>
                <NavbarPage />
                <AdminPanel />
              </>
            }
          />
          <Route
            path="/detailkeluhan/:complaint_id"
            element={<DetailsReporting />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
