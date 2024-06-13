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
        businessTitle: ['', Validators.required],
        itemTitle: ['', Validators.required],
        sku: ['', Validators.required],
        price: ['', [Validators.required, Validators.min(0)]],
        discountedPrice: ['', [Validators.required, Validators.min(0)]],
        logo: [null],
      },
      { validators: this.priceValidator() }
    );
  }

  ngOnInit(): void {
    // Perform any setup or initialization tasks here
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.signForm.patchValue({
      logo: file,
    });
  }

  generatePDF() {
    if (this.signForm.valid) {
      const formData = this.signForm.value;
      const doc = new jsPDF();

      doc.text(formData.businessTitle, 10, 10);
      doc.text(formData.itemTitle, 10, 20);
      doc.text(`SKU: ${formData.sku}`, 10, 30);
      doc.text(`Price: ${formData.price}`, 10, 40);
      doc.text(`Discounted Price: ${formData.discountedPrice}`, 10, 50);

      if (formData.logo) {
        const img = new Image();
        img.src = URL.createObjectURL(formData.logo);
        img.onload = () => {
          doc.addImage(img, 'PNG', 10, 60, 50, 50);
          doc.save('sign.pdf');
        };
      } else {
        doc.save('sign.pdf');
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
