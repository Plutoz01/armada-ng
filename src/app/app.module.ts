import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ExamplesModule } from './examples/examples.module';

@NgModule( {
	declarations: [
		AppComponent
	],
	imports: [
		ExamplesModule
	],
	providers: [],
	bootstrap: [ AppComponent ]
} )
export class AppModule {
}
