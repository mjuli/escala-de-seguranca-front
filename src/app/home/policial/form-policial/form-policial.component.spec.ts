import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPolicialComponent } from './form-policial.component';

describe('FormPolicialComponent', () => {
  let component: FormPolicialComponent;
  let fixture: ComponentFixture<FormPolicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPolicialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormPolicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
