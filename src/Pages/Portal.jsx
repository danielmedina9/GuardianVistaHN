import * as React from "react";
import Sidebar from "../Components/Sidebar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Modal from "@mui/material/Modal";
import Blog from "../Components/Blog";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase-config";
import BlogCard from "../Components/BlogCard";

const style = {
  position: "absolute",
  top: "42%",
  left: "50%",
  transform: "translate(-50%, -42%)",
  width: 1060,
  height: 900,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "16px",
};

export default function Portal() {
  const [open, setOpen] = React.useState(false);
  const [blogs, setBlogs] = React.useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    const q = query(collection(db, "Blog"), orderBy("created", "desc"));
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
  }, []);

  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
        //aria-labelledby="modal-modal-title"
        //aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Blog handleClose={handleClose} edit={false} />
          </Box>
        </Modal>
      </div>

      <Box sx={{ display: "Flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 12 }}>
          <Grid container main >
            <Grid item>
              <Typography component="h1" variant="h4">
                PORTAL BLOG CIBERSEGURIDAD
              </Typography>
            </Grid>
            <Grid sx={{ mx: 4 }} item >
              <Button
                variant="contained"
                endIcon={<AddCircleIcon />}
                onClick={handleOpen}
              >
                {" "}
                Crear Blog
              </Button>
            </Grid>
          </Grid>
          <Box sx={{ my: 2 }}>
            <Grid container>
            </Grid>
            <Grid sx={{ my: 2 }}>
              <Typography component="h1" variant="h5">
                Agrega tu discusión acerca de Ciberseguridad.
              </Typography>
            </Grid>
            <Grid container spacing={1}>
              {blogs.length > 0 &&
                blogs.map((blog) => (
                  <Grid
                    key={blog.id}
                    md={{ minHeight: 600, height: 600 }}
                    item
                    xs={3}
                  >
                    <Card variant="outlined">
                      <BlogCard blog={blog} />
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Box>
          {/*<img src={BajoConstruct} alt="" /> */}
        </Box>
      </Box>
    </>
  );
}