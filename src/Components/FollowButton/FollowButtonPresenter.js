import React from "react";
import style from "styled-components";
import Button from "../Button";

export default ({ isFollowing, onClick }) => (
     <Button text= { isFollowing ? "UnFollow" : "Follow"} onClick={onClick}/>
)