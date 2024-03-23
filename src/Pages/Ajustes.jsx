import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { auth, db } from "../firebase-config";
import { updateDoc, doc, getDoc, Timestamp } from "firebase/firestore";
import { useAuth, uploadImg } from "../Context/AuthContext";
import Avatar from "@mui/material/Avatar";

export default function Ajustes() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [empresa, setEmpresa] = useState("");
  // const [password, setPassword] = useState('');
  const uid = auth.currentUser.uid;
  const [error, setError] = useState("");
  const [photoURL, setPhotoURL] = useState(
    "https://cdn-icons-png.flaticon.com/512/6522/6522516.png"
  );
  const [photo, setPhoto] = useState(null);
  const [subscribe, setSubscribe] = useState(false);
  const currentUser = useAuth();
  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    await getDoc(doc(db, "User", localStorage.getItem("userid"))).then(
      (docSnap) => {
        if (docSnap.exists()) {
          setName(docSnap.data().name);
          setSurname(docSnap.data().surname);
          setEmpresa(docSnap.data().empresa);
          setEmail(docSnap.data().emai);
          setSubscribe(docSnap.data().subscribe);
        } else {
          console.log("No such document!");
        }
      }
    );
    if (currentUser?.user?.photoURL) {
      setPhotoURL(currentUser.user.photoURL);
    }
  };

  const UpdateUser = async () => {
    const userDoc = doc(db, "User", uid);
    const newfields = {
      name: name,
      surname: surname,
      emai: email,
      empresa: empresa,
    };
    await updateDoc(userDoc, newfields);
    // await getUser();
  };

  const handleSubmit = async (e) => {
    // e.preventDefualt();
    try {
      await UpdateUser();
    } catch (error) {
      console.log("add blog error ===", error);
      setError(error.message);
    }
    location.reload();
  };

  const handleSubscribe = async (subscribe) => {
    const userDoc = doc(db, "User", uid);
    const newfields = {
      subscribe: !subscribe,
      subscribeDateTime: Timestamp.now(),
    };
    await updateDoc(userDoc, newfields);
    await getUser();
  };

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
    getUser();
  }, [currentUser]);

  return (
    <Box sx={{ display: "Flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 12, my: 2 }}>
        <Typography component="h1" variant="h4">
          AJUSTES
        </Typography>
        <Box sx={{ my: 4 }}>
          <Typography component="h1" variant="h6">
            Editar tu informacion
          </Typography>
          <Grid container component="main" sx={{ my: 5 }}>
            <Grid item sx={{ mx: 8 }}>
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
              <Grid component="section" sx={{ my: 2 }}>
                <TextField
                  required
                  sx={{ width: "45ch" }}
                  id="outlined-required"
                  label="Nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid container component="section" sx={{ my: 2 }}>
                <TextField
                  required
                  sx={{ width: "45ch" }}
                  id="outlined-required"
                  label="Apellido"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
              </Grid>
              <Grid container component="section" sx={{ my: 2 }}>
                <TextField
                  name="email"
                  sx={{ width: "45ch" }}
                  autoFocus
                  label="Correo electrónico"
                  color="success"
                  value={email}
                  disabled
                  //onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid container component="section" sx={{ my: 2 }}>
                <TextField
                  name="Empresa"
                  required
                  sx={{ width: "45ch" }}
                  id="empresa"
                  autoFocus
                  label="Empresa"
                  value={empresa}
                  onChange={(e) => setEmpresa(e.target.value)}
                />
              </Grid>
              <Grid container component="section" sx={{ my: 2 }}>
                <Button
                  variant="contained"
                  fullWidth
                  color={subscribe ? "success" : "error"}
                  onClick={(e) => handleSubscribe(subscribe)}
                >
                  {subscribe ? "Subscribed" : "Subscribe"}
                </Button>
              </Grid>
              <Grid container component="section" sx={{ my: 2 }}>
                <Button
                  variant="contained"
                  endIcon={<EditIcon />}
                  fullWidth
                  onClick={(e) => handleSubmit(e)}
                >
                  Actualizar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
