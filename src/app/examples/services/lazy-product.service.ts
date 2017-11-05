import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { LazyLoadDataProvider } from '../../lib/core/models/lazy-load-data-provider.interface';

import { Product } from '../models/product.class';

@Injectable()
export class LazyProductService implements LazyLoadDataProvider<Product> {

	static defaultPageSize = 20;

	private itemsSource = new BehaviorSubject<Product[]>( [] );
	private hasMoreSource = new BehaviorSubject<boolean>( true );

	get items$(): Observable<Product[]> {
		return this.itemsSource.asObservable();
	}

	get hasMore$(): Observable<boolean> {
		return this.hasMoreSource.asObservable();
	}

	loadMore$(): Observable<Product[]> {
		return this.items$.first()
			.withLatestFrom( this.hasMore$, ( actualProducts: Product[], hasMore: boolean ) =>
				hasMore ? actualProducts.concat( this.generate() ) : actualProducts )
			.delay( 1000 )
			.do( ( products: Product[] ) => this.itemsSource.next( products ) )
			.do( () => {
				// randomly exhaust available items
				if ( _.random( 0, 2 ) === 0 ) {
					this.hasMoreSource.next( false );
				}
			} );
	}

	refresh$(): Observable<Product[]> {
		return Observable.of( this.generate() )
			.do( ( products: Product[] ) => this.itemsSource.next( products ) )
			.do( () => this.hasMoreSource.next( true ) );
	}

	private generate(): Product[] {
		return Product.generate( LazyProductService.defaultPageSize );
	}
}
