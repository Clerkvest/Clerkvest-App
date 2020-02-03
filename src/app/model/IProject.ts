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
import {IEmployee} from './IEmployee';


export interface IProject {
    id?: number;
    employeeId?: number;
    link?: string;
    title?: string;
    description?: string;
    goal?: number;
    investedIn?: number;
    reached?: boolean;
    image?: string;
    createdAt?: Date;
    fundedAt?: Date;
}
