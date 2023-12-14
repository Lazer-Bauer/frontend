import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import SignIn from "./components/Sign-In";
import SignUp from "./components/Sign-Up";
import Footer from "./components/Footer";
import axios from "axios";
import FavoriteList from "./components/FavoriteList";
import SignOut from "./components/Sign-out";
import ProtectedRout from "./common/ProtectedRoute";
import BizzSignUp from "./components/BizzSignUp";
import CreateCard from "./components/Create-card";
import MyCards from "./components/MyCards";
import EditCard from "./components/EditCard";
function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-up-biz" element={<BizzSignUp />} />
        <Route
          path="create-card"
          element={
            <ProtectedRout onlyBiz>
              <CreateCard />
            </ProtectedRout>
          }
        />
        <Route
          path="edit-card/:id"
          element={
            <ProtectedRout onlyBiz>
              <EditCard />
            </ProtectedRout>
          }
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRout>
              <FavoriteList />
            </ProtectedRout>
          }
        />
        <Route
          path="/my-cards"
          element={
            <ProtectedRout onlyBiz>
              <MyCards />
            </ProtectedRout>
          }
        />

        <Route path="/sign-out" element={<SignOut />} redirect="/" />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
