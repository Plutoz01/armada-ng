import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardContentComponent } from './content.component';

describe( 'CardContentComponent', () => {
	let component: CardContentComponent;
	let fixture: ComponentFixture<CardContentComponent>;

	beforeEach( async( () => {
		TestBed.configureTestingModule( {
			declarations: [ CardContentComponent ]
		} )
			.compileComponents();
	} ) );

	beforeEach( () => {
		fixture = TestBed.createComponent( CardContentComponent );
		component = fixture.componentInstance;
		fixture.detectChanges();
	} );

	it( 'should be created', () => {
		expect( component ).toBeTruthy();
	} );
} );
