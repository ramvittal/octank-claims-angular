import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClaimsApiService } from '../claims-api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export interface NameValue {
  value: string;
  viewValue: string;
}



@Component({
  selector: 'app-claim-add',
  templateUrl: './claim-add.component.html',
  styleUrls: ['./claim-add.component.scss']
})
export class ClaimAddComponent implements OnInit {

    claimForm: FormGroup;
    amountClaimed: number;
    claimStatus: string;
    patientName: string;
    patientDateOfBirth: Date;
    patientAddress: string;
    patientCity: string;
    patientState: string;
    patientZip: string;
    insurancePolicyNbr: string;
    medicalProviderId: string;
    insuranceCompanyId: string;
    staffId: string;
    gender: string;
    medicalCode: string;
    updatedDate: Date;
    isLoadingResults = false;
    matcher = new ErrorStateMatcher();

    genders: NameValue[] = [
    {value: 'Male', viewValue: 'Male'},
    {value: 'Female', viewValue: 'Female'}
    ];

    providers: NameValue[] = [
    {value: 'MP101', viewValue: 'Bethany Medicals'},
    {value: 'MP102', viewValue: 'Sunset Medicals'}
    ];

    payers: NameValue[] = [
    {value: 'IC101', viewValue: 'Cigna'},
    {value: 'IC102', viewValue: 'Bluecross'}
    ];

     physicians: NameValue[] = [
    {value: 'S101', viewValue: 'Joe Smith'},
    {value: 'S102', viewValue: 'Jackie Smith'}
    ];

    claimSubmitted: boolean;
    claimId: string;

  constructor(private router: Router, private api: ClaimsApiService, private formBuilder: FormBuilder) { }


  ngOnInit() {
       this.claimForm = this.formBuilder.group({
            'amountClaimed': [null, Validators.required],
            'claimStatus': ['Submitted', Validators.required],
            'patientName': [null, Validators.required],
             'gender': ['Male', Validators.required],
            'patientDateOfBirth': [null, Validators.required],
             'patientAddress': [null, Validators.required],
              'patientCity': [null, Validators.required],
               'patientState': [null, Validators.required],
             'patientZip': [null, Validators.required],
              'insurancePolicyNbr': ['IC101-101', Validators.required],
             'medicalProviderId': ['MP101', Validators.required],
             'medicalCode': ['S02.10XB', Validators.required],
             'insuranceCompanyId': ['IC101', Validators.required],
             'staffId': ['S101', Validators.required],
            'updatedDate': [new Date(), Validators.required]
        });
  }

onFormSubmit(form: NgForm) {
        console.log(form);
        this.isLoadingResults = true;
        this.api.addClaim(form)
            .subscribe(res => {
                this.claimId = res['claimId'];
                this.claimSubmitted = true;
                this.isLoadingResults = false;
               // this.router.navigate(['/claims']);
            }, (err) => {
                console.log(err);
                this.isLoadingResults = false;
            });
    }

}
