import PouchDB from 'pouchdb';
import { Common } from './../services/common.service';

class Account {
	private dbName: string = 'accounts';
	private db: any;
	private delay: number = 1100;
	constructor() {
		this.db = new PouchDB(this.dbName);
	}

	public addAccount(obj: any, callback, errCallback) {
		obj['timestamp_'] = Common.getAddTimeStampObj();
		this.db.post(obj)
			.then((success)=>{
				success['finalObj'] = obj;
				setTimeout(()=>{
					callback(success);
				}, this.delay);
				
			})
			.catch((err)=>{
			   errCallback(err);
			});
	}

	public getAllAccounts(callback, errCallback) {
		this.db.allDocs({include_docs: true})
			.then((res)=>{
				setTimeout(()=>{
					callback(res);
				}, this.delay);
			})
			.catch((err)=>{
				errCallback(err);
			});
	}

	public removeDoc(iD: string, reV: string, callback,  errCallback) {
		this.db.remove(iD, reV)
			.then((res)=>{
				callback(res);
			})
			.catch((err)=>{
				errCallback(err);
			})
	}
}

export const AccountDB = new Account();