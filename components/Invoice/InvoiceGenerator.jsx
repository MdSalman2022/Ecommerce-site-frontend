"use client";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import dynamic from "next/dynamic";

const ComponentToPrint = dynamic(() => import("./ComponentToPrint"), {
  ssr: false,
});

const InvoiceGenerator = ({ order }) => {
  const contentRef = useRef();

  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Invoice Preview */}
      <div style={{
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        overflow: "hidden",
        backgroundColor: "white",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}>
        <ComponentToPrint
          ref={contentRef}
          order={order}
        />
      </div>
      
      {/* Print Button */}
      <button
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          width: "100%",
          padding: "14px 24px",
          backgroundColor: "#1a1a1a",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: "600",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#333"}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#1a1a1a"}
        onClick={() => reactToPrintFn()}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 6 2 18 2 18 9"></polyline>
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
          <rect x="6" y="14" width="12" height="8"></rect>
        </svg>
        Print Invoice
      </button>
    </div>
  );
};

export default InvoiceGenerator;
