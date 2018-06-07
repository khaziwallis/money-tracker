import PouchDB from 'pouchdb';
import { strings } from './strings'
import { IAccountsArray, IAccountData } from './model';

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

	public getAddTimeStampObj() {
		return {
			added: new Date(),
			updated: new Date()
		};
	}

	public makeAccountsArrayItem(account, iD, revId) {

		account['_id'] = iD;
		account['_rev'] = revId;
		const data: IAccountsArray = {
			doc : account,
			id : iD,
			key: iD,
			value : {}
		}

		return data;
	}
	public getEmptyAccountsArrayData(length: number) {
		const array: IAccountsArray[] = [];
		const docData: IAccountData = {
			name: '',
			balance: '',
			_id: '',
			_rev: '',
			group: '',
			timestamp_: {
				added: '',
				updated: ''
			}
		};
		const item: IAccountsArray = {
			doc: docData,
			id: '',
			value: {},
			key: ''
		}
		for(let i=0;i<length;i++) {
			array.push(item);
		}

		return array;
	}
}
export const Common = new CommonServive();