import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthGoogle from "../pages/user/AuthGoogle";
import GoogleRegister from "../pages/user/GoogleRegister";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ProtectedAdmin } from "./ProtectedAdmin";
import { ProtectedLectorQR } from "./ProtectedLectorQR";
import { ProtectedCliente } from "./ProtectedClient";
import { ProtectedModerador } from "./ProtectedModerador";

import Home from "../pages/user/Home";
import CreateEvent from "../pages/admin/CreatEvent";
import UserManagement from "../pages/admin/UserManagement";
import NewLocation from "../pages/admin/NewLocation";
import ListOfLocations from "../pages/admin/ListOfLocations";
import EditEvent from "../pages/admin/EditEvent";
import HomeAdmin from "../pages/admin/HomeAdmin";
import UpcomingEvents from "../pages/admin/UpcomingEvents";
import GraphEvents from "../pages/admin/GraphEvents";
import GraphEvent from "../pages/admin/GraphEvent";
import ViewEventAdmin from "../pages/admin/ViewEvent";

import Record from "../pages/user/Record";
import MyTIckets from "../pages/user/MyTIckets";
import ViewEvent from "../pages/user/ViewEvent";
import TicketPurchase from "../pages/user/TicketPurchase";
import TransferTicket from "../pages/user/TransferTicket";
import { RecibirTicket } from "../pages/user/RecibirTicker";
import LectorQR from "../pages/admin/LectorQR";
import TicketInformation from "../pages/user/TicketInformation";
import PaymentInfo from "../pages/user/PaymentInfo";
import Pay from "../pages/user/Pay";
import ViewQR from "../pages/user/ViewQR";


const Location = () => {

    return (
        <Routes>
            {/*VISTAS PÚBLICAS*/ }
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<AuthGoogle />} />
            <Route path="/register" element={<GoogleRegister />} />
            <Route path ="/viewEvent/:id" element={<ViewEvent/>}/>


            {/*VISTAS DE ADMIN*/ }
            <Route path="/admin/Home" element={<ProtectedAdmin component={HomeAdmin} />} />
            <Route path="/admin/createEvent" element={<ProtectedAdmin component={CreateEvent} />} />
            <Route path="/admin/newlocation/:id/:evento/:ubicacion" element={<ProtectedAdmin component={NewLocation} />} />
            <Route path="/admin/listlocations/:id" element={<ProtectedAdmin component={ListOfLocations} />} />
            <Route path="/admin/editEvent/:id" element={<ProtectedAdmin component={EditEvent} />} />
            <Route path="/admin/allusers" element={<ProtectedAdmin component={UserManagement} />} />
            <Route path="/admin/upcoming" element={<ProtectedAdmin component={UpcomingEvents} />} />
            <Route path="/admin/graph" element={<ProtectedAdmin component={GraphEvents} />} />
            <Route path="/admin/graphEvent/:id" element={<ProtectedAdmin component={GraphEvent} />} />
            <Route path="/admin/viewEvent/:id" element={<ProtectedAdmin component={ViewEventAdmin} />} />
            
    
            {/*VISTAS DE CLIENTE*/ }
            <Route path="/cliente/Home" element={<ProtectedCliente component={Home} />} />
            <Route path="/cliente/history" element={<ProtectedCliente component={Record} />} />
            <Route path="/cliente/mytickets" element={<ProtectedCliente component={MyTIckets} />} />
            <Route path="/cliente/viewEvent/:id" element={<ProtectedCliente component={ViewEvent} />} />
            <Route path="/cliente/purchase-ticket/:id" element={<ProtectedCliente component={TicketPurchase} />} />
            <Route path="/cliente/payment-info/:id" element={<ProtectedCliente component={PaymentInfo} />} />
            <Route path="/cliente/info-ticket/:id" element={<ProtectedCliente component={TicketInformation} />} />
            <Route path="/cliente/pay-ticket/:id" element={<ProtectedCliente component={Pay} />} />
            <Route path="/cliente/transferTicket" element={<ProtectedCliente component={TransferTicket} />} />
            <Route path="/cliente/recibirTicket" element={<ProtectedCliente component={RecibirTicket} />} />
            <Route path="/cliente/viewQR" element={<ProtectedCliente component={ViewQR} />} />

            {/*VISTAS DE LECTORQR*/ }
            <Route path="/lectorQR/Home" element={<ProtectedLectorQR component={LectorQR} />} />
            
            
        </Routes>
    );
};

export const AppRouter = () => {
    return (
    <Router>
        <div>
            <Location/>
        </div>
    </Router>
    );
};

