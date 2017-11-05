import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ListModule } from '../list/list.module';
import { LazyScrollableListComponent } from './components/lazy-scrollable-list/lazy-scrollable-list.component';

@NgModule( {
	imports: [
		CommonModule,
		ListModule
	],
	declarations: [
		LazyScrollableListComponent
	],
	exports: [
		ListModule,
		LazyScrollableListComponent
	]
} )
export class LazyScrollableListModule {
}
