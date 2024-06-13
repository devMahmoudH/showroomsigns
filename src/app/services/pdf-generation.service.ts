import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';

@Injectable({
  providedIn: 'root',
})
export class PdfGenerationService {
  constructor() {}

  generatePDF(data: any) {
    const doc = new jsPDF();
    doc.text(data.businessTitle, 10, 10);
    doc.text(data.itemTitle, 10, 20);
    doc.text(`SKU: ${data.sku}`, 10, 30);
    doc.text(`Price: ${data.price}`, 10, 40);
    doc.text(`Discounted Price: ${data.discountedPrice}`, 10, 50);

    if (data.logo) {
      const img = new Image();
      img.src = URL.createObjectURL(data.logo);
      img.onload = () => {
        doc.addImage(img, 'PNG', 10, 60, 50, 50);
        doc.save('sign.pdf');
      };
    } else {
      doc.save('sign.pdf');
    }
  }
}
