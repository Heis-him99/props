import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Order() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(JSON.parse(localStorage.getItem("order")) || []);

  useEffect(() => {
    localStorage.setItem("order", JSON.stringify(order));
  }, [order]);

  const total = order
    .reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
    .toFixed(2);

  const handleQuantity = (id, delta) => {
    setOrder(order =>
      order.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max((item.quantity || 1) + delta, 1) }
          : item
      )
    );
  };

  const handleRemove = id => setOrder(order.filter(item => item.id !== id));

  const handleClear = () => {
    setOrder([]);
    localStorage.removeItem("order");
  };

  const handleProceed = () => {
    localStorage.setItem("order", JSON.stringify(order));
    navigate("/payment");
  };

  const handleReturn = () => navigate("/menu");

  const styles = {
    outerWrapper: {
      width: "100vw",
      height: "100vh",
      overflowX: "hidden",
      overflowY: "auto",
      backgroundColor: "#fff8f0",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      boxSizing: "border-box",
      padding: "10px",
    },
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: "1rem",
      fontFamily: "Arial, sans-serif",
      width: "100%",
      maxWidth: "75rem",
      boxSizing: "border-box",
    },
    topButtons: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "10px",
      marginBottom: "1.5rem",
    },
    button: {
      padding: "0.7rem 1.2rem",
      borderRadius: "6px",
      border: "none",
      fontWeight: "600",
      cursor: "pointer",
      backgroundColor: "#ff6f00",
      color: "#fff",
      transition: "background 0.3s",
      flexShrink: 0,
      fontSize: "clamp(0.8rem, 1.2vw, 1rem)",
    },
    card: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      maxWidth: "700px",
      marginBottom: "1rem",
      padding: "1rem",
      borderRadius: "12px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      backgroundColor: "#fff",
      boxSizing: "border-box",
      flexWrap: "wrap",
      gap: "10px",
    },
    name: {
      fontWeight: "600",
      fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
      color: "#111",
      flex: 1,
      wordBreak: "break-word",
    },
    qtyButtons: {
      display: "flex",
      gap: "8px",
      alignItems: "center",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    qtyButton: {
      padding: "0.4rem 0.9rem",
      borderRadius: "6px",
      border: "none",
      fontWeight: "600",
      cursor: "pointer",
      color: "#fff",
      flexShrink: 0,
      fontSize: "clamp(0.8rem, 1.2vw, 1rem)",
    },
    increase: { backgroundColor: "#4CAF50" },
    decrease: { backgroundColor: "#f44336" },
    remove: { backgroundColor: "#ff6f00" },
    total: {
      marginTop: "2rem",
      fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
      fontWeight: "600",
      color: "#333",
      textAlign: "center",
    },
    proceedButton: {
      marginTop: "1.5rem",
      padding: "0.9rem 2rem",
      borderRadius: "8px",
      backgroundColor: "#ff6f00",
      color: "#fff",
      border: "none",
      fontSize: "clamp(0.9rem, 1.3vw, 1rem)",
      fontWeight: "600",
      cursor: "pointer",
      boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    },
    empty: {
      fontSize: "clamp(1.1rem, 1.5vw, 1.3rem)",
      color: "#555",
      marginTop: "3rem",
      textAlign: "center",
    },
  };

  if (order.length === 0) {
    return (
      <div style={styles.outerWrapper}>
        <div style={styles.container}>
          <div style={styles.topButtons}>
            <button style={styles.button} onClick={handleReturn}>Return to Menu</button>
            <button style={styles.button} onClick={handleClear}>Clear Order</button>
          </div>
          <h2 style={styles.empty}>Your order is empty.</h2>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.outerWrapper}>
      <div style={styles.container}>
        <div style={styles.topButtons}>
          <button style={styles.button} onClick={handleReturn}>Return to Menu</button>
          <button style={styles.button} onClick={handleClear}>Clear Order</button>
        </div>

        <h2 style={{ fontSize: "clamp(1.3rem, 2vw, 1.8rem)" }}>Your Order</h2>
        {order.map(item => (
          <div key={item.id} style={styles.card}>
            <div style={styles.name}>
              {item.name} (${item.price.toFixed(2)}) x {item.quantity || 1}
            </div>
            <div style={styles.qtyButtons}>
              <button
                style={{ ...styles.qtyButton, ...styles.increase }}
                onClick={() => handleQuantity(item.id, 1)}
              >
                +
              </button>
              <button
                style={{ ...styles.qtyButton, ...styles.decrease }}
                onClick={() => handleQuantity(item.id, -1)}
              >
                -
              </button>
              <button
                style={{ ...styles.qtyButton, ...styles.remove }}
                onClick={() => handleRemove(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <h3 style={styles.total}>Total: ${total}</h3>
        <button style={styles.proceedButton} onClick={handleProceed}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}

export default Order;
