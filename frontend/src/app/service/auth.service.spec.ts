import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { API_URL, HTTP_OPTIONS } from '../core/constants/constants';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a login request to the API', () => {
    const mockUsername = 'testUser';
    const mockPassword = 'testPassword';

    service.login(mockUsername, mockPassword).subscribe(() => {
      // Assertion or additional logic if needed
    });

    const request = httpMock.expectOne(API_URL + 'login');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ login: mockUsername, senha: mockPassword });
    expect(request.request.headers).toEqual(HTTP_OPTIONS.headers);
    request.flush({});
  });

  // Add more test cases as needed
});