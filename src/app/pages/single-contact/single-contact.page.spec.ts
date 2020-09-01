import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SingleContactPage } from './single-contact.page';

describe('SingleContactPage', () => {
  let component: SingleContactPage;
  let fixture: ComponentFixture<SingleContactPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleContactPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SingleContactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
