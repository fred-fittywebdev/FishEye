async function displayData(photographers) {
	const photographersSection = document.querySelector('.photographer_section');
	
	photographers.forEach((photographer) => {
		const photographerModel = photographerFactory(photographer);
		const userCardDOM = photographerModel.getUserCardDOM();
		photographersSection.appendChild(userCardDOM);
	});
}



async function init() {
	// We call the function in the api.js file to retrieve the photographers' data.
	const {photographers} = await getPhotographers();
	await displayData(photographers);
	
}

init();
    
