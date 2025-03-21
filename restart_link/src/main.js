// bg.js
import { homeScene } from './scenes/home.js';
import { createSphereScene } from './scenes/page2.js';

let currentScene = null;
let currentAnimation = null;

// Initialisation de Three.js
function init() {
    // Créer la scène par défaut (cube)
    switchScene('home');
}

// Fonction pour changer de scène
function switchScene(sceneName) {
    // Nettoyer la scène actuelle
    if (currentScene) {
        document.getElementById('background').removeChild(currentScene.renderer.domElement);
        cancelAnimationFrame(currentAnimation);
    }

    // Créer la nouvelle scène
    if (sceneName === 'home') {
        currentScene = homeScene();
    } else if (sceneName === 'sphere') {
        currentScene = createSphereScene();
    }

    // Ajouter le rendu de la nouvelle scène au DOM
    document.getElementById('background').appendChild(currentScene.renderer.domElement);

    // Démarrer l'animation de la nouvelle scène
    currentAnimation = currentScene.animate();
}

// Exporter la fonction pour mettre à jour la scène
export function updateScene(sceneName) {
    switchScene(sceneName);
}

// Initialiser Three.js au chargement de la page
document.addEventListener('DOMContentLoaded', init);









