import { Component, OnInit } from '@angular/core';
import { ClaimsApiService } from '../claims-api.service';
import { Claim } from '../claim';


@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.scss']
})
export class ClaimsComponent implements OnInit {

    displayedColumns: string[] = ['claimId', 'amountClaimed', 'claimStatus', 'patientName',
     'patientAddress', 'medicalProviderId', 'insuranceCompanyId'];
data: Claim[] = [];
isLoadingResults = true;


  constructor(private api: ClaimsApiService) { }

  ngOnInit() {
      this.api.getClaims()
    .subscribe(res => {
      this.data = res;
      console.log(this.data);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

}
