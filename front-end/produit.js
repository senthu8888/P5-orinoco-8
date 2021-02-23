let properties = new URLSearchParams(window.location.search);
console.log(properties);
let id = properties.get("id");
console.log("id= " + id);

let _id = id;
let teddy;

let articlePage = () => {
	let Request = new XMLHttpRequest();
	Request.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			teddy = JSON.parse(this.responseText);
			console.log(teddy);
			Panier();
		}
	};
	Request.open("GET", "http://localhost:3000/api/teddies/" + _id);
	Request.send();
};

window.addEventListener("load", articlePage);
console.log(teddy);

function Panier() {
	var article = document.createElement("article");
	var image = document.createElement("img");
	image.id = "cadre-photo";
	image.src = teddy.imageUrl;
	id = teddy._id;
	console.log(id);
	var div = document.createElement("div");
	var nom = document.createElement("h2");
	nom.textContent = teddy.name;
	nom.id = "nom";
	var reference = document.createElement("h3");
	reference.textContent = "Référence :";
	var numRef = document.createElement("p");
	numRef.textContent = teddy._id;
	var prix = document.createElement("h3");
	prix.textContent = "Prix :";
	var price = document.createElement("p");
	price.textContent = teddy.price / 100 + " €";
	var desc = document.createElement("h3");
	desc.textContent = "Description :";
	var description = document.createElement("p");
	description.textContent = teddy.description;

	var label = document.createElement("label");
	label.textContent = "Couleur : ";
	var color = document.createElement("select");
	color.id = "choix";
	var choix = teddy.colors;
	choix.id = "color";
	for (var i = 0; i < choix.length; i++) {
		var option = document.createElement("option");
		option.textContent = choix[i];
		option.id = "color";
		color.appendChild(option);
	}

	PanierAchat = document.createElement("button");
	PanierAchat.id = "item-select";
	PanierAchat.textContent = "Ajouter au panier";

	PanierAchat.addEventListener("click", function () {
		if (typeof Stock != "undefined" && JSON) {
			let paniers = {
				img: teddy.imageUrl,
				teddyId: teddy._id,
				nom: document.getElementById("nom").textContent,
				prix: teddy.price / 100,
				quantite: 1,
			};

			console.log(paniers);

			let quantite = 1;
			console.log(typeof quantite);

			let prix = teddy.price / 100;
			console.log(typeof prix);
			console.log(prix);

			setItems();

			function setItems() {
				let panier = Stock.getItem("panier");
				panier = JSON.parse(panier);
				let article = paniers.nom;
				let prixTotal = Stock.getItem("prixTotal");
				prixTotal = parseInt(prixTotal);
				prix = parseInt(prix);
				if (panier != null) {
					if (panier[article] == undefined) {
						panier = { ...panier, [article]: paniers };
						Stock.setItem("prixTotal", prixTotal + prix);
						alert("Produit ajouté au panier");
					} else {
						alert("Produit déjà ajouté au panier");
					}
				} else {
					panier = { [article]: paniers };
					Stock.setItem("prixTotal", prix);
					alert("Produit ajouté au panier");
				}
				Stock.setItem("panier", JSON.stringify(panier));
			}
		} else {
			alert("erreur");
		}
	});

	produit.appendChild(article);
	article.appendChild(nom);
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
	div.appendChild(PanierAchat);
}
