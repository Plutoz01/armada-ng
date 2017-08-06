import { EventEmitter } from '@angular/core';
import { DataConsumer } from './data-consumer.interface';

export interface LazyLoadDataConsumer<T> extends DataConsumer<T> {
	hasMore: boolean;
	loadMore: EventEmitter<void>;
}
