import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();

  const defaultMenu = [
    { id: 1, name: "Cheeseburger", price: 5.99, category: "Main Course", image: "https://images.unsplash.com/photo-1550547660-d9450f859349" },
    { id: 2, name: " Orange Juice", price: 8.99, category: "Drinks", image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1974" },
    { id: 3, name: " Pasta", price: 7.99, category: "Main Course", image: "https://images.unsplash.com/photo-1611270629569-8b357cb88da9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687" },
    { id: 4, name: "Grilled Salmon", price: 12.99, category: "Main Course", image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092" },
    { id: 5, name: "Caesar Salad", price: 4.99, category: "Appetizers", image: "https://images.unsplash.com/photo-1746211108786-ca20c8f80ecd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170" },
    { id: 6, name: "Bruschetta", price: 3.99, category: "Appetizers", image: "https://images.unsplash.com/photo-1594978583693-8dfdfc93f052?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1172" },
    { id: 7, name: "Chocolate Cake", price: 3.99, category: "Desserts", image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=&fit=crop&q=80&w=803" },
    { id: 8, name: "Fruit Tart", price: 4.49, category: "Desserts", image: "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687" },
    { id: 9, name: "Coca Cola", price: 1.99, category: "Drinks", image: "https://images.unsplash.com/photo-1583683433877-042a75ba47e3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=749" },
    { id: 10, name: "Margherita Pizza", price: 2.49, category: "Main Course", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1169" },
    { id: 11, name: "cocktail", price: 2.49, category: "Drinks", image: "https://images.unsplash.com/photo-1657313666513-70770d329ef4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687" },
    { id: 12, name: "Taco", price: 2.49, category: "Main Course", image: "https://images.unsplash.com/photo-1604467715878-83e57e8bc129?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=688" },


  ];

  const [menuItems, setMenuItems] = useState( defaultMenu);
  const [order, setOrder] = useState(JSON.parse(localStorage.getItem("order")) || []);
  const [newMeal, setNewMeal] = useState({ name: "", price: "", category: "Main Course", image: "" });
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAdd, setShowAdd] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem("menuItems", JSON.stringify(menuItems));
    localStorage.setItem("order", JSON.stringify(order));
  }, [menuItems, order]);

  const addToOrder = (meal) => {
    const existing = order.find((item) => item.id === meal.id);
    if (existing) {
      setOrder(order.map((item) =>
        item.id === meal.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      ));
    } else {
      setOrder([...order, { ...meal, quantity: 1 }]);
    }
  };

  const addMeal = () => {
    if (!newMeal.name || !newMeal.price || !newMeal.image) {
      alert("Please fill all fields.");
      return;
    }
    if (parseFloat(newMeal.price) < 1) {
      alert("Price must be at least 1");
      return;
    }
    setMenuItems([...menuItems, { ...newMeal, id: Date.now(), price: parseFloat(newMeal.price) }]);
    setNewMeal({ name: "", price: "", category: "Main Course", image: "" });
    setShowAdd(false);
  };

  const categories = ["All", "Appetizers", "Main Course", "Desserts", "Drinks"];
  const displayedItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      padding: screenWidth <= 480 ? "20px" : screenWidth <= 768 ? "30px" : "40px 60px",
      backgroundColor: "#ad722d",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      overflow: "hidden",
      boxSizing: "border-box",
    },
    headerRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      maxWidth: "75rem",
      marginBottom: "30px",
    },
    title: {
      fontSize: "2rem",
      color: "#fff",
      margin: 0,
    },
    homeButton: {
      backgroundColor: "#ff6f00",
      color: "#fff",
      border: "none",
      padding: "10px 20px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "600",
      transition: "background 0.3s ease",
    },
    topButtons: {
      display: "flex",
      justifyContent: "center",
      gap: "15px",
      flexWrap: "wrap",
      marginBottom: "20px",
    },
    button: {
      backgroundColor: "#ff6f00",
      color: "#fff",
      border: "none",
      padding: "8px 16px",
      borderRadius: "6px",
      cursor: "pointer",
      marginTop: "5px",
      fontWeight: "600",
    },
    categories: {
      display: "flex",
      justifyContent: "center",
      gap: "10px",
      marginBottom: "30px",
      flexWrap: "wrap",
    },
    categoryButton: (active) => ({
      padding: "8px 16px",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
      backgroundColor: active ? "#ff6f00" : "#fff",
      color: active ? "#fff" : "#333",
      fontWeight: "600",
      boxShadow: active ? "0 4px 10px rgba(0,0,0,0.2)" : "none",
      transition: "background 0.2s ease",
    }),
    grid: {
      display: "grid",
      gridTemplateColumns:
        screenWidth <= 480
          ? "repeat(1, 1fr)"
          : screenWidth <= 768
          ? "repeat(2, 1fr)"
          : screenWidth <= 1024
          ? "repeat(3, 1fr)"
          : "repeat(4, 1fr)",
      gap: "20px",
      width: "100%",
      maxWidth: "75rem",
      marginBottom: "50px",
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: "12px",
      padding: "15px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      textAlign: "center",
      transition: "transform 0.2s ease",
      height: "fit-content",
    },
    image: {
      width: "100%",
      height: "160px",
      objectFit: "cover",
      borderRadius: "8px",
      marginBottom: "10px",
    },
    formOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    form: {
      backgroundColor: "#fff",
      padding: "30px",
      borderRadius: "12px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      width: "90%",
      maxWidth: "320px",
    },
    input: { padding: "8px", borderRadius: "6px", border: "1px solid #ccc" },
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <h2 style={styles.title}>Our Menu</h2>
        <button style={styles.homeButton} onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>

      <div style={styles.topButtons}>
        <button style={styles.button} onClick={() => navigate("/order")}>View Order</button>
        <button
          style={{ ...styles.button, backgroundColor: "#333" }}
          onClick={() => { setOrder([]); localStorage.removeItem("order"); }}
        >
          Clear Order
        </button>
      </div>

      <div style={styles.categories}>
        {categories.map((cat) => (
          <button
            key={cat}
            style={styles.categoryButton(selectedCategory === cat)}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
        <button style={styles.categoryButton(false)} onClick={() => setShowAdd(true)}>Add New</button>
      </div>

      <div style={styles.grid}>
        {displayedItems.map((item) => (
          <div key={item.id} style={styles.card}>
            <img src={item.image} alt={item.name} style={styles.image} />
            <div style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "5px", color: "#111" }}>
              {item.name}
            </div>
            <div style={{ color: "#555", marginBottom: "10px" }}>${item.price.toFixed(2)}</div>
            <button style={styles.button} onClick={() => addToOrder(item)}>Add to Order</button>
          </div>
        ))}
      </div>

      {showAdd && (
        <div style={styles.formOverlay}>
          <div style={styles.form}>
            <h3 style={{ textAlign: "center", color: "#ff6f00" }}>Add New Meal</h3>
            <input style={styles.input} placeholder="Meal Name" value={newMeal.name} onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })} />
            <input style={styles.input} placeholder="Price" type="number" min="1" value={newMeal.price} onChange={(e) => setNewMeal({ ...newMeal, price: e.target.value })} />
            <input style={styles.input} placeholder="Image URL" value={newMeal.image} onChange={(e) => setNewMeal({ ...newMeal, image: e.target.value })} />
            <select style={styles.input} value={newMeal.category} onChange={(e) => setNewMeal({ ...newMeal, category: e.target.value })}>
              <option>Main Course</option>
              <option>Appetizers</option>
              <option>Desserts</option>
              <option>Drinks</option>
            </select>
            <button style={styles.button} onClick={addMeal}>Add Meal</button>
            <button style={{ ...styles.button, backgroundColor: "#aaa" }} onClick={() => setShowAdd(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;
