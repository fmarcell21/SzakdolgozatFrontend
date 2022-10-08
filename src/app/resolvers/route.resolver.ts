import { Resolve } from "@angular/router";
import { Injectable } from "@angular/core"
import { of } from "rxjs";


@Injectable()

export class RouteResolver implements Resolve<any> {

    constructor() {
        //declare api data service
    }



    resolve() {
        return of('empty');
    }
}