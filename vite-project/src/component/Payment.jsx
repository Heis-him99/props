import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();
  const [order, setOrder] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paid, setPaid] = useState(false);
  const [cashReceived, setCashReceived] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const savedOrder = JSON.parse(localStorage.getItem("order")) || [];
    setOrder(savedOrder);

    let direction = 1;
    const rotateInterval = setInterval(() => {
      setRotation((prev) => {
        if (prev >= 10) direction = -1;
        if (prev <= -10) direction = 1;
        return prev + direction * 1.5;
      });
    }, 100);

    return () => clearInterval(rotateInterval);
  }, []);

  const total = order
    .reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
    .toFixed(2);

  const handlePayment = () => {
    if (!paymentMethod) return alert("Select a payment method first.");
    if (paymentMethod === "cash" && !cashReceived)
      return alert("Please confirm that cash has been received.");
    setPaid(true);

    // Save completed order to order history
const orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];
const newOrder = {
  id: Date.now(),
  items: order,
  total,
  paymentMethod,
  time: new Date().toISOString(),
};
orderHistory.push(newOrder);


localStorage.setItem("orderHistory", JSON.stringify(orderHistory));

    localStorage.removeItem("order");
    setTimeout(() => navigate("/paymentsuccess"), 1500);
  };
  

  const colors = {
    mainBg: "#fff8ef",
    cardBg: "#fff",
    accent: "#ff6f00",
    textDark: "#2c2c2c",
    textLight: "#444",
    border: "#e6c89f",
    shadow: "0 6px 14px rgba(0,0,0,0.08)",
  };

  const styles = {
    container: {
      padding: "2rem 1rem",
      textAlign: "center",
      fontFamily: "Poppins, sans-serif",
      backgroundColor: colors.mainBg,
      color: colors.textDark,
      width: "100vw",
      maxWidth: "75rem",
      margin: "0 auto",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      boxSizing: "border-box",
    },
    summary: {
      maxWidth: "540px",
      margin: "0 auto",
      padding: "2rem",
      borderRadius: "14px",
      backgroundColor: colors.cardBg,
      boxShadow: colors.shadow,
      border: `1px solid ${colors.border}`,
      boxSizing: "border-box",
    },
    orderItem: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "8px",
      color: colors.textLight,
      fontWeight: "500",
      flexWrap: "wrap",
    },
    total: {
      borderTop: `1px solid ${colors.border}`,
      marginTop: "15px",
      paddingTop: "10px",
      fontWeight: "700",
      fontSize: "18px",
      color: colors.textDark,
    },
    button: {
      padding: "12px 25px",
      backgroundColor: colors.accent,
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      marginTop: "25px",
      fontWeight: "600",
      fontSize: "15px",
      boxShadow: "0 4px 10px rgba(255,111,0,0.4)",
      width: "100%",
      maxWidth: "240px",
    },
    select: {
      padding: "12px",
      borderRadius: "8px",
      border: `1px solid ${colors.border}`,
      marginTop: "10px",
      width: "100%",
      backgroundColor: "#fff",
      color: colors.textDark,
      fontWeight: "500",
      boxSizing: "border-box",
    },
    animationBox: {
      marginTop: "25px",
      padding: "20px",
      borderRadius: "10px",
      backgroundColor: "#fffaf3",
      border: `1px solid ${colors.border}`,
      boxShadow: colors.shadow,
      boxSizing: "border-box",
    },
    posWrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "20px",
    },
    posDevice: {
      width: "130px",
      height: "210px",
      backgroundColor: "#222",
      borderRadius: "18px",
      transform: `rotate(${rotation}deg)`,
      transition: "transform 0.3s ease",
      boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
    },
    posScreen: {
      width: "90px",
      height: "55px",
      backgroundColor: "#00e676",
      borderRadius: "6px",
      margin: "22px auto 10px",
    },
    posKeypad: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "6px",
      width: "90px",
      margin: "0 auto",
    },
    key: {
      width: "24px",
      height: "24px",
      backgroundColor: "#444",
      borderRadius: "4px",
    },
    cardSlot: {
      width: "100px",
      height: "10px",
      backgroundColor: "#111",
      borderRadius: "3px",
      margin: "12px auto 0",
    },
    qrCode: {
      width: "150px",
      height: "150px",
      background:
        "url('https://api.qrserver.com/v1/create-qr-code/?data=RestaurantPOS&size=150x150') no-repeat center/cover",
      margin: "20px auto",
      borderRadius: "8px",
      boxShadow: colors.shadow,
    },
  };

  return (
    <>
      <style>
        {`
        html, body {
          overflow-x: hidden;
          margin: 0;
          padding: 0;
        }

        @media (max-width: 1024px) {
          h2 { font-size: 1.6rem; }
          select { font-size: 0.95rem; }
          button { font-size: 0.95rem; }
        }

        @media (max-width: 768px) {
          h2 { font-size: 1.4rem; }
          div[style*="max-width: 540px"] {
            padding: 1.5rem !important;
          }
        }

        @media (max-width: 480px) {
          h2 { font-size: 1.2rem; }
          select { width: 100% !important; }
          div[style*="max-width: 540px"] {
            padding: 1rem !important;
          }
          .posDevice { transform: scale(0.85); }
        }

        @media (max-height: 700px) {
          .container {
            justify-content: flex-start !important;
            padding-top: 2rem !important;
          }
        }
      `}
      </style>

      <div style={styles.container} className="container">
        <h2>Payment Summary</h2>

        <div style={styles.summary}>
          {order.length > 0 ? (
            <>
              {order.map((item) => (
                <div key={item.id} style={styles.orderItem}>
                  <span>
                    {item.name} x {item.quantity || 1}
                  </span>
                  <span>${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                </div>
              ))}

              <div style={styles.total}>Total: ${total}</div>

              <div>
                <label>Select Payment Method:</label>
                <br />
                <select
                  style={styles.select}
                  value={paymentMethod}
                  onChange={(e) => {
                    setPaymentMethod(e.target.value);
                    setCashReceived(false);
                  }}
                >
                  <option value="">--Choose--</option>
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                  <option value="transfer">Transfer</option>
                  <option value="qr">QR Code</option>
                </select>
              </div>

              {paymentMethod === "cash" && (
                <div style={styles.animationBox}>
                  <h4>Confirm Cash Payment</h4>
                  <label style={{ fontWeight: "500" }}>
                    <input
                      type="checkbox"
                      checked={cashReceived}
                      onChange={(e) => setCashReceived(e.target.checked)}
                    />{" "}
                    Cash Received
                  </label>
                </div>
              )}

              {paymentMethod === "transfer" && (
                <div style={styles.animationBox}>
                  <h4>Bank Transfer Details</h4>
                  <p><strong>Account Name:</strong> Onchain Restaurant Ltd</p>
                  <p><strong>Bank Name:</strong> Onchain Bank</p>
                  <p><strong>Account Number:</strong> 0123456789</p>
                  <p><strong>Note:</strong> Please send the exact total displayed</p>
                </div>
              )}

              {paymentMethod === "card" && (
                <div style={styles.animationBox}>
                  <h4>Card Payment</h4>
                  <div style={styles.posWrapper}>
                    <div style={styles.posDevice} className="posDevice">
                      <div style={styles.posScreen}></div>
                      <div style={styles.posKeypad}>
                        {Array(9)
                          .fill(null)
                          .map((_, i) => (
                            <div key={i} style={styles.key}></div>
                          ))}
                      </div>
                      <div style={styles.cardSlot}></div>
                    </div>
                  </div>
                  <p style={{ marginTop: "15px", fontWeight: "500" }}>
                    PLEASE MAKE PAYMENT USING YOUR CARD AT THE POS TERMINAL
                  </p>
                </div>
              )}

              {paymentMethod === "qr" && (
                <div style={styles.animationBox}>
                  <h4>Scan to Pay</h4>
                  <div style={styles.qrCode}></div>
                  <p>Scan this QR code to complete your payment.</p>
                </div>
              )}

              {!paid && (
                <button style={styles.button} onClick={handlePayment}>
                  Confirm Payment
                </button>
              )}
            </>
          ) : (
            <>
              <h3>No active order.</h3>
              <button style={styles.button} onClick={() => navigate("/menu")}>
                Back to Menu
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Payment;
