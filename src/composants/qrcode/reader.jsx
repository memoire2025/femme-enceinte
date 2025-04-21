import React, { useEffect, useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";
import { Html5QrcodeScanner } from 'html5-qrcode';

export const QRScanner = ({ onScanSuccess }) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner('qr-reader', {
      fps: 10,
      qrbox: 250,
    });

    scanner.render(
      (decodedText, decodedResult) => {
        console.log('QR Code decoded:', decodedText);
        onScanSuccess(decodedText);
      },
      (error) => {
        // Optionnel : log en cas d'échec
        // console.warn('QR Code scan error:', error);
      }
    );

    // Nettoyage du scanner à la destruction du composant
    return () => scanner.clear();
  }, [onScanSuccess]);

  return <div id="qr-reader" />;
};



export const QRCodeList = () => {
  const [users, setUsers] = useState([]);
  const qrRefs = useRef([]); // tableau de références

  useEffect(() => {
    axios.get("http://localhost/backend-php/api/get-all-users.php")
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDownload = (index, filename) => {
    const canvas = qrRefs.current[index]?.querySelector("canvas");
    if (!canvas) return;

    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}.png`;
    link.click();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>QR Codes des utilisateurs</h2>

      {users.map((user, index) => (
        <div
          key={index}
          style={{
            marginBottom: "30px",
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "10px"
          }}
        >
          <p><strong>Nom :</strong> {user.nom}</p>
          <p><strong>Email :</strong> {user.email}</p>
          <p><strong>Rôle :</strong> {user.role}</p>

          {/* QR Code avec ref */}
          <div ref={el => (qrRefs.current[index] = el)}>
            <QRCodeCanvas value={JSON.stringify(user)} size={180} />
          </div>

          <button
            onClick={() => handleDownload(index, `qr-${user.nom.replace(/\s+/g, "_")}`)}
            style={{ marginTop: "10px" }}
          >
            Télécharger le QR Code
          </button>
        </div>
      ))}
    </div>
  );
};

