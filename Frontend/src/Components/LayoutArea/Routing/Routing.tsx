import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../../AuthArea/Login/Login';
import Logout from '../../AuthArea/Logout/Logout';
import Register from '../../AuthArea/Register/Register';
import AddVacation from '../../VacationsArea/AddVacation/AddVacation';
import EditVacation from '../../VacationsArea/EditVacation/EditVacation';
import VacationDetails from '../../VacationsArea/VacationDetails/VacationDetails';
import VacationList from '../../VacationsArea/VacationList/VacationList';
import PageNotFound from '../PageNotFound/PageNotFound';

import './Routing.css';

const Routing: React.FC = (): JSX.Element => {
  return (
    <div className="Routing">
      <Routes>

        {/* Register */}
        <Route path="/register" element={<Register />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Logout */}
        <Route path="/logout" element={<Logout />} />

        {/* Vacation List: */}
        <Route path="/vacations" element={<VacationList />} />

        {/* Vacation Details: */}
        <Route path="/vacations/details/:vacationId" element={<VacationDetails />} />

        {/* Add Vacation: */}
        <Route path="/vacations/new" element={<AddVacation />} />

        {/* Edit Vacation: */}
        <Route path="/vacations/edit/:vacationId" element={<EditVacation />} />

        {/* Default Route: */}
        <Route path="/" element={<Navigate to="/vacations" />} />

        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </div>
  );
};

export default Routing;
