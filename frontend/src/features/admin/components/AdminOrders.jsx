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
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { noOrdersAnimation } from "../../../assets/index";
import Lottie from "lottie-react";
import axios from "axios"; // Assuming axios is used for API calls

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

  const [userNames, setUserNames] = useState({}); // State to store user names by ID

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

  // Fetch user names for all orders
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
    const update = { ...data, _id: orders[editIndex]._id };
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

  console.log("orders", orders);
  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
      <Stack
        mt={5}
        mb={3}
        component={"form"}
        noValidate
        onSubmit={handleSubmit(handleUpdateOrder)}
      >
        {orders.length ? (
          <TableContainer
            sx={{ width: is1620 ? "95vw" : "auto", overflowX: "auto" }}
            component={Paper}
            elevation={2}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Order</TableCell>
                  <TableCell align="left">User Name</TableCell>
                  <TableCell align="left">Id</TableCell>
                  <TableCell align="left">Item</TableCell>
                  <TableCell align="right">Total Amount</TableCell>
                  <TableCell align="right">Shipping Address</TableCell>
                  <TableCell align="right">Payment Method</TableCell>
                  <TableCell align="right">Order Date</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {orders.length &&
                  orders.map((order, index) => (
                    <TableRow
                      key={order?._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {index}
                      </TableCell>
                      <TableCell align="left">
                        {userNames[order.user] || "Loading..."}
                      </TableCell>
                      <TableCell align="right">{order?._id || "N/A"}</TableCell>
                      <TableCell align="right">
                        {order?.item?.map((product, productIndex) => (
                          <Stack
                            key={product?.product?._id || productIndex}
                            mt={2}
                            flexDirection={"row"}
                            alignItems={"center"}
                            columnGap={2}
                          >
                            <Avatar src={product?.product?.thumbnail}></Avatar>
                            <Typography>
                              {product?.product?.title || "Unknown Product"}
                            </Typography>
                          </Stack>
                        ))}
                      </TableCell>
                      <TableCell align="right">{order?.total || 0}</TableCell>
                      <TableCell align="right">
                        <Stack>
                          <Typography variant="body2">
                            <strong>Phone:</strong>{" "}
                            {order?.shippingInfo?.phoneNumber ||
                              order?.address?.[0]?.phoneNumber ||
                              "N/A"}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Address:</strong>{" "}
                            {order?.shippingInfo?.street ||
                              order?.address?.[0]?.street ||
                              "N/A"}
                          </Typography>
                          <Typography variant="body2">
                            {order?.shippingInfo?.city ||
                              order?.address?.[0]?.city ||
                              ""}
                            ,{" "}
                            {order?.shippingInfo?.state ||
                              order?.address?.[0]?.state ||
                              ""}
                          </Typography>
                          <Typography variant="body2">
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
                                backgroundColor: (theme) =>
                                  theme.palette.grey[200],
                                fontSize: "0.7rem",
                              }}
                            />
                          ) : null}
                        </Stack>
                      </TableCell>
                      <TableCell align="right">
                        {order?.paymentMode || "N/A"}
                      </TableCell>
                      <TableCell align="right">
                        {order?.createdAt
                          ? new Date(order.createdAt).toDateString()
                          : "N/A"}
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
                              {editOptions.map((option) => (
                                <MenuItem value={option}>{option}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        ) : (
                          <Chip
                            label={order.status}
                            sx={getStatusColor(order.status)}
                          />
                        )}
                      </TableCell>

                      {/* actions */}
                      <TableCell align="right">
                        {editIndex === index ? (
                          <Button>
                            <IconButton type="submit">
                              <CheckCircleOutlinedIcon />
                            </IconButton>
                          </Button>
                        ) : (
                          <IconButton onClick={() => setEditIndex(index)}>
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
  );
};
