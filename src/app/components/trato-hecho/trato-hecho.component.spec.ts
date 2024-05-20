import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TratoHechoComponent } from './trato-hecho.component';

describe('TratoHechoComponent', () => {
  let component: TratoHechoComponent;
  let fixture: ComponentFixture<TratoHechoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TratoHechoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TratoHechoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
