import { Injectable, Optional, Inject } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse, HttpEvent } from '@angular/common/http';
import { Configuration } from '../configuration';
import { LocalService } from '../cookie/local.service';
import { BASE_PATH } from '../variables';
import { Observable } from 'rxjs';
import { Cookie } from 'src/app/enumeration/cookie.enum';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  protected basePath = 'http://clerkvest.com:8080/api';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  constructor(protected httpClient: HttpClient, private local: LocalService, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
    if (basePath) {
      this.basePath = basePath;
    }
    if (configuration) {
      this.configuration = configuration;
      this.basePath = basePath || configuration.basePath || this.basePath;
    }
  }

  /**
    * @param consumes string[] mime-types
    * @return true: consumes contains 'multipart/form-data', false: otherwise
    */
  private canConsumeForm(consumes: string[]): boolean {
    const form = 'multipart/form-data';
    for (const consume of consumes) {
      if (form === consume) {
        return true;
      }
    }
    return false;
  }

  /**
    * Uploaded a picture and sets it as company image
    * Returns image id
    * @param companyId company id
    * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
    * @param reportProgress flag to report request and response progress.
    */
  public createCompany(companyId: Number, observe?: 'body', reportProgress?: boolean): Observable<string>;
  public createCompany(companyId: Number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<string>>;
  public createCompany(companyId: Number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<string>>;
  public createCompany(companyId: Number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

    if (companyId === null || companyId === undefined) {
      throw new Error('Required parameter token was null or undefined when calling createCompany.');
    }

    let headers = this.defaultHeaders;

    // authentication (APIKeyHeader) required
    headers = headers.set('Authorization', 'Bearer '  + this.local.get(Cookie.TOKEN));

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      'application/json'
    ];
  
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [
    ];

    return this.httpClient.get<string>(`${this.basePath}/image/create/company/${encodeURIComponent(String(companyId))}`, { 
      withCredentials: this.configuration.withCredentials,
      headers: headers,
      observe: observe,     
      reportProgress: reportProgress    
    });
  }

  /**
    * Uploaded a picture and sets it as company image
    * Returns image id
    * @param companyId company id
    * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
    * @param reportProgress flag to report request and response progress.
    */
  public createProject(projectId: Number, observe?: 'body', reportProgress?: boolean): Observable<string>;
  public createProject(projectId: Number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<string>>;
  public createProject(projectId: Number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<string>>;
  public createProject(projectId: Number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
 
    if (projectId === null || projectId === undefined) {
      throw new Error('Required parameter token was null or undefined when calling createProject.');
    }
 
    let headers = this.defaultHeaders;
 
    // authentication (APIKeyHeader) required
    headers = headers.set('Authorization', 'Bearer '  + this.local.get(Cookie.TOKEN));
 
    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      'application/json'
    ];
   
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }
 
    // to determine the Content-Type header
    const consumes: string[] = [
    ];
 
    return this.httpClient.get<string>(`${this.basePath}/image/create/project/${encodeURIComponent(String(projectId))}`, { 
      withCredentials: this.configuration.withCredentials,
      headers: headers,
      observe: observe,     
      reportProgress: reportProgress    
    });
   }
}
