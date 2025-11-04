import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function OrdersHistory() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [selectedOrders, setSelectedOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];
    setOrders(storedOrders);
    setFilteredOrders(storedOrders);
  }, []);

  const handleFilter = () => {
    if (!filterDate) return setFilteredOrders(orders);
    const filtered = orders.filter((order) => {
      const orderDate = new Date(order.time).toISOString().split("T")[0];
      return orderDate === filterDate;
    });
    setFilteredOrders(filtered);
  };

  const handleGenerateReceipt = (order) => {
    const receiptWindow = window.open("", "_blank");
    receiptWindow.document.write(`
      <html>
        <head>
          <title>Order Receipt</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: Arial, sans-serif; background:#000; color:#fff; padding:20px; }
            h2 { color:#ff6f00; }
            ul { list-style:none; padding:0; }
            li { margin:6px 0; }
            button {
              background:#ff6f00; border:none; color:#fff;
              padding:10px 20px; border-radius:6px; cursor:pointer; font-weight:600;
              margin-top:15px;
            }
            .dark { background:#333; margin-left:10px; }
          </style>
        </head>
        <body>
          <h2>Order Receipt</h2>
          <p><strong>Order ID:</strong> ${order.id}</p>
          <p><strong>Date:</strong> ${new Date(order.time).toLocaleString()}</p>
          <p><strong>Payment:</strong> ${order.paymentMethod.toUpperCase()}</p>
          <hr/>
          <ul>${order.items.map(i => `<li>${i.name} - ₦${i.price} × ${i.quantity}</li>`).join("")}</ul>
          <hr/>
          <p><strong>Total:</strong> ₦${order.total}</p>
          <button onclick="window.print()">Print</button>
          <button class="dark" onclick="window.location.href='/'">Go Home</button>
        </body>
      </html>
    `);
    receiptWindow.document.close();
  };

  const handleSelectOrder = (id) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((orderId) => orderId !== id) : [...prev, id]
    );
  };

  const handleClearSelected = () => {
    if (selectedOrders.length === 0) {
      alert("Please select at least one order to clear.");
      return;
    }

    if (window.confirm("Are you sure you want to delete selected orders?")) {
      const updatedOrders = orders.filter((order) => !selectedOrders.includes(order.id));
      setOrders(updatedOrders);
      setFilteredOrders(updatedOrders);
      setSelectedOrders([]);
      localStorage.setItem("orderHistory", JSON.stringify(updatedOrders));
    }
  };

  return (
    <div className="orders-container">
      <h2>Order History</h2>

      <div className="filter-box">
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        <button onClick={handleFilter}>Filter</button>
        <button
          className="clear-btn"
          onClick={handleClearSelected}
          disabled={selectedOrders.length === 0}
        >
          Clear Selected
        </button>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="empty-state">No processed orders found.</div>
      ) : (
        <div className="orders-list">
          {filteredOrders.map((order) => (
            <div key={order.id} className="order-item">
              <div className="order-header">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(order.id)}
                    onChange={() => handleSelectOrder(order.id)}
                  />
                </label>
                <span className="order-id">Order #{order.id}</span>
                <span className="order-time">
                  {new Date(order.time).toLocaleString()}
                </span>
              </div>

              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} — ₦{item.price} × {item.quantity}
                  </li>
                ))}
              </ul>

              <p className="order-total">Total: ₦{order.total}</p>
              <p className="order-payment">
                Payment: {order.paymentMethod.toUpperCase()}
              </p>

              <div className="button-row">
                <button onClick={() => handleGenerateReceipt(order)}>
                  Generate Receipt
                </button>
                <button className="dark" onClick={() => navigate("/")}>
                  Go Home
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .orders-container {
          font-family: Arial, sans-serif;
          background: #1e1e1e;
          min-height: 100vh;
          width: 100%;
          max-width: 75rem;
          margin: 0 auto;
          padding: 40px 20px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        h2 {
          font-size: 2rem;
          color: #ffb74d;
          text-align: center;
          margin-bottom: 30px;
        }

        .filter-box {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 30px;
          width: 100%;
          max-width: 600px;
        }

        .filter-box input {
          padding: 8px;
          border-radius: 6px;
          border: 1px solid #ccc;
          font-size: 1rem;
          flex: 1;
          min-width: 150px;
        }

        .filter-box button {
          background: #ff6f00;
          color: #fff;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
        }

        .filter-box .clear-btn {
          background: #d32f2f;
        }

        .filter-box .clear-btn:disabled {
          background: #777;
          cursor: not-allowed;
        }

        .orders-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: stretch;
          gap: 30px;
          width: 100%;
        }

        .order-item {
          background: #fff;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          flex: 1 1 calc(33.333% - 30px);
          min-width: 280px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: #222;
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          margin-bottom: 10px;
          align-items: center;
        }

        .order-id {
          font-weight: bold;
          color: #ff6f00;
        }

        .order-time {
          font-size: 0.9rem;
          color: #555;
        }

        .checkbox input {
          transform: scale(1.3);
          cursor: pointer;
          accent-color: #ff6f00;
          margin-right: 5px;
        }

        .button-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 10px;
        }

        .button-row button {
          background: #ff6f00;
          color: #fff;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
        }

        .button-row .dark {
          background: #333;
        }

        .empty-state {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 70vh;
          color: #ffb74d;
          font-size: 1.3rem;
          text-align: center;
          width: 100%;
        }

        @media (max-width: 1024px) {
          .order-item {
            flex: 1 1 calc(50% - 20px);
          }
        }

        @media (max-width: 700px) {
          .order-item {
            flex: 1 1 100%;
          }
          h2 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}

export default OrdersHistory;
