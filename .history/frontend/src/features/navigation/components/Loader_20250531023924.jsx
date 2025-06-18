import React from 'react';

const Loader = () => {
  return (
    <div style={styles.loader}>
      <img
        src="/teeth-loading.gif" // 👈 is path pe image rakhna public folder mein
        alt="Loading..."
        style={{ width: '100px', height: '100px' }}
      />
    </div>
  );
};

const styles = {
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#fff', // Optional: background color
  },
};

export default Loader;
