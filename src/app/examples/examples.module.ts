import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Components } from './components/index';
import { LibModule } from '../lib/lib.module';

@NgModule( {
	imports: [
		CommonModule,
		LibModule
	],
	declarations: [
		...Components
	],
	exports: [
		...Components
	]
} )
export class ExamplesModule {
}
