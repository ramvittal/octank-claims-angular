import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Claim } from './claim';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'https://85eec123wi.execute-api.us-west-2.amazonaws.com/test/claims';

interface ServerData {
  claims: Claim[];
}



@Injectable({
  providedIn: 'root'
})
export class ClaimsApiService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}


getClaims (): Observable<Claim[]> {
  return this.http.get<ServerData>(apiUrl + '?fromDate=2018-12-17%2000:00&toDate=2018-12-17%2023:59')
    .pipe(map(res => <Claim[]>res.claims),
            tap(claims => console.log('fetched claims:' + claims.length)),
        catchError(this.handleError('getClaims', []))
      );


}


 // map(response => response.json().replayEvent as ReplayModel[]);



getClaim(id: number): Observable<Claim> {
  const url = `${apiUrl}/${id}`;
  return this.http.get<Claim>(url).pipe(
    tap(_ => console.log(`fetched claim id=${id}`)),
    catchError(this.handleError<Claim>(`getClaim id=${id}`))
  );
}

 // TODO change tap claim to claim1 to avoid shadowed var error. check if this is ok.
addClaim (claim): Observable<String> {
  return this.http.post<String>(apiUrl, claim, httpOptions).pipe(
    tap((res: String) => console.log(res)),
    catchError(this.handleError<String>('addClaim'))
  );
}



}
