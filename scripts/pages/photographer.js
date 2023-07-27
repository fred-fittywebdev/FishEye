// Déclaration des variables pour afficher le contenu du photographe dont l'ID est dans l'URL

// let photographer;
let media
let orderBy = "populaire";
likes = [];
const mediaModalEl = document.getElementById("media_modal");
const modal = document.getElementById("contact_modal");

// 		photographInfos(photographer);
// 		orderMedias(photographer);
// 		displayLikePrice(medias, photographer.price);
// displayMedias(media);
// 		addEventListener("keydown", (event) => {
// 			if (
// 				mediaModalEl.style.display &&
// 				mediaModalEl.style.display !== "none"
// 			) {
// 				if (event.code === "ArrowLeft") {
// 					return changeMedia("left");
// 				}
// 				if (event.code === "ArrowRight") {
// 					return changeMedia("right");
// 				}
// 				if (event.code === "Escape") {
// 					return closeMediaModal();
// 				}
// 			}
// 			if (modal.style.display && modal.style.display !== "none") {
// 				if (event.code === "Escape") {
// 					modal.style.display = "none";
// 				}
// 			}
// 		});

		// const orderSelect = document.querySelector("#select");
		// orderSelect.onchange = ({ target: { value } }) =>
		// 	orderMedias(photographer, value);

		// const contactTitle = document.querySelector("#contact_modal h2");
		// contactTitle.textContent += " " + photographer.name;
// 	} catch (error) {
// 		console.log(error);
// 	}
// })();

function photographInfos(photographer) {
	const phtographerModel = photographerFactory(photographer);
	phtographerModel.getPhotographerDom();
}

async function initHeader() {
	try {
		const photographerHeader = await getPhotographerById();
		photographInfos(photographerHeader);
	} catch (e) {
		console.log(e);
	}
}

initHeader();

// function displayLikePrice(medias, price) {
// 	const element = document.querySelector(".photograph_likeprice");
//
// 	element.children[0].textContent =
// 		medias.reduce((sum, media) => sum + media.likes, 0) + " ♥";
// 	element.children[1].textContent = price + "€ / jour";
// }

// function orderMedias(photographer, orderBy = "populaire") {
// 	switch (orderBy) {
// 		case "populaire": {
// 			medias.sort((a, b) => b.likes - a.likes);
// 			break;
// 		}
// 		case "date": {
// 			medias.sort(
// 				(a, b) =>
// 					new Date(b.date).getTime() - new Date(a.date).getTime()
// 			);
// 			break;
// 		}
// 		case "title": {
// 			medias.sort((a, b) => a.title.localeCompare(b.title));
// 			break;
// 		}
// 	}
// 	displayMedias(photographer, medias);
// }

// // Display all medias of the photographer and add events
// async function displayMedias(media) {
//
// 	const mediasSection = document.getElementById("photograph_medias");
// 	mediasSection.innerHTML = "";
// 	mediasSection.style.gridTemplateRows =
// 		"repeat(" + Math.ceil(media.length / 3) + ", 400px)";
//
// 	for (const media of media) {
// 		const article = document.createElement("article");
// 		const link = document.createElement("a");
// 		const mediaElement = media.video
// 			? document.createElement("video")
// 			: document.createElement("img");
// 		const divInfos = document.createElement("div");
// 		// titre et like sous les photos
// 		const photoName = document.createElement("span");
// 		const photoLike = document.createElement("span");
// 		article.dataset.id = media.id;
// 		link.href = "javascript:void(0)";
// 		mediaElement.src = `./assets/images/${photographer.name}/${
// 			media.video ?? media.image
// 		}`;
// 		mediaElement.alt = media.title;
// 		mediaElement.controls = false;
// 		mediaElement.autoplay = false;
//
// 		photoName.textContent = media.title;
// 		photoLike.textContent = media.likes + " \u2661";
// 		photoLike.classList.add("like");
// 		photoLike.onclick = ({ target }) => {
// 			const totalLikesElement = document.querySelector(
// 				".photograph_likeprice > span:first-child"
// 			);
//
// 			if (likes.includes(media.id)) {
// 				console.log("Pouet");
// 				const mediaIndex = likes.indexOf(media.id);
// 				totalLikesElement.textContent =
// 					parseInt(totalLikesElement.textContent) - 1 + " \u2665";
// 				target.textContent =
// 					parseInt(target.textContent) - 1 + " \u2661";
// 				likes.splice(mediaIndex, 1);
// 			} else {
// 				totalLikesElement.textContent =
// 					parseInt(totalLikesElement.textContent) + 1 + " \u2665";
// 				target.textContent =
// 					parseInt(target.textContent) + 1 + " \u2665";
// 				likes.push(media.id);
// 			}
// 		};
//
// 		// Display media modal
// 		link.onclick = (event) => {
// 			event.preventDefault();
// 			if (event.target.classList.contains("like")) return;
// 			mediaModalEl.children[mediaModalEl.children.length - 1].appendChild(
// 				mediaElement.cloneNode()
// 			);
// 			mediaModalEl.children[
// 				mediaModalEl.children.length - 1
// 			].children[0].controls = true;
// 			mediaModalEl.children[mediaModalEl.children.length - 1].appendChild(
// 				photoName.cloneNode(true)
// 			);
// 			mediaModalEl.style.display = "inherit";
// 			document.body.style.overflow = "hidden";
// 		};
//
// 		link.appendChild(article);
// 		article.appendChild(mediaElement);
// 		article.appendChild(divInfos);
// 		divInfos.appendChild(photoName);
// 		divInfos.appendChild(photoLike);
// 		mediasSection.appendChild(link);
// 	}
//}

// // Function to switch media on click or key used
// function changeMedia(direction) {
// 	console.log(mediaModalEl.children[mediaModalEl.children.length - 1]);
// 	const media =
// 		mediaModalEl.children[mediaModalEl.children.length - 1].children[0];
// 	console.log("media: ", media);
// 	mediaModalEl.children[
// 		mediaModalEl.children.length - 1
// 	].children[1].remove();
// 	const mediaSrc = media.src.split("/").pop();
// 	const mediaIndex = medias.indexOf(
// 		medias.find((el) => (el.video ?? el.image) === mediaSrc)
// 	);
// 	media.remove();
// 	let newIndex = direction === "left" ? mediaIndex - 1 : mediaIndex + 1;
//
// 	if (newIndex < 0) {
// 		newIndex = medias.length - 1;
// 	} else if (newIndex >= medias.length) {
// 		newIndex = 0;
// 	}
//
// 	const mediaElement = medias[newIndex].video
// 		? document.createElement("video")
// 		: document.createElement("img");
// 	const spanName = document.createElement("span");
//
// 	mediaElement.src = `./assets/images/${photographer.name}/${
// 		medias[newIndex].video ?? medias[newIndex].image
// 	}`;
// 	mediaElement.alt = medias[newIndex].title;
// 	spanName.textContent = medias[newIndex].title;
//
// 	mediaModalEl.children[mediaModalEl.children.length - 1].appendChild(
// 		mediaElement
// 	);
// 	mediaModalEl.children[mediaModalEl.children.length - 1].appendChild(
// 		spanName
// 	);
// }



async function mediaInit() {
	try {
		const photographer = await getPhotographerById()
		const media = await getPhotographerMedia();
		// media: stocke tous les medias du photographe de la page
		displayLikePrice(media, photographer.price);
		orderMedias(media, photographer);
		displayMedia(media, photographer);
		
		addEventListener("keydown", (event) => {
			if (
				mediaModalEl.style.display &&
				mediaModalEl.style.display !== "none"
			) {
				if (event.code === "ArrowLeft") {
					return changeMedia("left");
				}
				if (event.code === "ArrowRight") {
					return changeMedia("right");
				}
				if (event.code === "Escape") {
					return closeMediaModal();
				}
			}
			if (modal.style.display && modal.style.display !== "none") {
				if (event.code === "Escape") {
					modal.style.display = "none";
				}
			}
		});
		
		const orderSelect = document.querySelector("#select");
		orderSelect.onchange = ({ target: { value } }) =>
			orderMedias(media, photographer, value);
		
		const contactTitle = document.querySelector("#contact_modal h2");
		contactTitle.textContent += " " + photographer.name;

	} catch (error) {
		console.error(error);
	}
}

mediaInit();

function orderMedias(media, photographer,  orderBy = "populaire") {
	console.log(media);
	switch (orderBy) {
		case "populaire": {
			media.sort((a, b) => b.likes - a.likes);
			break;
		}
		case "date": {
			media.sort(
				(a, b) =>
					new Date(b.date).getTime() - new Date(a.date).getTime()
			);
			break;
		}
		case "title": {
			media.sort((a, b) => a.title.localeCompare(b.title));
			break;
		}
	}
	displayMedia(media, photographer);
}

function displayLikePrice(media, price) {
	const element = document.querySelector(".photograph_likeprice");
	
	element.children[0].textContent =
		media.reduce((sum, media) => sum + media.likes, 0) + " ♥";
	element.children[1].textContent = price + "€ / jour";
}

async function displayMedia(media, photographer){
	
	const mediasSection = document.getElementById("photograph_medias");
	mediasSection.innerHTML = "";
	mediasSection.style.gridTemplateRows = "repeat(" + Math.ceil(media.length / 3) + ", 400px)";

	media.forEach((m) => {

		const article = document.createElement("article");
		const link = document.createElement("a");
		const mediaElement = m.video
			? document.createElement("video")
			: document.createElement("img");
		const divInfos = document.createElement("div");
		// titre et like sous les photos
		const photoName = document.createElement("span");
		const photoLike = document.createElement("span");
		article.dataset.id = m.id;
		link.href = "javascript:void(0)";
		mediaElement.src = `./assets/images/${photographer.name}/${
			m.video ?? m.image
		}`;
		mediaElement.alt = m.title;
		mediaElement.controls = false;
		mediaElement.autoplay = false;
		
		photoName.textContent = m.title;
		photoLike.textContent = m.likes + " \u2661";
		photoLike.classList.add("like");
		photoLike.onclick = ({ target }) => {
			const totalLikesElement = document.querySelector(
				".photograph_likeprice > span:first-child"
			);

			if (likes.includes(m.id)) {
				const mediaIndex = likes.indexOf(m.id);
				totalLikesElement.textContent =
					parseInt(totalLikesElement.textContent) - 1 + " \u2665";
				target.textContent =
					parseInt(target.textContent) - 1 + " \u2661";
				likes.splice(mediaIndex, 1);
			} else {
				totalLikesElement.textContent =
					parseInt(totalLikesElement.textContent) + 1 + " \u2665";
				target.textContent =
					parseInt(target.textContent) + 1 + " \u2665";
				likes.push(m.id);
			}
		};
		
		// Display media modal
		link.onclick = (event) => {
			event.preventDefault();
			if (event.target.classList.contains("like")) return;
			mediaModalEl.children[mediaModalEl.children.length - 1].appendChild(
				mediaElement.cloneNode()
			);
			mediaModalEl.children[
			mediaModalEl.children.length - 1
				].children[0].controls = true;
			mediaModalEl.children[mediaModalEl.children.length - 1].appendChild(
				photoName.cloneNode(true)
			);
			mediaModalEl.style.display = "inherit";
			document.body.style.overflow = "hidden";
		};
		
		link.appendChild(article);
		article.appendChild(mediaElement);
		article.appendChild(divInfos);
		divInfos.appendChild(photoName);
		divInfos.appendChild(photoLike);
		mediasSection.appendChild(link);
	})
	
	// for (const m of media) {
	//
	// }
	
	console.log(media);
	return media
}

function changeMedia(direction) {
	console.log(media)
	console.log(mediaModalEl.children[mediaModalEl.children.length - 1]);
	const photo =
		mediaModalEl.children[mediaModalEl.children.length - 1].children[0];
	console.log("media: ", photo);
	mediaModalEl.children[
	mediaModalEl.children.length - 1
		].children[1].remove();
	const mediaSrc = photo.src.split("/").pop();
	const mediaIndex = media.indexOf(
		media.find((el) => (el.video ?? el.image) === mediaSrc)
	);
	media.remove();
	let newIndex = direction === "left" ? mediaIndex - 1 : mediaIndex + 1;
	
	if (newIndex < 0) {
		newIndex = media.length - 1;
	} else if (newIndex >= media.length) {
		newIndex = 0;
	}
	
	const mediaElement = media[newIndex].video
		? document.createElement("video")
		: document.createElement("img");
	const spanName = document.createElement("span");
	
	mediaElement.src = `./assets/images/${photographer.name}/${
		media[newIndex].video ?? media[newIndex].image
	}`;
	mediaElement.alt = media[newIndex].title;
	spanName.textContent = media[newIndex].title;
	
	mediaModalEl.children[mediaModalEl.children.length - 1].appendChild(
		mediaElement
	);
	mediaModalEl.children[mediaModalEl.children.length - 1].appendChild(
		spanName
	);
}

// displayMedia()

function closeMediaModal() {
	mediaModalEl.children[mediaModalEl.children.length - 1].innerHTML = "";
	mediaModalEl.style.display = "none";
	document.body.style.overflow = "auto";
}
