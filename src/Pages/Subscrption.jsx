import React from "react";
import Sidebar from "../Components/Sidebar";
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
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const tiers = [
  {
    title: "Gratis",
    price: "0",
    description: [
      "10 users included",
      "2 GB of storage",
      "Help center access",
      "Email support",
    ],
    buttonText: "Sign up for free",
    buttonVariant: "outlined",
  },
  {
    title: "Profesional",
    subheader: "Recommended",
    price: "15",
    description: [
      "20 users included",
      "10 GB of storage",
      "Help center access",
      "Priority email support",
      "Dedicated team",
      "Best deals",
    ],
    buttonText: "Start now",
    buttonVariant: "contained",
  },
];

export default function subscrption() {
  return (
    <>
      <Box sx={{ display: "Flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 12 }}>
          <Typography component="h1" variant="h4">
            KAPA 7! EXPERTOS EN CIBERSEGURIDAD!
          </Typography>
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
                            &nbsp; per month
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
                          href="/material-ui/getting-started/templates/checkout/"
                          target="_blank"
                        >
                          {tier.buttonText}
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>
        </Box>
      </Box>
    </>
  );
}
