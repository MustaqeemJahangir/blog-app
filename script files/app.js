import {onAuthStateChanged , signOut} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { auth } from "./config.js";

import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { db } from "./config.js";



let btn=document.querySelector("#logout")
const imgName=document.querySelector("#img-name")
const fullname=document.querySelector("#username")





onAuthStateChanged(auth, async(user) => {
    if (user) {
      
      const uid = user.uid;
      console.log(uid)
      let users = await getdat()
      console.log(users.image)

      fullname.innerHTML= users.fullname
      imgName.src= users.image




    } else {
      // User is signed out
      // ...
      window.location='login.html'
    }
  });




 btn.addEventListener("click",()=>{
    // event.preventDefault();
    signOut(auth).then(() => {
        // Sign-out successful.
        window.location='login.html'

      }).catch((error) => {
        // An error happened.
      });
})
  

async function getdat() {


const q = query(collection(db, "user"), where("uid", "==", auth.currentUser.uid));


let user =null
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
      
  user=doc.data()
  console.log(user)
  console.log(doc.id, " => ", doc.data());
});
return user

}










let div=document.querySelector("#main-card")


let store=[]
async function blogsdata() {
  const querySnapshot = await getDocs(collection(db, "blogs"));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  store.push(doc.data())

});

console.log(store)


store.map((item=>{
  div.innerHTML+= ` <div class="card">
        <div class="divider">
          <h2>name</h2>
          <h3>${item.postdate}</h3>


        </div>
        <h2>${item.title}</h2>
        <div class="card-div">
          <p> ${item.description} </p>
          <img src="${item.blogsimagege}" alt="" width="300px">

        </div>

      

      </div>`

}))




}
blogsdata()