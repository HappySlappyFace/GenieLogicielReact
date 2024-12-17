import React from "react";
import { Button } from "antd";
import "./Invoice.css"; // Custom CSS for styling

const InvoiceRender = ({ factureDetails, onClose }) => {
  return (
    <div className="invoice-wrapper">
      {/* Invoice Header */}
      <div className="invoice-header">
        <div>
          <h1>INVOICE</h1>
          <p>
            <strong>Facture Number:</strong> {factureDetails.numero}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(factureDetails.date).toLocaleDateString()}
          </p>
        </div>
        <div className="invoice-total">
          <p>
            <strong>Total Amount:</strong>{" "}
            <span className="total-amount">
              {factureDetails.montantTotal.toFixed(2)} TND
            </span>
          </p>
        </div>
      </div>

      {/* Reparations Table */}
      <div className="invoice-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Repair Date</th>
              <th>Description</th>
              <th>Piece Name</th>
              <th>HT Price</th>
              <th>TTC Price</th>
              <th>Hourly Rate (HMO)</th>
              <th>Work Time (Hours)</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {factureDetails.reparations.map((repair) => (
              <tr key={repair.idReparation}>
                <td>{repair.idReparation}</td>
                <td>{new Date(repair.dateRep).toLocaleDateString()}</td>
                <td>{repair.description}</td>
                <td>{repair.pieceName || "N/A"}</td>
                <td>{repair.prixHT?.toFixed(2) || "0.00"} TND</td>
                <td>{repair.prixTTC?.toFixed(2) || "0.00"} TND</td>
                <td>{repair.tarifHMO}</td>
                <td>{repair.tempsMO}</td>
                <td>
                  {(
                    repair.tarifHMO * repair.tempsMO +
                    (repair.prixTTC || 0)
                  ).toFixed(2)}{" "}
                  TND
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="invoice-footer">
        <p>
          <strong>Total Amount:</strong>{" "}
          {factureDetails.montantTotal.toFixed(2)} TND
        </p>
        <p>Thank you for your business!</p>
      </div>
    </div>
  );
};

export default InvoiceRender;
