import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { ModeService } from '../../services/mode/mode.service';
import { signal } from '@angular/core';

class MockModeService{
  darkMode = signal<string>('null');

  handleMode(){
    this.darkMode.update((value)=>(value === 'dark'? 'null':'dark'))
  }
}

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let mockService: MockModeService;

  beforeEach(async () => {
    mockService = new MockModeService();

    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [{provide: ModeService, useValue: mockService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call toggleMode and handleMode method of ModeService', () => {
    const handleModeSpy = jest.spyOn(mockService, 'handleMode');
    component.toggleMode();
    expect(handleModeSpy).toHaveBeenCalled();
  });

  describe('ngOnChanges', () => {
    it('should call updateIcon method', () => {
      const updateIconSpy = jest.spyOn(component, 'updateIcon');
      component.selectedTopic = 'HTML';
      component.ngOnChanges();
      expect(updateIconSpy).toHaveBeenCalled();
    });

    it('should update topicIcon correctly based on selectedTopic', () => {
      const topics = {
        HTML: 'html',
        CSS: 'css',
        JavaScript: 'javascript',
        Accessibility: 'accessibility',
      };

      for (const [topic, icon] of Object.entries(topics)) {
        component.selectedTopic = topic;
        component.ngOnChanges();
        expect(component.topicIcon).toBe(icon);
      }
    });

    it('should set topicIcon to empty string for unknown topics', () => {
      component.selectedTopic = 'Unknown';
      component.ngOnChanges();
      expect(component.topicIcon).toBe('');
    });
  });
  
});
