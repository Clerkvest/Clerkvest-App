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
import { IProjectComment } from '../../model/IProjectComment';
import { Observable } from 'rxjs';
import { Cookie } from '../../enumeration/cookie.enum';
import { LocalService } from '../cookie/local.service';


@Injectable()
export class CommentService {

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
     * Add a new Comment to a Project
     * 
     * @param body Comment object that needs to be added
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public addComment(body: IProjectComment, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public addComment(body: IProjectComment, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public addComment(body: IProjectComment, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public addComment(body: IProjectComment, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling addComment.');
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
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<any>(`${this.basePath}/comment/create`,
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
     * Deletes a Comment from a Project
     * 
     * @param commentId Comment id to delete
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteComment(commentId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteComment(commentId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteComment(commentId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteComment(commentId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (commentId === null || commentId === undefined) {
            throw new Error('Required parameter commentId was null or undefined when calling deleteComment.');
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

        return this.httpClient.delete<any>(`${this.basePath}/comment/delete/${encodeURIComponent(String(commentId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get all Comments of a given Project by Project Id
     * Get all Comments of a given Project by Project Id
     * @param projectId Project Id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getComments(projectId: number, observe?: 'body', reportProgress?: boolean): Observable<Array<IProjectComment>>;
    public getComments(projectId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<IProjectComment>>>;
    public getComments(projectId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<IProjectComment>>>;
    public getComments(projectId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (projectId === null || projectId === undefined) {
            throw new Error('Required parameter projectId was null or undefined when calling getComments.');
        }

        let headers = this.defaultHeaders;

        // authentication (APIKeyHeader) required
        headers = headers.set('X-API-Key', this.local.get(Cookie.TOKEN));

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

        return this.httpClient.get<Array<IProjectComment>>(`${this.basePath}/comment/${encodeURIComponent(String(projectId))}/comments`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
