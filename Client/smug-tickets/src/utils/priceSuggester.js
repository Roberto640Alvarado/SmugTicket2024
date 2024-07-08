
import eventService from '../services/Event/EventService'; 
import { Layer, Network, Trainer } from 'synaptic';

export const trainAndSuggestPrices = async (token, lugar) => {
    try {
      //Obtener los precios del servicio
      const precios = await eventService.getPreciosPorLugar(token, lugar);
  
      if (precios.hasError) {
        throw new Error('Error fetching prices');
      }
  
      //console.log("Datos de precios obtenidos:", precios);
  
      const inputLayer = new Layer(1);
      const hiddenLayer = new Layer(3);
      const outputLayer = new Layer(1);
  
      inputLayer.project(hiddenLayer);
      hiddenLayer.project(outputLayer);
  
      const net = new Network({
        input: inputLayer,
        hidden: [hiddenLayer],
        output: outputLayer
      });
  
      const trainer = new Trainer(net);
  
      //Preparar los datos para el entrenamiento
      const trainingData = precios.map(precio => ({ input: [precio / 1000], output: [precio / 1000] }));
  
      //console.log("Datos de entrenamiento preparados:", trainingData);
  
      //Entrenar la red neuronal
      const trainingResult = trainer.train(trainingData, {
        rate: 0.1,
        iterations: 20000,
        error: 0.005
      });
  
      //console.log("Resultado del entrenamiento:", trainingResult);
  
      // Generar predicciones
      const suggestions = precios.slice(0, 3).map(precio => net.activate([precio / 1000])[0] * 1000);
  
      //console.log("Sugerencias generadas:", suggestions);
  
      //Retornar las 3 sugerencias
      return suggestions;
    } catch (error) {
      console.error('Error training neural network:', error);
      return [];
    }
  };