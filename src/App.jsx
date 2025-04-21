import React from "react";
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './assets/font-awesome/css/all.min.css';
import './assets/css/App.css';

import MainLayout from "./layouts/mainlayout";
import AuthLayout from "./layouts/authlayout";
import Home from "./composants/pages/Home";
import About from "./composants/pages/About";
import Login from "./composants/pages/Login";
import Personnel from "./composants/pages/personnel";
import Patientes from "./composants/pages/patientes";
import Dossier from "./composants/pages/dossier";
import Rdv from "./composants/pages/rendezvous";
import RdvPatiente from "./composants/pages/rdvPatient";
import DossierPatiente from "./composants/pages/dossierPatiente";
import NotFound from "./composants/pages/NotFound";

import PrivateRoute from "./composants/authent/verifAuth";
import TitleMgm from "./titlemgnger/titlemgmt";

function App() {
  return (
        <>
          <TitleMgm />
          <Routes>
            {['/', 'login'].map((path) => (
                <Route key={path} path={path} element={<AuthLayout><Login /></AuthLayout>} />
              ))}
        
            <Route element={<PrivateRoute/>}>
              {['/accueil', '/home'].map((path) => (
                <Route key={path} path={path} element={<MainLayout><Home /></MainLayout>} />
              ))}
              <Route path="/rendez-vous" element={<MainLayout><Rdv /></MainLayout>} />
              <Route path="/dossier" element={<MainLayout><Dossier /></MainLayout>} />
              <Route path="/personnel" element={<MainLayout><Personnel/></MainLayout>} />
              <Route path="/patientes" element={<MainLayout><Patientes/></MainLayout>} />
              <Route path="/about" element={<MainLayout><About /></MainLayout>} />
              <Route path="/liste-rdv" element={<MainLayout><RdvPatiente /></MainLayout>} />
              <Route path="/dossier_patiente" element={<MainLayout><DossierPatiente /></MainLayout>} />
            </Route>
            
            <Route path="*" element={<NotFound />} />

          </Routes>
        </>  
  )
}

export default App;