import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from '../lib/card/card.module';
import { LibModule } from '../lib/lib.module';
import { ModalDialogModule } from '../lib/modal-dialog/modal-dialog.module';

import { Components } from './components/index';
import { Services } from './services/index';

@NgModule( {
	imports: [
		CommonModule,
		FormsModule,
		CardModule,
		ModalDialogModule,

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
