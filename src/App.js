import "./App.css";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import HomePage from "./pages/HomePage";
import LoginModal from "./pages/LoginModal";
import JobDetailModal from "./pages/JobDetailModal";
import { AuthProvider } from "./contexts/AuthContext";
import AuthRequire from "./contexts/AuthRequire";
import NotFoundPage from "./pages/NotFoudPage";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<HomePage />} />
            <Route path="jobs/:jobId" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
        <Routes>
          <Route>
            <Route path="/login" element={<LoginModal />} />
            <Route
              path="/jobs/:jobId"
              element={
                <AuthRequire>
                  <JobDetailModal />
                </AuthRequire>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
