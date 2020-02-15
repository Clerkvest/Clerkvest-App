import { LocalService } from './../cookie/local.service';
/**
 * Api Documentation
 * Api Documentation
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';
import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';
import { Observable } from 'rxjs';
import { Cookie } from 'src/app/enumeration/cookie.enum';


@Injectable()
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
     * createCompanyImage
     * 
     * @param file file
     * @param id id
     * @param accountNonExpired 
     * @param accountNonLocked 
     * @param authorities0Authority 
     * @param companyId 
     * @param credentialsNonExpired 
     * @param employeeId 
     * @param enabled 
     * @param password 
     * @param token 
     * @param username 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createCompanyImageUsingPOST(file: Blob, id: number, accountNonExpired?: boolean, accountNonLocked?: boolean, authorities0Authority?: string, companyId?: number, credentialsNonExpired?: boolean, employeeId?: number, enabled?: boolean, password?: string, token?: string, username?: string, observe?: 'body', reportProgress?: boolean): Observable<number>;
    public createCompanyImageUsingPOST(file: Blob, id: number, accountNonExpired?: boolean, accountNonLocked?: boolean, authorities0Authority?: string, companyId?: number, credentialsNonExpired?: boolean, employeeId?: number, enabled?: boolean, password?: string, token?: string, username?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<number>>;
    public createCompanyImageUsingPOST(file: Blob, id: number, accountNonExpired?: boolean, accountNonLocked?: boolean, authorities0Authority?: string, companyId?: number, credentialsNonExpired?: boolean, employeeId?: number, enabled?: boolean, password?: string, token?: string, username?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<number>>;
    public createCompanyImageUsingPOST(file: Blob, id: number, accountNonExpired?: boolean, accountNonLocked?: boolean, authorities0Authority?: string, companyId?: number, credentialsNonExpired?: boolean, employeeId?: number, enabled?: boolean, password?: string, token?: string, username?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (file === null || file === undefined) {
            throw new Error('Required parameter file was null or undefined when calling createCompanyImageUsingPOST.');
        }

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling createCompanyImageUsingPOST.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (accountNonExpired !== undefined && accountNonExpired !== null) {
            queryParameters = queryParameters.set('accountNonExpired', <any>accountNonExpired);
        }
        if (accountNonLocked !== undefined && accountNonLocked !== null) {
            queryParameters = queryParameters.set('accountNonLocked', <any>accountNonLocked);
        }
        if (authorities0Authority !== undefined && authorities0Authority !== null) {
            queryParameters = queryParameters.set('authorities[0].authority', <any>authorities0Authority);
        }
        if (companyId !== undefined && companyId !== null) {
            queryParameters = queryParameters.set('companyId', <any>companyId);
        }
        if (credentialsNonExpired !== undefined && credentialsNonExpired !== null) {
            queryParameters = queryParameters.set('credentialsNonExpired', <any>credentialsNonExpired);
        }
        if (employeeId !== undefined && employeeId !== null) {
            queryParameters = queryParameters.set('employeeId', <any>employeeId);
        }
        if (enabled !== undefined && enabled !== null) {
            queryParameters = queryParameters.set('enabled', <any>enabled);
        }
        if (password !== undefined && password !== null) {
            queryParameters = queryParameters.set('password', <any>password);
        }
        if (token !== undefined && token !== null) {
            queryParameters = queryParameters.set('token', <any>token);
        }
        if (username !== undefined && username !== null) {
            queryParameters = queryParameters.set('username', <any>username);
        }

        let headers = this.defaultHeaders;

        // authentication (APIKeyHeader) required
        headers = headers.set('Authorization', 'Bearer '  + this.local.get(Cookie.TOKEN));

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'multipart/form-data'
        ];

        const canConsumeForm = this.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): void; };
        let useForm = false;
        let convertFormParamsToString = false;
        // use FormData to transmit files using content-type "multipart/form-data"
        // see https://stackoverflow.com/questions/4007969/application-x-www-form-urlencoded-or-multipart-form-data
        useForm = canConsumeForm;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        }

        if (file !== undefined) {
            formParams.append('file', <any>file);
        }

        return this.httpClient.post<number>(`${this.basePath}/image/create/company/${encodeURIComponent(String(id))}`,
            convertFormParamsToString ? formParams.toString() : formParams,
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
     * createProjectImage
     * 
     * @param file file
     * @param id id
     * @param accountNonExpired 
     * @param accountNonLocked 
     * @param authorities0Authority 
     * @param companyId 
     * @param credentialsNonExpired 
     * @param employeeId 
     * @param enabled 
     * @param password 
     * @param token 
     * @param username 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createProjectImageUsingPOST(file: Blob, id: number, accountNonExpired?: boolean, accountNonLocked?: boolean, authorities0Authority?: string, companyId?: number, credentialsNonExpired?: boolean, employeeId?: number, enabled?: boolean, password?: string, token?: string, username?: string, observe?: 'body', reportProgress?: boolean): Observable<number>;
    public createProjectImageUsingPOST(file: Blob, id: number, accountNonExpired?: boolean, accountNonLocked?: boolean, authorities0Authority?: string, companyId?: number, credentialsNonExpired?: boolean, employeeId?: number, enabled?: boolean, password?: string, token?: string, username?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<number>>;
    public createProjectImageUsingPOST(file: Blob, id: number, accountNonExpired?: boolean, accountNonLocked?: boolean, authorities0Authority?: string, companyId?: number, credentialsNonExpired?: boolean, employeeId?: number, enabled?: boolean, password?: string, token?: string, username?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<number>>;
    public createProjectImageUsingPOST(file: Blob, id: number, accountNonExpired?: boolean, accountNonLocked?: boolean, authorities0Authority?: string, companyId?: number, credentialsNonExpired?: boolean, employeeId?: number, enabled?: boolean, password?: string, token?: string, username?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (file === null || file === undefined) {
            throw new Error('Required parameter file was null or undefined when calling createProjectImageUsingPOST.');
        }

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling createProjectImageUsingPOST.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (accountNonExpired !== undefined && accountNonExpired !== null) {
            queryParameters = queryParameters.set('accountNonExpired', <any>accountNonExpired);
        }
        if (accountNonLocked !== undefined && accountNonLocked !== null) {
            queryParameters = queryParameters.set('accountNonLocked', <any>accountNonLocked);
        }
        if (authorities0Authority !== undefined && authorities0Authority !== null) {
            queryParameters = queryParameters.set('authorities[0].authority', <any>authorities0Authority);
        }
        if (companyId !== undefined && companyId !== null) {
            queryParameters = queryParameters.set('companyId', <any>companyId);
        }
        if (credentialsNonExpired !== undefined && credentialsNonExpired !== null) {
            queryParameters = queryParameters.set('credentialsNonExpired', <any>credentialsNonExpired);
        }
        if (employeeId !== undefined && employeeId !== null) {
            queryParameters = queryParameters.set('employeeId', <any>employeeId);
        }
        if (enabled !== undefined && enabled !== null) {
            queryParameters = queryParameters.set('enabled', <any>enabled);
        }
        if (password !== undefined && password !== null) {
            queryParameters = queryParameters.set('password', <any>password);
        }
        if (token !== undefined && token !== null) {
            queryParameters = queryParameters.set('token', <any>token);
        }
        if (username !== undefined && username !== null) {
            queryParameters = queryParameters.set('username', <any>username);
        }

        let headers = this.defaultHeaders;

        // authentication (APIKeyHeader) required
        headers = headers.set('Authorization', 'Bearer '  + this.local.get(Cookie.TOKEN));

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'multipart/form-data'
        ];

        const canConsumeForm = this.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): void; };
        let useForm = false;
        let convertFormParamsToString = false;
        // use FormData to transmit files using content-type "multipart/form-data"
        // see https://stackoverflow.com/questions/4007969/application-x-www-form-urlencoded-or-multipart-form-data
        useForm = canConsumeForm;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        }

        if (file !== undefined) {
            formParams.append('file', <any>file);
        }

        return this.httpClient.post<number>(`${this.basePath}/image/create/project/${encodeURIComponent(String(id))}`,
            convertFormParamsToString ? formParams.toString() : formParams,
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
     * getImage
     * 
     * @param id id
     * @param accountNonExpired 
     * @param accountNonLocked 
     * @param authorities0Authority 
     * @param companyId 
     * @param credentialsNonExpired 
     * @param employeeId 
     * @param enabled 
     * @param password 
     * @param token 
     * @param username 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getImageUsingGET(id: number, accountNonExpired?: boolean, accountNonLocked?: boolean, authorities0Authority?: string, companyId?: number, credentialsNonExpired?: boolean, employeeId?: number, enabled?: boolean, password?: string, token?: string, username?: string, observe?: 'body', reportProgress?: boolean): Observable<string>;
    public getImageUsingGET(id: number, accountNonExpired?: boolean, accountNonLocked?: boolean, authorities0Authority?: string, companyId?: number, credentialsNonExpired?: boolean, employeeId?: number, enabled?: boolean, password?: string, token?: string, username?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<string>>;
    public getImageUsingGET(id: number, accountNonExpired?: boolean, accountNonLocked?: boolean, authorities0Authority?: string, companyId?: number, credentialsNonExpired?: boolean, employeeId?: number, enabled?: boolean, password?: string, token?: string, username?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<string>>;
    public getImageUsingGET(id: number, accountNonExpired?: boolean, accountNonLocked?: boolean, authorities0Authority?: string, companyId?: number, credentialsNonExpired?: boolean, employeeId?: number, enabled?: boolean, password?: string, token?: string, username?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getImageUsingGET.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (accountNonExpired !== undefined && accountNonExpired !== null) {
            queryParameters = queryParameters.set('accountNonExpired', <any>accountNonExpired);
        }
        if (accountNonLocked !== undefined && accountNonLocked !== null) {
            queryParameters = queryParameters.set('accountNonLocked', <any>accountNonLocked);
        }
        if (authorities0Authority !== undefined && authorities0Authority !== null) {
            queryParameters = queryParameters.set('authorities[0].authority', <any>authorities0Authority);
        }
        if (companyId !== undefined && companyId !== null) {
            queryParameters = queryParameters.set('companyId', <any>companyId);
        }
        if (credentialsNonExpired !== undefined && credentialsNonExpired !== null) {
            queryParameters = queryParameters.set('credentialsNonExpired', <any>credentialsNonExpired);
        }
        if (employeeId !== undefined && employeeId !== null) {
            queryParameters = queryParameters.set('employeeId', <any>employeeId);
        }
        if (enabled !== undefined && enabled !== null) {
            queryParameters = queryParameters.set('enabled', <any>enabled);
        }
        if (password !== undefined && password !== null) {
            queryParameters = queryParameters.set('password', <any>password);
        }
        if (token !== undefined && token !== null) {
            queryParameters = queryParameters.set('token', <any>token);
        }
        if (username !== undefined && username !== null) {
            queryParameters = queryParameters.set('username', <any>username);
        }

        let headers = this.defaultHeaders;
        
        // authentication (APIKeyHeader) required
        headers = headers.set('Authorization', 'Bearer '  + this.local.get(Cookie.TOKEN));

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<string>(`${this.basePath}/image/get/${encodeURIComponent(String(id))}`,
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
