import PouchDB from 'pouchdb';
import { strings } from './strings'
import { IAccountsArray, IAccountData, ITagsArray } from './model';

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

	public makeTagsArrayItem(account, iD, revId) {

		account['_id'] = iD;
		account['_rev'] = revId;
		const data: ITagsArray = {
			doc : account,
			id : iD,
			key: iD,
			value : {}
		}

		return data;
	}

	public invertColor(hex, bw?: boolean) {
	    if (hex.indexOf('#') === 0) {
	        hex = hex.slice(1);
	    }
	    // convert 3-digit hex to 6-digits.
	    if (hex.length === 3) {
	        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	    }
	    if (hex.length !== 6) {
	        throw new Error('Invalid HEX color.');
	    }
	    let r:any = parseInt(hex.slice(0, 2), 16);
	    let g:any = parseInt(hex.slice(2, 4), 16);
	    let b:any = parseInt(hex.slice(4, 6), 16);
	    if (bw) {
	        // http://stackoverflow.com/a/3943023/112731
	        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
	            ? '#000000'
	            : '#FFFFFF';
	    }
	    // invert color components
	    r = (255 - r).toString(16);
	    g = (255 - g).toString(16);
	    b = (255 - b).toString(16);
	    // pad each with zeros and return
	    return "#" + this.padZero(r) + this.padZero(g) + this.padZero(b);
	}


	public padZero(str, len?) {
	    len = len || 2;
	    const zeros = new Array(len).join('0');
	    return (zeros + str).slice(-len);
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