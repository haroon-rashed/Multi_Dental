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
} from "@mui/material";
import { motion } from "framer-motion";
import { Security, Lock, Visibility, Shield } from "@mui/icons-material";
import SecondNav from "../features/navigation/components/SecondNav";
import { Footer } from "../features/footer/Footer";
import UserNavbar from "../features/navigation/components/UserNavbar";

export const PrivacyPolicyPage = () => {
  const theme = useTheme();
  const is700 = useMediaQuery(theme.breakpoints.down(700));
  const is600 = useMediaQuery(theme.breakpoints.down(600));

  const sections = [
    {
      title: "1. Information We Collect",
      content:
        "We collect information you provide directly to us, such as when you create an account, place an order, or contact us. This may include your name, email address, phone number, shipping address, billing information, and any other information you choose to provide. We also collect information about your use of our website, including your IP address, browser type, and pages visited.",
    },
    {
      title: "2. How We Use Your Information",
      content:
        "We use the information we collect to process your orders, communicate with you about your orders, provide customer support, improve our website and services, send you marketing communications (with your consent), and comply with legal obligations. We do not sell, trade, or otherwise transfer your personal information to third parties without your consent.",
    },
    {
      title: "3. Information Sharing",
      content:
        "We may share your information with trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential. We may also release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety.",
    },
    {
      title: "4. Data Security",
      content:
        "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. We use industry-standard encryption technologies when transmitting sensitive data. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.",
    },
    {
      title: "5. Cookies and Tracking Technologies",
      content:
        "We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand where our visitors are coming from. You can control cookies through your browser settings, but disabling cookies may affect the functionality of our website.",
    },
    {
      title: "6. Third-Party Services",
      content:
        "Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to read their privacy policies before providing any personal information.",
    },
    {
      title: "7. Children's Privacy",
      content:
        "Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.",
    },
    {
      title: "8. Your Rights",
      content:
        "You have the right to access, update, or delete your personal information. You may also opt out of marketing communications at any time. To exercise these rights, please contact us using the information provided below. We will respond to your request within a reasonable timeframe.",
    },
    {
      title: "9. Data Retention",
      content:
        "We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law. We will delete or anonymize your personal information when it is no longer needed.",
    },
    {
      title: "10. International Transfers",
      content:
        "Your personal information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and that your information is protected in accordance with this privacy policy.",
    },
    {
      title: "11. Changes to This Policy",
      content:
        "We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the 'Last Updated' date. Your continued use of our services after changes are posted constitutes acceptance of the new policy.",
    },
    {
      title: "12. Contact Us",
      content:
        "If you have any questions about this privacy policy or our data practices, please contact us using the information provided below. We are committed to addressing your concerns and protecting your privacy.",
    },
  ];

  return (
    <>
      <UserNavbar/>
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
              Privacy Policy
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
              How we collect, use, and protect your personal information
            </Typography>
          </Stack>
        </motion.div>

        {/* Last Updated */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card
            sx={{
              padding: is600 ? 2 : 3,
              backgroundColor: theme.palette.primary.main,
              color: "white",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", textAlign: "center" }}
              >
                Last Updated: {new Date().toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        </motion.div>

        {/* Privacy Sections */}
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
          >
            <Card sx={{ marginBottom: 3 }}>
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: 2,
                    color: theme.palette.primary.main,
                  }}
                >
                  {section.title}
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  {section.content}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* Security Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
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
                sx={{
                  fontWeight: "bold",
                  marginBottom: 3,
                  textAlign: "center",
                }}
              >
                Our Commitment to Privacy
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                  <Stack alignItems="center" spacing={2}>
                    <Security
                      sx={{ fontSize: 40, color: theme.palette.primary.main }}
                    />
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", textAlign: "center" }}
                    >
                      Data Security
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ textAlign: "center", color: "text.secondary" }}
                    >
                      Industry-standard encryption and security measures
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Stack alignItems="center" spacing={2}>
                    <Lock
                      sx={{ fontSize: 40, color: theme.palette.primary.main }}
                    />
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", textAlign: "center" }}
                    >
                      Secure Storage
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ textAlign: "center", color: "text.secondary" }}
                    >
                      Your data is stored in secure, encrypted databases
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Stack alignItems="center" spacing={2}>
                    <Visibility
                      sx={{ fontSize: 40, color: theme.palette.primary.main }}
                    />
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", textAlign: "center" }}
                    >
                      Transparency
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ textAlign: "center", color: "text.secondary" }}
                    >
                      Clear information about how we use your data
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Stack alignItems="center" spacing={2}>
                    <Shield
                      sx={{ fontSize: 40, color: theme.palette.primary.main }}
                    />
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", textAlign: "center" }}
                    >
                      Your Control
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ textAlign: "center", color: "text.secondary" }}
                    >
                      You control your data and can request changes anytime
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
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
                sx={{
                  fontWeight: "bold",
                  marginBottom: 3,
                  textAlign: "center",
                }}
              >
                Contact Us About Privacy
              </Typography>
              <Stack spacing={2} sx={{ textAlign: "center" }}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Email: multidental@yaho.com
                </Typography>
                <Typography variant="body1">Phone: +92 300 6377 821</Typography>
                <Typography variant="body1">
                  Address: Near Nishtar Institute of Dentistry, District Jail
                  Road, Multan
                </Typography>
                <Typography variant="body2" sx={{ marginTop: 2, opacity: 0.9 }}>
                  We respond to all privacy-related inquiries within 48 hours
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </motion.div>
      </Stack>
      <Footer />
    </>
  );
};
