import { Pipe } from '@angular/core';

@Pipe({
	name: "alphabetical"
})

export class AlphabeticalPipe {
	transform(array: Array<any>, args: string): Array<any> {
		array.sort((a: any, b: any) => {
			if (a[args] < b[args]) {
				return -1;
			} else if (a[args] > b[args]) {
				return 1;
			} else {
				return 0;
			}
		});
		return array;
	}
}
