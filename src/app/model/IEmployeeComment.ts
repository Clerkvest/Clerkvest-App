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


export interface IEmployeeComment {
    employee_comment_id?: number;
    employee_id?: IEmployee;
    commenter_id?: IEmployee;
    comment?: string;
    date?: Date;
}
