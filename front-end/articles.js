//Affiche le nombre de produit ajouté au panier
function fillBasket() {
	let itemsProducts = localStorage.getItem("qty");

	if (itemsProducts) {
		document.querySelector(".totalProducts").textContent = itemsProducts;
	} else {
		document.querySelector(".totalProducts").textContent = 0;
	}
}

fillBasket();
