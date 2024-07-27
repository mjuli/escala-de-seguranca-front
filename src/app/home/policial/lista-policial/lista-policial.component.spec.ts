import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPolicialComponent } from './lista-policial.component';

describe('ListaPolicialComponent', () => {
  let component: ListaPolicialComponent;
  let fixture: ComponentFixture<ListaPolicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPolicialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaPolicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
