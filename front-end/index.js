let bears = document.getElementById("bears");

//Affichage du produit sur la page du site
fetch("http://localhost:3000/api/teddies")
	.then((response) => response.json())
	.then((teddies) => {
		console.log(teddies);

		teddies.forEach((teddy) => {
			let article = document.createElement("article");
			article.id = "article-main";
			let name = document.createElement("h2");
			name.textContent = teddy.name;
			let image = document.createElement("img");
			image.id = "cadre-photo";
			image.src = teddy.imageUrl;
			let div = document.createElement("div");
			let prix = document.createElement("h3");
			prix.textContent = "Prix :";
			let price = document.createElement("p");
			price.textContent = teddy.price / 100 + " €";
			let desc = document.createElement("h3");
			desc.textContent = "Description :";
			let description = document.createElement("p");
			description.textContent = teddy.description;

			let link = document.createElement("a");
			link.className = "link";
			link.href = "produit.html?id=" + teddy._id;
			link.textContent = "Acheter";

			article.appendChild(name);
			article.appendChild(image);
			article.appendChild(div);
			div.appendChild(prix);
			div.appendChild(price);
			div.appendChild(desc);
			div.appendChild(description);
			div.appendChild(link);
			bears.appendChild(article);
		});
	});
