import { InjectionToken } from '@angular/core';
import { PageableDataConsumer } from '../models/pageable-data-consumer.interface';

export const PAGEABLE_DATA_CONSUMER_INTERFACE_TOKEN =
	new InjectionToken<PageableDataConsumer<any>>( 'pageable-data-consumer.token' );
