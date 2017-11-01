import { Component, OnInit } from '@angular/core';

@Component( {
	selector: 'ar-ex-modal-dialog',
	templateUrl: './modal-dialog.component.html',
	styleUrls: [ './modal-dialog.component.scss' ]
} )
export class ExampleModalDialogComponent implements OnInit {

	isDialogVisible = [ false, false ];

	registration = { username: '', email: '', password: '' };

	constructor() {
	}

	ngOnInit() {
	}

	onShowDialog( dialogIndex: number ) {
		this.isDialogVisible[ dialogIndex ] = true;
	}

	onCloseDialog( dialogIndex: number ) {
		this.isDialogVisible[ dialogIndex ] = false;
	}

	onSubmit() {
		this.onCloseDialog( 1 );
		console.log( 'registration model: ', this.registration );
	}

}
