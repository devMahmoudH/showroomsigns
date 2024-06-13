import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-signpreview',
  templateUrl: './signpreview.component.html',
  styleUrls: ['./signpreview.component.css'],
})
export class SignpreviewComponent {
  @Input() formData: any;
}
