import { CardModule } from './card/card.module';
import { CoreModule } from './core/core.module';
import { LazyScrollableListModule } from './lazy-scrollable-list/lazy-scrollable-list.module';
import { ListModule } from './list/list.module';
import { ModalDialogModule } from './modal-dialog/modal-dialog.module';
import { PageableAdapterModule } from './pageable-adapter/pageable-adapter.module';
import { PageableListModule } from './pageable-list/pageable-list.module';
import { PaginatorModule } from './paginator/paginator.module';

export const ArmadaNgModules = [
	CardModule,
	CoreModule,
	LazyScrollableListModule,
	ListModule,
	ModalDialogModule,
	PageableAdapterModule,
	PageableListModule,
	PaginatorModule
];
