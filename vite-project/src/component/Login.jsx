function Login() {
  //const [ email, setEmail ]()
  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        height: "100vh",
        width: "100%",
        background: "linear-gradient(135deg, #0a192f 0%, #1e3c72 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          height: "100vh",
        }}
      >
       
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingLeft: "8rem",
            backgroundColor: "transparent",
          }}
        >
          <h1
            style={{
              fontSize: "3rem",
              marginBottom: "1rem",
              color: "#ffffff",
            }}
          >
            Welcome Back
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#d1d5db",
              maxWidth: "400px",
              lineHeight: "1.6",
            }}
          >
            Login to access your personalized dashboard and continue exploring our
            platform. We're glad to have you back.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff",
            borderTopLeftRadius: "1.5rem",
            borderBottomLeftRadius: "1.5rem",
            boxShadow: "-10px 0 40px rgba(0,0,0,0.2)",
          }}
        >
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              width: "70%",
              maxWidth: "400px",
              color: "#000",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                color: "#1e3c72",
                marginBottom: "1rem",
              }}
            >
              Login
            </h2>

            <input
              type="text"
              placeholder="Username"
              style={{
                padding: "14px 16px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "1rem",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#1e3c72")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />

            <input
              type="password"
              placeholder="Password"
              style={{
                padding: "14px 16px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "1rem",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#1e3c72")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />

            <button
              style={{
                backgroundColor: "#1e3c72",
                color: "#fff",
                border: "none",
                padding: "14px 20px",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#162c57")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#1e3c72")}
            >
              Login
            </button>

            <p
              style={{
                textAlign: "center",
                color: "#555",
                marginTop: "1rem",
                fontSize: "0.95rem",
              }}
            >
              Don’t have an account?{" "}
              <a
                href="/signup"
                style={{
                  color: "#1e3c72",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
              >
                Sign up
              </a>
            </p>
                  <p
              style={{
                textAlign: "center",
                color: "#555",
                marginTop: "1rem",
                fontSize: "0.95rem",
              }}
            >
              Return to {" "}
              <a
                href="/"
                style={{
                  color: "#1e3c72",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
              >
                home?
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
