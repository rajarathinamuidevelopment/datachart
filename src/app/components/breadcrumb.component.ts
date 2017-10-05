import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/filter';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { TranslateLangService } from '../translate/translate-lang.service';

@Component({
    selector: 'app-bread-crumb',
    templateUrl: '../templates/breadcrumb.component.html',
    styles:[` 
    #primary-nav {
        min-height:95px;
    }
    .header{
        padding-top:10px;
        }`]
})

export class BreadcrumbComponent implements OnInit {
    pagename: string = null;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private translateService: TranslateLangService
    ) { };

    ngOnInit() {
        this.router.events
        .filter(event => event instanceof NavigationEnd)
        .subscribe(event => {
            let currentRoute = this.route.root;
            while (currentRoute.children[0] !== undefined) {
                currentRoute = currentRoute.children[0];
            }
            this.pagename = currentRoute.snapshot.data.name;
        });
    };
}
