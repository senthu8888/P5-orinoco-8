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

	// affiche l'élément du panier et panier vide
	let productContain = document.getElementById("basket");

	if (data == null || totalBasket == 0) {
		let div = document.createElement("div");
		div.id = "paniervide";
		let name = document.createElement("h2");
		name.textContent = " Panier vide ";
		prixPanier.textContent = "Total achat : " + 0 + " €";
		alert("Votre panier est vide");
		localStorage.clear();
		basket.appendChild(div);
		div.appendChild(name);
	} else {
		productContain.innerHTML = "";
		let div = document.createElement("div");
		div.id = "panierfull";
		let name = document.createElement("h2");
		name.textContent = " Votre Panier ";
		prixPanier.textContent = "Total achat : " + totalBasket / 100 + " €";
		prixPanier.id = "prixTotal";
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

			buttonMore.addEventListener("click", function () {
				addLocalStorage();
				itemsProducts();
				prixTotal();
				function itemsProducts() {
					let itemsProducts = localStorage.getItem("qty");
					itemsProducts = parseInt(itemsProducts);

					localStorage.setItem("qty", itemsProducts + 1);
					document.querySelector(".totalProducts").textContent = itemsProducts + 1;
					(teddy.price / 100) * teddy.qty + " €";
					window.location.reload();
				}

				function addLocalStorage() {
					let cart = JSON.parse(localStorage.getItem("panier"));
					cart[teddy.name].qty += 1;
					localStorage.setItem("panier", JSON.stringify(cart));
				}
				function prixTotal() {
					let price = parseInt(teddy.price);
					let priceBasket = JSON.parse(localStorage.getItem("prixTotal"));
					localStorage.setItem("prixTotal", priceBasket + price);
				}
			});

			buttonLess.addEventListener("click", function () {
				itemsProducts();
				removeLocalStorage();
				prixTotal();
				function itemsProducts() {
					let itemsProducts = localStorage.getItem("qty");
					itemsProducts = parseInt(itemsProducts);

					localStorage.setItem("qty", itemsProducts - 1);
					document.querySelector(".totalProducts").textContent = itemsProducts - 1;
					(teddy.price / 100) * teddy.qty + " €";
					window.location.reload();
				}

				function removeLocalStorage() {
					let cart = JSON.parse(localStorage.getItem("panier"));
					if (cart[teddy.name].qty != 1) {
						cart[teddy.name].qty -= 1;
					} else {
						alert("Vous avez supprimé " + teddy.name + " de votre panier ! ");
						delete cart[teddy.name];
					}
					localStorage.setItem("panier", JSON.stringify(cart));
				}
				function prixTotal() {
					let price = parseInt(teddy.price);
					let priceBasket = JSON.parse(localStorage.getItem("prixTotal"));
					localStorage.setItem("prixTotal", priceBasket - price);
				}
			});

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
	let article = JSON.parse(localStorage.getItem("panier"));

	console.log(article);

	let qty;
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

			qty = deleteButtons[i].parentElement.firstChild.textContent;
			console.log(qty);
			localStorage.setItem("qty", itemsProducts - article[qty].qty);

			alert("Vous avez supprimé " + itemName + " de votre panier ! ");
			delete article[itemName];
			delete article[qty];
			localStorage.setItem("panier", JSON.stringify(article));
			window.location.reload();

			displayBasket();
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
	function productId() {
		let products = sessionStorage.getItem("panier");
		if (products != null) {
			Object.values(products).map((p) => {
				products = p.id;
			});
		}
	}
	productId();
	console.log(products);

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
			sessionStorage.removeItem("panier");
			window.location.href = "commande.html";

			console.log(order);
		});
}
