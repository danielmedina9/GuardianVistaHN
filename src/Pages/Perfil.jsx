import React, { useState } from "react";
import Sidebar from '../Components/Sidebar';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
//import BajoConstruct from '../img/pagina-de-mantenimiento-html.jpg';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { useEffect } from "react";
import Card from "@mui/material/Card";
import { Grid } from "@mui/material";
import '../App.css';
import { useAuth } from "../Security Context/AuthContext";


export default function Perfil() {


  const [email, setEmail] = useState("");
  const [name, setName] = useState(""); // this name
  const [surname, setsurname] = useState("");// and surname
  const [empresa, setEmpresa] = useState("");
  const currentUser = useAuth();
  const [photoURL, setPhotoURL] = useState("")


  useEffect(() => {
    getDoc(doc(db, "User", localStorage.getItem("userid"))).then(docSnap => {
      if (docSnap.exists()) {
        setName(docSnap.data().name),
          setsurname(docSnap.data().surname),
          setEmpresa(docSnap.data().empresa),
          setEmail(docSnap.data().emai),
          console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document!");
      }
      setPhotoURL(currentUser.setPhotoURL);
    })
  },[]);
  

  

  function handleChange() {
    
  }

  function handleClick() {

  }

  return (
    <>
      <Box sx={{ display: "Flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 12 }}>
          <Typography component="h1" variant="h4"  >
            MI PERFIL
          </Typography>
          <Grid container main  sx={{my:7.5}}>
            <Grid container>
              <Grid>
                <img src='https://cdn-icons-png.flaticon.com/512/6522/6522516.png' alt="Avatar" className="avatar" />
              </Grid>
              <Grid item xs={6} sx={{mx:6, my:9}} >
                <Card>
                <Typography component="h1" variant="h4" sx={{my:4, mx:3}}>
                  Nombre: <b>{name}</b>
                </Typography>
                <Typography component="h1" variant="h4" sx={{my:4, mx:3}}>
                  Apellido: <b>{surname}</b>
                </Typography>
                <Typography component="h1" variant="h4" sx={{my:4, mx:3}}>
                  Correo electrónico: <b>{email}</b>
                </Typography>
                <Typography component="h1" variant="h4" sx={{my:4, mx:3}}>
                  Empresa: <b>{empresa}</b>
                </Typography>
                <Typography component="h1" variant="h4" sx={{my:4, mx:3}}>
                  Blogs : <b>1</b>
                </Typography>
                {/* <Typography component="h2" variant="h5">
                    <b> Comentarios:</b> 2
                  </Typography>*/}
                </Card>  
              </Grid>
            </Grid>
            <Grid sx={{ my: 1, mx:15 }}>
              <input color="secondary" type="file" onChange={handleChange} />
              <button onClick={handleClick}>Upload</button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>

  )
}
