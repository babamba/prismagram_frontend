import React, { useState } from "react";
import useInput from "../../Hooks/useInput";
import AuthPresenter from "./AuthPresenter"

export default () => {
  const [action, setAction] = useState("logIn");
  const username = useInput("");
  const password = useInput("");

  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");

  // console.log("username" , username)
  // console.log("password" , password)
  
  // console.log("firstName" , firstName)
  // console.log("lastName" , lastName)
  // console.log("email" , email)

  return <AuthPresenter 
               setAction={setAction} 
               action={action} 
               username={username}
               password={password}
               firstName={firstName}
               lastName={lastName}
               email={email}
          />
};