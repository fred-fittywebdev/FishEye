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

	const photographerMedia = data.media.filter(
		(item) => item.photographerId === photographer.id
	);
	console.log(photographerMedia);
	// return photographer;

	return {
		photographer: photographer,
		media: photographerMedia,
	};
}
