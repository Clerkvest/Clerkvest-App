import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {Configuration} from './configuration';
import {HttpClient} from '@angular/common/http';


import {CommentService} from './api/comment.service';
import {CompanyService} from './api/company.service';
import {EmployeeService} from './api/employee.service';
import {InvestService} from './api/invest.service';
import {LoginService} from './api/login.service';
import {ProjectService} from './api/project.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    CommentService,
    CompanyService,
    EmployeeService,
    InvestService,
    LoginService,
    ProjectService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
