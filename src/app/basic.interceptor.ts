import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { catchError, Observable, switchMap, take, tap, throwError } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { Store } from '@ngrx/store';

import { selectAuthToken } from './ngrx/auth/auth.selectors'; 
  
@Injectable()
export class BasicInterceptor implements HttpInterceptor {

  constructor(private authService :AuthService,private store: Store) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getAuthToken()

    console.log("appending token ....")
     let  uoout : Observable<HttpEvent<any>> =  this.store.select(selectAuthToken).pipe(
      take(1),
      switchMap(token => {
        console.log("appending token ....yes token generated ")
        let tk:string  | null = "";
        if (token) {
             tk = localStorage.getItem("token")
        }
        if(tk !=""){ 
          const clonedReq = request.clone({
            setHeaders: {
              Authorization: `Bearer ${tk}`
            },
            body: {...this.modifyRequestBody(request.body), hello: 'world' }
          });
          console.log("bearer set in the request .... ")

          return next.handle(clonedReq);
          // Handle the request body if necessary (for POST/PUT requests)
          /*if (request.body) {
            // If you need to modify the body, you can do so here
            const modifiedBody = this.modifyRequestBody(request.body);

            return next.handle(clonedReq.clone({ body: modifiedBody }));
          }*/
        }
        this.modifyRequestBody(request.body)
        return next.handle(request);
      })
    );
    try { 
    return  uoout.pipe( // Tap: log the response, or handle successful requests
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('Response received:', event);
        }
      }),
      
      // Handle errors with catchError, this will ensure any error handling completes before returning
      catchError((error) => {
        //console.error('Request failed', error);
        console.log('backend not avaiable');
        return uoout;
        // You can perform cleanup or redirection here
         // return throwError(error);  // Re-throws the error to propagate
      }));
    }// net::ERR_CONNECTION_REFUSED
    catch(errr ) {

       return uoout;
    }

    //console.log("appending token ...."+authToken)
    //const username = 'admin'; // Replace with dynamic logic
    //const password = 'adminpassword'; // Replace with dynamic logic

   /* const clonedRequest = request.clone({
      setHeaders: {
        'Authorization': `Basic ${btoa(username + ':' + password)}` 
         // 'Authorization': 'Bearer '+authToken,
      },
    });

    
    */
  }

  // Example: Modify the request body if needed
  private modifyRequestBody(body: any): any {
    // Modify or transform the body as required
    let todoParam = {};
    if (body instanceof FormData) {
      let fd : FormData = body;
        fd.forEach((value, key) => {
          console.log(`${key}: ${value}`);
        });
    }
    else { 
      //console.log('body '  + JSON.stringify(body))
      todoParam=  body !=null ? body['todo']: {}
      if(JSON.stringify(todoParam) != '{}' &&  todoParam !=null && Object.keys(todoParam).length > 0){
        console.log('newbody '  + JSON.stringify(todoParam))
        return { ...todoParam, additionalParam: 'value' };
      }
    }

    return { ...body, additionalParam: 'value' };
  }
}
