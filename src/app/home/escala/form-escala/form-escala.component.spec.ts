import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEscalaComponent } from './form-escala.component';

describe('FormEscalaComponent', () => {
  let component: FormEscalaComponent;
  let fixture: ComponentFixture<FormEscalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEscalaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormEscalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
