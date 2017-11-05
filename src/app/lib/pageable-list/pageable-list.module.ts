import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListModule } from '../list/list.module';
import { PaginatorModule } from '../paginator/paginator.module';
import { PageableListComponent } from './components/pageable-list/pageable-list.component';

@NgModule( {
	imports: [
		CommonModule,
		FormsModule,
		ListModule,
		PaginatorModule
	],
	declarations: [
		PageableListComponent
	],
	exports: [
		FormsModule,
		ListModule,
		PaginatorModule,
		PageableListComponent
	]
} )
export class PageableListModule {
}
