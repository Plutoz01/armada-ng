import { ArmadaNgPage } from './app.po';

describe( 'armada-ng App', () => {
	let page: ArmadaNgPage;

	beforeEach( () => {
		page = new ArmadaNgPage();
	} );

	it( 'should display welcome message', () => {
		page.navigateTo();
		expect( page.getParagraphText() ).toEqual( 'Welcome to ar!!' );
	} );
} );
