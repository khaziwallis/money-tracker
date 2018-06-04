import PouchDB from 'pouchdb';
import { strings } from './strings'

class CommonServive {
	public isSetupDone() {
		new PouchDB('setting').allDocs().then((doc: any) => {
			console.log(doc)
		})
		.catch((err: any) => {
			console.log(err)
		})
	}

	public getCurrencyGroupLabel(value) {

		for(const obj of strings.currencyGroup) {
			if(obj.value === value) {
				return obj.label;
			}
		}

		return '';
	}

	public navigateRouter(link) {
		const withHash = false;
		if(withHash) {
			link += "/#" + link;
		}
		location.href = link;
	}
}
export const Common = new CommonServive();