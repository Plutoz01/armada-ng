import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardHeaderComponent } from './header.component';

describe( 'CardHeaderComponent', () => {
	let component: CardHeaderComponent;
	let fixture: ComponentFixture<CardHeaderComponent>;

	beforeEach( async( () => {
		TestBed.configureTestingModule( {
			declarations: [ CardHeaderComponent ]
		} )
			.compileComponents();
	} ) );

	beforeEach( () => {
		fixture = TestBed.createComponent( CardHeaderComponent );
		component = fixture.componentInstance;
		fixture.detectChanges();
	} );

	it( 'should be created', () => {
		expect( component ).toBeTruthy();
	} );
} );
