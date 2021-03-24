//récupération du ID du produit choisi
let setup = new URLSearchParams(window.location.search);
let items = document.getElementById("items");

let teddy;

fetch("http://localhost:3000/api/teddies/" + setup.get("id"))
	.then((response) => {
		console.log(response);
		if (response.ok) {
			return response.json();
		} else {
			throw Error(response.status);
		}
	})
	.then((teddy) => {
		console.log(teddy._id);
		//mise en place de l'ensemble du produit
		let article = document.createElement("article");
		let image = document.createElement("img");
		image.id = "cadre-photo-produit";
		image.src = teddy.imageUrl;
		let div = document.createElement("div");
		let name = document.createElement("h2");
		name.textContent = teddy.name;
		name.id = "nom";
		let reference = document.createElement("h3");
		reference.textContent = "Référence :";
		let numRef = document.createElement("p");
		numRef.textContent = teddy._id;
		let prix = document.createElement("h3");
		prix.textContent = "Prix :";
		let price = document.createElement("p");
		price.textContent = teddy.price / 100 + " €";
		let desc = document.createElement("h3");
		desc.textContent = "Description :";
		let description = document.createElement("p");
		description.textContent = teddy.description;

		let label = document.createElement("label");
		label.textContent = "Couleur : ";
		let color = document.createElement("select");
		let selection = teddy.colors;
		selection.id = "color";
		for (let i = 0; i < selection.length; i++) {
			let option = document.createElement("option");
			option.textContent = selection[i];
			option.id = "color";
			color.appendChild(option);
		}

		addBasket = document.createElement("button");
		addBasket.id = "item-select";
		addBasket.textContent = "Ajouter au panier";

		//élément qui permet de stocké le produit choisi au panier
		addBasket.addEventListener("click", function () {
			alert("Vous avez ajouté " + teddy.name + " à votre panier");
			addingStorage();
			itemsProducts();
			prixTotal();

			function addingStorage() {
				let cart = JSON.parse(localStorage.getItem("panier"));
				if (cart != null) {
					teddy.qty = 0;
					if (cart[teddy.name] === undefined) {
						cart = { ...cart, [teddy.name]: teddy };
					}
					cart[teddy.name].qty += 1;
				} else {
					teddy.qty = 1;
					cart = { [teddy.name]: teddy };
				}
				localStorage.setItem("panier", JSON.stringify(cart));
			}

			function itemsProducts() {
				let itemsProducts = localStorage.getItem("qty");
				itemsProducts = parseInt(itemsProducts);

				if (itemsProducts) {
					localStorage.setItem("qty", itemsProducts + 1);
					document.querySelector(".totalProducts").textContent = itemsProducts + 1;
				} else {
					localStorage.setItem("qty", 1);
					document.querySelector(".totalProducts").textContent = 1;
				}
			}

			function prixTotal() {
				let price = parseInt(teddy.price);
				let priceBasket = JSON.parse(localStorage.getItem("prixTotal")) || 0;

				localStorage.setItem("prixTotal", priceBasket + price);
			}
		});

		items.appendChild(article);
		article.appendChild(name);
		article.appendChild(image);
		article.appendChild(div);
		div.appendChild(reference);
		div.appendChild(numRef);
		div.appendChild(prix);
		div.appendChild(price);
		div.appendChild(desc);
		div.appendChild(description);
		div.appendChild(label);
		div.appendChild(color);
		div.appendChild(addBasket);
	});
