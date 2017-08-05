import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Directives } from './directives';
import { Components } from './components';
import { FormsModule } from '@angular/forms';

@NgModule( {
	imports: [
		CommonModule,
		FormsModule
	],
	declarations: [
		...Directives,
		...Components
	],
	exports: [
		...Directives,
		...Components
	]
} )
export class LibModule {
}
