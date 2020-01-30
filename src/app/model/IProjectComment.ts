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
import {IProject} from './IProject';


export interface IProjectComment {
    project_comment_id?: number;
    employee_id?: IEmployee;
    project_id?: IProject;
    title?: string;
    text?: string;
    date?: Date;
}