import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import theme from "./theme";
import About from "./components/About";
import Counter from "./components/Counter";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AuthProvider from "./contexts/AuthContext";
// import UserProfile from "./components/UserProfile";
// import ProtectedRoute from "./components/ProtectedRoute";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<App />}></Route>
            {/* <Route
              path="/profile"
              element={
                <ProtectedRoute redirect={"/"}>
                  <UserProfile />
                </ProtectedRoute>
              }
            ></Route> */}
            <Route path="/about" element={<About />}></Route>
            <Route path="/counter" element={<Counter />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>
);
