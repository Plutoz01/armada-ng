import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LibModule } from './lib/lib.module';
import { ExamplesModule } from './examples/examples.module';

@NgModule( {
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		LibModule,
		ExamplesModule
	],
	providers: [],
	bootstrap: [ AppComponent ]
} )
export class AppModule {
}
