import { Filter } from '../../lib/core/models/filter.interface';

export interface ProductFilter extends Filter {
	id?: number;
	nameContains?: string;
}
