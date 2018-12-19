import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClaimsComponent } from './claims/claims.component';
import { ClaimAddComponent } from './claim-add/claim-add.component';
import { ClaimDetailComponent } from './claim-detail/claim-detail.component';

const routes: Routes = [
{
    path: 'claims',
    component: ClaimsComponent,
    data: { title: 'List of claims' }
  },
  {
    path: 'claim-add',
    component: ClaimAddComponent,
    data: { title: 'Add claim' }
  },
  {
    path: 'claim-detail',
    component: ClaimDetailComponent,
    data: { title: 'Claim Detail' }
  },
  { path: '',
    redirectTo: '/claims',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
