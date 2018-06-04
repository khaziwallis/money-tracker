import PouchDB from 'pouchdb';

class Setting {
	private dbName: string = 'setting';
	private db: any;
	constructor() {
		this.db = new PouchDB(this.dbName);
	}

	public isSetupComplete(callback) { // returns false if not otherwise true
		this.db.get('setting')
			.then((doc)=> {
				callback(true)
			})
			.catch((err)=> {
				callback(false);
			})
	}

	public get() {
		this.db.get('setting')
			.then((doc)=> {
				console.log(doc)
			})
			.catch((err)=> {
				console.log(err)
			})
	}
	public post() {
		this.db.put({_id:"setting", 'na': 'dd'})
	}

	public setup(obj: any, callback, errCallback) {
		obj['_id'] = 'setting';
		this.db.put(obj)
			.then((success)=>{
				callback(success);
			})
			.catch((err)=>{
			   errCallback(err);
			});
	}
}

export const SettingDB = new Setting();