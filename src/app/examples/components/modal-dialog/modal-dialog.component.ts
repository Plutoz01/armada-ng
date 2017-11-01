import { Component, OnInit } from '@angular/core';

@Component( {
	selector: 'ar-ex-modal-dialog',
	templateUrl: './modal-dialog.component.html',
	styleUrls: [ './modal-dialog.component.scss' ]
} )
export class ExampleModalDialogComponent implements OnInit {

	isDialogVisible = [ false, false ];

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

}
