import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Divider,
  useTheme,
} from "@mui/material";
import { Email as EmailIcon, Phone as PhoneIcon } from "@mui/icons-material";

const teamMembers = [
  {
    name: "Muhammad Shehzad",
    designation: "Chairman",
    contact: "+92 300 8735652",
    email: "shehzad@gmail.com",
    avatarSrc: "/shehzad.jpg", // Place this image directly in the public folder
  },
  {
    name: "Muhammad Shehbaz",
    designation: "Chairman",
    contact: "+92 300 6377821",
    email: "shehbaz@gmail.com",
    avatarSrc: "/shehbaz.jpg", // Place this image directly in the public folder
  },
  {
    name: "Hafiz Ejaz Ahmad",
    designation: "Chairman",
    contact: "+92 305 7890093",
    email: "ejaz@gmail.com",
    avatarSrc: "/ejaz.jpg", // Place this image directly in the public folder
  },
];

const TeamCard = ({ name, designation, contact, email, avatarSrc }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        maxWidth: 360,
        borderRadius: 3,
        boxShadow: theme.shadows[8],
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-10px)",
          boxShadow: theme.shadows[12],
          background: `linear-gradient(135deg, ${theme.palette.background.paper} 30%, ${theme.palette.grey[100]} 100%)`,
        },
        overflow: "hidden",
        position: "relative",
        background: theme.palette.background.paper,
      }}
    >
      <Box
        sx={{
          height: 100,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 30%, ${theme.palette.grey[300]} 100%)`,
          clipPath: "polygon(0 0, 100% 0, 100% 70%, 0 100%)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 40,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Avatar
          src={avatarSrc}
          sx={{
            width: 100,
            height: 100,
            border: `4px solid ${theme.palette.background.paper}`,
          }}
        />
      </Box>
      <CardContent sx={{ pt: 8, textAlign: "center" }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          color={theme.palette.text.primary}
          gutterBottom
        >
          {name}
        </Typography>
        <Typography
          variant="subtitle1"
          color={theme.palette.text.secondary}
          sx={{ mb: 2 }}
        >
          {designation}
        </Typography>
        <Divider sx={{ mb: 2, bgcolor: theme.palette.grey[300] }} />
        <Box display="flex" alignItems="center" justifyContent="center" mb={1}>
          <PhoneIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
          <Typography variant="body2" color={theme.palette.text.secondary}>
            {contact}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center">
          <EmailIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
          <Typography variant="body2" color={theme.palette.text.secondary}>
            {email}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const OurTeam = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: 8,
        px: 4,
        background: `linear-gradient(180deg, ${theme.palette.grey[50]} 0%, ${theme.palette.background.default} 100%)`,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h3"
        fontWeight="bold"
        color={theme.palette.text.primary}
        sx={{
          mb: 6,
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: 2,
          position: "relative",
          "&:after": {
            content: '""',
            display: "block",
            width: 80,
            height: 4,
            background: theme.palette.primary.main,
            position: "absolute",
            bottom: -8,
            left: "50%",
            transform: "translateX(-50%)",
            borderRadius: 2,
          },
        }}
      >
        Our Team
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4,
          maxWidth: 1200,
          mx: "auto",
        }}
      >
        {teamMembers.map((member, index) => (
          <TeamCard
            key={index}
            name={member.name}
            designation={member.designation}
            contact={member.contact}
            email={member.email}
            avatarSrc={member.avatarSrc}
          />
        ))}
      </Box>
    </Box>
  );
};

export default OurTeam;
