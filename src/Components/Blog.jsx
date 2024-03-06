import React, { useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Timestamp, addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from '../firebase-config';
import { ModeEdit } from '@mui/icons-material';

export default function Blog(props) {
  const cadena = ['Ciberataques', 'Malware', 'Phishing', 'Otros'];
  //const [comentario, setComentario] = useState();
  const [resumen, setResumen] = useState(props.edit ? props?.blog?.data?.resumen : '');
  const [titulo, setTitulo] = useState(props.edit ? props?.blog?.data?.titulo : '');
  const [tipo, setTipo] = useState(props.edit ? props?.blog?.data?.tipo : '');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null)
  const uid = auth.currentUser.uid

  const getUserData = async () => {
    const docRef = doc(db, "User", uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      console.log('document data ===', docSnap.data())
      setUser(docSnap.data())
    } else {
      console.log('no such user document')
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  const handleSubmit = async (e) => {
    // e.preventDefualt();
    try {
      if (props.edit) {
        await setDoc(doc(db, 'Blog', props.blog.id), {
          titulo: titulo,
          resumen: resumen,
          tipo: tipo,
          uid,
          author: user?.empresa,
          created: props.blog.data.created,
          updated: Timestamp.now()
        })
      } else {
        await addDoc(collection(db, 'Blog'), {
          titulo: titulo,
          resumen: resumen,
          tipo: tipo,
          uid,
          author: user?.empresa,
          created: Timestamp.now()
        })
      }
      props.handleClose();
    } catch (error) {
      console.log('blog add/update error ===', error)
      setError(error.message);
    }
  };

  return (
    <>
      <Box component="main" sx={{ flexGrow: 1, p: 7 }} >
        <Typography component="h1" variant="h4" sx={{ m: 3 }}>
          {props.edit ? 'Edit Discusión' : 'Crear Discusión'}
        </Typography>
        {/*<img src={BajoConstruct} alt="" /> */}
        <Box sx={{ m: 3 }} component="form">
          <TextField id="standard-basic"
            label="Titulo"
            value={titulo}
            variant="outlined"
            sx={{ width: '100ch' }}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </Box>
        <Box sx={{ m: 3 }}>
          <Autocomplete
            disablePortal
            value={tipo}
            id="combo-box-demo"
            options={cadena}
            sx={{ width: 300 }}
            onChange={(e, v) => setTipo(v)}
            renderInput={(params) => <TextField {...params}
              label="Tipo de Tema"
            />}
          />
        </Box>
        <Box sx={{ m: 3 }}>
          <TextField
            label="Resumen"
            variant="outlined"
            rows={20}
            multiline
            value={resumen}
            sx={{ width: '100ch' }}
            onChange={(e) => setResumen(e.target.value)}
          />
        </Box>
        <Box sx={{ m: 3 }} >
          <Button variant="contained" color="success" onClick={(e) => handleSubmit(e)} endIcon={props.edit ? <ModeEdit /> : <AddCircleIcon />}> {props.edit ? 'Actualizar' : 'Crear'}</Button>
        </Box>
      </Box>
    </>
  )
}