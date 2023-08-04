// Function to create and display a photographer on index page
export function photographerFactory(data) {
	const { id, name, portrait, tagline, city, country, price } = data;

	const picture = `./assets/photographers/${portrait}`;

	function getUserCardDOM() {
		const article = document.createElement("article");
		const link = document.createElement("a");

		link.href = "./photographer.html?id=" + id;
		link.ariaLabel = name;

		const img = document.createElement("img");

		img.setAttribute("src", picture);
		img.alt = "Photo du profil de " + name;

		const h2 = document.createElement("h2");

		h2.textContent = name;

		article.appendChild(link);
		link.appendChild(img);
		link.appendChild(h2);

		const div = document.createElement("div");
		const locationInfos = document.createElement("p");
		const taglineInfos = document.createElement("p");
		const priceInfos = document.createElement("p");

		locationInfos.textContent = city + ", " + country;
		taglineInfos.textContent = tagline;
		priceInfos.textContent = price + "€/jour";

		div.appendChild(locationInfos);
		div.appendChild(taglineInfos);
		div.appendChild(priceInfos);
		article.appendChild(div);

		return article;
	}

	function getPhotographerDom() {
		// NOTE: 1 - je n'arrive pas l'implémenter en créant un élément.
		// const header = document.createElement("div")
		const photograpInfos = document.createElement("div");
		photograpInfos.classList.add("photograph_infos");
		const nameElement = document.createElement("h1");

		const locationElement = document.createElement("p");

		const taglineElement = document.createElement("p");

		const image = document.createElement("img");

		nameElement.textContent = name;
		locationElement.textContent = city + ", " + country;
		taglineElement.textContent = tagline;

		photograpInfos.appendChild(nameElement);
		photograpInfos.appendChild(locationElement);
		photograpInfos.appendChild(taglineElement);

		image.src = `./assets/photographers/${portrait}`;
		image.alt = name;

		//NOTE: 2 -  si je l'enlève la mise en page n'est plus bonne
		const header = document.querySelector(".photograph-header");

		header.prepend(photograpInfos);
		header.appendChild(image);

		return header;
	}

	return { getUserCardDOM, getPhotographerDom };
}
