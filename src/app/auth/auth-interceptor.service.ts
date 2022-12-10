import { 
    HttpEvent, 
    HttpHandler, 
    HttpInterceptor, 
    HttpParams, 
    HttpRequest 
} from "@angular/common/http"
import { Injectable } from "@angular/core";
import { exhaustMap, Observable, take } from "rxjs";
import { AuthService } from "./auth.service";


@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

    constructor(private AS: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.AS.user.pipe(
            take(1),
            exhaustMap( user => {
                if(user.email == '' || user.token == '')
                    return next.handle(req);

                const modifiedReq = req.clone({ 
                    params: new HttpParams().set( 'auth', user.token ? user.token : 'null' ) 
                })
                return next.handle(modifiedReq);
            })
        )

    }
}