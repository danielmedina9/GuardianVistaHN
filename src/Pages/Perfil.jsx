import React, { useCallback, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import { Grid } from "@mui/material";
import { doc, getDoc, where } from "firebase/firestore";
import { db } from "../firebase-config";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useAuth, uploadImg } from "../Context/AuthContext";
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
  const [photo, setPhoto] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

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

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  }

  function handleClick() {
    uploadImg(photo, currentUser, setLoading).then((url) => {
      setPhotoURL(url);
    });
  }

  useEffect(() => {
    if (currentUser?.user?.uid) {
      const q = query(collection(db, "Blog"), orderBy("created", "desc"), where("uid", "==", currentUser.user.uid));
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
    <Box sx={{ display: "Flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 12 }}>
        <Grid container sx={{ my: 20 }}  >
          <Grid item sx={{ mx: 8 }} >
            <Avatar
              alt="Avatar"
              src={photoURL}
              sx={{ width: 320, height: 320 }}
            />
            <Grid sx={{ mt: 7 }}>
              <input color="secondary" type="file" onChange={handleChange} />
              <button disabled={loading || !photo} onClick={handleClick}>
                Upload
              </button>
            </Grid>
          </Grid>
          <Grid item sx={{ mx: 4 }}>
            <Card>
              <Typography component="h1" variant="h4" sx={{ my: 4, mx: 3 }}>
                Nombre: <b>{name}</b>
              </Typography>
              <Typography component="h1" variant="h4" sx={{ my: 4, mx: 3 }}>
                Apellido: <b>{surName}</b>
              </Typography>
              <Typography component="h1" variant="h4" sx={{ my: 4, mx: 3 }}>
                Correo electrónico: <b>{email}</b>
              </Typography>
              <Typography component="h1" variant="h4" sx={{ my: 4, mx: 3 }}>
                Empresa: <b>{empresa}</b>
              </Typography>
              <Typography component="h1" variant="h4" sx={{ my: 4, mx: 3 }}>
                Blogs : <b>{blogs.length}</b>
              </Typography>
              {/* <Typography component="h2" variant="h5">
                    <b> Comentarios:</b> 2
                  </Typography>*/}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}