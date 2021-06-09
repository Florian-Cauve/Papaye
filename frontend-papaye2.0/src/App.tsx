import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import HomePage from "./components/HomePage/HomePage";
import Login from "./components/Authentication/Login";
import SignUp from "./components/Authentication/SignUp";
import News from "./components/News/News";
import MyReceipes from './components/Receipes/MyReceipes'
import AddReceipe from './components/Receipes/AddReceipe';
import MyTrainings from "./components/Trainings/MyTrainings";
import Profile from "./components/Profile/Profile";

function App() {
  const [userConnected, setUserConnected] = useState<boolean>(false)

  useEffect(() => {
      const currentUserId:string | null  = (localStorage.getItem("id") !== "") ? localStorage.getItem("id") : null;
      setUserConnected(currentUserId !== null);
      console.log(currentUserId)
  }, [])

  return (
    <div className="App">
      <Router>
        {!userConnected ? (
            <Switch>
              <Route path="/" exact component={HomePage}/>
              <Route path="/login" component={Login}/>
              <Route path="/signup" component={SignUp}/>
            </Switch>
        ) : (
        <Switch>
            <Route path="/news" component={News}/>
            <Route path="/receipes" component={MyReceipes}/>
            <Route path="/addReceipe" component={AddReceipe}/>
            {/*<Route path="/training_list" component={TrainingList}/>*/}
            <Route path="/trainingsList" component={MyTrainings}/>
            {/*<Route path="/open_training/:id_program" component={OpenTraining}/>*/}
            {/*<Route path="/do_exercise/:id_program" component={DoExercise}/>*/}
            <Route path="/account" component={Profile}/>
        </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
