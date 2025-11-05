import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PaymentSuccess() {
  const navigate = useNavigate();
  const [scale, setScale] = useState(0.5);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setScale(1.2);
      setOpacity(1);
    }, 300);
    const reset = setTimeout(() => setScale(1), 900);

    return () => {
      clearTimeout(timer);
      clearTimeout(reset);
    };
  }, []);

  const colors = {
    bg: "#f2fff2",
    accent: "#00c853",
    textDark: "#1b1b1b",
    shadow: "0 8px 20px rgba(0,0,0,0.1)",
  };

  const styles = {
    page: {
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.bg,
      fontFamily: "Poppins, sans-serif",
      color: colors.textDark,
      boxSizing: "border-box",
      padding: "1rem",
    },
    card: {
      width: "min(75rem, 92vw)",
      background: "#fff",
      borderRadius: "14px",
      padding: "2.5rem",
      textAlign: "center",
      boxShadow: colors.shadow,
      boxSizing: "border-box",
    },
    badge: {
      width: "140px",
      height: "140px",
      borderRadius: "50%",
      backgroundColor: colors.accent,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transform: `scale(${scale})`,
      opacity,
      margin: "0 auto",
      transition: "transform 0.7s ease-out, opacity 0.8s ease-out",
    },
    svg: {
      width: "65px",
      height: "65px",
    },
    title: {
      marginTop: "2rem",
      fontSize: "1.6rem",
      fontWeight: 700,
    },
    message: {
      fontSize: "1rem",
      color: "#444",
      marginTop: "0.5rem",
    },
    button: {
      marginTop: "2.5rem",
      padding: "12px 26px",
      borderRadius: "10px",
      backgroundColor: "#ff6f00",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      fontWeight: 600,
      fontSize: "15px",
      boxShadow: "0 5px 10px rgba(255,111,0,0.3)",
      transition: "background 0.25s",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.badge}>
        
          <svg
            style={styles.svg}
            viewBox="0 0 52 52"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="26"
              cy="26"
              r="25"
              fill="none"
              stroke="#fff"
              strokeWidth="3"
            />
            <path
              fill="none"
              stroke="#fff"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 27l8 8 16-16"
            />
          </svg>
        </div>

        <h2 style={styles.title}>Payment Successfully Received</h2>
        <p style={styles.message}>
          Your transaction was completed successfully. Enjoy your meal.
        </p>

        <button
          style={styles.button}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#e65c00")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#ff6f00")}
          onClick={() => navigate("/menu")}
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccess;
