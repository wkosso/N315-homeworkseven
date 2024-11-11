import * as $ from "jquery";
import { createUserWithEmailAndPassword,getAuth, signInWithEmailAndPassword,signOut,onAuthStateChanged } from "firebase/auth";
import {app } from "./firebaseConfig";


const auth= getAuth(app);




onAuthStateChanged(auth, (user)=>{
    if(user){
        console.log("user is signed in");
        $("#authState").css("display", "block");
     $("#login").text("Sign Out").on("click", () => {
            signUserOut();
        });
    }else{
        console.log("User is signed out for real");
        $("#authState").css("display", "none");
    }
});

export function changePage(pageName) {
    console.log("pageName", pageName);

    $.get(`pages/${pageName}.html`, (data) => {
        $("#app").html(data);
    }).fail((error) => {
        console.log("error", error);
    });

   
    if (pageName === "login") {
        $("nav").css("display", "none"); 
    } else {
        $("nav").css("display", "block");
    }
}





export function signUserUp(fn,ln,email,password){
    createUserWithEmailAndPassword(auth,email,password)
    .then(()=>{
        console.log("user created");
        $("#authState").css("display", "none");
    })
    .catch((error)=>{
        console.log(error)
    });
}

    

export function signUserIn(email,password){
    signInWithEmailAndPassword(auth,email,password)
    .then(()=>{
        console.log("user signed in");
      //  $("#yourRecipe").css("display", "block")

      $("#authState").css("display", "block");
    })
    .catch((error)=>{
        console.log(error)
    });
  }


  export function signUserOut() {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
       // $("#yourRecipe").css("display", "none");
  changePage("login");
      })
      .catch((error) => {
        console.log("Error" + error);
      });
  }