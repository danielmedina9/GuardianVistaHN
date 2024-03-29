import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import { Grid } from "@mui/material";
import { doc, getDoc, where } from "firebase/firestore";
import { db } from "../firebase-config";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useAuth } from "../Context/AuthContext";
import { useEffect } from "react";
import "../App.css";

export default function Perfil() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surName, setSurName] = useState("");
  const [empresa, setEmpresa] = useState("");
  const currentUser = useAuth();
  const [photoURL, setPhotoURL] = useState(
    "https://cdn-icons-png.flaticon.com/512/6522/6522516.png"
  );
  // const [photo, setPhoto] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getDoc(doc(db, "User", localStorage.getItem("userid"))).then((docSnap) => {
      if (docSnap.exists()) {
        setName(docSnap.data().name);
        setSurName(docSnap.data().surname);
        setEmpresa(docSnap.data().empresa);
        setEmail(docSnap.data().emai);
      } else {
        console.log("No such document!");
      }
    });
    if (currentUser?.user?.photoURL) {
      setPhotoURL(currentUser.user.photoURL);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser?.user?.uid) {
      const q = query(
        collection(db, "Blog"),
        orderBy("created", "desc"),
        where("uid", "==", currentUser.user.uid)
      );
      onSnapshot(q, (querySnapshot) => {
        setBlogs(
          querySnapshot.docs.map((doc) => {
            return {
              id: doc.id,
              data: doc.data(),
            };
          })
        );
      });
    }
  }, [currentUser]);

  return (
    <Box
      sx={{ display: "Flex" }}
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1548092372-0d1bd40894a3?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 12 }}>
        <Grid container sx={{ my: 20 }}>
          <Grid item sx={{ mx: 8, my: 4 }}>
            <Avatar
              alt="Avatar"
              src={photoURL}
              sx={{ width: 320, height: 320 }}
            />
          </Grid>
          <Grid item sx={{ mx: 4 }}>
            <Box sx={{ border: 4, borderRadius: "8px" }}>
              <Card style={{ backgroundColor: "#232b2b" }}>
                <Typography
                  color="white"
                  component="h1"
                  variant="h4"
                  sx={{ my: 4, mx: 3 }}
                >
                  Nombre: <b>{name}</b>
                </Typography>
                <Typography
                  color="white"
                  component="h1"
                  variant="h4"
                  sx={{ my: 4, mx: 3 }}
                >
                  Apellido: <b>{surName}</b>
                </Typography>
                <Typography
                  color="white"
                  component="h1"
                  variant="h4"
                  sx={{ my: 4, mx: 3 }}
                >
                  Correo electrónico: <b>{email}</b>
                </Typography>
                <Typography
                  color="white"
                  component="h1"
                  variant="h4"
                  sx={{ my: 4, mx: 3 }}
                >
                  Empresa: <b>{empresa}</b>
                </Typography>
                <Typography
                  color="white"
                  component="h1"
                  variant="h4"
                  sx={{ my: 4, mx: 3 }}
                >
                  Blogs : <b>{blogs.length}</b>
                </Typography>
                {/* <Typography component="h2" variant="h5">
                    <b> Comentarios:</b> 2
                  </Typography>*/}
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
