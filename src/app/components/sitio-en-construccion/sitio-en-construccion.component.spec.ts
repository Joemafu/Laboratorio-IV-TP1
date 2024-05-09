import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitioEnConstruccionComponent } from './sitio-en-construccion.component';

describe('SitioEnConstruccionComponent', () => {
  let component: SitioEnConstruccionComponent;
  let fixture: ComponentFixture<SitioEnConstruccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SitioEnConstruccionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SitioEnConstruccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
