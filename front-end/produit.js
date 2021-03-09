//récupération du ID du produit choisi
let id = window.location.search.substring(4);

let url = "http://localhost:3000/api/teddies/" + id;
let items = document.getElementById("items");
let articlePage = async function () {
	let response = await fetch(url);
	let teddy;
	teddy = await response.json().then((teddy) => {
		//mise en place de l'ensemble du produit
		let article = document.createElement("article");
		let image = document.createElement("img");
		image.id = "cadre-photo-produit";
		image.src = teddy.imageUrl;
		console.log(id);
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
			ajoutLocalStorage();
			itemsProducts();
			prixTotal();
			function itemsProducts() {
				let itemsProducts = localStorage.getItem("qté");
				itemsProducts = parseInt(itemsProducts);

				if (itemsProducts) {
					localStorage.setItem("qté", itemsProducts + 1);
					document.querySelector(".totalProducts").textContent = itemsProducts + 1;
				} else {
					localStorage.setItem("qté", 1);
					document.querySelector(".totalProducts").textContent = 1;
				}
			}

			function ajoutLocalStorage() {
				let panier = localStorage.getItem("panier");
				panier = JSON.parse(panier);
				if (panier != null) {
					teddy.qté = 0;
					if (panier[teddy.name] === undefined) {
						panier = { ...panier, [teddy.name]: teddy };
					}
					panier[teddy.name].qté += 1;
				} else {
					teddy.qté = 1;
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
};

//élément qui permet d'afficher le produit
window.onload = () => {
	articlePage();
};
