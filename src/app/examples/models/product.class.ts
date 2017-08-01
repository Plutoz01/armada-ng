import * as _ from 'lodash';

export class Product {

	static nextId = 1;

	id: number;
	name: string;
	description: string;
	stock: number;

	static generate( count ): Product[] {
		return _.range( 0, count ).map( idx => {
			return new Product(
				Product.nextId++,
				'label ' + idx,
				'random description ' + idx,
				_.random( 4 ) ? _.random( 1, 1000 ) : 0
			);
		} );
	}

	constructor( id: number, name: string, description: string, stock: number = 0 ) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.stock = stock;
	}
}
