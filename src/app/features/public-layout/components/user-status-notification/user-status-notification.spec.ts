import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStatusNotification } from './user-status-notification';

describe('UserStatusNotification', () => {
  let component: UserStatusNotification;
  let fixture: ComponentFixture<UserStatusNotification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserStatusNotification]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserStatusNotification);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
