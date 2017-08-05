import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';

@Component( {
	selector: 'ar-paginator',
	templateUrl: './paginator.component.html',
	styleUrls: [ './paginator.component.scss' ]
} )
export class PaginatorComponent implements OnChanges {
	static readonly defaultPageRangeWidth = 2;

	@Input() actualPage = 0;
	@Input() totalPages = 0;
	@Input() firstAndLastButtonVisible = true;
	@Input() prevAndNextButtonVisible = true;
	@Input() pageRangeWidth: number = PaginatorComponent.defaultPageRangeWidth;

	@Output() pageChange = new EventEmitter<number>();

	ngOnChanges( changes: SimpleChanges ) {
		const pageRangeWidthChange = changes[ 'pageRangeWidth' ];
		if ( pageRangeWidthChange ) {
			const newPageRangeWidth = pageRangeWidthChange.currentValue;
			if ( !Number.isInteger( newPageRangeWidth ) || newPageRangeWidth < 0 ) {
				this.pageRangeWidth = PaginatorComponent.defaultPageRangeWidth;
			}
		}
	}

	onNumberClick( pageNumber ) {
		this.setPage( pageNumber );
	}

	onFirst() {
		if ( this.isFirstButtonDisabled ) {
			return;
		}
		this.setPage( 0 );
	}

	onLast() {
		if ( this.isLastButtonDisabled ) {
			return;
		}
		this.setPage( this.totalPages > 0 ? this.totalPages - 1 : 0 );
	}

	onPrevious() {
		if ( this.isPrevButtonDisabled ) {
			return;
		}
		this.setPage( this.actualPage > 0 ? this.actualPage - 1 : 0 );
	}

	onNext() {
		if ( this.isNextButtonDisabled ) {
			return;
		}
		this.setPage( this.actualPage < this.totalPages - 1 ? this.actualPage + 1 : this.totalPages - 1 );
	}

	get isFirstButtonDisabled(): boolean {
		return !this.firstAndLastButtonVisible || this.actualPage === 0;
	}

	get isPrevButtonDisabled(): boolean {
		return !this.prevAndNextButtonVisible || this.actualPage === 0;
	}

	get isLastButtonDisabled(): boolean {
		return !this.firstAndLastButtonVisible || this.actualPage >= this.totalPages - 1;
	}

	get isNextButtonDisabled(): boolean {
		return !this.prevAndNextButtonVisible || this.actualPage >= this.totalPages - 1;
	}

	get pageRange() {
		let rangeStart = this.actualPage - this.pageRangeWidth;
		rangeStart = rangeStart < 0 ? 0 : rangeStart;

		let rangeEnd = this.actualPage + this.pageRangeWidth;
		rangeEnd = rangeEnd > this.totalPages - 1 ? this.totalPages - 1 : rangeEnd;

		return _.range( rangeStart, rangeEnd + 1 );
	}

	private setPage( pageNumber ) {
		if ( this.actualPage === pageNumber ) {
			return;
		}
		this.actualPage = pageNumber;
		this.pageChange.emit( this.actualPage );
	}
}
