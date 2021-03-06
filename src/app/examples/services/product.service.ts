import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { FilterablePageableDataProviderBase } from '../../lib/core/services/filterable-pageable-data-provider-base.service';
import { ProductFilter } from '../models/product-filter.interface';
import { Product } from '../models/product.class';

@Injectable()
export class ProductService extends FilterablePageableDataProviderBase<Product, ProductFilter> {

	private allProducts: Product[];

	constructor() {
		super();
		this.allProducts = Product.generate( _.random( 80, 300 ) );
		this.itemCountSource.next( this.allProducts.length );
	}

	protected getItems$( actualPage: number, pageSize: number, filter: ProductFilter = <ProductFilter>{} ): Observable<Product[]> {
		const from = actualPage * pageSize;
		const to = from + pageSize;

		let partialResult = [ ...this.allProducts ];
		if ( filter && filter.hasOwnProperty( 'id' ) ) {
			partialResult = partialResult.filter( ( product: Product ) => product.id === filter.id );
		}

		if ( filter && filter.hasOwnProperty( 'nameContains' ) && filter.nameContains ) {
			partialResult = partialResult.filter( ( product: Product ) =>
				product.name.toUpperCase().indexOf( filter.nameContains.toUpperCase() ) !== -1
			);
		}

		return Observable.of( partialResult.slice( from, to ) );
	}

}
