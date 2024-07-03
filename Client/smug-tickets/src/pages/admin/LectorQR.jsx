import { useState, useEffect } from "react";
import { useZxing } from "react-zxing";
import NavbarQR from "../../components/Navbar/NavbarQR";
import ticketService from "../../services/Ticket/TicketService";
import context from "../../Context/UserContext";

const LectorQR = () => {
  const [result, setResult] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [noCodeMessage, setNoCodeMessage] = useState(false);
  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
      setNoCodeMessage(false); // Ocultar el mensaje cuando se detecta un código
    },
  });

  useEffect(() => {
    const verificarTicket = async () => {
      if (result) {
        try {
          const token = context.getToken();
          const eventoId = result;

          const response = await ticketService.verificarTicket(token, eventoId);

          // Suponemos que la respuesta tiene una propiedad 'verified' que indica el estado del ticket
          setVerificationResult(response);
        } catch (error) {
          console.error("Error al verificar el ticket:", error);
          setVerificationResult({ verified: false, message: "Error al verificar el ticket." }); // Asegurarse de manejar el error
        }
      }
    };

    verificarTicket();
  }, [result]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!result) {
        setNoCodeMessage(true);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [result]);

  const getVerificationMessage = () => {
    if (verificationResult === null) return null;
    if (verificationResult.verified) {
      return {
        message: verificationResult.message || "No se pudo verificar el ticket.",
        color: "bg-red-200 border-red-500",
      };
    } else {
      return {
        message: "Ticket verificado exitosamente.",
        color: "bg-green-200 border-green-500",
      };
    }
  };

  const verificationMessage = getVerificationMessage();

  return (
    <>
      <NavbarQR />
      <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10 px-4">
        <p className="text-2xl font-bold mb-5 text-center">Escanea tu ticket</p>
        <p className="text-lg text-blue-600 mb-5 text-center">Asegúrate de centrar tu código</p>
        <div className="w-full flex justify-center mb-5 relative">
          <video className="border rounded-lg shadow-lg w-full max-w-md h-64" ref={ref} />
          {noCodeMessage && (
            <p className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-lg text-red-500">
              Acerca tu código
            </p>
          )}
        </div>
        {verificationMessage && (
          <div className={`mt-5 p-4 border rounded-lg shadow-lg text-center w-full max-w-md ${verificationMessage.color}`}>
            <p className="text-lg font-bold mb-2">Resultado de la verificación:</p>
            <p className="text-sm">{verificationMessage.message}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default LectorQR;
