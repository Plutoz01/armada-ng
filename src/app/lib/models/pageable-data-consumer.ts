import { EventEmitter, InjectionToken } from '@angular/core';

export interface PageableDataConsumer<T> {
	items: T[];
	actualPage: number;
	totalPages?: number;
	itemsCount?: number;
	pageSize: number;

	pageChange: EventEmitter<number>;
	pageSizeChange?: EventEmitter<number>;
}
