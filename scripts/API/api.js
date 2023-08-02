const dataUrl = "./data/photographers.json";

//TODO: Faire des types pour la jsdocs
/**
 * Retreive photgraphers data from data/photographers.json
 * @returns {Promise<any>}
 */
export async function getPhotographers() {
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
export async function getPhotographerById(userId) {
	const data = await getPhotographers();

	const photographer = data.photographers.find((p) => p.id === userId);
	console.log(photographer);
	return photographer;
}

/**
 * Retrieve media of the photographer with the idea passed in url
 * @returns {Promise<*>}
 */
export async function getPhotographerMedia(userId) {
	// const photographerObjet = await getPhotographerById(userId); //Return the photographer object
	const selectedPhotographer = userId; //Return the id of the photographer of the page

	const data = await getPhotographers(); //Return all data (photographers + media) --> data : [object Object]

	const photographerMedia = data.media.filter(
		(item) => item.photographerId === selectedPhotographer
	); //Filter on the media with the photographerId property which is the same as the one in the URL
	return photographerMedia;
	//photographerMedia = points at several [object Object] which are all media created by the selected photographer
}
