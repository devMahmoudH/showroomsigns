import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-signform',
  templateUrl: './signform.component.html',
  styleUrls: ['./signform.component.css'],
})
export class SignformComponent implements OnInit {
  signForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signForm = this.fb.group(
      {
        businessTitle: [''],
        itemTitle: ['', Validators.required],
        sku: ['', Validators.required],
        price: ['', [Validators.required, Validators.min(0)]],
        discountedPrice: ['', [Validators.required, Validators.min(0)]],
        logo: [null],
        productImage: [null], // New field for product image
      },
      { validators: this.priceValidator() }
    );
  }

  ngOnInit(): void {
    // Perform any setup or initialization tasks here
  }

  onFileChange(event: any, controlName: string) {
    const file = event.target.files[0];
    this.signForm.patchValue({
      [controlName]: file,
    });
  }

  generatePDF() {
    if (this.signForm.valid) {
      const formData = this.signForm.value;
      const doc = new jsPDF();

      if (formData.businessTitle) {
        doc.text(formData.businessTitle, 10, 10);
      }
      doc.setFont('helvetica', 'bold');
      doc.text(formData.itemTitle, 10, 20);
      doc.setFont('helvetica', 'normal');
      doc.text(`#: ${formData.sku}`, 10, 30);
      doc.setFont('helvetica', 'bold');
      doc.text(`$${formData.price}`, 10, 40);
      doc.text(`Now: $${formData.discountedPrice}`, 10, 50);

      const addImageToPDF = (
        imgData: any,
        x: number,
        y: number,
        width: number,
        height: number,
        callback: () => void
      ) => {
        const img = new Image();
        img.src = URL.createObjectURL(imgData);
        img.onload = () => {
          doc.addImage(img, 'PNG', x, y, width, height);
          callback();
        };
      };

      if (formData.logo) {
        addImageToPDF(formData.logo, 10, 60, 50, 50, () => {
          if (formData.productImage) {
            addImageToPDF(formData.productImage, 70, 60, 100, 100, () => {
              doc.autoPrint(); // This will directly print the PDF
              window.open(doc.output('bloburl'), '_blank');
            });
          } else {
            doc.autoPrint(); // This will directly print the PDF
            window.open(doc.output('bloburl'), '_blank');
          }
        });
      } else if (formData.productImage) {
        addImageToPDF(formData.productImage, 70, 60, 100, 100, () => {
          doc.autoPrint(); // This will directly print the PDF
          window.open(doc.output('bloburl'), '_blank');
        });
      } else {
        doc.autoPrint(); // This will directly print the PDF
        window.open(doc.output('bloburl'), '_blank');
      }
    }
  }

  private priceValidator() {
    return (group: FormGroup) => {
      const price = group.controls['price'].value;
      const discountedPrice = group.controls['discountedPrice'].value;

      return discountedPrice > price ? { priceInvalid: true } : null;
    };
  }
}
