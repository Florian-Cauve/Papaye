import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import HomePage from "./components/HomePage/HomePage";

function App() {
  const [userConnected, setUserConnected] = useState(false)

  useEffect(() => {
      // authenticate("Fathi", "Rule 34").then(res =>{
      //     console.log(res.data)
      // })
      localStorage.removeItem("id")  // nobody connected

      const currentUserId:number|null  = (localStorage.getItem("id") !== null) ? Number(localStorage.getItem("id")) : null ;
      setUserConnected(currentUserId !== null);
  })

  return (
    <div className="App">
      <Router>
        {!userConnected ? (
            <Switch>
              <Route path="/" exact component={HomePage}/>
              {/*<Route path="/login" component={Login}/>*/}
              {/*<Route path="/signup" component={SignUp}/>*/}
            </Switch>
        ) : (
        <Switch>
            {/*<Route path="/news" component={News}/>*/}
            {/*<Route path="/training_list" component={TrainingList}/>*/}
            {/*<Route path="/open_training/:id_program" component={OpenTraining}/>*/}
            {/*<Route path="/do_exercise/:id_program" component={DoExercise}/>*/}
        </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
