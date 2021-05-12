import React from "react"
import './App.css';
import SideBar from "./SideBar";
import Chat from "./Chat";
import Login from "./Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useStateValue } from "./StateProvider";


function App() {


  const [{user},dispatch] = useStateValue();
  return (


      <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
        <Router>
          <SideBar user={user}/>
          <Switch>
          <Route path="/rooms/:roomId">
              <Chat />
          </Route>
            <Route path="/">
              <h1>Hello</h1>
            </Route>
            
            
          </Switch>
        </Router>
        </div>
      )}
        
      </div>
 
  );
}

export default App;
