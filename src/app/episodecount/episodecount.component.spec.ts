import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodecountComponent } from './episodecount.component';

describe('EpisodecountComponent', () => {
  let component: EpisodecountComponent;
  let fixture: ComponentFixture<EpisodecountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpisodecountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodecountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
