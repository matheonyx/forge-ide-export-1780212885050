document.addEventListener('DOMContentLoaded', () => {
    const imageModele = document.getElementById('image-modele');
    const boutonsCouleur = document.querySelectorAll('.bouton-couleur');
    const boutonsStockage = document.querySelectorAll('.bouton-stockage');
    const prixAffichage = document.getElementById('prix-affichage');
    const navLiens = document.querySelectorAll('.liste-navigation a');

    let couleurSelectionnee = 'bleu';
    let stockageSelectionne = 128;

    const prixBase = {
        '128': 1199.00,
        '256': 1329.00,
        '512': 1589.00,
        '1024': 1849.00
    };

    function mettreAJourImage() {
        imageModele.src = `placeholder-${couleurSelectionnee}.png`;
    }

    function mettreAJourPrix() {
        const prix = prixBase[stockageSelectionne];
        prixAffichage.textContent = `${prix.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}`;
    }

    boutonsCouleur.forEach(bouton => {
        bouton.addEventListener('click', () => {
            boutonsCouleur.forEach(btn => btn.classList.remove('actif'));
            bouton.classList.add('actif');
            couleurSelectionnee = bouton.dataset.couleur;
            mettreAJourImage();
        });
    });

    boutonsStockage.forEach(bouton => {
        bouton.addEventListener('click', () => {
            boutonsStockage.forEach(btn => btn.classList.remove('actif'));
            bouton.classList.add('actif');
            stockageSelectionne = parseInt(bouton.dataset.stockage);
            mettreAJourPrix();
        });
    });

    navLiens.forEach(lien => {
        lien.addEventListener('click', function(e) {
            e.preventDefault();
            const cibleId = this.getAttribute('href');
            const cibleElement = document.querySelector(cibleId);
            if (cibleElement) {
                window.scrollTo({
                    top: cibleElement.offsetTop - 80, 
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialisation
    mettreAJourImage();
    mettreAJourPrix();
});