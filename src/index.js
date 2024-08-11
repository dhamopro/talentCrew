import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import About from "./pages/About/About";
import Friends from "./pages/Friends/Friends";
import SignUp from "./pages/Signup/SignUp";
import Login from "./pages/Login/Login";
import Component2 from "./pages/Profile/Edit";
import EditRecord from "./pages/Profile/Edit1";
import EditRecord2 from "./pages/Profile/Edit2";
import Registration from "./pages/Registration/Registration";
import NeedsTable from "./pages/NeedsTable/NeedsTable";
import TableComponent from "./pages/NeedsTable/RequirementTable";
import CandidateTable from "./pages/NeedsTable/CandidateTable";
import AggregateComponent from "./pages/NeedsTable/AllRecords";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='profile' element={<Profile />} />
          <Route path='entity' element={<About />} />
          <Route path='requirement' element={<Friends />} />
          <Route path='register' element={<Registration />} />
          <Route path='list' element={<CandidateTable />} />
          <Route path='list1' element={<NeedsTable />} />
          <Route path='agg' element={<AggregateComponent />} />


          
          
        </Route>
        <Route path='/edit1' element={<Component2 />}>
        </Route>
        <Route path="/edit/:collectionName/:id" element={<EditRecord2 />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='*' element={<Navigate to={"login"} />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
