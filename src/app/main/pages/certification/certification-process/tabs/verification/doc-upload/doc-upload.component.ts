import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { CertificationService } from 'app/main/pages/certification/certification.service';

@Component({
    selector     : 'doc-upload',
    templateUrl  : './doc-upload.component.html',
    styleUrls    : ['./doc-upload.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class DocumentUploadDialogComponent
{
  docForm : FormGroup;
  selectedFile : File;

    /**
     * Constructor
     *
     * @param {MatDialogRef<ContactsContactFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<DocumentUploadDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private _formBuilder: FormBuilder, private certService : CertificationService,
        
        public snackBar: MatSnackBar
    )
    {
        this.docForm = new FormGroup(
            {
              typeID: new FormControl(),
              assocID : new FormControl(),
        type : new FormControl(),
        docNo : new FormControl(),
        fileName : new FormControl(),
              
            });
       
    }
    ngOnInit() {
        this.docForm = this._formBuilder.group({
           
          typeID: ['', Validators.required],
          assocID :['', Validators.required],
        type :['', Validators.required],
        docNo : ['', Validators.required],
        fileName :['', Validators.required]
        

        });
        
        
      
    }
    onFileSelected(files: FileList) {
      this.selectedFile = files.item(0);
      document.getElementById('lblAadhar').innerHTML=''+this.selectedFile.name;
      this.docForm.controls['fileName'].setValue(this.data['associd']+'-'+this.selectedFile.name);
      //this.Aadhar=this.data['id']+'-'+this.selectedFile.name;
     // document.getElementById('AadharName').innerHTML =this.data['id']+'-'+this.selectedFile.name;
      
  }
   
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  uploadDoc(values)
  {
    console.log(values);
    if(values['type']==1)
    {
    this.certService.uploadDoc(1,values['docNo'],values['fileName'],this.data['associd'], this.selectedFile).subscribe(result=>{console.log(result);
      if(result['Success']==true)
      {
        this.openSnackBar('Aadhar Uplloaded Successfully!!','OK');
      }
      else{
        this.openSnackBar('Something went wrong','Ok');
      }
    },  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
      })
  }
  else if(values['type']==2)
  {
  this.certService.uploadDoc(2,values['docNo'],values['fileName'],this.data['associd'], this.selectedFile).subscribe(result=>{console.log(result);
    if(result['Success']==true)
    {
      this.openSnackBar('Aadhar Uplloaded Successfully!!','OK');
    }
    else{
      this.openSnackBar('Something went wrong','Ok');
    }
  },  error=>{console.log(error);
    
    this.openSnackBar('Server Error. Please try again!!','OK');
    })
}
  }
   
   
}
