/** @format */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import DashBoard from "./Page/DashBoard.tsx";
import Layout from "./Components/Layout.tsx";
import SearchPage from "./Page/Search.tsx";
import Report from "./Page/Report.tsx";
import TopGroupAScores from "./Page/Score.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout></Layout>}>
          <Route
            path="/"
            element={<DashBoard />}
          />
          <Route
            path="/search"
            element={<SearchPage></SearchPage>}
          ></Route>
          <Route
            path="report"
            element={<Report></Report>}
          ></Route>
          <Route
            path="score"
            element={<TopGroupAScores></TopGroupAScores>}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
