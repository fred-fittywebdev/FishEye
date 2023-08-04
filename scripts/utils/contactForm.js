const modalEl = document.getElementById("contact_modal");
const closeContactEl = document.getElementById("close-contact");
const openContactEl = document.getElementById("contact_button");
const formEl = document.querySelector("form");
console.log(formEl.elements);

function checkValidity() {
	for (let element of formEl.elements) {
		if (element.validity.tooShort) {
			element.setCustomValidity("Veuillez entrer 4 caractères minimums.");
		} else if (element.validity.typeMismatch) {
			element.setCustomValidity(
				"Veuillez entrer une adresse mail valide."
			);
		} else if (element.validity.valueMissing) {
			element.setCustomValidity("Ce champ ne peut être vide");
		} else {
			element.setCustomValidity("");
		}
	}
}

checkValidity();

for (let element of formEl.elements) {
	element.addEventListener("input", checkValidity);
}

function displayModal() {
	modalEl.style.display = "block";
}

export function closeModal() {
	formEl.reset();
	modalEl.style.display = "none";
}

openContactEl.addEventListener("click", displayModal);
closeContactEl.addEventListener("click", closeModal);

export function sendFormValue() {
	const form = document.querySelector("form");

	form.addEventListener("submit", (e) => {
		e.preventDefault();

		try {
			const userObject = {
				prenom: document.querySelector("#prenom").value,
				nom: document.querySelector("#nom").value,
				email: document.querySelector("#email").value,
				message: document.querySelector("#message").value,
			};
			console.log(userObject);
			closeModal();
		} catch (error) {
			console.log(error);
		}
	});
}

sendFormValue();
