import React from "react";

const Loader = () => {
  return (
    <div style={styles.loader}>
      <img
        src="https://www.alumardental.com/public/assets/images/alumar.jpg" // 👈 is path pe image rakhna public folder mein
        alt="Loading..."
        style={{ width: "150px", height: "150px", objextFit: "contain" }}
      />
    </div>
  );
};

const styles = {
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#fff", // Optional: background color
  },
};

export default Loader;
