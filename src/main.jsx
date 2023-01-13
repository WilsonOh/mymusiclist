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
import Song from "./components/Song";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<App />}></Route>
            <Route path="/song/:id" element={<Song />}></Route>
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
