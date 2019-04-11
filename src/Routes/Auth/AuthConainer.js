import React, { useState } from "react";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks"
import AuthPresenter from "./AuthPresenter"

import { LOG_IN, CREATE_ACCOUNT, CONFIRM_SECRET, LOCAL_LOG_IN } from "./AuthQuery"
import { toast } from "react-toastify"

export default () => {
  
  const [action, setAction] = useState("logIn");
  const username = useInput("");
  const password = useInput("");

  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("orochi13@naver.com");

  const secret = useInput("");

  const requestSecretMutation = useMutation(LOG_IN, { 
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

  const confirmSecretMutation = useMutation(CONFIRM_SECRET, {
    variables:{
      email:email.value,
      secret: secret.value
    }
  })

  const localLoginMutation = useMutation(LOCAL_LOG_IN);

  const onSubmit = async(e) => {
    e.preventDefault();
    if(action === "logIn"){
      if(email !== ""){
        try {
          const {data: {requestSecret} } = await requestSecretMutation();
          console.log(requestSecret);
          if(!requestSecret){
            toast.error("you don't have an account, create one")
            setTimeout( ( )=> setAction("signUp"), 3000 );
          }else{
            toast.success("Send Secret Code ! \n Check your inbox for your login Code")
            setAction("Confirm")
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
          const { data: { createAccount } } = await createAccountMutation();
          console.log(createAccount);
          if(!createAccount){
            toast.error("Can't create Account");
          }else{
            toast.success("Account created ! Login Now")
            setTimeout(() => setAction("logIn"), 3000);
          }
        } catch (e) {
          toast.error("Can't create Account, try again",);
        }
        
      }else{
        toast.error("All field required")
      }
    }else if(action === "Confirm"){
      if(secret.value !== ""){
        try {
          const { data : { confirmSecret : token }} = await confirmSecretMutation();
          //console.log(confirmSecret)
          //const token = confirmSecret
          //TODO log user in
          if(token !== "" || token !== undefined){
            localLoginMutation({ variables : {token } });
          }
        } catch (error) {
          toast.error(" Can't confirm secret")
        }
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
               secret={secret}
               onSubmit={onSubmit}
          />
};