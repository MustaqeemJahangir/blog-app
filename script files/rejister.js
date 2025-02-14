import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { auth } from "./config.js";
import {  collection, addDoc, Timestamp, getDocs, query, orderBy, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { db } from "./config.js";




const email =document.querySelector("#email")
const password =document.querySelector("#password")
const fullname =document.querySelector("#fullname")
const button =document.querySelector("#sub")


let profileImage= " "
let myWidget = cloudinary.createUploadWidget({
    cloudName: 'dosgchkzy',
    uploadPreset: 'bloging'
}, (error, result) => {
    if (!error && result && result.event === "success") {
        console.log('Done! Here is the image info: ', result.info);
     profileImage= result.info.secure_url    

    
    }
}
)




document.getElementById("upload_widget").addEventListener("click", function () {
    // event.stopPropagation()
    myWidget.open();
}, false);


button.addEventListener("click",(event)=>{
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(async (userCredential) => {
      
      const user = userCredential.user;
      console.log(user)

      const docRef = await addDoc(collection(db, "user"), {
      fullname: fullname.value ,
      email:email.value,
      uid:user.uid,
      image:profileImage,


      });
      console.log("Document written with ID: ", docRef.id);
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
      // ..
    });




    
    

})


