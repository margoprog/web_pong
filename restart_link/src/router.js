import { updateScene } from './main.js'; 

function navigateTo(path) {
    history.pushState({}, '', path);
    router();
}




// scene.traverse((obj) => {
//     if (obj instanceof THREE.Mesh) {
//         obj.visible = false;
//     }
// });
// Fonction pour gérer le routage

// const btnPage2 = document.createElement('button');
// btnPage2.id = 'page2Content';
// btnPage2.textContent = 'Aller à la Page 2';
// document.body.appendChild(btnPage2);

function router() {
    const route = window.location.pathname;

    // Charger le contenu en fonction de la route
    fetch(route === '/' ? './page/home.html' : './page/page2.html')
    .then(response => response.text())
    .then(html => {
        // Injecter le contenu dans le conteneur #app
        document.getElementById('app').innerHTML = html;

        // Mettre à jour la scène Three.js
        updateScene(route);

        // Ajouter les écouteurs d'événements après le chargement du contenu
        if (route === '/') {
            const page2Button = document.querySelector('#page2Button');
            if (page2Button) {
                page2Button.onclick = () => navigateTo('/page2');
            }
        } else {
            const homeButton = document.querySelector('#homeButton');
            if (homeButton) {
                homeButton.onclick = () => navigateTo('/');
            }
        }
    });
}

// Écouter les événements de changement d'état de l'historique
window.addEventListener('popstate', router);

// Initialiser le routeur au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    router();
});