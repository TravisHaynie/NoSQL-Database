const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();  // You can adjust this formatting as needed
  };
  
  module.exports = formatDate;
  