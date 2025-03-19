import * as THREE from 'three';


//import { loadPage1, animateCameraAndFadeParticles, animateCamera } from './page/page1.js';
import { loadPage1 } from './page/page1.js';
import { loadPage2 } from './page/page2.js';
 import './style.css';
 import '/styles/page2.css';



//  function showPage(pageId) {
//     // Masque toutes les pages
//     document.querySelectorAll('.page').forEach(page => {
//         page.classList.remove('active');
//     });

//     // Affiche la page spécifiée
//     document.getElementById(pageId).classList.add('active');
// }

// Afficher la page d'accueil par défaut au chargement
document.addEventListener('DOMContentLoaded', () => {
    showPage('page-content');
});

export function initRouter(scene, camera) {
    // 

    document.body.addEventListener('click', (event) => {
       // console.log("Clic détecté sur :", event.target.id); // Débogage
    
        loadPage1();

        if (event.target.id === 'btnPage1') {
            console.log("Chargement de la page 1");
            loadPage1(scene);
        } else if (event.target.id === 'btnPage2') {
            console.log("Chargement de la page 2");
            scene.clear(); 
            loadPage2(scene);
        }
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







