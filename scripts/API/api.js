const searchParamsId = new URLSearchParams(location.search);
const photographerId = +searchParamsId.get('id');
let photographer;

/**
 * Retreive photgraphers data from data/photographers.json
 * @returns {Promise<any>}
 */
async function getPhotographers() {
	
	try {
		const response = await fetch('./data/photographers.json')
		const data = await response.json()
		console.log(data);
		return data
		
	} catch (e) {
		console.log(e);
	}
	
}

/**
 * Retrieves the photographer and his media corresponding to the id present in the url
 * @returns {Promise<any>}
 */
async function getPhotographerInfosById() {
	try{
		const response = await fetch('./data/photographers.json')
		const data = await response.json()
		
		const {photographers, media} = data
		photographer = photographers.data.find((photographer) => photographer.id === photographerId)
		
		medias = media.filter((media) => {
			const {photographerId: photographerId1} = media;
			return photographerId1 === photographerId;
		})
		
		return data
	}catch{}
}