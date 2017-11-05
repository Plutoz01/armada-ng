import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '../core/core.module';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';

@NgModule( {
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		CommonModule,
		CoreModule
	],
	declarations: [
		ModalDialogComponent
	],
	exports: [
		CoreModule,
		ModalDialogComponent
	]
} )
export class ModalDialogModule {
}
