import { Filter } from '../../lib/models/filter.interface';

export interface ProductFilter extends Filter {
	id?: number;
	nameContains?: string;
}
