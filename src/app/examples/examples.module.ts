import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LibModule } from '../lib/lib.module';

import { Components } from './components/index';
import { Services } from './services/index';

@NgModule( {
	imports: [
		CommonModule,
		FormsModule,
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
