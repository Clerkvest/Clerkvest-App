/**
 * Team Investment Tool
 * Team Investment Tool
 *
 * OpenAPI spec version: 1.0.0
 * Contact: admin@example.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from '../encoder';

import { BASE_PATH } from '../variables';
import { Configuration } from '../configuration';
import { ICompany } from '../../model/ICompany';
import { Observable } from 'rxjs';
import { Cookie } from '../../enumeration/cookie.enum';
import { LocalService } from '../cookie/local.service';


@Injectable()
export class CompanyService {

    protected basePath = 'http://127.0.0.1:8080/api';
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
     * Adds a new company
     * Adds a new company
     * @param mail Mail of the Admin User
     * @param body New Company
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public addCompany(mail: string, body: ICompany, observe?: 'body', reportProgress?: boolean): Observable<ICompany>;
    public addCompany(mail: string, body: ICompany, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ICompany>>;
    public addCompany(mail: string, body: ICompany, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ICompany>>;
    public addCompany(mail: string, body: ICompany, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (mail === null || mail === undefined) {
            throw new Error('Required parameter mail was null or undefined when calling addCompany.');
        }

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling addCompany.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (mail !== undefined && mail !== null) {
            queryParameters = queryParameters.set('mail', <any>mail);
        }

        let headers = this.defaultHeaders;

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
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<ICompany>(`${this.basePath}/company/create`,
            body,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Find Company by ID
     * Returns a single Company
     * @param companyId ID of Company to return
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getCompanyById(companyId: number, observe?: 'body', reportProgress?: boolean): Observable<ICompany>;
    public getCompanyById(companyId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ICompany>>;
    public getCompanyById(companyId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ICompany>>;
    public getCompanyById(companyId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (companyId === null || companyId === undefined) {
            throw new Error('Required parameter companyId was null or undefined when calling getCompanyById.');
        }

        let headers = this.defaultHeaders;

        // authentication (APIKeyHeader) required
        headers = headers.set('X-API-Key', this.local.get(Cookie.TOKEN));

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

        return this.httpClient.get<ICompany>(`${this.basePath}/company/get/${encodeURIComponent(String(companyId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Updates a company
     * Updates a company
     * @param body New Version of the provided Company
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateCompany(body: ICompany, observe?: 'body', reportProgress?: boolean): Observable<ICompany>;
    public updateCompany(body: ICompany, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ICompany>>;
    public updateCompany(body: ICompany, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ICompany>>;
    public updateCompany(body: ICompany, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateCompany.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});

        let headers = this.defaultHeaders;

        // authentication (APIKeyQueryParam) required
        queryParameters = queryParameters.set('api_key', this.local.get(Cookie.TOKEN));

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
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.put<ICompany>(`${this.basePath}/company/update`,
            body,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
