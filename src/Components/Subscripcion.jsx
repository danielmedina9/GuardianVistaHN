import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import Link from "@mui/material/Link";
import { doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import SiemPlatform from "../Pages/SIEM_platform";

const tiers = [
  {
    title: "Gratis",
    price: "0",
    description: [
      "Monitoreo de infraestructuras",
      "Blog interactivo",
      "Acceso al centro de ayuda",
    ],
    buttonText: "Continuar Gratuito",
    buttonVariant: "outlined",
  },
  {
    title: "SISTEMA SIEM",
    subheader: "Recommended",
    price: "5",
    description: [
      "Monitoreo de infraestructuras",
      "Detección de intrusos basado en hosts",
      "Regulaciones de seguridad de datos",
      "Acceso al centro de ayuda",
      "Monitoreo de infraestructuras por empresa",
      "Blog interactivo",
    ],
    buttonText: "Subscribirse",
    buttonVariant: "contained",
  },
];

export default function Subscripcion() {
  const navigate = useNavigate();
  const [subscribe, setSubscribe] = useState(false);

  const handleSubscribe = async (title) => {
    console.log("Subscribing to", title);

    if (title === "Gratis") {
      navigate("/");
    } else if (title === "SISTEMA SIEM") {
      // update user subscription
      await updateDoc(doc(db, "User", localStorage.getItem("userid")), {
        subscribe: true,
        subscribeDateTime: Timestamp.now(),
      })
        .then(() => {
          setSubscribe(true);
          navigate("/SIEM");
        })
        .catch((error) => console.log("update user subscription error", error));
    }
  };

  useEffect(() => {
    getDoc(doc(db, "User", localStorage.getItem("userid"))).then((docSnap) => {
      if (docSnap.exists()) {
        setSubscribe(docSnap.data().subscribe);
      } else {
        console.log("no such user document!");
      }
    });
  }, []);

  return !subscribe ? (
    <Box component="main">
      <Box>
        <Container
          id="pricing"
          sx={{
            pt: { xs: 4, sm: 12 },
            pb: { xs: 8, sm: 16 },
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: { xs: 3, sm: 6 },
          }}
        >
          <Box
            sx={{
              width: { sm: "100%", md: "100%" },
              textAlign: { md: "center" },
            }}
          ></Box>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            {tiers.map((tier) => (
              <Grid item key={tier.title} xs={8} md={4}>
                <Card
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        mb: 1,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        color:
                          tier.title === "Professional"
                            ? "primary.contrastText"
                            : "",
                      }}
                    >
                      <Typography component="h3" variant="h6">
                        {tier.title}
                      </Typography>
                      {tier.title === "Gratis" && (
                        <Chip
                          icon={<AutoAwesomeIcon />}
                          label={tier.subheader}
                          size="small"
                          sx={{
                            background: (theme) =>
                              theme.palette.mode === "light" ? "" : "none",
                            backgroundColor: "primary.contrastText",
                            "& .MuiChip-label": {
                              color: "primary.dark",
                            },
                            "& .MuiChip-icon": {
                              color: "primary.dark",
                            },
                          }}
                        />
                      )}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "baseline",
                        color:
                          tier.title === "Professional"
                            ? "primary.contrastText"
                            : undefined,
                      }}
                    >
                      <Typography component="h3" variant="h2">
                        ${tier.price}
                      </Typography>
                      <Typography component="h3" variant="h6">
                        &nbsp; por mes
                      </Typography>
                    </Box>
                    <Divider
                      sx={{
                        my: 2,
                        opacity: 0.2,
                        borderColor: "grey.500",
                      }}
                    />
                    {tier.description.map((line) => (
                      <Box
                        key={line}
                        sx={{
                          py: 1,
                          display: "flex",
                          gap: 1.5,
                          alignItems: "center",
                        }}
                      >
                        <CheckCircleRoundedIcon
                          sx={{
                            width: 20,
                            color:
                              tier.title === "Professional"
                                ? "primary.light"
                                : "primary.main",
                          }}
                        />
                        <Typography component="text" variant="subtitle2">
                          {line}
                        </Typography>
                      </Box>
                    ))}
                  </CardContent>
                  <CardActions>
                    <Button
                      fullWidth
                      variant={tier.buttonVariant}
                      component="a"
                      target="_blank"
                      onClick={() => handleSubscribe(tier.title)}
                    >
                      {subscribe && tier.title === "SISTEMA SIEM"
                        ? "Subscribed"
                        : tier.buttonText}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  ) : (
    <SiemPlatform />
  );
}
