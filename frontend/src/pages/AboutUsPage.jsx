import React from "react";
import {
  Stack,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  LocalHospital,
  MedicalServices,
  Security,
  Support,
  Verified,
  Speed,
} from "@mui/icons-material";
import { Footer } from "../features/footer/Footer";
import UserNavbar from "../features/navigation/components/UserNavbar";

export const AboutUsPage = () => {
  const theme = useTheme();
  const is700 = useMediaQuery(theme.breakpoints.down(700));
  const is600 = useMediaQuery(theme.breakpoints.down(600));

  const features = [
    {
      icon: (
        <LocalHospital
          sx={{ fontSize: 40, color: theme.palette.primary.main }}
        />
      ),
      title: "Wide Product Range",
      description:
        "Explore a complete collection of dental tools, hygiene products, and accessories for every need.",
    },
    {
      icon: (
        <MedicalServices
          sx={{ fontSize: 40, color: theme.palette.primary.main }}
        />
      ),
      title: "Expert Product Guidance",
      description:
        "Get help choosing the right dental products with expert tips tailored to your specific requirements.",
    },
    {
      icon: (
        <Security sx={{ fontSize: 40, color: theme.palette.primary.main }} />
      ),
      title: "Secure Shopping",
      description:
        "Shop confidently with our safe and encrypted checkout process designed for your protection.",
    },
    {
      icon: (
        <Support sx={{ fontSize: 40, color: theme.palette.primary.main }} />
      ),
      title: "Dedicated Support",
      description:
        "Our support team is always available to assist with your orders, returns, or product questions.",
    },
    {
      icon: (
        <Verified sx={{ fontSize: 40, color: theme.palette.primary.main }} />
      ),
      title: "Genuine & Certified",
      description:
        "We only sell original dental products that are certified and approved by trusted authorities.",
    },
    {
      icon: <Speed sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: "Nationwide Delivery",
      description:
        "Fast and reliable delivery across Pakistan, ensuring your products arrive quickly and safely.",
    },
  ];

  return (
    <>
      <UserNavbar/>
      <Stack spacing={4} sx={{ padding: is600 ? "1rem" : "2rem" }}>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Stack spacing={3} sx={{ textAlign: "center", marginBottom: 4 }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: "bold",
                color: theme.palette.primary.main,
                fontSize: is700 ? "2.5rem" : "3.5rem",
              }}
            >
              About Multi Dental Supply
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "text.secondary",
                maxWidth: "800px",
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              Leading provider of premium dental instruments and equipment in
              Pakistan
            </Typography>
          </Stack>
        </motion.div>

        {/* Company Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card sx={{ padding: is600 ? 2 : 4, marginBottom: 4 }}>
            <CardContent>
              <Typography
                variant="h4"
                component="h2"
                sx={{ fontWeight: "bold", marginBottom: 3 }}
              >
                Our Story
              </Typography>
              <Typography
                variant="body1"
                sx={{ lineHeight: 1.8, marginBottom: 2 }}
              >
                Founded in 2010, Multi Dental Supply has been at the forefront
                of providing high-quality dental instruments and equipment to
                dental professionals across Pakistan. Our journey began with a
                simple mission: to make premium dental tools accessible to every
                dental practice in the country.
              </Typography>
              <Typography
                variant="body1"
                sx={{ lineHeight: 1.8, marginBottom: 2 }}
              >
                Over the years, we have established strong partnerships with
                leading manufacturers worldwide, ensuring that our customers
                receive only the finest quality products. Our commitment to
                excellence and customer satisfaction has made us the trusted
                name in dental supplies.
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                Today, we serve hundreds of dental clinics, hospitals, and
                educational institutions, providing them with cutting-edge
                dental technology and reliable customer support.
              </Typography>
            </CardContent>
          </Card>
        </motion.div>

        {/* Mission & Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Grid container spacing={3} sx={{ marginBottom: 4 }}>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: "100%", padding: is600 ? 2 : 3 }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      fontWeight: "bold",
                      marginBottom: 2,
                      color: theme.palette.primary.main,
                    }}
                  >
                    Our Mission
                  </Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                    To provide dental professionals with the highest quality
                    instruments and equipment, enabling them to deliver
                    exceptional patient care while maintaining the highest
                    standards of dental practice.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: "100%", padding: is600 ? 2 : 3 }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      fontWeight: "bold",
                      marginBottom: 2,
                      color: theme.palette.primary.main,
                    }}
                  >
                    Our Vision
                  </Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                    To become the leading dental supply company in Pakistan,
                    recognized for our commitment to quality, innovation, and
                    customer satisfaction, while contributing to the advancement
                    of dental healthcare.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{ fontWeight: "bold", textAlign: "center", marginBottom: 4 }}
          >
            Why Choose Us
          </Typography>
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                >
                  <Card sx={{ height: "100%", padding: is600 ? 2 : 3 }}>
                    <CardContent sx={{ textAlign: "center" }}>
                      <Box sx={{ marginBottom: 2 }}>{feature.icon}</Box>
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{ fontWeight: "bold", marginBottom: 1 }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", lineHeight: 1.6 }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        ></motion.div>
      </Stack>
      <Footer />
    </>
  );
};
