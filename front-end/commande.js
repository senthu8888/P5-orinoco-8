//élément de la commande stocké
let contact = JSON.parse(sessionStorage.getItem("contact"));
let orderId = JSON.parse(sessionStorage.getItem("orderId"));
let prix = JSON.parse(sessionStorage.getItem("prix"));
let productContain = "";

productContain = `
<p class="commandetext">${contact.firstName} ${contact.lastName}</p><br>
<p class="commandetext">Votre commande a été enregistrée sous le numéro :  ${orderId}</p>
        <p class="commandetext">montant total de ${prix / 100} €</p>
        <p class="commandetext">Merci pour votre commande</p>
        <p class="commandetext">En vous remercie de votre visite</p>
		<p class="commandeicon"><i class="far fa-thumbs-up"></i></p>`;

document.getElementById("conform").innerHTML = productContain;

let backMenu = document.getElementById("retour");
backMenu.addEventListener("click", function () {
	localStorage.clear();
	window.location.reload();
	sessionStorage.removeItem("prix");
	sessionStorage.removeItem("orderId");
	sessionStorage.removeItem("contact");
});

// var quit = false;
// window.onbeforeunload = function () {
// 	if (quit == false) {
// 		return false;
// 	}
// 	window.location.href = "index.html";
// };
