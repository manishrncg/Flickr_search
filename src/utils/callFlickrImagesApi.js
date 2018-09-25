import axios from 'axios';
import api_url from "../config/config";

export default function callFlickrImagesApi(inputValue, page){
	let api 	= api_url(page);
	const data = {
		text: inputValue
	};
	let params = {...api.params, ...data}; 
	return axios.get(api.endPoint, {
		params: params
	});
}