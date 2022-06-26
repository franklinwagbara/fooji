import "./App.css";
import { Button } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import mainTheme from "./themes/mainTheme";
import Header from "./component/header/Header";
import Main from "./component/main/Main";
import Footer from "./component/footer/Footer";
import { useState } from "react";
import Login from "./component/login/Login";
import { Routes, Route } from "react-router-dom";
import Register from "./register/Register";
import { GlobalProvider } from "./GlobalContext";

const App = () => {
  const [isLogin, setIsLogin] = useState();
  return (
    <ThemeProvider theme={mainTheme}>
      <GlobalProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </GlobalProvider>
    </ThemeProvider>
  );
};
export default App;
