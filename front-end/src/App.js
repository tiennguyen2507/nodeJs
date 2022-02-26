import Landing from "./components/layouts/Landing";
import {
  Switch,
  Route,
} from "react-router-dom";
import Auth from "./components/auth/Auth";
import AuthContextProvider from "./contexts/AuthContext";
import Dashboard from "./views/Dashboard";
import ProtectedRoute from "./components/routing/ProtectedRoute";

import About from "./components/layouts/About";

function App() {
  return (
    <AuthContextProvider>
      <div className="App">
        {/* <Link to="/">Home</Link>
      <Link to="/login">login</Link>
      <Link to="/register">Register</Link> */}
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/login" >
            <Auth authRoute='login' />
          </Route>
          <Route path="/register" >
            <Auth authRoute='register' />
          </Route>
          <ProtectedRoute path="/dashboard" exact component={Dashboard} />
          <ProtectedRoute path="/about" exact component={About} />
        </Switch>
      </div >
    </AuthContextProvider>
  );
}

export default App; 
