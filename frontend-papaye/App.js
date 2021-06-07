import React from "react";
import { NativeRouter, Route } from "react-router-native";

// Load all components

// Authentication part
import HomePage from "./src/components/authentication/HomePage";
import Login from "./src/components/authentication/Login";
import SignUp from "./src/components/authentication/SignUp";

// News part
import News from "../frontend-papaye2.0/src/components/News/News";

// Search Part

// Sport part
import TrainingList from "./src/components/sport/TrainingList"; 
import OpenTraining from "./src/components/sport/OpenTraining";
import DoExercise from "./src/components/sport/DoExercise";

// Food part

// Account part

export default function App() {

  return(
    <NativeRouter>
      <Route path="/" exact component={HomePage}/>
      <Route path="/login" component={Login}/>
      <Route path="/signup" component={SignUp}/>
      <Route path="/news" component={News}/>
      <Route path="/training_list" component={TrainingList}/>
      <Route path="/open_training/:id_program" component={OpenTraining}/>
      <Route path="/do_exercise/:id_program" component={DoExercise}/>
    </NativeRouter>
  )
}