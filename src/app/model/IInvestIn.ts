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


export interface IInvestIn {
    invest_in_id?: number;
    project_id?: IProject;
    employee_id?: IEmployee;
    investment?: number;
}
