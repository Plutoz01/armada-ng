import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ExamplesModule } from './examples/examples.module';
import { LibModule } from './lib/lib.module';

@NgModule( {
	declarations: [
		AppComponent
	],
	imports: [
		LibModule,
		ExamplesModule
	],
	providers: [],
	bootstrap: [ AppComponent ]
} )
export class AppModule {
}
