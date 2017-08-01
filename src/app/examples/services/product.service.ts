import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { FilterablePageableDataSourceBase } from '../../lib/services/filterable-pageable-data-source-base.service';
import { Product } from '../models/product.class';
import { ProductFilter } from '../models/product-filter.interface';

@Injectable()
export class ProductService extends FilterablePageableDataSourceBase<Product, ProductFilter> {

	private allProducts: Product[];

	constructor() {
		super();
		this.allProducts = Product.generate( _.random( 80, 300 ) );
		this._itemCountSource.next( this.allProducts.length );
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
