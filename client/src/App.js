import "./App.css";
import { Button } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import mainTheme from "./themes/mainTheme";
import Header from "./component/header/Header";
import Main from "./component/main/Main";
import Footer from "./component/footer/Footer";
import { useState } from "react";
import Login from "./component/login/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./register/Register";
import { GlobalProvider } from "./GlobalContext";
import Alert from "./component/alert/Alert";

const App = () => {
  const [isLogin, setIsLogin] = useState();
  return (
    <ThemeProvider theme={mainTheme}>
      <GlobalProvider>
        <Header />
        <Alert />
        <div style={{ minHeight: "calc(100vh - 18.5rem)" }}>
          <Routes>
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route
              path="/dashboard"
              element={
                <>
                  <Main />
                </>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </GlobalProvider>
    </ThemeProvider>
  );
};
export default App;
