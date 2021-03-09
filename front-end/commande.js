//élément de la commande stocké
function orderItem() {
	let data = JSON.parse(sessionStorage.getItem("order"));
	let prix = JSON.parse(sessionStorage.getItem("prix"));

	console.log(data.orderId);
	console.log(prix);

	let productContainer = document.getElementById("conform");

	if (data != 0) {
		productContainer.innerHTML = "";
		Object.values(data).map(() => {
			productContainer.innerHTML = `
			<p class="commandetext">Cher Client</p>
            <p class="commandetext">Votre commande a été enregistrée sous le numéro :  ${
				data.orderId
			}</p>
            <p class="commandetext">montant total de ${prix / 100} €</p>
            <p class="commandetext">Merci pour votre commande</p>
            <p class="commandetext">En vous remercie de votre visite</p>
			<p class="commandeicon"><i class="far fa-thumbs-up"></i></p>`;
		});
	}
}

let backMenu = document.getElementById("retour");
backMenu.addEventListener("click", function () {
	localStorage.clear();
	window.location.reload();
});

orderItem();
