import PouchDB from 'pouchdb';
import { Common } from './../services/common.service';
import { IIdValue } from './../services/model';

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

	public getAccountsIdValue(callback) {
		this.db.allDocs({include_docs: true})
			.then((res)=>{
				const array: IIdValue[] = [];
				res.rows.forEach((i)=> {
					const obj: IIdValue = {id: i.id, value: i.doc.name};
					array.push(obj);
				})
				callback(array);
			})
			.catch((err)=>{
				callback([]);
			});
	}

	public newTransaction(amount: number, type: number, accountId: string, callback:any, errorCallback: any) { // type: (1 = credit, -1 = debit)
		this.db.get(accountId).then( (doc) => {
		  // update their age
		  const balance = ( (type === 1) ? (parseInt(doc.balance, 10) + amount) : (parseInt(doc.balance, 10) - amount));
		  // put them back
		  doc.balance = balance;
		  return this.db.put(doc);
		}).then( () => {
		  // fetch mittens again
		  return this.db.get(accountId);
		}).then( (doc) => {
		  callback(doc);
		});
	}
}

export const AccountDB = new Account();