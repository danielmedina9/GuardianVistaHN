import * as React from "react";
import Sidebar from '../Components/Sidebar';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Container } from '@mui/material';
import Grid from "@mui/material/Grid";
import Card from '@mui/material/Card';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Modal from '@mui/material/Modal';
import Blog from "../Components/Blog";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase-config";
import BlogCard from "../Components/BlogCard";

const style = {
  position: 'absolute',
  top: '42%',
  left: '50%',
  transform: 'translate(-50%, -42%)',
  width: 1060,
  height: 900,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: '16px'

};

export default function Portal() {

  const [open, setOpen] = React.useState(false);
  const [blogs, setBlogs] = React.useState([])

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    const q = query(collection(db, 'Blog'), orderBy('created', 'desc'))
    onSnapshot(q, (querySnapshot) => {
      setBlogs(querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          data: doc.data()
        }
      }))
    })
  }, [])

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
          <Typography component="h1" variant="h4">
            PORTAL BLOG CIBERSEGURIDAD
          </Typography>

          <Box sx={{ my: 4 }}>
            <Grid container>
              <Grid>
                <FormControl sx={{ width: '135ch' }} variant="outlined">
                  <OutlinedInput
                    endAdornment={<InputAdornment position="end">{<SearchIcon />}</InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      'aria-label': 'weight',
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid sx={{ m: 1.5 }}>
                <Button variant="contained" endIcon={<AddCircleIcon />} onClick={handleOpen}> Crear Blog</Button>
              </Grid>
            </Grid>
            <Grid sx={{ my: 2 }}>
              <Typography component="h1" variant="h5">
                Agrega tu discusión acerca de Ciberseguridad.
              </Typography>
            </Grid>
            <Container>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3} sx={{ mx: -19 }}>
                  {blogs.length > 0 && blogs.map((blog) => (
                    <Grid md={{ minHeight: 500, height: 500 }} item xs={4}>
                      <Card key={blog.id} variant="outlined">
                        <BlogCard blog={blog} />
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Container>
          </Box>
          {/*<img src={BajoConstruct} alt="" /> */}
        </Box>
      </Box>
    </>

  )
}