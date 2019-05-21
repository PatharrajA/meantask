import { Injectable } from '@angular/core';
import { XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";

import { environment } from '../../environments/environment';
@Injectable()
export class HttpInterceptor extends Http {
    public apiUrl: any;
    constructor(public backend: XHRBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }

    /**
     * Performs a request with `get` http method.
     * @param url
     * @param options
     * @returns {Observable<>}
     */
    get(url: string, options?: RequestOptionsArgs): Observable<any> {
        return super.get(this.getFullUrl(url), this.requestOptions(options))
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSuccess(res);
            }, (error: any) => {
                this.onError(error);
            })
    };

    post(url: string, model: object, options?: RequestOptionsArgs): Observable<any> {
        return super.post(this.getFullUrl(url), model, this.requestOptions(options))
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSuccess(res);
            }, (error: any) => {
                this.onError(error);
            })
    };

    put(url: string, model: object, options?: RequestOptionsArgs): Observable<any> {
        return super.put(this.getFullUrl(url), model, this.requestOptions(options))
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSuccess(res);
            }, (error: any) => {
                this.onError(error);
            })
    };

    delete(url: string, options?: RequestOptionsArgs): Observable<any> {
        return super.delete(this.getFullUrl(url), this.requestOptions(options))
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSuccess(res);
            }, (error: any) => {
                this.onError(error);
            })
    };


    /**
     * Request options.
     * @param options
     * @returns {RequestOptionsArgs}
     */
    private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers({
                'Authorization': "bearer "+sessionStorage.token,
            });
        }
        return options;
    }

    /**
     * Build API url.
     * @param url
     * @returns {string}
     */
    private getFullUrl(url: string): string {
        return environment.apiEndPoint + url;
    }


    /**
     * Error handler.
     * @param error
     * @param caught
     * @returns {ErrorObservable}
     */
    private onCatch(error: any, caught: Observable<any>): Observable<any> {
        console.log(error, caught);
        return Observable.throw(error);
    }

    /**
     * onSuccess
     * @param res
     */
    private onSuccess(res: Response): void {
    }

    /**
     * onError
     * @param error
     */
    private onError(error: any): void {
        if (error.statusText === "Unauthorized") {

        }
    }

    // /**
    //  * onFinally
    //  */
    // private onFinally(): void {
    //     this.afterRequest();
    // }
}