import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Components } from './components/index';
import { FormsModule } from '@angular/forms';

@NgModule( {
	imports: [
		CommonModule,
		FormsModule
	],
	declarations: [
		...Components
	],
	exports: [
		...Components
	]
} )
export class LibModule {
}
