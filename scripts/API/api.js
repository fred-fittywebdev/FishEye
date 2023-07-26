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
	let medias;
	try {
		const response = await fetch('./data/photographers.json');
		const data = await response.json();
		
		photographer = data.photographers;
		photographer = photographer.find((photographer) => photographer.id === photographerId);
		
		medias = data.media;
		medias = data.media.filter((media) => media.photographerId === photographerId);
		console.log(medias);
		
		return {photographer: photographer, medias: medias};
	} catch {
	}
}