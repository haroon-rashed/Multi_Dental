import React from "react";
import {
  Stack,
  Typography,
  Card,
  CardContent,
  useMediaQuery,
  useTheme,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { motion } from "framer-motion";
import { CheckCircle } from "@mui/icons-material";
import { Navbar } from "../features/navigation/components/Navbar";
import SecondNav from "../features/navigation/components/SecondNav";
import { Footer } from "../features/footer/Footer";
import UserNavbar from "../features/navigation/components/UserNavbar";

export const TermsConditionsPage = () => {
  const theme = useTheme();
  const is700 = useMediaQuery(theme.breakpoints.down(700));
  const is600 = useMediaQuery(theme.breakpoints.down(600));

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content:
        "By accessing and using Multi Dental Supply's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.",
    },
    {
      title: "2. Use License",
      content:
        "Permission is granted to temporarily download one copy of the materials (information or software) on Multi Dental Supply's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose or for any public display; attempt to reverse engineer any software contained on the website; remove any copyright or other proprietary notations from the materials; or transfer the materials to another person or 'mirror' the materials on any other server.",
    },
    {
      title: "3. Product Information",
      content:
        "While we strive to provide accurate and up-to-date information about our dental products, we do not warrant that product descriptions, specifications, or other content on our website is accurate, complete, reliable, current, or error-free. Product images are for illustrative purposes only and may not reflect the exact appearance of the product.",
    },
    {
      title: "4. Ordering and Payment",
      content:
        "All orders are subject to acceptance and availability. We reserve the right to refuse service to anyone for any reason at any time. Payment must be made at the time of ordering. We accept cash on delivery, bank transfers, and other payment methods as specified on our website. Prices are subject to change without notice.",
    },
    {
      title: "5. Shipping and Delivery",
      content:
        "Delivery times are estimates only. We are not responsible for delays beyond our control. Risk of loss and title for items purchased pass to you upon delivery of the items to the carrier. We are not liable for any loss or damage to products during shipping.",
    },
    {
      title: "6. Returns and Refunds",
      content:
        "Returns are accepted within 7 days of delivery for unused products in original packaging. Damaged or defective products must be reported within 24 hours of delivery. Return shipping costs are the responsibility of the customer unless the product is defective.",
    },
    {
      title: "7. Product Warranty",
      content:
        "All dental instruments and equipment come with manufacturer warranties as specified. We provide additional support and assistance with warranty claims. Warranty terms vary by product and manufacturer.",
    },
    {
      title: "8. Limitation of Liability",
      content:
        "In no event shall Multi Dental Supply, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of our products or services.",
    },
    {
      title: "9. Privacy and Data Protection",
      content:
        "We are committed to protecting your privacy. Your personal information is collected, used, and protected in accordance with our Privacy Policy. We do not sell, trade, or otherwise transfer your personal information to third parties without your consent.",
    },
    {
      title: "10. Intellectual Property",
      content:
        "The content on this website, including but not limited to text, graphics, images, logos, and software, is the property of Multi Dental Supply and is protected by copyright laws. Unauthorized use of any content may violate copyright, trademark, and other applicable laws.",
    },
    {
      title: "11. Governing Law",
      content:
        "These terms and conditions are governed by and construed in accordance with the laws of Pakistan. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Multan, Pakistan.",
    },
    {
      title: "12. Changes to Terms",
      content:
        "We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on the website. Your continued use of our services after changes are posted constitutes acceptance of the new terms.",
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
              Terms & Conditions
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
              Please read these terms and conditions carefully before using our
              services
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

        {/* Terms Sections */}
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

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
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
                Questions About These Terms?
              </Typography>
              <Typography
                variant="body1"
                sx={{ lineHeight: 1.8, textAlign: "center" }}
              >
                If you have any questions about these Terms & Conditions, please
                contact us at:
              </Typography>
              <Stack spacing={2} sx={{ marginTop: 3, textAlign: "center" }}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Email: multidental@yaho.com
                </Typography>
                <Typography variant="body1">Phone: +92614506162</Typography>
                <Typography variant="body1">
                  Address: Near Nishtar Institute of Dentistry, District Jail
                  Road, Multan
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
