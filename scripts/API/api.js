// let photographer;

/**
 * Retreive photgraphers data from data/photographers.json
 * @returns {Promise<any>}
 */
async function getPhotographers() {
	try {
		const response = await fetch("./data/photographers.json");
		const data = await response.json();
		console.log(data);
		return data;
	} catch (e) {
		console.log(e);
	}
}

async function getPhotographerById() {
	const searchParamsId = new URLSearchParams(location.search);
	const photographerId = +searchParamsId.get("id");

	const data = await getPhotographers();

	const photographer = data.photographers.find(
		(p) => p.id === photographerId
	);

	return photographer;
}
