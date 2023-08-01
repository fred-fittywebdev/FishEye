const modalEl = document.getElementById("contact_modal");
const closeContactEl = document.getElementById("close-contact");
console.log(closeContactEl);
const openContactEl = document.getElementById("contact_button");

function displayModal() {
	modalEl.style.display = "block";
}

export function closeModal() {
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
