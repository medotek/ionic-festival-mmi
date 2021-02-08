import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormInscriptionPage } from './form-inscription.page';

describe('FormInscriptionPage', () => {
  let component: FormInscriptionPage;
  let fixture: ComponentFixture<FormInscriptionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormInscriptionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormInscriptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
