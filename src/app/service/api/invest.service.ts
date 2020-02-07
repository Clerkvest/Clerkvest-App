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
import { HttpClient, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';

import { BASE_PATH } from '../variables';
import { Configuration } from '../configuration';
import { IInvestIn } from '../../model/IInvestIn';
import { Observable } from 'rxjs';
import { Cookie } from '../../enumeration/cookie.enum';
import { LocalService } from '../cookie/local.service';


@Injectable()
export class InvestService {

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
     * Add a new Investment to a Project
     * Adds a new Investment
     * @param body New Investment Object
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public addInvestment(body: IInvestIn, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public addInvestment(body: IInvestIn, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public addInvestment(body: IInvestIn, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public addInvestment(body: IInvestIn, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling addInvestment.');
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
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<any>(`${this.basePath}/invest/create`,
            body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Deletes a Investment
     * 
     * @param investId Investment id to delete
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteInvest(investId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteInvest(investId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteInvest(investId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteInvest(investId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (investId === null || investId === undefined) {
            throw new Error('Required parameter investId was null or undefined when calling deleteInvest.');
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

        return this.httpClient.delete<any>(`${this.basePath}/invest/delete/${encodeURIComponent(String(investId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get a Investment by the Investment Id
     * Get a Investment by the Investment Id
     * @param investId Investment Id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getInvestment(investId: number, observe?: 'body', reportProgress?: boolean): Observable<IInvestIn>;
    public getInvestment(investId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<IInvestIn>>;
    public getInvestment(investId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<IInvestIn>>;
    public getInvestment(investId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (investId === null || investId === undefined) {
            throw new Error('Required parameter investId was null or undefined when calling getInvestment.');
        }

        let headers = this.defaultHeaders;

        // authentication (APIKeyHeader) required
        headers = headers.set('Authorization', 'Bearer '  + this.local.get(Cookie.TOKEN));

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<IInvestIn>(`${this.basePath}/invest/get/${encodeURIComponent(String(investId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get all Investments of a given Employee by Employee Id
     * Get all Investments of a given Employee by Employee Id
     * @param employeeId Employee Id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getInvestments(employeeId: number, observe?: 'body', reportProgress?: boolean): Observable<Array<IInvestIn>>;
    public getInvestments(employeeId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<IInvestIn>>>;
    public getInvestments(employeeId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<IInvestIn>>>;
    public getInvestments(employeeId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (employeeId === null || employeeId === undefined) {
            throw new Error('Required parameter employeeId was null or undefined when calling getInvestments.');
        }

        let headers = this.defaultHeaders;

        // authentication (APIKeyHeader) required
        headers = headers.set('Authorization', 'Bearer '  + this.local.get(Cookie.TOKEN));

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Array<IInvestIn>>(`${this.basePath}/invest/get/employee/${encodeURIComponent(String(employeeId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
