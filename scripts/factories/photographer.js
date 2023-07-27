// Function to create and display a photographer on index page
function photographerFactory(data) {
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
		const nameElement = document.querySelector(".photograph_infos > h1");
		const locationElement = document.querySelector(
			".photograph_infos > p:nth-child(2)"
		);
		const taglineElement = document.querySelector(
			".photograph_infos > p:last-child"
		);

		nameElement.textContent = name;
		locationElement.textContent = city + ", " + country;
		taglineElement.textContent = tagline;

		const header = document.querySelector(".photograph-header");
		const image = document.createElement("img");

		image.src = `./assets/photographers/${portrait}`;
		image.alt = name;

		header.appendChild(image);
	}

	return { getUserCardDOM, getPhotographerDom };
}
