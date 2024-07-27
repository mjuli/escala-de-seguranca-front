import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcacaoEscalaComponent } from './marcacao-escala.component';

describe('MarcacaoEscalaComponent', () => {
  let component: MarcacaoEscalaComponent;
  let fixture: ComponentFixture<MarcacaoEscalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarcacaoEscalaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarcacaoEscalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
