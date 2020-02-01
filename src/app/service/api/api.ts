export * from './comment.service';

import { CommentService } from './comment.service';
import { CompanyService } from './company.service';
import { EmployeeService } from './employee.service';
import { InvestService } from './invest.service';
import { LoginService } from './login.service';
import { ProjectService } from './project.service';

export * from './company.service';
export * from './employee.service';
export * from './invest.service';
export * from './login.service';
export * from './project.service';

export const APIS = [CommentService, CompanyService, EmployeeService, InvestService, LoginService, ProjectService];
