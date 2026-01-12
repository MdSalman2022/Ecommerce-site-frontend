"use client";
import React, {forwardRef} from "react";
import QRCode from "react-qr-code";

const ComponentToPrint = forwardRef(({order}, ref) => {
  // Map BestDeal order fields
  const customerName = order?.name || "Customer";
  const customerPhone = order?.contact || "N/A";
  const customerEmail = order?.email || "";
  const customerAddress = order?.address || "";
  const customerCity = order?.city || "";
  const orderNumber =
    order?.orderId || order?._id?.slice(0, 8).toUpperCase() || "N/A";

  const formatStockDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    const month = date.toLocaleString("default", {month: "short"});
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const subtotal = order?.amount || 0;
  const discount = order?.discountAmount || 0;
  const shippingCost = order?.shippingCost || 0;
  const total = subtotal - discount + shippingCost;

  return (
    <div
      ref={ref}
      style={{
        padding: "32px",
        color: "#1a1a1a",
        fontSize: "13px",
        fontFamily: "'Segoe UI', Arial, sans-serif",
        backgroundColor: "white",
        maxWidth: "800px",
        margin: "0 auto",
        lineHeight: "1.5",
      }}
    >
      {/* ========== HEADER ========== */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "20px",
          borderBottom: "3px solid #1a1a1a",
          marginBottom: "24px",
        }}
      >
        <div style={{display: "flex", alignItems: "center", gap: "16px"}}>
          <img
            style={{height: "56px", width: "56px", objectFit: "contain"}}
            src="https://res.cloudinary.com/dnuulo3h5/image/upload/v1767881296/logo-colored_ee6kpe.webp"
            alt="Logo"
          />
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "22px",
                fontWeight: "700",
                letterSpacing: "-0.5px",
              }}
            >
              BestDeal Inc.
            </h1>
            <p style={{margin: "2px 0 0 0", fontSize: "12px", color: "#666"}}>
              123 E-commerce St, Tech City
            </p>
            <p style={{margin: "0", fontSize: "12px", color: "#666"}}>
              support@bestdeal.com | +880 1XXX-XXXXXX
            </p>
          </div>
        </div>
        <div style={{textAlign: "right"}}>
          <div
            style={{
              fontSize: "10px",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: "#888",
              marginBottom: "4px",
            }}
          >
            Invoice
          </div>
          <div
            style={{
              fontSize: "16px",
              fontWeight: "700",
              fontFamily: "monospace",
              backgroundColor: "#f5f5f5",
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid #e0e0e0",
            }}
          >
            #{orderNumber}
          </div>
          <p style={{margin: "8px 0 0 0", fontSize: "11px", color: "#666"}}>
            Date: {formatStockDate(order?.date)}
          </p>
        </div>
      </div>

      {/* ========== INFO GRID ========== */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          gap: "24px",
          marginBottom: "28px",
          alignItems: "start",
        }}
      >
        {/* Order Info */}
        <div
          style={{
            backgroundColor: "#fafafa",
            padding: "16px",
            borderRadius: "8px",
            border: "1px solid #eee",
          }}
        >
          <h3
            style={{
              margin: "0 0 12px 0",
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              color: "#555",
              borderBottom: "1px solid #ddd",
              paddingBottom: "8px",
            }}
          >
            Order Details
          </h3>
          <table style={{fontSize: "12px", width: "100%"}}>
            <tbody>
              <tr>
                <td style={{color: "#888", paddingBottom: "4px"}}>Order ID:</td>
                <td style={{fontWeight: "600"}}>{orderNumber}</td>
              </tr>
              <tr>
                <td style={{color: "#888", paddingBottom: "4px"}}>Date:</td>
                <td>{formatStockDate(order?.date)}</td>
              </tr>
              <tr>
                <td style={{color: "#888", paddingBottom: "4px"}}>Payment:</td>
                <td>
                  {order?.transactionId === "Cash on Delivery"
                    ? "Cash on Delivery"
                    : "Online Payment"}
                </td>
              </tr>
              <tr>
                <td style={{color: "#888"}}>Items:</td>
                <td>
                  {order?.cart?.length || order?.items?.length || 0} product(s)
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* QR Code */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px 24px",
          }}
        >
          <QRCode value={orderNumber} size={90} style={{marginBottom: "8px"}} />
          <p
            style={{
              margin: 0,
              fontSize: "10px",
              color: "#888",
              fontFamily: "monospace",
              letterSpacing: "0.5px",
            }}
          >
            {orderNumber}
          </p>
        </div>

        {/* Customer Info */}
        <div
          style={{
            backgroundColor: "#fafafa",
            padding: "16px",
            borderRadius: "8px",
            border: "1px solid #eee",
          }}
        >
          <h3
            style={{
              margin: "0 0 12px 0",
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              color: "#555",
              borderBottom: "1px solid #ddd",
              paddingBottom: "8px",
            }}
          >
            Ship To
          </h3>
          <p style={{margin: "0 0 4px 0", fontWeight: "600", fontSize: "14px"}}>
            {customerName}
          </p>
          <p style={{margin: "0 0 4px 0", fontSize: "12px", color: "#555"}}>
            {customerAddress}
            {customerCity ? `, ${customerCity}` : ""}
          </p>
          <p style={{margin: "0 0 2px 0", fontSize: "12px", color: "#555"}}>
            📞 {customerPhone}
          </p>
          {customerEmail && (
            <p style={{margin: "0", fontSize: "12px", color: "#555"}}>
              ✉️ {customerEmail}
            </p>
          )}
        </div>
      </div>

      {/* ========== ITEMS TABLE ========== */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "24px",
          fontSize: "12px",
        }}
      >
        <thead>
          <tr style={{backgroundColor: "#1a1a1a", color: "white"}}>
            <th style={thStyle}>#</th>
            <th style={{...thStyle, textAlign: "left", width: "50%"}}>
              Item Description
            </th>
            <th style={thStyle}>Qty</th>
            <th style={thStyle}>Unit Price</th>
            <th style={thStyle}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {(order?.cart || order?.items || [])?.map((item, index) => (
            <tr
              key={item._id || index}
              style={{backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9"}}
            >
              <td style={tdStyle}>{index + 1}</td>
              <td style={{...tdStyle, textAlign: "left", fontWeight: "500"}}>
                {item?.name || "N/A"}
              </td>
              <td style={tdStyle}>{item.quantity || 0}</td>
              <td style={tdStyle}>৳{item?.price?.toLocaleString()}</td>
              <td style={{...tdStyle, fontWeight: "600"}}>
                ৳{(item?.price * item.quantity).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ========== SUMMARY ========== */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "32px",
        }}
      >
        <div
          style={{
            width: "280px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <div style={summaryRow}>
            <span>Subtotal</span>
            <span>
              ৳{subtotal.toLocaleString(undefined, {minimumFractionDigits: 2})}
            </span>
          </div>
          {discount > 0 && (
            <div style={{...summaryRow, color: "#22c55e"}}>
              <span>Discount</span>
              <span>
                -৳
                {discount.toLocaleString(undefined, {minimumFractionDigits: 2})}
              </span>
            </div>
          )}
          <div style={summaryRow}>
            <span>Shipping</span>
            <span>
              {shippingCost > 0 ? (
                `৳${shippingCost.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}`
              ) : (
                <span style={{color: "#22c55e", fontWeight: "600"}}>Free</span>
              )}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px 16px",
              fontWeight: "700",
              fontSize: "16px",
              backgroundColor: "#1a1a1a",
              color: "white",
            }}
          >
            <span>Total Due</span>
            <span>
              ৳{total.toLocaleString(undefined, {minimumFractionDigits: 2})}
            </span>
          </div>
        </div>
      </div>

      {/* ========== FOOTER ========== */}
      <div
        style={{
          textAlign: "center",
          paddingTop: "20px",
          borderTop: "1px dashed #ccc",
        }}
      >
        <p
          style={{
            margin: "0 0 8px 0",
            fontSize: "13px",
            fontWeight: "600",
            color: "#333",
          }}
        >
          Thank you for shopping with BestDeal! 🙏
        </p>
        <p style={{margin: "0", fontSize: "11px", color: "#888"}}>
          Questions? Contact us at support@bestdeal.com or call +880 1XXX-XXXXXX
        </p>
      </div>
    </div>
  );
});

const thStyle = {
  padding: "12px 10px",
  fontSize: "11px",
  fontWeight: "600",
  textAlign: "center",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const tdStyle = {
  padding: "12px 10px",
  textAlign: "center",
  borderBottom: "1px solid #eee",
};

const summaryRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 16px",
  fontSize: "13px",
  borderBottom: "1px solid #eee",
  backgroundColor: "#fafafa",
};

export default ComponentToPrint;
