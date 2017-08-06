import { LazyProductService } from '../../services/lazy-product.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../../models/product.class';

@Component( {
	selector: 'ar-ex-lazy-scrollable-list',
	templateUrl: './lazy-scrollable-list.component.html',
	styleUrls: [ './lazy-scrollable-list.component.scss' ]
} )
export class ExampleLazyScrollableListComponent {
	isLoading = false;

	constructor( public lazyProductService: LazyProductService ) {
		this.lazyProductService.refresh$().subscribe();
	}

	onLoadMore() {
		this.isLoading = true;
		this.lazyProductService.loadMore$()
			.finally( () => this.isLoading = false )
			.subscribe();
	}
}
