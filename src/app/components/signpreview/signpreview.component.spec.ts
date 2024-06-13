import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignpreviewComponent } from './signpreview.component';

describe('SignpreviewComponent', () => {
  let component: SignpreviewComponent;
  let fixture: ComponentFixture<SignpreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignpreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignpreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
