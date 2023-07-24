function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

function sendFormValue() {
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

sendFormValue()