export default function api_url(page){
	return {
		endPoint: 'https://api.flickr.com/services/rest/?method=flickr.photos.search',
		params: {
			api_key			: "186c2acbf35b428dc8b3e9247d2e9e0d",
			text			: null,
			format			: "json",
			nojsoncallback	: 1,
			page			: page,
			per_page		: 10
		}
	}
};