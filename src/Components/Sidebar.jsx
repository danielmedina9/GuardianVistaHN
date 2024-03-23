import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SettingsIcon from "@mui/icons-material/Settings";
import Flaghn from "../img/Honduras_flag.png";
// import KapaLogo from "../img/kapa7_logo.png";
import LogoutIcon from "@mui/icons-material/Logout";
import "../App.css";
import SecurityIcon from "@mui/icons-material/Security";
import { useAuth } from "../Context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { useState, useEffect } from "react";
import { Avatar } from "@mui/material";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [name, setName] = useState("");
  const [surName, setSurName] = useState("");
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [photoURL, setPhotoURL] = useState(
    "https://cdn-icons-png.flaticon.com/512/6522/6522516.png"
  );
  const currentUser = useAuth();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error.message);
    }
  };

  const getAvatarImg = async () => {
    if (currentUser?.user?.photoURL) {
      setPhotoURL(currentUser.user.photoURL);
    }
  };

  useEffect(() => {
    getDoc(doc(db, "User", localStorage.getItem("userid"))).then((docSnap) => {
      if (docSnap.exists()) {
        setName(docSnap.data().name);
        setSurName(docSnap.data().surname);
      } else {
        console.log("No such document!");
      }
    });
    getAvatarImg();
  });

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        open={open}
        enableColorOnDark
        style={{ backgroundColor: "#232b2b" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 4,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Guardian Vista HN
            {<SecurityIcon sx={{ my: -0.5, mx: 0.2 }} />}
          </Typography>
          <Avatar sx={{ mx: 2 }} alt="Avatar" src={photoURL} />
          <Typography variant="h6">
            Bienvenido{" "}
            <b>
              {name}&nbsp;{surName}
            </b>{" "}
          </Typography>
          <Box sx={{ mx: 2 }}>
            <img src={Flaghn} alt="" />
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box>
          <List component="h4">
            {/* Monitoreo de Registros */}
            <ListItem
              disablePadding
              onClick={() => {
                navigate("/");
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <TravelExploreIcon />
                </ListItemIcon>
                <ListItemText primary="Monitoreo" />
              </ListItemButton>
            </ListItem>
            {/* Estadisticas de Ciberataques */}
            <ListItem
              disablePadding
              onClick={() => {
                navigate("/Ciberataques");
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <CoronavirusIcon />
                </ListItemIcon>
                <ListItemText primary="Ciberataques" />
              </ListItemButton>
            </ListItem>
            <Divider />
            {/*Portal Social*/}
            <ListItem
              disablePadding
              onClick={() => {
                navigate("/Portal");
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <PeopleAltIcon />
                </ListItemIcon>
                <ListItemText primary="Portal" />
              </ListItemButton>
            </ListItem>
            {/*SIEM Ciberseguridad */}
            <ListItem
              disablePadding
              onClick={() => {
                navigate("/SIEM");
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <CardMembershipIcon />
                </ListItemIcon>
                <ListItemText primary="SIEM" />
              </ListItemButton>
            </ListItem>
            {/*Perfil*/}
            <ListItem
              disablePadding
              onClick={() => {
                navigate("/Perfil");
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary="Perfil" />
              </ListItemButton>
            </ListItem>
            <Divider />
            {/*Configuración*/}
            <ListItem
              disablePadding
              onClick={() => {
                navigate("/Ajustes");
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Ajustes" />
              </ListItemButton>
            </ListItem>
            {/*Log out*/}
            <ListItem disablePadding onClick={handleLogout}>
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="LogOut" />
              </ListItemButton>
            </ListItem>
          </List>
          {/*} <Box m={5} pt={40.5}>
            <a href="https://www.kapa7.com/" target="_blank">
              <img src={KapaLogo} alt="" />
            </a>
            </Box>*/}
        </Box>
      </Drawer>
    </Box>
  );
}
