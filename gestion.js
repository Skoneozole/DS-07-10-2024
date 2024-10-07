const searchBar = document.getElementById('txt');
const stockCheckbox = document.getElementById('stocks');
const rez = document.getElementById('rez');

// URL du fichier .txt hébergé sur Gist
const gistUrl = 'https://gist.githubusercontent.com/dupontdenis/b2e5e1b7460c239b39deb76f8d458908/raw/817a898940170ae4ea6d5b16ef462f959c4d38d1/gistfile1.txt';

// Fonction pour récupérer les données du Gist
async function fetchData() {
    const response = await fetch(gistUrl);
    const text = await response.text();
    // Évaluer le texte pour obtenir la variable products
    const data = eval(text);
    return data;
}

// Fonction pour trier les produits par ordre alphabétique par "name"
function sortProductsAlphabetically(products) {
    return products.sort((a, b) => a.name.localeCompare(b.name));
}


// Fonction pour afficher les produits
async function displayProducts() {
    const searchText = searchBar.value.toLowerCase();
    const showOnlyStocked = stockCheckbox.checked;
    rez.innerHTML = '';

    // Récupérer les données du Gist
    const produit = await fetchData();
    const array = sortProductsAlphabetically(produit);

    // Filtrer les éléments dont le "name" commence par le texte de recherche
    let filteredData = array.filter(item => item.name.toLowerCase().startsWith(searchText));

    // Filtrer les éléments en stock si la case est cochée
    if (showOnlyStocked) {
        filteredData = filteredData.filter(item => item.stocked);
    }

    // Créer la table et ajouter les en-têtes
    const table = document.createElement('table');
    table.className = 'product-table';

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    const nameHeader = document.createElement('th');
    nameHeader.textContent = 'Name';
    nameHeader.style.textAlign = 'center'; // Center the text
    headerRow.appendChild(nameHeader);

    const priceHeader = document.createElement('th');
    priceHeader.textContent = 'Price';
    priceHeader.style.textAlign = 'center'; // Center the text
    headerRow.appendChild(priceHeader);

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    // Afficher les résultats filtrés sans les grouper par catégorie
    filteredData.forEach(item => {
        const row = document.createElement('tr');
        row.className = 'item-row';

        const nameCell = document.createElement('td');
        nameCell.textContent = item.name;
        nameCell.className = 'name';

        const priceCell = document.createElement('td');
        priceCell.textContent = item.price;
        priceCell.style.color = 'black';
        priceCell.className = 'price';

        // Ajouter la classe 'out-of-stock' si le produit n'est pas en stock
        if (!item.stocked) {
            row.classList.add('out-of-stock');
        }

        row.appendChild(nameCell);
        row.appendChild(priceCell);
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    rez.appendChild(table);
}

// Ajouter des écouteurs d'événements
searchBar.addEventListener('input', displayProducts);
stockCheckbox.addEventListener('change', displayProducts);

// Afficher les produits au chargement initial
displayProducts();