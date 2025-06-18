import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponsesComponent } from './responses.component';
import { SurveyApiService } from './survey-api.service';
import { of } from 'rxjs';

describe('ResponsesComponent', () => {
  let component: ResponsesComponent;
  let fixture: ComponentFixture<ResponsesComponent>;
  let apiServiceSpy: jasmine.SpyObj<SurveyApiService>;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj('SurveyApiService', ['getResponses', 'deleteResponse']);
    await TestBed.configureTestingModule({
      imports: [ResponsesComponent],
      providers: [{ provide: SurveyApiService, useValue: apiServiceSpy }]
    }).compileComponents();
    fixture = TestBed.createComponent(ResponsesComponent);
    component = fixture.componentInstance;
  });

  it('should load responses on init', () => {
    const mockResponses = [
      { id: '1', response: { foo: 'bar' }, date: '2024-01-01' }
    ];
    apiServiceSpy.getResponses.and.returnValue(of(mockResponses));
    component.ngOnInit();
    expect(component.responses).toEqual(mockResponses);
  });

  it('should call deleteResponse and refresh', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    apiServiceSpy.deleteResponse.and.returnValue(of({}));
    spyOn(component, 'refresh');
    component.deleteResponse('1');
    expect(apiServiceSpy.deleteResponse).toHaveBeenCalledWith('1');
    expect(component.refresh).toHaveBeenCalled();
  });

  it('should handle error on getResponses', () => {
    apiServiceSpy.getResponses.and.returnValue(of([]));
    component.responses = [{ id: '1', response: {}, date: '2024-01-01' }];
    component.refresh();
    expect(component.responses).toEqual([]);
  });

  it('should not delete if no id', () => {
    spyOn(window, 'alert');
    component.deleteResponse(undefined as any);
    expect(window.alert).toHaveBeenCalled();
  });

  it('should not delete if user cancels', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    component.deleteResponse('1');
    expect(apiServiceSpy.deleteResponse).not.toHaveBeenCalled();
  });

  it('should emit loadResponse on startEdit', () => {
    spyOn(component.loadResponse, 'emit');
    const item = { id: '1', response: {}, date: '2024-01-01' };
    component.startEdit(0, item);
    expect(component.loadResponse.emit).toHaveBeenCalledWith({ response: item.response, id: item.id });
  });

  it('should alert if trying to edit without id', () => {
    spyOn(window, 'alert');
    component.startEdit(0, { id: '', response: {}, date: '2024-01-01' } as any);
    expect(window.alert).toHaveBeenCalled();
  });
});
