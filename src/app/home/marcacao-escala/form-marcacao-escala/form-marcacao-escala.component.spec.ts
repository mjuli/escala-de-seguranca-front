import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMarcacaoEscalaComponent } from './form-marcacao-escala.component';

describe('FormMarcacaoEscalaComponent', () => {
  let component: FormMarcacaoEscalaComponent;
  let fixture: ComponentFixture<FormMarcacaoEscalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormMarcacaoEscalaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormMarcacaoEscalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
