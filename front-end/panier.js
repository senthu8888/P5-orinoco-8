//Affichage total du panier
let data;

function displayBasket() {
	let data = localStorage.getItem("panier");
	data = JSON.parse(data);
	console.log(data);

	let deleteBasket = document.getElementById("vider");
	deleteBasket.addEventListener("click", function () {
		alert("Votre panier est vide");
		localStorage.clear();
		window.location.reload();
	});

	let totalBasket = localStorage.getItem("prixTotal");
	let prixPanier = document.getElementById("totalpanier");

	if (totalBasket != 0) {
		prixPanier.textContent = "Total achat : " + totalBasket / 100 + " €";
		prixPanier.id = "prixTotal";
	} else {
		prixPanier.textContent = "Total achat : " + 0 + " €";
		alert("Votre panier est vide");
		localStorage.clear();
		window.location.reload();
	}

	// affiche l'élément du panier et panier vide
	let productContain = document.getElementById("basket");

	if (data == null || totalBasket == 0) {
		let div = document.createElement("div");
		div.id = "paniervide";
		let name = document.createElement("h2");
		name.textContent = " Panier vide ";
		basket.appendChild(div);
		div.appendChild(name);
	} else {
		productContain.innerHTML = "";
		let div = document.createElement("div");
		div.id = "panierfull";
		let name = document.createElement("h2");
		name.textContent = " Votre Panier ";
		basket.appendChild(div);
		div.appendChild(name);

		//création du fichier panier
		Object.values(data).map((teddy) => {
			let article = document.createElement("article");
			let image = document.createElement("img");
			image.id = "cadre-photo-panier";
			image.src = teddy.imageUrl;
			let name = document.createElement("h2");
			name.textContent = teddy.name;
			let div = document.createElement("div");
			let quantite = document.createElement("h3");
			quantite.textContent = "Quantité: ";
			let buttons = document.createElement("div");
			buttons.className = "buttons";
			buttonLess = document.createElement("button");
			buttonLess.textContent = "-";
			buttonLess.id = "buttonLess";
			let addProducts = document.createElement("p");
			addProducts.textContent = teddy.qty;
			addProducts.id = "qtyArticle";
			buttonMore = document.createElement("button");
			buttonMore.textContent = "+";
			buttonMore.id = "buttonMore";

			buttonMore.addEventListener("click", function () {
				addLocalStorage();
				itemsProducts();
				prixTotal();
				function itemsProducts() {
					let itemsProducts = localStorage.getItem("qty");
					itemsProducts = parseInt(itemsProducts);

					if (itemsProducts) {
						localStorage.setItem("qty", itemsProducts + 1);
						document.querySelector(".totalProducts").textContent = itemsProducts + 1;
						(teddy.price / 100) * teddy.qty + " €";
						window.location.reload();
					} else {
						localStorage.setItem("qty", 1);
						document.querySelector(".totalProducts").textContent = 1;
					}
				}

				function addLocalStorage() {
					let panier = localStorage.getItem("panier");
					panier = JSON.parse(panier);
					if (panier != null) {
						if (panier[teddy.name] === undefined) {
							panier = { ...panier, [teddy.name]: teddy };
						}
						panier[teddy.name].qty += 1;
					} else {
						panier = { [teddy.name]: teddy };
					}
					localStorage.setItem("panier", JSON.stringify(panier));
				}
				function prixTotal() {
					let price = parseInt(teddy.price);
					let priceBasket = JSON.parse(localStorage.getItem("prixTotal")) || 0;

					localStorage.setItem("prixTotal", priceBasket + price);
				}
			});

			buttonLess.addEventListener("click", function () {
				removeLocalStorage();
				itemsProducts();
				prixTotal();
				function itemsProducts() {
					let itemsProducts = localStorage.getItem("qty");
					itemsProducts = parseInt(itemsProducts);

					if (itemsProducts) {
						localStorage.setItem("qty", itemsProducts - 1);
						document.querySelector(".totalProducts").textContent = itemsProducts - 1;
						(teddy.price / 100) * teddy.qty + " €";
						window.location.reload();
					} else {
						localStorage.setItem("qty", 0);
						document.querySelector(".totalProducts").textContent = 0;
					}
				}

				function removeLocalStorage() {
					let panier = localStorage.getItem("panier");
					panier = JSON.parse(panier);
					if (panier != null) {
						if (panier[teddy.name] === undefined) {
							panier = { ...panier, [teddy.name]: teddy };
						}
						panier[teddy.name].qty -= 1;
					} else {
						panier = { [teddy.name]: teddy };
					}
					localStorage.setItem("panier", JSON.stringify(panier));
				}
				function prixTotal() {
					let price = parseInt(teddy.price);
					let priceBasket = JSON.parse(localStorage.getItem("prixTotal")) || 0;

					localStorage.setItem("prixTotal", priceBasket - price);
				}
			});

			let prix = document.createElement("h3");
			prix.textContent = "Prix: ";
			let price = document.createElement("p");
			price.textContent = teddy.price / 100 + " €";
			price.id = "price";
			let prixTotalProduit = document.createElement("h3");
			prixTotalProduit.id = "prixTotalProduit";
			prixTotalProduit.textContent = "Prix Total: ";
			let priceProduit = document.createElement("p");
			priceProduit.textContent = (teddy.price / 100) * teddy.qty + " €";
			priceProduit.id = "priceProduit";
			let supprimerProduit = document.createElement("button");
			supprimerProduit.textContent = "supprimer le produit";
			supprimerProduit.id = "supprimerProduit";

			basket.appendChild(article);
			article.appendChild(image);
			article.appendChild(div);
			div.appendChild(name);
			div.appendChild(quantite);
			div.appendChild(buttons);
			buttons.appendChild(buttonLess);
			buttons.appendChild(addProducts);
			buttons.appendChild(buttonMore);
			div.appendChild(prix);
			div.appendChild(price);
			div.appendChild(prixTotalProduit);
			div.appendChild(priceProduit);
			div.appendChild(supprimerProduit);
		});
	}
	deleteButtons();
}
displayBasket();

//élément qui permet de supprimer le produit choisi
function deleteButtons() {
	let deleteButtons = document.querySelectorAll("#supprimerProduit");
	let itemName;
	let prixTotal = localStorage.getItem("prixTotal");
	let article = localStorage.getItem("panier");
	article = JSON.parse(article);

	console.log(article);

	let itemsProducts = localStorage.getItem("qty");
	itemsProducts = parseInt(itemsProducts);

	for (let i = 0; i < deleteButtons.length; i++) {
		deleteButtons[i].addEventListener("click", () => {
			itemName = deleteButtons[i].parentElement.firstChild.textContent;
			console.log(itemName);
			localStorage.setItem(
				"prixTotal",
				prixTotal - article[itemName].price * article[itemName].qty
			);

			alert("Vous avez supprimé " + itemName + " de votre panier ! ");
			delete article[itemName];
			localStorage.setItem("panier", JSON.stringify(article));
			window.location.reload();
			if (itemsProducts != 0) {
				localStorage.setItem("qty", itemsProducts - 1);
				document.querySelector(".totalProducts").textContent = itemsProducts - 1;
			} else {
				localStorage.setItem("qty", 0);
				document.querySelector(".totalProducts").textContent = 0;
			}

			displayBasket();
			fillBasket();
		});
	}
}

//Validation de la commande
let valid = document.getElementById("formulaire");
valid.addEventListener("submit", function (e) {
	e.preventDefault();
	achat();
});

function achat() {
	let contact = {
		firstName: document.getElementById("firstName").value,
		lastName: document.getElementById("lastName").value,
		address: document.getElementById("address").value,
		city: document.getElementById("city").value,
		email: document.getElementById("email").value,
	};

	let products = [];
	if (sessionStorage.getItem("anyItem") !== null) {
		let productTab = JSON.parse(sessionStorage.getItem("anyItem"));

		productTab.forEach((p) => {
			products.push(p.id);
		});
	}

	let objt = JSON.stringify({
		contact,
		products,
	});
	orderSend(objt);
}

function orderSend(objt) {
	fetch("http://localhost:3000/api/teddies/order", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: objt,
	})
		.then((response) => {
			return response.json();
		})
		.then((order) => {
			sessionStorage.setItem("contact", JSON.stringify(order.contact));
			sessionStorage.setItem("orderId", JSON.stringify(order.orderId));
			let prix = localStorage.getItem("prixTotal");
			prix = JSON.parse(prix);
			sessionStorage.setItem("prix", JSON.stringify(prix));
			sessionStorage.removeItem("anyItem");
			window.location.href = "commande.html";

			console.log(order);
		})
		.catch(() => {
			return alert("Erreur de la commande");
		});
}
