import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { PageableAdapterDirective } from './directives/pageable-adapter/pageable-adapter.directive';

@NgModule( {
	imports: [
		CommonModule
	],
	declarations: [
		PageableAdapterDirective
	],
	exports: [
		CoreModule,
		PageableAdapterDirective
	]
} )
export class PageableAdapterModule {
}
