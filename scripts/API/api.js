const searchParamsId = new URLSearchParams(location.search);
const photographerId = +searchParamsId.get("id");
const dataUrl = "./data/photographers.json";

/**
 * Retreive photgraphers data from data/photographers.json
 * @returns {Promise<any>}
 */
async function getPhotographers() {
	try {
		const response = await fetch(dataUrl);
		const data = await response.json();
		return data;
	} catch (e) {
		console.log(e);
	}
}

/**
 * Retreive photgrapher data provided by the photgrapher id passed in the URL
 * @returns {Promise<any>}
 */
async function getPhotographerById() {
	const data = await getPhotographers();

	const photographer = data.photographers.find(
		(p) => p.id === photographerId
	);
	return photographer;
}

/**
 * Retrieve media of the photographer with the idea passed in url
 * @returns {Promise<*>}
 */
async function getPhotographerMedia() {
	const photographerObjet = await getPhotographerById(); //Return the photographer object
	const selectedPhotographer = photographerObjet.id; //Return the id of the photographer of the page

	const data = await getPhotographers(); //Return all data (photographers + media) --> data : [object Object]

	const photographerMedia = data.media.filter(
		(item) => item.photographerId === selectedPhotographer
	); //Filter on the media with the photographerId property which is the same as the one in the URL
	return photographerMedia;
	//photographerMedia = points at several [object Object] which are all media created by the selected photographer
}
