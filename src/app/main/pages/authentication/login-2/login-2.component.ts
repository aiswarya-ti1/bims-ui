import { Component, OnInit, ViewEncapsulation, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Register2Service } from '../register-2/register-2.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { ProjectModuleService } from '../../project-module/project-module.service';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';


@Component({
    selector     : 'login-2',
    templateUrl  : './login-2.component.html',
    styleUrls    : ['./login-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class Login2Component implements OnInit
{
 loading: boolean=false;
    loginForm: FormGroup;
    user:User;
    errorMsg : string;
     constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private registerService:Register2Service,
        private router : Router,
        private sessionSt: SessionStorageService,
      //  @Inject(LOCAL_STORAGE) private storage: WebStorageService,
        public snackBar: MatSnackBar,
        private projectService:ProjectModuleService,
        private fuseProgress : FuseProgressBarService
    )
    {
            this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }
    ngOnInit(): void
    {
       // this.loading = true;
            this.loginForm = this._formBuilder.group({
            username   : ['', Validators.required],
            password: ['', Validators.required]
        });
       
    }
    login($values)
    {
        this.loading=true;
        let user=$values;
        //debugger;
       /* this.registerService.validateUser(user).subscribe(result=>{console.log(result);
        })*/
        //this.fuseProgress.show();
    this.registerService.create_Token(user).subscribe(result1=>{console.log(result1);
        if(result1['token'])
        {
            this.registerService.login($values).subscribe(result=>{console.log(result);
                
              this.loading=false;
              // this.fuseProgress.hide();
              this.sessionSt.store('Token',result1['token']);
               this.sessionSt.store('user',result[2][0]);
               if(result[2][0]["ID"]!=null)
               {
               this.projectService.getBIMSPrivillageDetails(result[2][0]["ID"])
               .subscribe(result1=>{
               this.sessionSt.store('menuPerm1', result1);
               
               this.openSnackBar('Login Success', 'OK');
            
           if(result[2][0]["Role_ID"]==1 || result[2][0]["Role_ID"]==13)
               {
                   this.router.navigate(['sales']);
               }
               else if(result[2][0]["Role_ID"]==10 || result[2][0]["Role_ID"]==9)
               {
                   this.router.navigate(['project']);
               }
               else if(result[2][0]["Role_ID"]==12)
               {
                   this.router.navigate(['payment']);
               }
               else if(result[2][0]["Role_ID"]==14)
               {
                   this.router.navigate(['certif-process']);
               }
           });
           
           }
       
    });
        }
        else
        {
            this.openSnackBar('Invalid User!!','OK');
            this.loading=false;
        }
    })
        

        
    }
    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 2000,
        });
      }
    
}
