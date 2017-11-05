import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { ListComponent } from './components/list/list.component';

@NgModule( {
	imports: [
		CommonModule,
		CoreModule
	],
	declarations: [
		ListComponent
	],
	exports: [
		CoreModule,
		ListComponent
	]
} )
export class ListModule {
}
