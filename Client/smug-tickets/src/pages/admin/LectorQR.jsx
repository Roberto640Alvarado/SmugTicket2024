import { useState, useEffect } from "react";
import { useZxing } from "react-zxing";
import NavbarQR from "../../components/Navbar/NavbarQR";
import ticketService from "../../services/Ticket/TicketService";
import context from "../../Context/UserContext";

const LectorQR = () => {
  const [result, setResult] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
    },
  });

  useEffect(() => {
    const verificarTicket = async () => {
      if (result) {
        try {
          const token = context.getToken();
          const eventoId = result;

          const ticketInfo = await ticketService.getTicketInformation(token, eventoId);

          console.log(ticketInfo);

          if (ticketInfo) {
            if (ticketInfo.estado === 1) {
              const response = await ticketService.verificarTicket(token, eventoId);

              // Actualiza el estado con el resultado de la verificación
              setVerificationResult(response);
            } else {
              setVerificationResult("El ticket ya fue escaneado");
            }
          } else {
            throw new Error();
          }
        } catch (error) {
          console.error("Error al verificar el ticket:", error);
          // Maneja el error según tus necesidades
        }
      }
    };

    verificarTicket();
  }, [result]);

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    padding: "20px",
  };

  const titleStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    margin: "10px 0",
  };

  const videoContainerStyle = {
    width: "100%",
    textAlign: "center",
    marginTop: "10px",
  };

  const previewStyle = {
    height: "50vh",
    width: "100%",
  };

  const ticketContainerStyle = {
    marginTop: "10px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    textAlign: "center",
  };

  return (
    <>
      <NavbarQR />
      <div style={containerStyle}>
        <p style={titleStyle}>Escanea tu ticket</p>
        <div style={videoContainerStyle}>
          <video style={previewStyle} ref={ref} />
          {verificationResult && (
            <div style={ticketContainerStyle}>
              <p style={{ fontSize: "18px", fontWeight: "bold" }}>Resultado de la verificación:</p>
              <p style={{ fontSize: "14px" }}>{JSON.stringify(verificationResult)}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LectorQR;


