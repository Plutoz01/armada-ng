import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Components } from './components/index';
import { LibModule } from '../lib/lib.module';
import { Services } from './services/index';

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
	],
	providers: [
		...Services
	]
} )
export class ExamplesModule {
}
