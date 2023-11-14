import { Routes, Route } from 'react-router-dom';
import { Home } from '../Home/Home';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { Profile } from '../Profile/Profile';
import { GetWorkers } from '../GetWokers/GetWorkers';
import { UpdateProfile } from '../UpdateProfile/UpdateProfile';
import { Appointments } from '../Appointments/Appointments';
import { CreateAppointment } from '../CreateAppointment/CreateAppointment';
import { UpdateAppointment } from '../UpdateAppointment/UpdateAppointment';
import { GetAllUsers } from '../GetAllUsers/GetAllUsers';
import { GetAllAppointments } from '../GetAllAppointments/GetAllAppointments';
import { Portfolio } from '../Portfolio/Portfolio';

export const Body = () => {
     return (
         <>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/portfolio" element={<Portfolio />}/>
                <Route path="/workers" element={<GetWorkers />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/updateProfile" element={<UpdateProfile />}/>
                <Route path="/appointments" element={<Appointments />}/>
                <Route path="/createAppointment" element={<CreateAppointment />}/>
                <Route path="/updateAppointment" element={<UpdateAppointment />}/>
                <Route path="/getAllUsers" element={<GetAllUsers />}/>
                <Route path="/getAllAppointments" element={<GetAllAppointments />}/>
            </Routes>
         </>
     )
}