import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ListComponent } from '../../../list/components/list/list.component';

import { LazyScrollableListComponent } from './lazy-scrollable-list.component';

describe( 'LazyScrollableListComponent', () => {
	let component: LazyScrollableListComponent<string>;
	let wrapperFixture: ComponentFixture<LazyScrollableListWrapperComponent>;

	beforeEach( async( () => {
		TestBed.configureTestingModule( {
			declarations: [
				LazyScrollableListComponent,
				LazyScrollableListWrapperComponent,
				ListComponent
			]
		} )
			.compileComponents();
	} ) );

	beforeEach( () => {
		wrapperFixture = TestBed.createComponent( LazyScrollableListWrapperComponent );
		component = wrapperFixture.debugElement.query( By.directive( LazyScrollableListComponent ) ).componentInstance;
		wrapperFixture.detectChanges();
	} );

	it( 'should be created', () => {
		expect( component ).toBeTruthy();
	} );
} );

@Component( {
	template: `<ar-lazy-scrollable-list
				[items]="items"
				[hasMore]="hasMore"
				[scrollHeight]="'250px'">

			<ng-template let-item let-isSelected="isSelected">
				<span>{{ item }}</span>
			</ng-template>
		</ar-lazy-scrollable-list>`
} )
class LazyScrollableListWrapperComponent {
	items: [ 'item1', 'item2', 'item3' ];
	hasMore: false;
}
