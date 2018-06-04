import axios from 'axios';
import { ENV } from './../env';

export class HttpService {
	public checkInputFolder() {
		/* status codes:
					0  : no files but path exists
					1  : files exist
				    -1 : path not found
		   count: contains no of files
		   message: message of the status
		*/
		return axios.post(ENV.BASE_URL.NODE + "settings/checkInputFolder");
	}

	public checkOutputFolder() {
		/* status codes:
					1  : path exist
				    -1 : path not found
		   count: contains no of files
		   message: message of the status
		*/
		return axios.post(ENV.BASE_URL.NODE + "settings/checkOutputFolder");
	}

	public getProcessPath() {
		return axios.get(ENV.BASE_URL.NODE + "process_path");
	}
}