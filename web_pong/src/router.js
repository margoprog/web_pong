import * as THREE from 'three';



import { loadPage1 } from './page/page1.js';
import { loadPage2 } from './page/page2.js';

export function initRouter(scene, camera) {
    // Charger la page 1 par défaut
    loadPage1(scene);

    // Gestion des clics sur les boutons
    document.getElementById('btnPage1').addEventListener('click', () => {
        scene.clear(); // Vide la scène
        loadPage1(scene); // Charge la page 1
        console.log("Page 1 chargée");
    });

    document.getElementById('btnPage2').addEventListener('click', () => {
        scene.clear(); // Vide la scène
        loadPage2(scene); // Charge la page 2

        // Animer la caméra vers une nouvelle position
        animateCamera(camera, { x: 0, y: 13, z: 15 }, { x: 0, y: 0, z: 0 });
        console.log("Page 2 chargée");
    });
}

// Fonction pour animer la caméra
function animateCamera(camera, targetPosition, targetLookAt, duration = 1) {
    const startPosition = camera.position.clone();
    const startRotation = camera.rotation.clone();
    const startTime = Date.now();

    function update() {
        const elapsedTime = (Date.now() - startTime) / 1000; // Temps écoulé en secondes
        const progress = Math.min(elapsedTime / duration, 1); // Progression de l'animation (0 à 1)

        // Interpolation de la position
        camera.position.lerpVectors(startPosition, new THREE.Vector3(targetPosition.x, targetPosition.y, targetPosition.z), progress);

        // Interpolation de la rotation (simplifiée)
        camera.lookAt(
            new THREE.Vector3(targetLookAt.x, targetLookAt.y, targetLookAt.z)
        );

        // Continuer l'animation si elle n'est pas terminée
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    update(); // Démarrer l'animation
}







