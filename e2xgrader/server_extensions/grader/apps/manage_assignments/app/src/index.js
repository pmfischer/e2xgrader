import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import App from './App';
import Assignments from './pages/Assignments';
import Students from './pages/Students';
import Assignment from './pages/Assignment';
import Authoring from './pages/Authoring';
import Test from './pages/Test';

ReactDOM.createRoot(document.querySelector("#root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/e2xgrader" element={<App />}>
        <Route path="assignments" element={<Assignments />} />
        <Route path="students" element={<Students />} />
        <Route path="authoring" element={<Authoring />} />
        <Route path="test" element={<Test />} />
        <Route path="assignments/:assignment" element={<Assignment />} />
        <Route index element={<Navigate to="assignments" replace />}/>
      </Route>
    </Routes>
  </BrowserRouter>
);