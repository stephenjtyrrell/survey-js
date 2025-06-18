import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SurveyApiService } from './survey-api.service';

describe('SurveyApiService', () => {
  let service: SurveyApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SurveyApiService]
    });
    service = TestBed.inject(SurveyApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch responses', () => {
    const mockResponses = [{ id: '1', response: {}, date: '2024-01-01' }];
    service.getResponses().subscribe(res => {
      expect(res).toEqual(mockResponses);
    });
    const req = httpMock.expectOne('http://localhost:3001/api/response');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponses);
  });

  it('should add a response', () => {
    const mockResponse = { id: '1', response: {}, date: '2024-01-01' };
    service.addResponse(mockResponse).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('http://localhost:3001/api/response');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should update a response', () => {
    const mockResponse = { id: '1', response: {}, date: '2024-01-01' };
    service.updateResponse('1', mockResponse).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('http://localhost:3001/api/response/1');
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse);
  });

  it('should delete a response', () => {
    service.deleteResponse('1').subscribe(res => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne('http://localhost:3001/api/response/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
