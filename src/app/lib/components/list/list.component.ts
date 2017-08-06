import { Observable, Subject } from 'rxjs/Rx';
import {
	AfterViewInit,
	Component,
	ContentChild,
	ElementRef,
	EventEmitter,
	Input,
	OnDestroy,
	Output,
	TemplateRef,
	ViewChild,
} from '@angular/core';

@Component({
	selector: 'ar-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']

})
export class ListComponent<T> implements AfterViewInit, OnDestroy {

	@Input() items: T[];
	@Input() selectable = true;
	@Input() selected: T;
	@Input() emptyPlaceholder = 'No items to display';
	@Input() scrollHeight?: string;

	@Output() click = new EventEmitter<T>();
	@Output() selectionChanged = new EventEmitter<T>();
	@Output() bottomReached = new EventEmitter();

	@ContentChild(TemplateRef) itemTemplate: TemplateRef<any>;
	@ViewChild( 'listItemContainer' ) listItemContainer: ElementRef;

	private onDestroySource$ = new Subject();

	ngAfterViewInit() {
		Observable.fromEvent( this.listItemContainer.nativeElement, 'scroll' )
			.debounceTime(50)
			.takeUntil( this.onDestroySource$ )
			.subscribe( () => {
				const nativeContainer: HTMLElement = this.listItemContainer.nativeElement;
				const max = nativeContainer.scrollHeight;
				const actual = nativeContainer.offsetHeight + nativeContainer.scrollTop;
				if ( actual >= max ) {
					this.bottomReached.emit();
				}
			}  );
	}

	ngOnDestroy() {
		this.onDestroySource$.next();
		this.onDestroySource$.unsubscribe();
	}

	onClick(item: T) {
		if (this.selectable) {
			this.selected = this.selected === item ? null : item;
			this.selectionChanged.emit(this.selected);
		}
		this.click.emit(item);
	}

	isSelected(item: T): boolean {
		return this.selectable ? this.selected === item : false;
	}

	get customItemTemplate(): TemplateRef<any> | null {
		return this.itemTemplate;
	}
}
