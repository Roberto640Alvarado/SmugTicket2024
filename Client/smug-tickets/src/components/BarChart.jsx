import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Bars({ localidades }) {
  var colores = ["#E01A4F", "#E98A15", "#E01A4F", "#E98A15", "#E01A4F", "#E98A15", "#E01A4F"];

  var misopciones = {
    responsive: true,
    animation: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20, // Establecer el tamaño del paso en 20
        },
        grid: {
          color: 'transparent', // Establecer el color de la cuadrícula en transparente
        },
      },
      x: {
        ticks: { color: colores },
        grid: {
          color: 'transparent', // Establecer el color de la cuadrícula en transparente
        },
      },
    }
  };

  var midata = {
    labels: localidades.map((localidad) => localidad.descripcion), // Utiliza el array de localidades
    datasets: [
      {
        label: "Ticket Vendido",
        data: localidades.map((localidad) => localidad.tickets), // Utiliza el array de localidades
        backgroundColor: colores,
      },
    ],
  };

  return <Bar data={midata} options={misopciones} />;
}
