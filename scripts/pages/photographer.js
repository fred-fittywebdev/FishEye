// Déclaration des variables pour afficher le contenu du photographe dont l'ID est dans l'URL
const searchParamsId = new URLSearchParams(location.search);
const photographerId = +searchParamsId.get('id');
let photographer;
let medias;
let orderBy = "populaire"
likes = []

// fetch('./data/photographers.json').then(response => {
// 	return response.json()
// }).then(data => {
// 	const {photographers, media} = data
// 	photographer = photographers.find((photographer) => photographer.id === photographerId)
// 	medias = media.filter((media) => {
// 		const {photographerId: photographerId1} = media;
// 		return photographerId1 === photographerId;
// 	})
// 	console.table(photographer);
// 	console.log(medias);
// })

;(async () => {
	try {
		const response = await fetch('./data/photographers.json');
		const data = await response.json();
		
		const {photographers, media} = data;
		photographer = photographers.find((photographer) => photographer.id === photographerId);
		medias = media.filter((media) => {
			const {photographerId: photographerId1} = media;
			return photographerId1 === photographerId;
		});
		
		
		photographInfos(photographer)
		orderMedias(photographer)
		displayLikePrice(medias, photographer.price)
		displayMedias(photographer, medias)
		
		const orderSelect = document.querySelector('#select')
		orderSelect.onchange = ({ target: { value } }) => orderMedias(photographer, value)
		
		const contactTitle = document.querySelector('#contact_modal h2')
		contactTitle.textContent += ' ' + photographer.name
	} catch (error) {
		console.log(error);
	}
	
})()

function photographInfos(photographer) {
	const { name, city, country, tagline, portrait } = photographer
	const nameElement = document.querySelector('.photograph_infos > h1')
	const locationElement = document.querySelector('.photograph_infos > p:nth-child(2)')
	const taglineElement = document.querySelector('.photograph_infos > p:last-child')
	
	nameElement.textContent = name
	locationElement.textContent = city + ', ' + country
	taglineElement.textContent = tagline
	
	const header = document.querySelector('.photograph-header')
	const image = document.createElement('img')
	
	image.src = `./assets/photographers/${portrait}`
	image.alt = photographer.name
	
	header.appendChild(image)
}

function displayLikePrice(medias, price) {
	const element = document.querySelector('.photograph_likeprice')
	
	element.children[0].textContent = medias.reduce((sum, media) => sum + media.likes, 0) + ' ♥'
	element.children[1].textContent = price + '€ / jour'
}

function orderMedias(photographer, orderBy = 'populaire') {
	switch (orderBy) {
		case 'populaire': {
			medias.sort((a, b) => b.likes - a.likes)
			break
		}
		case 'date': {
			medias.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
			break
		}
		case 'title': {
			medias.sort((a, b) => a.title.localeCompare(b.title))
			break
		}
	}
	displayMedias(photographer, medias)
}

// Display all medias of the photographer and add events
function displayMedias(photographer, medias) {
	const mediasSection = document.getElementById('photograph_medias')
	mediasSection.innerHTML = ''
	mediasSection.style.gridTemplateRows = 'repeat(' + Math.ceil(medias.length / 3) + ', 400px)'
	
	for (const media of medias) {
		console.log(media.likes);
		const article = document.createElement('article')
		const link = document.createElement('a')
		const mediaElement = media.video ? document.createElement('video') : document.createElement('img')
		const divInfos = document.createElement('div')
		// titre et like sous les photos
		const photoName = document.createElement('span')
		const photoLike = document.createElement('span')
		article.dataset.id = media.id
		link.href = 'javascript:void(0)'
		mediaElement.src = `./assets/images/${photographer.name}/${media.video ?? media.image}`
		mediaElement.alt = media.title
		mediaElement.controls = false
		mediaElement.autoplay = false
		
		photoName.textContent = media.title
		photoLike.textContent = media.likes + ' \u2665'
		photoLike.classList.add('like')
		photoLike.onclick = ({ target }) => {
			if (likes.includes(media.id)) {
				return console.log('Pouet')
			}
			
			const totalLikesElement = document.querySelector('.photograph_likeprice > span:first-child')
			
			totalLikesElement.textContent = parseInt(totalLikesElement.textContent) + 1 + ' \u2665'
			target.textContent = parseInt(target.textContent) + 1 + ' \u2665'
			likes.push(media.id)
		}
		

		
		
		// photoName.textContent = media.title
		// photoLike.textContent = media.likes + ' ♥'
		// photoLike.classList.add('like')
		// photoLike.onclick = ({ target }) => {
		// 	if (likes.includes(media.id)) {
		// 		return console.log('Pouet')
		// 	}
		//
		// 	const totalLikesElement = document.querySelector('.photograph_likeprice > span:first-child')
		//
		// 	totalLikesElement.textContent = parseInt(totalLikesElement.textContent) + 1 + ' ♥'
		// 	target.textContent = parseInt(target.textContent) + 1 + ' ♥'
		// 	likes.push(media.id)
		// }
		//
		// // Display media modal
		// link.onclick = (event) => {
		// 	event.preventDefault()
		// 	if (event.target.classList.contains('like')) return
		// 	media_modal.children[media_modal.children.length - 1].appendChild(mediaElement.cloneNode())
		// 	media_modal.children[media_modal.children.length - 1].children[0].controls = true
		// 	media_modal.children[media_modal.children.length - 1].appendChild(photoName.cloneNode(true))
		// 	media_modal.style.display = 'inherit'
		// 	document.body.style.overflow = 'hidden'
		// }
		
		link.appendChild(article)
		article.appendChild(mediaElement)
		article.appendChild(divInfos)
		divInfos.appendChild(photoName)
		divInfos.appendChild(photoLike)
		mediasSection.appendChild(link)
	}
}



