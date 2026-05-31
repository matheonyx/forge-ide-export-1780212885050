let heures = 0;
let minutes = 0;
let secondes = 0;
let millisecondes = 0;
let intervalleId;
let estEnCours = false;
let numeroTour = 0;

const affichageHeures = document.getElementById('heures');
const affichageMinutes = document.getElementById('minutes');
const affichageSecondes = document.getElementById('secondes');
const affichageMillisecondes = document.getElementById('millisecondes');
const listeTours = document.getElementById('listeTours');

const boutonDemarrer = document.getElementById('boutonDemarrer');
const boutonArreter = document.getElementById('boutonArreter');
const boutonReinitialiser = document.getElementById('boutonReinitialiser');
const boutonTour = document.getElementById('boutonTour');

function formaterTemps(unite) {
    return unite < 10 ? '0' + unite : unite;
}

function mettreAJourAffichage() {
    millisecondes++;

    if (millisecondes === 100) {
        millisecondes = 0;
        secondes++;
    }

    if (secondes === 60) {
        secondes = 0;
        minutes++;
    }

    if (minutes === 60) {
        minutes = 0;
        heures++;
    }

    affichageHeures.textContent = formaterTemps(heures);
    affichageMinutes.textContent = formaterTemps(minutes);
    affichageSecondes.textContent = formaterTemps(secondes);
    affichageMillisecondes.textContent = formaterTemps(millisecondes);
}

function demarrerChronometre() {
    if (!estEnCours) {
        intervalleId = setInterval(mettreAJourAffichage, 10);
        estEnCours = true;
        boutonDemarrer.disabled = true;
        boutonArreter.disabled = false;
        boutonReinitialiser.disabled = false;
        boutonTour.disabled = false;
    }
}

function arreterChronometre() {
    if (estEnCours) {
        clearInterval(intervalleId);
        estEnCours = false;
        boutonDemarrer.disabled = false;
        boutonArreter.disabled = true;
        boutonTour.disabled = true;
    }
}

function reinitialiserChronometre() {
    arreterChronometre();
    heures = 0;
    minutes = 0;
    secondes = 0;
    millisecondes = 0;
    numeroTour = 0;
    mettreAJourAffichage();
    listeTours.innerHTML = '';

    boutonDemarrer.disabled = false;
    boutonArreter.disabled = true;
    boutonReinitialiser.disabled = true;
    boutonTour.disabled = true;
}

function enregistrerTour() {
    if (estEnCours) {
        numeroTour++;
        const tempsActuel = `${formaterTemps(heures)}:${formaterTemps(minutes)}:${formaterTemps(secondes)}.${formaterTemps(millisecondes)}`;

        const elementTour = document.createElement('li');
        elementTour.classList.add('element-tour');
        elementTour.innerHTML = `
            <span class="numero-tour">Tour ${numeroTour}:</span>
            <span class="temps-tour">${tempsActuel}</span>
        `;
        listeTours.prepend(elementTour);
    }
}

boutonDemarrer.addEventListener('click', demarrerChronometre);
boutonArreter.addEventListener('click', arreterChronometre);
boutonReinitialiser.addEventListener('click', reinitialiserChronometre);
boutonTour.addEventListener('click', enregistrerTour);

document.addEventListener('DOMContentLoaded', () => {
    mettreAJourAffichage();
    boutonArreter.disabled = true;
    boutonReinitialiser.disabled = true;
    boutonTour.disabled = true;
});