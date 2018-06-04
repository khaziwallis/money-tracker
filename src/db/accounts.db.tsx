import PouchDB from 'pouchdb';

class Account {
	private dbName: string = 'accounts';
	private db: any;
	constructor() {
		this.db = new PouchDB(this.dbName);
	}

	public addAccount(obj: any, callback, errCallback) {
		obj['_id'] = 'setting';
		this.db.post(obj)
			.then((success)=>{
				callback(success);
			})
			.catch((err)=>{
			   errCallback(err);
			});
	}
}

export const AccountDB = new Account();