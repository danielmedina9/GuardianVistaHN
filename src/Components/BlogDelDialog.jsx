import * as React from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";

export default function BlogDelDialog(props) {
  const handleDelete = async () => {
    // delete data from db
    await deleteDoc(doc(db, "Blog", props.bid));
    props.handleCloseDialog();
  };

  return (
    <>
      <DialogTitle id="alert-dialog-title">{"Eliminar Blog"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Seguro que quieres eliminar tu blog ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleCloseDialog}>Cancel</Button>
        <Button color="error" onClick={handleDelete} autoFocus>
          Borrar
        </Button>
      </DialogActions>
    </>
  );
}
