import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArmadaNgModules } from '../lib/modules';

import { Components } from './components/index';
import { Services } from './services/index';

@NgModule( {
	imports: [
		CommonModule,
		FormsModule,
		...ArmadaNgModules
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
