import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Directives } from './directives';
import { Components } from './components';
import { FormsModule } from '@angular/forms';
import { LazyScrollableListComponent } from './components/lazy-scrollable-list/lazy-scrollable-list.component';

@NgModule( {
	imports: [
		CommonModule,
		FormsModule
	],
	declarations: [
		...Directives,
		...Components,
		LazyScrollableListComponent
	],
	exports: [
		...Directives,
		...Components
	]
} )
export class LibModule {
}
