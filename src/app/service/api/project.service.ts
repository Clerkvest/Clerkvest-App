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
import { Observable } from 'rxjs';

import { IProject } from '../../model/IProject';
import { Cookie } from '../../enumeration/cookie.enum';
import { LocalService } from '../cookie/local.service';
import { IProjectImage } from 'src/app/model/IProjectImage';


@Injectable()
export class ProjectService {

    protected basePath = 'https://clerkvest.com/api';
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
     * Add a new Project to the Company
     * Adds a new Project
     * @param body New Project Object
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public addProject(body: IProject, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public addProject(body: IProject, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public addProject(body: IProject, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public addProject(body: IProject, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling addProject.');
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

        return this.httpClient.post<any>(`${this.basePath}/project/create`,
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
     * Deletes a Project
     * 
     * @param projectId Project id to delete
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteProject(projectId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteProject(projectId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteProject(projectId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteProject(projectId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (projectId === null || projectId === undefined) {
            throw new Error('Required parameter projectId was null or undefined when calling deleteProject.');
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

        return this.httpClient.delete<any>(`${this.basePath}/project/delete/${encodeURIComponent(String(projectId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get a Project by the Project Id
     * Get a Project by the Project Id
     * @param projectId Project Id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getProject(projectId: string, observe?: 'body', reportProgress?: boolean): Observable<IProject>;
    public getProject(projectId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<IProject>>;
    public getProject(projectId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<IProject>>;
    public getProject(projectId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (projectId === null || projectId === undefined) {
            throw new Error('Required parameter projectId was null or undefined when calling getProject.');
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

        return this.httpClient.get<IProject>(`${this.basePath}/project/get/${encodeURIComponent(projectId)}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get All Projects
     * Gets All Projects of a Company
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getProjects(observe?: 'body', reportProgress?: boolean): Observable<Array<IProjectImage>>;
    public getProjects(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<IProjectImage>>>;
    public getProjects(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<IProjectImage>>>;
    public getProjects(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.get<Array<IProjectImage>>(`${this.basePath}/project/all/image`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update an existing Project
     * 
     * @param body Project object that needs to be updated
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateProject(body: IProject, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateProject(body: IProject, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateProject(body: IProject, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateProject(body: IProject, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateProject.');
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
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.put<any>(`${this.basePath}/project/update`,
            body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }
}
