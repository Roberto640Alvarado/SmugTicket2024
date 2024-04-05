import { saveAs } from 'file-saver';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const generatePDF = async ({ event, localidades, noVendidos }) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();

  const { width, height } = page.getSize();

  const fontSize = 12;
  const padding = 20;

  // Añadir el nombre del evento al título del PDF
  page.drawText(`Reporte: ${event.descripcion}`, {
    x: padding,
    y: height - padding,
    size: fontSize + 6,
    font: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
    color: rgb(0, 0, 0),
  });

  page.drawText(`Tickets vendidos: ${event.tickets_disponibles}`, {
    x: padding,
    y: height - padding - fontSize * 2,
    size: fontSize,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });

  page.drawText('Localidades populares:', {
    x: padding,
    y: height - padding - fontSize * 3,
    size: fontSize,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });

  for (let index = 0; index < localidades.length; index++) {
    const localidad = localidades[index];
    const text = `${index + 1}. ${localidad.descripcion}: ${localidad.tickets}`;
    page.drawText(text, {
      x: padding,
      y: height - padding - fontSize * (4 + index),
      size: fontSize,
      font: await pdfDoc.embedFont(StandardFonts.Helvetica),
      color: rgb(0, 0, 0),
    });
  }

  page.drawText(`Cantidad de entradas no vendidas: ${noVendidos}`, {
    x: padding,
    y: height - padding - fontSize * (4 + localidades.length),
    size: fontSize,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });
  const pdfBytes = await pdfDoc.save();

  // Guardar el PDF con un nombre específico
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  saveAs(blob, `reporte_${event.descripcion}.pdf`);
};

export { generatePDF };
