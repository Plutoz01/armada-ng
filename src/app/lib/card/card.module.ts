import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '../core/core.module';

import { CardComponent } from './components/card/card.component';

@NgModule( {
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		CoreModule
	],
	declarations: [
		CardComponent
	],
	exports: [
		CoreModule,
		CardComponent
	]
} )
export class CardModule {
}
