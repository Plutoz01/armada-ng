import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { Product } from '../../models/product.interface';

@Component( {
	selector: 'ar-ex-pageable-list',
	templateUrl: './pageable-list.component.html',
	styleUrls: [ './pageable-list.component.scss' ]
} )
export class ExamplePageableListComponent implements OnInit {

	allItems: Product[] = [];
	items: Product[] = [];
	pageNumber = 0;
	itemsPerPage = 10;

	ngOnInit() {
		this.allItems = this.generateItems( _.random( 80, 200 ) );
		this.items = this.allItems.slice( 0, 10 );
	}

	onPageChanged( newPage: number ) {
		const from = newPage * this.itemsPerPage;
		const to = from + this.itemsPerPage;
		this.items = this.allItems.slice( from, to );
		this.pageNumber = newPage;
	}

	onItemsPerPageChanged( newItemsPerPage: number ) {
		this.itemsPerPage = newItemsPerPage;
		const newPageNumber = this.totalPages < this.pageNumber ? this.totalPages - 1 : this.pageNumber;
		this.onPageChanged( newPageNumber );
	}

	generateItems( count ): Product[] {
		return _.range( 0, count ).map( idx => {
			return <Product> {
				id: idx,
				name: 'label ' + idx,
				description: 'random description ' + idx,
				stock: _.random( 4 ) ? _.random( 1, 1000 ) : 0
			}
		} );
	}

	get totalPages(): number {
		return Math.ceil( this.allItems.length / this.itemsPerPage );
	}
}
