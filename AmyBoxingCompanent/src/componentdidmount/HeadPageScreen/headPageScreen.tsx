import AdminRoute from '../Routing/adminrouting';
import {Nav} from "../Nav/nav";
import routes from '../config/routes';
import { isAuth } from '../helpers/auth';
import routesadmin from "../config/routesadmin";
import "./headPaheScreen.css";
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";


export const HeadPage:React.FC=()=>{

//this function shows the location of the home page routes

    return(
      <Router>
         <div className="wrapper-page">
          {isAuth("role") ? null :  <Nav /> }
          <div className='header-section'>
             <Switch>
              {routes.map((route, index) => {
                        return (
                            <Route 
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                component={route.component}
                            />
                        );
                    })}
              {routesadmin.map((route, index) => {
                        return (
                            <AdminRoute 
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                component={route.component}
                            />
                        );
               })}
          </Switch>
          </div>
         </div>
      </Router>
    )
  
  
  }