// Import api data, photographer factory et contact details from aother jsfile
import { getPhotographerById, getPhotographerMedia } from "../API/api.js";
import { photographerFactory } from "../factories/photographer.js";
import { closeModal, sendFormValue } from "../utils/contactForm.js";

// Déclaration des variables pour afficher le contenu du photographe dont l'ID est dans l'URL

let photographer;
let media;
let small;
let orderBy = "populaire";
let likes = [];
const mediaModalEl = document.getElementById("media_modal");
const modal = document.getElementById("contact_modal");
const closeLightboxEl = document.getElementById("close_lightbox");
const btnLightboxNextEl = document.getElementById("right-arrow");
const btnLightboxPrevEl = document.getElementById("left-arrow");

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

async function mediaInit() {
	try {
		photographer = await getPhotographerById();
		media = await getPhotographerMedia();
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

function orderMedias(media, photographer, orderBy = "populaire") {
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

async function displayMedia(media, photographer) {
	const mediasSection = document.getElementById("photograph_medias");
	mediasSection.innerHTML = "";
	mediasSection.style.gridTemplateRows =
		"repeat(" + Math.ceil(media.length / 3) + ", 400px)";
	small = document.createElement("small");

	media.forEach((m) => {
		const article = document.createElement("article");
		const link = document.createElement("a");
		const mediaElement = m.video
			? document.createElement("video")
			: document.createElement("img");

		small.textContent = "Vidéo";
		if (m.video) {
			article.appendChild(small);
		}

		const divInfos = document.createElement("div");
		// titre et like sous les photos
		const photoName = document.createElement("span");
		const photoLike = document.createElement("span");
		article.dataset.id = m.id;
		link.href = "javascript:void(0)";
		mediaElement.src = m.video
			? `./assets/images/${photographer.name}/${m.video}`
			: `./assets/images/${photographer.name}/${m.image}`;

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
			small.style.display = "none";
			mediaModalEl.style.display = "inherit";
			document.body.style.overflow = "hidden";
		};

		link.appendChild(article);
		article.appendChild(mediaElement);
		article.appendChild(divInfos);
		divInfos.appendChild(photoName);
		divInfos.appendChild(photoLike);
		mediasSection.appendChild(link);
	});

	return media;
}

function changeMedia(direction) {
	console.log(media);
	console.log(mediaModalEl.children[mediaModalEl.children.length - 1]);
	const photo =
		mediaModalEl.children[mediaModalEl.children.length - 1].children[0];
	console.log("media: ", photo);
	mediaModalEl.children[
		mediaModalEl.children.length - 1
	].children[1].remove(); // supprime le span dans la div ou il y a l'image
	const mediaSrc = photo.src.split("/").pop();
	console.log(mediaSrc);
	const mediaIndex = media.indexOf(
		media.find((el) => (el.video ?? el.image) === mediaSrc)
	);
	console.log(mediaIndex);
	console.log(media);
	console.log(photo);
	photo.remove();
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

	mediaElement.src = media[newIndex].video
		? `./assets/images/${photographer.name}/${media[newIndex].video}`
		: `./assets/images/${photographer.name}/${media[newIndex].image}`;

	mediaElement.alt = media[newIndex].title;
	spanName.textContent = media[newIndex].title;

	mediaModalEl.children[mediaModalEl.children.length - 1].appendChild(
		mediaElement
	);
	mediaModalEl.children[mediaModalEl.children.length - 1].appendChild(
		spanName
	);
}

btnLightboxNextEl.addEventListener("click", function () {
	changeMedia("right");
});

btnLightboxPrevEl.addEventListener("click", function () {
	changeMedia("left");
});

// displayMedia()

function closeMediaModal() {
	mediaModalEl.children[mediaModalEl.children.length - 1].innerHTML = "";
	mediaModalEl.style.display = "none";
	small.style.display = "block";
	document.body.style.overflow = "auto";
}

closeLightboxEl.addEventListener("click", closeMediaModal);
