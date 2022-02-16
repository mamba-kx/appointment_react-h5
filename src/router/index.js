import Login from '../pages/login/index.jsx';
import Session from "../pages/session/index.jsx";
import MyAppointment from '../pages/myAppointment/index.jsx';
const routes = [
  {
    path: "/",
    componentName: <Login/>,
    exact: true,
  },
  {
    path: "/session",
    componentName: <Session/>,
    exact: true,
  },
  {
    path: "/myappointment",
    componentName: <MyAppointment/>,
    exact: true,
  },
];

export default routes;