import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyScrollableListComponent } from './lazy-scrollable-list.component';

describe('LazyScrollableListComponent', () => {
	let component: LazyScrollableListComponent;
	let fixture: ComponentFixture<LazyScrollableListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [LazyScrollableListComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LazyScrollableListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(component).toBeTruthy();
	});
});
