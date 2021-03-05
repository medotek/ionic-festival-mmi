import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StatutPage } from './statut.page';

describe('StatutPage', () => {
  let component: StatutPage;
  let fixture: ComponentFixture<StatutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatutPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StatutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
