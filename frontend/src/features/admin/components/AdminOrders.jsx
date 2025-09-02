import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersAsync,
  resetOrderUpdateStatus,
  selectOrderUpdateStatus,
  selectOrders,
  updateOrderByIdAsync,
} from "../../order/OrderSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Avatar,
  Button,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { noOrdersAnimation } from "../../../assets/index";
import Lottie from "lottie-react";
import axios from "axios";

export const AdminOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const [editIndex, setEditIndex] = useState(-1);
  const orderUpdateStatus = useSelector(selectOrderUpdateStatus);
  const theme = useTheme();
  const is1620 = useMediaQuery(theme.breakpoints.down(1620));
  const is1200 = useMediaQuery(theme.breakpoints.down(1200));
  const is820 = useMediaQuery(theme.breakpoints.down(820));
  const is480 = useMediaQuery(theme.breakpoints.down(480));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [userNames, setUserNames] = useState({});

  useEffect(() => {
    dispatch(getAllOrdersAsync());
  }, [dispatch]);

  useEffect(() => {
    if (orderUpdateStatus === "fulfilled") {
      toast.success("Status updated");
    } else if (orderUpdateStatus === "rejected") {
      toast.error("Error updating order status");
    }
  }, [orderUpdateStatus]);

  useEffect(() => {
    return () => {
      dispatch(resetOrderUpdateStatus());
    };
  }, []);

  useEffect(() => {
    const fetchUserNames = async () => {
      const names = {};
      for (const order of orders) {
        const userId = order.user;
        if (userId && !userNames[userId]) {
          try {
            const response = await axios.post(
              `http://localhost:8000/auth/get-user/${userId}`
            );
            names[userId] = response.data.name || "N/A";
          } catch (error) {
            console.error(`Error fetching user ${userId}:`, error);
            names[userId] = "N/A";
          }
        }
      }
      setUserNames((prevNames) => ({ ...prevNames, ...names }));
    };

    if (orders.length > 0) {
      fetchUserNames();
    }
  }, [orders, userNames]);

  const handleUpdateOrder = (data) => {
    const reversedOrders = [...orders].reverse();
    const update = { ...data, _id: reversedOrders[editIndex]._id };
    setEditIndex(-1);
    dispatch(updateOrderByIdAsync(update));
  };

  const editOptions = [
    "Pending",
    "Dispatched",
    "Out for delivery",
    "Delivered",
    "Cancelled",
  ];

  const getStatusColor = (status) => {
    if (status === "Pending") {
      return { bgcolor: "#dfc9f7", color: "#7c59a4" };
    } else if (status === "Dispatched") {
      return { bgcolor: "#feed80", color: "#927b1e" };
    } else if (status === "Out for delivery") {
      return { bgcolor: "#AACCFF", color: "#4793AA" };
    } else if (status === "Delivered") {
      return { bgcolor: "#b3f5ca", color: "#548c6a" };
    } else if (status === "Cancelled") {
      return { bgcolor: "#fac0c0", color: "#cc6d72" };
    }
  };

  // Show orders in reverse (recent first)
  const displayOrders = [...orders].reverse();

  console.log("orders", orders);
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc", py: 4 }}>
      <Stack justifyContent={"center"} alignItems={"center"}>
        <Stack
          mt={5}
          mb={3}
          component={"form"}
          noValidate
          onSubmit={handleSubmit(handleUpdateOrder)}
          sx={{ width: "100%", maxWidth: "1400px", px: 2 }}
        >
          {orders.length ? (
            <TableContainer
              sx={{
                width: is1620 ? "95vw" : "auto",
                overflowX: "auto",
                borderRadius: "12px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                border: "1px solid #e2e8f0",
              }}
              component={Paper}
              elevation={0}
            >
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow sx={{ bgcolor: "#1e293b" }}>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                      }}
                    >
                      Order
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        color: "white",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                      }}
                    >
                      User Name
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        color: "white",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                      }}
                    >
                      Item
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        color: "white",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                      }}
                    >
                      Total Amount
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        color: "white",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                      }}
                    >
                      Shipping Address
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        color: "white",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                      }}
                    >
                      Payment Method
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        color: "white",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                      }}
                    >
                      Order Date
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        color: "white",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                      }}
                    >
                      Status
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        color: "white",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                      }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {displayOrders.length &&
                    displayOrders.map((order, index) => (
                      <TableRow
                        key={order?._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          "&:hover": { bgcolor: "#f1f5f9" },
                          borderBottom: "1px solid #e2e8f0",
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{
                            fontWeight: 600,
                            color: "#475569",
                            fontSize: "0.9rem",
                          }}
                        >
                          {index}
                        </TableCell>

                        <TableCell align="left">
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Avatar
                              sx={{
                                width: 32,
                                height: 32,
                                bgcolor: "#3b82f6",
                                fontSize: "0.8rem",
                              }}
                            >
                              {(userNames[order.user] || "U")
                                .charAt(0)
                                .toUpperCase()}
                            </Avatar>
                            <Typography
                              sx={{ fontWeight: 500, color: "#334155" }}
                            >
                              {userNames[order.user] || "Loading..."}
                            </Typography>
                          </Box>
                        </TableCell>

                        <TableCell align="right">
                          {order?.item?.map((product, productIndex) => (
                            <Stack
                              key={product?.product?._id || productIndex}
                              mt={2}
                              flexDirection={"row"}
                              alignItems={"center"}
                              columnGap={2}
                              sx={{
                                p: 1,
                                bgcolor: "#f8fafc",
                                borderRadius: "8px",
                                border: "1px solid #e2e8f0",
                                mb: 1,
                              }}
                            >
                              <Avatar
                                src={product?.product?.thumbnail}
                                sx={{ width: 40, height: 40 }}
                              />
                              <Typography
                                sx={{
                                  fontSize: "0.9rem",
                                  color: "#475569",
                                  fontWeight: 500,
                                }}
                              >
                                {product?.product?.title || "Unknown Product"}
                              </Typography>
                            </Stack>
                          ))}
                        </TableCell>

                        <TableCell align="right">
                          <Typography
                            sx={{
                              fontWeight: 700,
                              color: "#059669",
                              fontSize: "1.1rem",
                            }}
                          >
                            {order?.total || 0}
                          </Typography>
                        </TableCell>

                        <TableCell align="right">
                          <Box
                            sx={{
                              p: 2,
                              bgcolor: "#f8fafc",
                              borderRadius: "8px",
                              border: "1px solid #e2e8f0",
                              minWidth: "200px",
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{ mb: 0.5, color: "#475569" }}
                            >
                              <strong>📞 Phone:</strong>{" "}
                              {order?.shippingInfo?.phoneNumber ||
                                order?.address?.[0]?.phoneNumber ||
                                "N/A"}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ mb: 0.5, color: "#475569" }}
                            >
                              <strong>🏠 Address:</strong>{" "}
                              {order?.shippingInfo?.street ||
                                order?.address?.[0]?.street ||
                                "N/A"}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ mb: 0.5, color: "#475569" }}
                            >
                              {order?.shippingInfo?.city ||
                                order?.address?.[0]?.city ||
                                ""}
                              ,{" "}
                              {order?.shippingInfo?.state ||
                                order?.address?.[0]?.state ||
                                ""}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ mb: 1, color: "#475569" }}
                            >
                              {order?.shippingInfo?.postalCode ||
                                order?.address?.[0]?.postalCode ||
                                ""}
                              ,{" "}
                              {order?.shippingInfo?.country ||
                                order?.address?.[0]?.country ||
                                ""}
                            </Typography>
                            {order?.shippingInfo?.type ||
                            order?.address?.[0]?.type ? (
                              <Chip
                                label={
                                  order?.shippingInfo?.type ||
                                  order?.address?.[0]?.type
                                }
                                size="small"
                                sx={{
                                  mt: 0.5,
                                  maxWidth: "fit-content",
                                  backgroundColor: "#dbeafe",
                                  color: "#1e40af",
                                  fontSize: "0.7rem",
                                }}
                              />
                            ) : null}
                          </Box>
                        </TableCell>

                        <TableCell align="right">
                          <Chip
                            label={order?.paymentMode || "N/A"}
                            sx={{
                              bgcolor: "#fef3c7",
                              color: "#92400e",
                              fontWeight: 500,
                            }}
                          />
                        </TableCell>

                        <TableCell align="right">
                          <Typography
                            sx={{
                              fontSize: "0.85rem",
                              color: "#64748b",
                              fontWeight: 500,
                            }}
                          >
                            {order?.createdAt
                              ? new Date(order.createdAt).toDateString()
                              : "N/A"}
                          </Typography>
                        </TableCell>

                        {/* order status */}
                        <TableCell align="right">
                          {editIndex === index ? (
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                Update status
                              </InputLabel>
                              <Select
                                defaultValue={order.status}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Update status"
                                {...register("status", {
                                  required: "Status is required",
                                })}
                              >
                                {editOptions.map((option, optionIndex) => (
                                  <MenuItem key={optionIndex} value={option}>
                                    {option}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          ) : (
                            <Chip
                              label={order.status}
                              sx={{
                                ...getStatusColor(order.status),
                                fontWeight: 600,
                              }}
                            />
                          )}
                        </TableCell>

                        {/* actions */}
                        <TableCell align="right">
                          {editIndex === index ? (
                            <Button>
                              <IconButton
                                type="submit"
                                sx={{
                                  bgcolor: "#10b981",
                                  color: "white",
                                  "&:hover": { bgcolor: "#059669" },
                                }}
                              >
                                <CheckCircleOutlinedIcon />
                              </IconButton>
                            </Button>
                          ) : (
                            <IconButton
                              onClick={() => setEditIndex(index)}
                              sx={{
                                bgcolor: "#f3f4f6",
                                color: "#6b7280",
                                "&:hover": {
                                  bgcolor: "#3b82f6",
                                  color: "white",
                                },
                              }}
                            >
                              <EditOutlinedIcon />
                            </IconButton>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Stack width={is480 ? "auto" : "30rem"} justifyContent={"center"}>
              <Stack rowGap={"1rem"}>
                <Lottie animationData={noOrdersAnimation} />
                <Typography
                  textAlign={"center"}
                  alignSelf={"center"}
                  variant="h6"
                  fontWeight={400}
                >
                  There are no orders currently
                </Typography>
              </Stack>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};
