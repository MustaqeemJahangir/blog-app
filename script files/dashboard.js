import {  collection, addDoc, Timestamp, getDocs, where,query, orderBy, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { auth ,db} from "./config.js";



let profileImage=null

const title=document.querySelector("#title")
const button=document.querySelector("#sub")
const description=document.querySelector("#description")

const div= document.querySelector(".card")


onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(uid);
        getdata()




    } else {
        window.location = "login.html"
    }
});



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







button.addEventListener("click",async(event)=>{
    event.preventDefault();
    console.log(title.value)
    try {
        const docRef = await addDoc(collection(db, "blogs"), {
            title: title.value,
            blogsimagege: profileImage,
            description:description.value,
            uid: auth.currentUser.uid,
            postdate: Timestamp.fromDate(new Date()),
        });
        
        description.value = " ";
        title.value = " ";
        // blogsimagege= " ",
        getdata()

 
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }





})




// let arrays = [];

let allTodo=[]

async function getdata() {
    allTodo.length=0
    div.innerHTML= " "
    const q = query(collection(db, "blogs"), where("uid", "==",auth.currentUser.uid));
  
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      allTodo.push({...doc.data() ,docid: doc.id});
    //   console.log(allTodo)
    });


    console.log(allTodo)



    allTodo.map((item)=>{
        
        div.innerHTML+=`  <div class="hello">
                <div>
                <h1>${item.title}</h1>
                <div class="card-sub">
                    <p>${item.description}</p>
                    <img src="${item.blogsimagege}" alt="">
                </div>
                </div>

            </div>
            

        </div>`
    })

   
}
// getdata()