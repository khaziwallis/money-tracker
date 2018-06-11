import PouchDB from 'pouchdb';
import { Common } from './../services/common.service';

class Tag {
	private dbName: string = 'tags';
	private db: any;
	private delay: number = 0;
	constructor() {
		this.db = new PouchDB(this.dbName);
	}

	public addTag(obj: any, callback, errCallback) {
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

	public getAllTags(callback, errCallback) {
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

}

export const TagDB = new Tag();