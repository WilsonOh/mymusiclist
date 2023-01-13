import { ChakraProvider, Spinner } from "@chakra-ui/react";
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import theme from "./theme";
import AuthProvider from "./contexts/AuthContext";
import App from "./App";
import Navbar from "./components/Navbar";
const About = lazy(() => import("./components/About"));
const Counter = lazy(() => import("./components/Counter"));
const Login = lazy(() => import("./components/Login"));
const Signup = lazy(() => import("./components/Signup"));
const Song = lazy(() => import("./components/Song"));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Navbar />
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<App />}></Route>
              <Route path="/song/:id" element={<Song />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/counter" element={<Counter />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>
);
