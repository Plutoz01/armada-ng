import { Filter } from '../../lib/models/data-sources';

export interface ProductFilter extends Filter {
	id?: number;
	nameContains?: string;
}
