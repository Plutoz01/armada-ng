import { EventEmitter } from '@angular/core';
import { DataConsumer } from './data-consumer.interface';

export interface PageableDataConsumer<T> extends DataConsumer<T> {
	actualPage: number;
	totalPages?: number;
	itemsCount?: number;
	pageSize: number;

	pageChange: EventEmitter<number>;
	pageSizeChange?: EventEmitter<number>;
}
