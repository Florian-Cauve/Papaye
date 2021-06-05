import React, {useEffect, useState} from "react";
import HomePage from "./src/components/HomePage.js";
import { NativeRouter, Route } from "react-router-native";

// Load all components
import Login from "./src/components/Login.js";
import SignUp from "./src/components/SignUp.js";
import News from "./src/components/News.js";

export default function App() {

  return(
    <NativeRouter>
      <Route path="/" exact component={HomePage}/>
      <Route path="/login" component={Login}/>
      <Route path="/signup" component={SignUp}/>
      <Route path="/news" component={News}/>
    </NativeRouter>
  )
}

