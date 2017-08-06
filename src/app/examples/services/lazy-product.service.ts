import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as _ from 'lodash';

import { Product } from '../models/product.class';
import { LazyLoadDataProvider } from '../../lib/models/lazy-load-data-provider.interface';

@Injectable()
export class LazyProductService implements LazyLoadDataProvider<Product> {

	static defaultPageSize = 20;

	private itemsSource = new BehaviorSubject<Product[]>( [] );
	private hasMoreSource = new BehaviorSubject<boolean>( true );

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

	get items$(): Observable<Product[]>{
		return this.itemsSource.asObservable();
	}

	get hasMore$(): Observable<boolean> {
		return this.hasMoreSource.asObservable();
	}

	private generate(): Product[] {
		return Product.generate( LazyProductService.defaultPageSize );
	}
}
