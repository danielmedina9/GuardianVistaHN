import React from 'react';
import CardContent from '@mui/material/CardContent';
import LongText from "../Components/LongText";
import { prettyDate } from '@based/pretty-date'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { CardActions, Typography, Collapse, IconButton, TextField, InputAdornment, Card, Modal, Box, Dialog } from '@mui/material';
import { AddCommentOutlined, BorderColor, DeleteForever } from '@mui/icons-material';
import { Timestamp, addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import Blog from './Blog';
import BlogDelDialog from './BlogDelDialog';


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

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function BlogCard(props) {

    const [expanded, setExpanded] = React.useState(false);
    const [comments, setComments] = React.useState([])
    const [comment, setComment] = React.useState('')
    const [user, setUser] = React.useState(null)
    const [open, setOpen] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);

    const uid = auth.currentUser.uid
    const { blog } = props

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

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

    const getComments = () => {
        const q = query(collection(db, 'Comments'), where('blog_id', '==', blog.id), orderBy('created', 'desc'))
        onSnapshot(q, (querySnapshot) => {
            console.log('Comments onSnapshot ===', querySnapshot.docs)
            setComments(querySnapshot.docs.map(doc => {
                console.log(doc.data())
                return {
                    id: doc.id,
                    data: doc.data()
                }
            }))
        })
    }

    React.useEffect(() => {
        getUserData()
        getComments()
    }, [])

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleInputChange = (e) => {
        console.log('handleInputChange ===', e.target.value)
        setComment(e.target.value)
    }

    const handleClickAddComment = async () => {
        console.log('handleClickAddComment ===', comment)
        if (!comment) return
        try {
            await addDoc(collection(db, 'Comments'), {
                blog_id: blog.id,
                uid,
                name: user?.name,
                surname: user?.surname,
                author: user?.name + ' ' + user?.surname,
                comment,
                created: Timestamp
                    .now()
            })
            handleExpandClick()
            setComment('')
            getComments()
        } catch (error) {
            console.log('add blog comment error ===', error)
            // setError(error.message);
        }
    }

    return (
        <>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <Box sx={style}>
                        <Blog handleClose={handleClose} blog={blog} edit={true} />
                    </Box>
                </Modal>
            </div>

            <React.Fragment>
                <Dialog
                    open={openDialog}
                    onClose={handleClose}
                >
                    <BlogDelDialog handleCloseDialog={handleCloseDialog} bid={blog.id} />
                </Dialog>
            </React.Fragment>

            <React.Fragment>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Author: {blog.data.author}
                    </Typography>
                    <Typography variant="body" >
                        {prettyDate(blog.data.created.toDate().getTime(), 'date-time-human')}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {blog.data.titulo}
                        {blog.data.uid == uid && (
                            <>
                                &nbsp;<BorderColor color="success" onClick={handleOpen} />
                                &nbsp;<DeleteForever color="error" onClick={handleOpenDialog} />
                            </>
                        )}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {blog.data.tipo}
                    </Typography>
                    <Typography variant="body2">
                        <LongText text={blog.data.resumen} maxLength={30} />
                    </Typography>
                    <TextField
                        fullWidth
                        label={'Comentario'}
                        id="margin-dense"
                        margin="dense"
                        value={comment}
                        onChange={(e) => handleInputChange(e)}
                        InputProps={{
                            endAdornment: <InputAdornment position="end" onClick={handleClickAddComment} >
                                <AddCommentOutlined />
                            </InputAdornment>,
                        }}
                    />
                </CardContent>
                <CardActions disableSpacing>
                    <Typography variant="body2" sx={{mx:1}}>
                        Mostrar commentarios
                    </Typography>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        {comments.length > 0 && comments.map((d) => (
                            <div key={d.id}>
                                <Card variant="outlined" style={{ padding: '7px', marginBottom: '5px', marginTop: '5px' }}>
                                    <Typography variant="body" color="text.secondary">
                                        {prettyDate(d.data.created.toDate().getTime(), 'date-time-human')}
                                    </Typography>
                                    <Typography paragraph sx={{fontWeight: 'bold'}}>{d.data.author}</Typography>
                                    <Typography paragraph>{d.data.comment}</Typography>
                                </Card>
                            </div>
                        ))}
                    </CardContent>
                </Collapse>
            </React.Fragment>
        </>
    )
}