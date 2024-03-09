import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";
import GppBadIcon from "@mui/icons-material/GppBad";
import PhishingIcon from "@mui/icons-material/Phishing";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SettingsIcon from "@mui/icons-material/Settings";
import Flaghn from "../img/Honduras_flag.png";
import KapaLogo from "../img/kapa7_logo.png";
import LogoutIcon from "@mui/icons-material/Logout";
import "../App.css";
import SecurityIcon from "@mui/icons-material/Security";
import { useAuth } from "../Context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { useState, useEffect } from "react";

const drawerWidth = 240;

export default function Sidebar() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { logout } = useAuth();
  const [name, setName] = useState("");
  const [surname, setsurname] = useState("");
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getDoc(doc(db, "User", localStorage.getItem("userid"))).then((docSnap) => {
      if (docSnap.exists()) {
        setName(docSnap.data().name);
        setsurname(docSnap.data().surname);
      } else {
        console.log("No such document!");
      }
    });
  });

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        style={{ backgroundColor: "#232b2b" }}
        enableColorOnDark
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Guardian Vista HN
            {<SecurityIcon sx={{ my: -0.5, mx: 0.2 }} />}
          </Typography>
          <Box sx={{ mx: 2 }}>
            {/*  <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>*/}
          </Box>
          <Typography variant="h6">
            Bienvenido{" "}
            <b>
              {name}&nbsp;{surname}
            </b>{" "}
          </Typography>
          <Box sx={{ mx: 2 }}>
            <img src={Flaghn} alt="" />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
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
            {/* Estadisticas de Malware */}
            <ListItem
              disablePadding
              onClick={() => {
                navigate("/Malware");
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <GppBadIcon />
                </ListItemIcon>
                <ListItemText primary="Malware" />
              </ListItemButton>
            </ListItem>
            {/* Estadisticas de Phishing */}
            <ListItem
              disablePadding
              onClick={() => {
                navigate("/Phishing");
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <PhishingIcon />
                </ListItemIcon>
                <ListItemText primary="Phishing" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
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
            {/*Chat con Profesionales de Ciberseguridad Ciber*/}
            <ListItem
              disablePadding
              onClick={() => {
                navigate("/Subscrption");
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <CardMembershipIcon />
                </ListItemIcon>
                <ListItemText primary="Suscripción" />
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
          <Divider />
          <Box m={4} pt={38}>
            <a href="https://www.kapa7.com/" target="_blank">
              <img src={KapaLogo} alt="" />
            </a>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
