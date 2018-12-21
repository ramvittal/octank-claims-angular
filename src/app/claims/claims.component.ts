import { Component, OnInit } from '@angular/core';
import { ClaimsApiService } from '../claims-api.service';
import { Claim } from '../claim';
import { DatePipe } from '@angular/common';

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


  constructor(private api: ClaimsApiService, private datePipe: DatePipe) { }

  ngOnInit() {
      const today = new Date();
      const tomorrow = new Date();

      tomorrow.setDate(today.getDate() + 1);

      const from = this.datePipe.transform(today, 'yyyy-MM-dd');
      const to = this.datePipe.transform(tomorrow, 'yyyy-MM-dd');
      console.log('from:' + from + 'to:' + to);
      this.api.getClaims(from, to)
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
