const User = require("../models/User");
const Order = require("../models/Order");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Configure email transporter (example with Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Function to generate secure password
const generateSecurePassword = () => {
  const length = 12;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
  let password = "";

  // Ensure at least one of each required character type
  password += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)]; // Uppercase
  password += "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)]; // Lowercase
  password += "0123456789"[Math.floor(Math.random() * 10)]; // Number
  password += "@#$%&*"[Math.floor(Math.random() * 6)]; // Special char

  // Fill the rest randomly
  for (let i = 4; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }

  // Shuffle the password
  return password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");
};

// Function to send welcome email with credentials (for new users)
const sendWelcomeEmailWithCredentials = async (
  email,
  name,
  password,
  orderId
) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Welcome! Your Account & Order Confirmation",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Welcome to Our Store, ${name}!</h2>
        
        <p>Thank you for your order! We've created an account for you to track your orders and enjoy faster checkout in the future.</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #495057;">Your Account Details:</h3>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Password:</strong> ${password}</p>
          <p style="color: #6c757d; font-size: 14px;">
            <em>For security reasons, please change your password after logging in.</em>
          </p>
        </div>
        
        <div style="background-color: #e7f3ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #0056b3;">Order Confirmation</h3>
          <p><strong>Order ID:</strong> ${orderId}</p>
          <p>You can track your order by logging into your account or using the order ID above.</p>
        </div>
        
        <p>If you have any questions, please don't hesitate to contact our support team.</p>
        
        <p style="color: #6c757d; font-size: 12px; margin-top: 30px;">
          This is an automated email. Please do not reply to this message.
        </p>
      </div>
    `,
  };

  return await transporter.sendMail(mailOptions);
};

// Function to send order confirmation email (for existing users)
const sendOrderConfirmationEmail = async (email, name, orderId) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Order Confirmation",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Order Confirmed, ${name}!</h2>
        
        <p>Thank you for your order! Your order has been successfully placed and is being processed.</p>
        
        <div style="background-color: #e7f3ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #0056b3;">Order Details</h3>
          <p><strong>Order ID:</strong> ${orderId}</p>
          <p>You can track your order by logging into your account.</p>
        </div>
        
        <p>If you have any questions, please don't hesitate to contact our support team.</p>
        
        <p style="color: #6c757d; font-size: 12px; margin-top: 30px;">
          This is an automated email. Please do not reply to this message.
        </p>
      </div>
    `,
  };

  return await transporter.sendMail(mailOptions);
};

exports.create = async (req, res) => {
  try {
    const created = new Order(req.body);
    await created.save();

    // Send order confirmation email to logged-in users
    const populatedOrder = await Order.findById(created._id).populate(
      "user",
      "name email"
    );
    if (populatedOrder.user && populatedOrder.user.email) {
      try {
        await sendOrderConfirmationEmail(
          populatedOrder.user.email,
          populatedOrder.user.name,
          created._id
        );
        console.log(
          "Order confirmation email sent to logged-in user:",
          populatedOrder.user.email
        );
      } catch (emailError) {
        console.error("Error sending order confirmation email:", emailError);
      }
    }

    res.status(201).json(created);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error creating an order, please try again later" });
  }
};

exports.getByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await Order.find({ user: id });
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error fetching orders, please try again later" });
  }
};

exports.getAll = async (req, res) => {
  try {
    let skip = 0;
    let limit = 0;

    if (req.query.page && req.query.limit) {
      const pageSize = req.query.limit;
      const page = req.query.page;
      skip = pageSize * (page - 1);
      limit = pageSize;
    }

    const totalDocs = await Order.find({}).countDocuments().exec();
    const results = await Order.find({}).skip(skip).limit(limit).exec();

    res.header("X-Total-Count", totalDocs);
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error fetching orders, please try again later" });
  }
};

exports.updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Order.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error updating order, please try again later" });
  }
};

// FIXED VERSION - Simple and Clean
exports.createGuestOrderWithUser = async (req, res) => {
  try {
    const { userInfo, orderInfo } = req.body;
    const { name, email } = userInfo;
    const { item, address, paymentMode, total } = orderInfo;

    console.log("Received data:", { userInfo, orderInfo }); // Debug log

    let user = null;
    let isNewUser = false;
    let generatedPassword = null;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // User already exists, use existing user
      user = existingUser;
      console.log("Using existing user:", user._id);
    } else {
      // Create new user
      console.log("Creating new user...");

      // Generate secure password
      generatedPassword = generateSecurePassword();

      // Hash the password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(generatedPassword, saltRounds);

      // Create user
      user = new User({
        name,
        email,
        password: hashedPassword,
        isGuestCreated: true,
        mustChangePassword: true,
      });

      await user.save();
      isNewUser = true;
      console.log("New user created:", user._id);
    }

    // Create the order linked to the user
    const order = new Order({
      user: user._id,
      item,
      address,
      paymentMode,
      total,
      isGuestOrder: isNewUser,
    });

    const savedOrder = await order.save();
    console.log("Order created:", savedOrder._id);

    // Send welcome email if new user was created
    if (isNewUser && generatedPassword) {
      try {
        await sendWelcomeEmailWithCredentials(
          email,
          name,
          generatedPassword,
          savedOrder._id
        );
        console.log("Welcome email with credentials sent to:", email);
      } catch (emailError) {
        console.error("Error sending welcome email:", emailError);
        // Don't fail the order creation if email fails
      }
    } else if (!isNewUser) {
      // Send order confirmation email to existing user
      try {
        await sendOrderConfirmationEmail(email, name, savedOrder._id);
        console.log("Order confirmation email sent to:", email);
      } catch (emailError) {
        console.error("Error sending order confirmation email:", emailError);
      }
    }

    // Return success response
    res.status(201).json({
      success: true,
      message: isNewUser
        ? "Account created and order placed successfully"
        : "Order created with existing account",
      order: savedOrder,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isNewUser: isNewUser,
      },
      emailSent: isNewUser && !!generatedPassword,
    });
  } catch (error) {
    console.error("Error creating guest order with user:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create order and user account",
      error: error.message,
    });
  }
};

module.exports = {
  create: exports.create,
  getByUserId: exports.getByUserId,
  getAll: exports.getAll,
  updateById: exports.updateById,
  createGuestOrderWithUser: exports.createGuestOrderWithUser,
};
