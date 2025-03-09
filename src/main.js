


// import * as THREE from 'three';
// import { initRouter } from './router.js';

// // Initialisation de Three.js
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // Positionner la caméra
// camera.position.set(0, 0, 5);
// camera.lookAt(0, 0, 0);

// // Ajouter des lumières
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
// directionalLight.position.set(5, 5, 5);
// scene.add(directionalLight);

// // Initialisation du routeur
// initRouter(scene, camera);

// // Animation
// function animate() {
//     requestAnimationFrame(animate);
//     renderer.render(scene, camera);
// }
// animate();


import * as THREE from 'three';
import { initRouter } from './router.js';

// Initialisation de Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Positionner la caméra
camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0);

// Ajouter des lumières
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Initialisation du routeur
initRouter(scene, camera);

// Animation
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();













