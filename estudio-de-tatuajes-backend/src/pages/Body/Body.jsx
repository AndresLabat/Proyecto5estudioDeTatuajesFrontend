
import { Routes, Route } from 'react-router-dom';
import { Home } from '../Home/Home';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { Profile } from '../Profile/Profile';
import { GetWorkers } from '../GetWorkers/GetWorkers';
import { GetPortfolio } from '../GetPortfolio/GetPortfolio';

export const Body = () => {
     return (
         <>
            <Routes>
                <Route path="/home" element={<Home />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/portfolio" element={<GetPortfolio />}/>
                <Route path="/workers" element={<GetWorkers />}/>
                <Route path="/profile" element={<Profile />}/>
            </Routes>
         </>
     )
}