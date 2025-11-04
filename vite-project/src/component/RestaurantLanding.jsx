import { useState } from "react";

function RestaurantLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      color: "#1a1a1a",
      backgroundColor: "#fff8f0",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      overflowX: "hidden",
    },
    nav: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "1rem 4vw",
      borderBottom: "1px solid #e0e0e0",
      position: "sticky",
      top: 0,
      backgroundColor: "#fff",
      zIndex: 1000,
    },
    logo: {
      fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
      color: "#ff6f00",
      fontWeight: 700,
    },
    navLinks: {
      display: menuOpen ? "flex" : "none",
      flexDirection: "column",
      alignItems: "flex-start",
      position: "absolute",
      top: "60px",
      right: "0",
      backgroundColor: "#fff",
      width: "220px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      padding: "1rem",
      borderRadius: "8px 0 0 8px",
    },
    navLink: {
      textDecoration: "none",
      color: "#333",
      fontSize: "1rem",
      margin: "0.8rem 0",
      fontWeight: "500",
    },
    orderBtn: {
      backgroundColor: "#ff6f00",
      color: "#fff",
      border: "none",
      padding: "0.6rem 1.2rem",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "1rem",
      marginTop: "0.5rem",
    },
    hamburger: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      width: "24px",
      height: "18px",
      cursor: "pointer",
    },
    bar: {
      height: "3px",
      width: "100%",
      backgroundColor: "#333",
      borderRadius: "2px",
      transition: "0.3s",
    },
    hero: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      padding: "5vw 6vw",
      background: "linear-gradient(135deg, #fff4e6 0%, #ffffff 100%)",
      gap: "2rem",
    },
    heroText: {
      flex: "1 1 400px",
      maxWidth: "600px",
    },
    heroTitle: {
      fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
      marginBottom: "1rem",
      color: "#ff6f00",
      fontWeight: 700,
    },
    heroDesc: {
      fontSize: "clamp(1rem, 1.5vw, 1.1rem)",
      color: "#555",
      lineHeight: "1.6",
      marginBottom: "2rem",
    },
    heroBtn: {
      backgroundColor: "#ff6f00",
      color: "#fff",
      border: "none",
      padding: "0.8rem 2rem",
      borderRadius: "6px",
      fontSize: "clamp(0.9rem, 1.2vw, 1rem)",
      cursor: "pointer",
      fontWeight: 600,
    },
    heroImg: {
      flex: "1 1 300px",
      width: "100%",
      maxWidth: "480px",
      borderRadius: "12px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    },
    about: {
      padding: "5vw 6vw",
      backgroundColor: "#fff4e6",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      boxSizing: "border-box",
    },
    aboutTitle: {
      fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
      color: "#ff6f00",
      marginBottom: "1rem",
      fontWeight: 700,
    },
    aboutText: {
      maxWidth: "700px",
      color: "#555",
      lineHeight: "1.6",
      fontSize: "clamp(0.95rem, 1.3vw, 1rem)",
      padding: "0 1rem",
    },
    footer: {
      textAlign: "center",
      padding: "1rem",
      fontSize: "clamp(0.8rem, 1vw, 0.9rem)",
      color: "#666",
      borderTop: "1px solid #e0e0e0",
      backgroundColor: "#fff",
      marginTop: "auto",
    },
    desktopNavLinks: {
      display: "flex",
      gap: "1.5rem",
      alignItems: "center",
    },
  };

  const isDesktop = window.innerWidth > 768;

  return (
    <div style={styles.container}>
      {/* Navigation */}
      <nav style={styles.nav}>
        <h1 style={styles.logo}>
         MEAL<span style={{ color: "#222" }}>Matrix</span>
        </h1>

        {isDesktop ? (
          <div style={styles.desktopNavLinks}>
            <a href="/" style={styles.navLink}>Home</a>
            <a href="/menu" style={styles.navLink}>Menu</a>
            <a href="#about" style={styles.navLink}>About</a>
            <a href="/ordersHistory" style={styles.navLink}>History</a>
            <a href="/menu">
              <button style={styles.orderBtn}>Order Now</button>
            </a>
          </div>
        ) : (
          <>
            <div style={styles.hamburger} onClick={toggleMenu}>
              <div style={{ ...styles.bar, transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }}></div>
              <div style={{ ...styles.bar, opacity: menuOpen ? 0 : 1 }}></div>
              <div style={{ ...styles.bar, transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }}></div>
            </div>

            {menuOpen && (
              <div style={styles.navLinks}>
                <a href="/" style={styles.navLink} onClick={toggleMenu}>Home</a>
                <a href="/menu" style={styles.navLink} onClick={toggleMenu}>Menu</a>
                <a href="#about" style={styles.navLink} onClick={toggleMenu}>About</a>
                <a href="/ordersHistory" style={styles.navLink} onClick={toggleMenu}>History</a>
                <a href="/menu">
                  <button style={styles.orderBtn} onClick={toggleMenu}>Order Now</button>
                </a>
              </div>
            )}
          </>
        )}
      </nav>

      {/* Hero Section */}
      <header style={styles.hero}>
        <div style={styles.heroText}>
          <h2 style={styles.heroTitle}>Taste the Difference</h2>
          <p style={styles.heroDesc}>
            Experience gourmet meals crafted with love. Fresh ingredients, vibrant flavors, and a dining experience you'll never forget. Visit us today!
          </p>
          <a href="/menu">
            <button style={styles.heroBtn}>Create Menu</button>
          </a>
        </div>

        <img
          src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
          alt="Delicious Food"
          style={styles.heroImg}
        />
      </header>

      {/* About Section */}
      <section id="about" style={styles.about}>
        <h2 style={styles.aboutTitle}>About Us</h2>
        <p style={styles.aboutText}>
         Welcome to MEALMatrix, where great taste meets unforgettable experiences.
We’re more than just a restaurant; we’re a space where flavor, comfort and creativity come together to make every meal special.
        </p>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        © {new Date().getFullYear()} MEALMatrix. All rights reserved.
      </footer>
    </div>
  );
}

export default RestaurantLanding;
