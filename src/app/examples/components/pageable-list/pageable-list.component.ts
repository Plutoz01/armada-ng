import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { Product } from '../../models/product.class';
import { ProductService } from '../../services/product.service';
import { ProductFilter } from '../../models/product-filter.interface';

@Component( {
	selector: 'ar-ex-pageable-list',
	templateUrl: './pageable-list.component.html',
	styleUrls: [ './pageable-list.component.scss' ]
} )
export class ExamplePageableListComponent {

	products$: Observable<Product[]>;
	productCount$: Observable<number>;
	totalPages$: Observable<number>;
	actualPage$: Observable<number>;
	pageSize$: Observable<number>;

	constructor( private productService: ProductService ) {
		this.products$ = productService.items$;
		this.productCount$ = productService.itemCount$;
		this.totalPages$ = productService.totalPages$;
		this.actualPage$ = productService.actualPage$;
		this.pageSize$ = productService.pageSize$;

		// this.productService.setFilter$( <ProductFilter>  { nameContains: '7' } );
		this.productService.refresh$()
			.subscribe();
	}

	onPageChange( newPage: number ) {
		this.productService.goToPage$( newPage ).subscribe();
	}

	onPageSizeChange( newPageSize: number ) {
		this.productService.setPageSize( newPageSize );
		this.productService.refresh$().subscribe();
	}
}
