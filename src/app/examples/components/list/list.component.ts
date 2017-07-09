import { Component,  } from '@angular/core';

@Component( {
	selector: 'ar-ex-list',
	templateUrl: './list.component.html',
	styleUrls: [ './list.component.scss' ]
} )
export class ExampleListComponent {

	basicItems = [ 'item1', 'item2', 'item3' ];
	modelItems = [
		{ id: 1, name: 'item 1', description: 'description of item 1', stock: 340 },
		{ id: 2, name: 'item 2', description: 'description of item 2', stock: 140 },
		{ id: 3, name: 'item 3', description: 'description of item 3', stock: 0 }
	]
}
