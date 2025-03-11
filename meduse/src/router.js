import * as THREE from 'three';

// import { loadPage1 } from './page/_page1/page1.js'; // Importer depuis le point d'entrée
// import { loadPage1b } from './page/_page1/galaxy.js'; // Importer depuis le point d'entrée

// export function initRouter(scene, camera) {
//     // Fonction pour nettoyer la scène
//     function clearScene() {
//         while (scene.children.length > 0) {
//             scene.remove(scene.children[0]);
//         }
//     }

//     // Fonction pour charger une page spécifique
//     function loadPage(page) {
//         switch (page) {
//             case 'page1':
//                 loadPage1(scene, camera);
//                 break;
//             case 'galaxy':
//                 loadPage1b(scene);
//                 break;
//             default:
//                 console.error("Page non trouvée :", page);
//                 break;
//         }
//     }

//     // Charger plusieurs pages en même temps
//     function loadMultiplePages(pages) {
//         clearScene(); // Nettoyer la scène avant de charger les nouvelles pages
//         pages.forEach(page => loadPage(page)); // Charger chaque page
//     }

//     // Charger les pages par défaut (par exemple, 'page1' et 'galaxy')
//     loadMultiplePages(['page1', 'galaxy']);

//     // Exposer la fonction loadMultiplePages pour une utilisation externe
//     window.loadMultiplePages = loadMultiplePages;
// }



// router.js
import { loadPage1 } from './page/_page1/page1.js';
//import { galaxy } from './page/_page1/galaxy.js';
        


export function initRouter() {

    loadPage1();
   // galaxy(scene);

}

// export function initRouter(scene, camera) {
//     function clearScene() {
//         while (scene.children.length > 0) {
//             scene.remove(scene.children[0]);
//         }
//     }

//     function loadPage(page) {
//         clearScene();
//         switch (page) {
//             case 'page1':
//                 loadPage1(scene, camera);
//              //   galaxy(scene,camera); // Utilisation correcte
//                 break;
        
//             default:
//                 console.error("Page non trouvée :", page);
//                 break;
//         }
//     }

//     loadPage('page1');


//     window.loadPage = loadPage;
// }







