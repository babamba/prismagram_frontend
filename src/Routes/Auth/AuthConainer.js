import React, { useState } from "react";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks"
import AuthPresenter from "./AuthPresenter"

import { LOG_IN, CREATE_ACCOUNT } from "./AuthQuery"
import { toast } from "react-toastify"

export default () => {

  const [action, setAction] = useState("logIn");
  const username = useInput("");
  const password = useInput("");

  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("orochi13@naver.com");

  const requestSecretMutation = useMutation(LOG_IN, { 
    // update : (_, { data }) => {
    //   const { requestSecret } = data;
    //   if(!requestSecret){
    //     toast.error("you don't have an account, create one")
    //     setTimeout( ( )=> setAction("signUp"), 2000 );
    //   }
    // },
    variables :{ 
      email:email.value 
    },
  });

  const createAccountMutation = useMutation(CREATE_ACCOUNT, {
    variables:{
      email:email.value,
      username: username.value,
      firstName: firstName.value,
      lastName : lastName.value
    }
  })

  const onSubmit = async(e) => {
    e.preventDefault();
    if(action === "logIn"){
      if(email !== ""){
        try {
          const { requestSecret } = await requestSecretMutation();
          if(!requestSecret){
            toast.error("you don't have an account, create one")
            setTimeout( ( )=> setAction("signUp"), 3000 );
          }else{
            toast.success("Send Secret Code !")
          }

        } catch (error) {
          toast.error("Can't request secret, try again");
        }
      }else{
        toast.error("Email is required")
      }
    }else if(action === "signUp") {
      if(
        email.value !== "" &&
        username.value !== "" &&
        firstName.value !== "" &&
        lastName.value !== ""
      ){
        try {
          const { createAccount } = await createAccountMutation();
          if(!createAccount){
            toast.error("Can't create Account");
          }else{
            toast.success("Account created ! Login Now")
            setTimeout(() => setAction("logIn"), 3000);
          }
        } catch (e) {
          toast.error("Can't create Account, try again");
        }
        
      }else{
        toast.error("All field required")
      }
    }
  }

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
               onSubmit={onSubmit}
          />
};