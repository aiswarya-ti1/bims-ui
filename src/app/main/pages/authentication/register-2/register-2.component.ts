import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { Register2Service } from './register-2.service';
import { MatSnackBar } from '@angular/material';
import { Types } from './types';
@Component({
    selector     : 'register-2',
    templateUrl  : './register-2.component.html',
    styleUrls    : ['./register-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class Register2Component implements OnInit, OnDestroy
{
    registerForm: FormGroup;
    types:Types;
    private _unsubscribeAll: Subject<any>;
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private router: Router,
        private register2Serv : Register2Service,
        public snackBar: MatSnackBar
        
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
        this._unsubscribeAll = new Subject();
    }
    

    ngOnInit(): void
    {
        this.getAssocTypes();
        this.registerForm = this._formBuilder.group({
            fname           : ['', Validators.required],
            lname           : ['', Validators.required],
            email          : ['', Validators.required],
            password       : ['', Validators.required],
            passwordConfirm: ['', [Validators.required, confirmPasswordValidator]],
            type :['', Validators.required]
        });

        this.registerForm.get('password').valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.registerForm.get('passwordConfirm').updateValueAndValidity();
            });
    }

    ngOnDestroy(): void
    {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    SignUp($values)
    {
       this.register2Serv.SignUp($values).subscribe(result=>{
       if(result["Success"]==true)
    {
        this.openSnackBar('User Created', 'OK');
        this.router.navigate(['auth/register-next/'+result["Category"]+'/'+result["UserID"]]);
    }
    else if(result["Success"]==false)
    {
        this.openSnackBar('User already exists!!', 'OK');
        this.router.url === 'auth/login-2';
    }
    });

    }

    getAssocTypes()
    {
        this.register2Serv.getAssocTypes().subscribe(result=>{console.log(result);
            this.types=result;
        })
    }
    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 2000,
        });
      }

}

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if ( !control.parent || !control )
    {
        return null;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if ( !password || !passwordConfirm )
    {
        return null;
    }

    if ( passwordConfirm.value === '' )
    {
        return null;
    }

    if ( password.value === passwordConfirm.value )
    {
        return null;
    }

    return {'passwordsNotMatching': true};
};
