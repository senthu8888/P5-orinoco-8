/*------Bears------*/
var get = function (url) {
	return new Promise(function (resolve, reject) {
		var orderTeddy = new XMLHttpRequest();

		orderTeddy.onreadystatechange = function () {
			if (orderTeddy.readyState === 4) {
				if (orderTeddy.status === 200) {
					resolve(orderTeddy.responseText);
				} else {
					reject(orderTeddy);
				}
			}
		};
		orderTeddy.open("GET", "http://localhost:3000/api/teddies", true);
		orderTeddy.send();
	});
};

var catchError = function (event) {
	console.error("Erreur", event);
};

get();
var ours = function () {
	return get("http://localhost:3000/api/teddies").then(function (response) {
		var teddies = JSON.parse(response);
		return teddies;
	});
};
let bears = document.getElementById("bears");

ours().then(function (teddies) {
	console.log(teddies);

	teddies.forEach((teddy) => {
		var article = document.createElement("article");
		var nom = document.createElement("h2");
		nom.textContent = teddy.name;
		var image = document.createElement("img");
		image.id = "cadre-photo";
		image.src = teddy.imageUrl;
		var div = document.createElement("div");
		var prix = document.createElement("h3");
		prix.textContent = "Prix :";
		var price = document.createElement("p");
		price.textContent = teddy.price / 100 + " €";
		var desc = document.createElement("h3");
		desc.textContent = "Description :";
		var description = document.createElement("p");
		description.textContent = teddy.description;
		var id = teddy._id;

		let link = document.createElement("a");
		link.id = "link";
		link.href = "produit.html?id=" + teddy._id;
		link.textContent = "Acheter le produit";

		bears.appendChild(article);
		article.appendChild(nom);
		article.appendChild(image);
		article.appendChild(div);
		div.appendChild(prix);
		div.appendChild(price);
		div.appendChild(desc);
		div.appendChild(description);
		div.appendChild(link);

		console.log(teddy);
	});
});

var a;
function hideTeddies() {
	if (a == 0) {
		document.getElementById("bears").style.display = "none";
		return (a = 1);
	} else {
		document.getElementById("bears").style.display = "inline";
		return (a = 0);
	}
}

/*----Camera----*/
var get = function (url) {
	return new Promise(function (resolve, reject) {
		var orderCamera = new XMLHttpRequest();

		orderCamera.onreadystatechange = function () {
			if (orderCamera.readyState === 4) {
				if (orderCamera.status === 200) {
					resolve(orderCamera.responseText);
				} else {
					reject(orderCamera);
				}
			}
		};

		orderCamera.open("GET", "http://localhost:3000/api/cameras", true);
		orderCamera.send();
	});
};

var catchError = function (event) {
	console.error("Erreur", event);
};

get();
var photos = function () {
	return get("http://localhost:3000/api/cameras").then(function (response) {
		var photography = JSON.parse(response);
		return photography;
	});
};
let cams = document.getElementById("cams");

photos().then(function (photography) {
	console.log(photography);

	photography.forEach((camera) => {
		var article = document.createElement("article");
		var nom = document.createElement("h2");
		nom.textContent = camera.name;
		var image = document.createElement("img");
		image.id = "cadre-photo";
		image.src = camera.imageUrl;
		var div = document.createElement("div");
		var prix = document.createElement("h3");
		prix.textContent = "Prix :";
		var price = document.createElement("p");
		price.textContent = camera.price / 100 + " €";
		var desc = document.createElement("h3");
		desc.textContent = "Description :";
		var description = document.createElement("p");
		description.textContent = camera.description;
		var id = camera._id;

		let link = document.createElement("a");
		link.id = "link";
		link.href = "produit.html?id=" + camera._id;
		link.textContent = "Acheter le produit";

		cams.appendChild(article);
		article.appendChild(nom);
		article.appendChild(image);
		article.appendChild(div);
		div.appendChild(prix);
		div.appendChild(price);
		div.appendChild(desc);
		div.appendChild(description);
		div.appendChild(link);

		console.log(camera);
	});
});

var b;
function hideCamera() {
	if (b == 0) {
		document.getElementById("cams").style.display = "none";
		return (b = 1);
	} else {
		document.getElementById("cams").style.display = "inline";
		return (b = 0);
	}
}

/*----Furniture----*/
var get = function (url) {
	return new Promise(function (resolve, reject) {
		var orderFurniture = new XMLHttpRequest();

		orderFurniture.onreadystatechange = function () {
			if (orderFurniture.readyState === 4) {
				if (orderFurniture.status === 200) {
					resolve(orderFurniture.responseText);
				} else {
					reject(orderFurniture);
				}
			}
		};

		orderFurniture.open("GET", "http://localhost:3000/api/furniture", true);
		orderFurniture.send();
	});
};

var catchError = function (event) {
	console.error("Erreur", event);
};

get();
var furnitures = function () {
	return get("http://localhost:3000/api/cameras").then(function (response) {
		var furnis = JSON.parse(response);
		return furnis;
	});
};
let furs = document.getElementById("furs");

furnitures().then(function (furnis) {
	console.log(furnis);

	furnis.forEach((furni) => {
		var article = document.createElement("article");
		var nom = document.createElement("h2");
		nom.textContent = furni.name;
		var image = document.createElement("img");
		image.id = "cadre-photo";
		image.src = furni.imageUrl;
		var div = document.createElement("div");
		var prix = document.createElement("h3");
		prix.textContent = "Prix :";
		var price = document.createElement("p");
		price.textContent = furni.price / 100 + " €";
		var desc = document.createElement("h3");
		desc.textContent = "Description :";
		var description = document.createElement("p");
		description.textContent = furni.description;
		var id = furni._id;

		let link = document.createElement("a");
		link.id = "link";
		link.href = "produit.html?id=" + furni._id;
		link.textContent = "Acheter le produit";

		furs.appendChild(article);
		article.appendChild(nom);
		article.appendChild(image);
		article.appendChild(div);
		div.appendChild(prix);
		div.appendChild(price);
		div.appendChild(desc);
		div.appendChild(description);
		div.appendChild(link);

		console.log(furni);
	});
});

var c;
function hideFurniture() {
	if (c == 0) {
		document.getElementById("furs").style.display = "none";
		return (c = 1);
	} else {
		document.getElementById("furs").style.display = "inline";
		return (c = 0);
	}
}
