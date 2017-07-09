import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';

@Component( {
	selector: 'ar-paginator',
	templateUrl: './paginator.component.html',
	styleUrls: [ './paginator.component.scss' ]
} )
export class PaginatorComponent implements OnChanges {
	static readonly defaultPageRangeWidth = 2;

	@Input() actual = 0;
	@Input() total = 1;
	@Input() firstAndLastButtonVisible = true;
	@Input() prevAndNextButtonVisible = true;
	@Input() pageRangeWidth: number = PaginatorComponent.defaultPageRangeWidth;

	@Output() pageChanged = new EventEmitter<number>();

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
		this.setPage( this.total > 0 ? this.total - 1 : 0 );
	}

	onPrevious() {
		if ( this.isPrevButtonDisabled ) {
			return;
		}
		this.setPage( this.actual > 0 ? this.actual - 1 : 0 );
	}

	onNext() {
		if ( this.isNextButtonDisabled ) {
			return;
		}
		this.setPage( this.actual < this.total - 1 ? this.actual + 1 : this.total - 1 );
	}

	get isFirstButtonDisabled(): boolean {
		return !this.firstAndLastButtonVisible || this.actual === 0;
	}

	get isPrevButtonDisabled(): boolean {
		return !this.prevAndNextButtonVisible || this.actual === 0;
	}

	get isLastButtonDisabled(): boolean {
		return !this.firstAndLastButtonVisible || this.actual === this.total - 1;
	}

	get isNextButtonDisabled(): boolean {
		return !this.prevAndNextButtonVisible || this.actual === this.total - 1;
	}

	get pageRange() {
		let rangeStart = this.actual - this.pageRangeWidth;
		rangeStart = rangeStart < 0 ? 0 : rangeStart;

		let rangeEnd = this.actual + this.pageRangeWidth;
		rangeEnd = rangeEnd > this.total - 1 ? this.total - 1 : rangeEnd;

		return _.range( rangeStart, rangeEnd + 1 );
	}

	private setPage( pageNumber ) {
		if ( this.actual === pageNumber ) {
			return;
		}
		this.actual = pageNumber;
		this.pageChanged.emit( this.actual );
	}
}
