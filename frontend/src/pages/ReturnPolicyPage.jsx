import React from "react";
import {
  Stack,
  Typography,
  Card,
  CardContent,
  useMediaQuery,
  useTheme,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Cancel,
  Warning,
  LocalShipping,
  Support,
  Security,
} from "@mui/icons-material";

export const ReturnPolicyPage = () => {
  const theme = useTheme();
  const is700 = useMediaQuery(theme.breakpoints.down(700));
  const is600 = useMediaQuery(theme.breakpoints.down(600));

  const returnConditions = [
    {
      icon: <CheckCircle sx={{ color: "green" }} />,
      title: "Eligible for Return",
      items: [
        "Unused products in original packaging",
        "Products with manufacturing defects",
        "Wrong items received",
        "Damaged items during shipping",
      ],
    },
    {
      icon: <Cancel sx={{ color: "red" }} />,
      title: "Not Eligible for Return",
      items: [
        "Used or opened products",
        "Personal hygiene items",
        "Custom or special order items",
        "Items damaged by customer misuse",
        "Products past return deadline",
      ],
    },
  ];

  const returnSteps = [
    {
      step: "1",
      title: "Contact Us",
      description:
        "Contact our customer service within 24 hours of delivery for damaged or defective items, or within 7 days for other returns.",
    },
    {
      step: "2",
      title: "Get Approval",
      description:
        "We will review your return request and provide approval with a return authorization number.",
    },
    {
      step: "3",
      title: "Package Item",
      description:
        "Securely package the item in its original packaging with all accessories and documentation.",
    },
    {
      step: "4",
      title: "Ship Back",
      description:
        "Ship the item back to us using a trackable shipping method. Return shipping costs are your responsibility unless the item is defective.",
    },
    {
      step: "5",
      title: "Receive Refund",
      description:
        "Once we receive and inspect the item, we will process your refund within 5-7 business days.",
    },
  ];

  return (
    <Stack spacing={4} sx={{ padding: is600 ? "1rem" : "2rem" }}>
      {/* Header */}
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
            Return Policy
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
            Our commitment to customer satisfaction with clear return guidelines
          </Typography>
        </Stack>
      </motion.div>

      {/* Return Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card
          sx={{
            padding: is600 ? 2 : 4,
            backgroundColor: theme.palette.primary.main,
            color: "white",
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              component="h2"
              sx={{ fontWeight: "bold", marginBottom: 3, textAlign: "center" }}
            >
              Return Policy Overview
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Stack alignItems="center" spacing={2}>
                  <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    7 Days
                  </Typography>
                  <Typography variant="body1" sx={{ textAlign: "center" }}>
                    Return window for most products
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack alignItems="center" spacing={2}>
                  <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    24 Hours
                  </Typography>
                  <Typography variant="body1" sx={{ textAlign: "center" }}>
                    Report damaged/defective items
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack alignItems="center" spacing={2}>
                  <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    5-7 Days
                  </Typography>
                  <Typography variant="body1" sx={{ textAlign: "center" }}>
                    Refund processing time
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </motion.div>

      {/* Return Conditions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Grid container spacing={3}>
          {returnConditions.map((condition, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{ marginBottom: 2 }}
                  >
                    {condition.icon}
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{ fontWeight: "bold" }}
                    >
                      {condition.title}
                    </Typography>
                  </Stack>
                  <List>
                    {condition.items.map((item, itemIndex) => (
                      <ListItem key={itemIndex} sx={{ paddingLeft: 0 }}>
                        <ListItemIcon sx={{ minWidth: 30 }}>
                          <CheckCircle
                            sx={{
                              fontSize: 16,
                              color: index === 0 ? "green" : "red",
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </motion.div>

      {/* Return Process Steps */}
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
          Return Process
        </Typography>
        <Grid container spacing={3}>
          {returnSteps.map((step, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                <Card sx={{ height: "100%", padding: is600 ? 2 : 3 }}>
                  <CardContent sx={{ textAlign: "center" }}>
                    <Box
                      sx={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        backgroundColor: theme.palette.primary.main,
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 1rem",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                      }}
                    >
                      {step.step}
                    </Box>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{ fontWeight: "bold", marginBottom: 1 }}
                    >
                      {step.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", lineHeight: 1.6 }}
                    >
                      {step.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>

      {/* Important Notes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <Card
          sx={{
            padding: is600 ? 2 : 4,
            backgroundColor: theme.palette.warning.light,
          }}
        >
          <CardContent>
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{ marginBottom: 2 }}
            >
              <Warning
                sx={{ color: theme.palette.warning.dark, fontSize: 30 }}
              />
              <Typography
                variant="h5"
                component="h2"
                sx={{ fontWeight: "bold", color: theme.palette.warning.dark }}
              >
                Important Notes
              </Typography>
            </Stack>
            <Typography
              variant="body1"
              sx={{ lineHeight: 1.8, marginBottom: 2 }}
            >
              • All returns must be initiated within the specified timeframes
            </Typography>
            <Typography
              variant="body1"
              sx={{ lineHeight: 1.8, marginBottom: 2 }}
            >
              • Return shipping costs are the responsibility of the customer
              unless the item is defective
            </Typography>
            <Typography
              variant="body1"
              sx={{ lineHeight: 1.8, marginBottom: 2 }}
            >
              • Items must be returned in their original packaging with all
              accessories
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              • Refunds will be processed to the original payment method used
              for the purchase
            </Typography>
          </CardContent>
        </Card>
      </motion.div>

      {/* Contact Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.4 }}
      >
        <Card
          sx={{
            padding: is600 ? 2 : 4,
            backgroundColor: theme.palette.grey[100],
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              component="h2"
              sx={{ fontWeight: "bold", marginBottom: 3, textAlign: "center" }}
            >
              Need Help with Returns?
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack spacing={2}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Contact Customer Service
                  </Typography>
                  <Typography variant="body1">Phone: +92614506162</Typography>
                  <Typography variant="body1">
                    Email: returns@alumardental.com
                  </Typography>
                  <Typography variant="body1">
                    Hours: Monday-Saturday, 9:00 AM - 6:00 PM
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={2}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Return Address
                  </Typography>
                  <Typography variant="body1">
                    Multi Dental Supply
                    <br />
                    Near Nishtar Institute of Dentistry
                    <br />
                    District Jail Road, Multan
                    <br />
                    Punjab, Pakistan
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </motion.div>
    </Stack>
  );
};
