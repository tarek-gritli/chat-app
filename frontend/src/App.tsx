import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./hooks/useAuth";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/Signup";
import { lazy } from "react";

const Home = lazy(() => import("./pages/home/Home"));

export default function App() {
  const { authUser, token } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Routes>
        <Route
          path="/"
          element={authUser && token ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={authUser && token ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser && token ? <Navigate to="/" /> : <SignUp />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}
