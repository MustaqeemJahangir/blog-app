import {   signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { auth } from "./config.js";


const email =document.querySelector("#email")
const password =document.querySelector("#password")
const fullname =document.querySelector("#fullname")
const button =document.querySelector("#sub")





button.addEventListener("click",(event)=>{
    event.preventDefault()
        // createUserWithEmailAndPassword(auth, email.value, password.value)
        signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
          
       
          const user = userCredential.user;
          console.log(user)
          window.location='home.html'
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          
        });
    
})