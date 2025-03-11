import * as THREE from 'three';


export function loadPage2(scene) {
    console.log("Chargement de la page 2");

    // Créer un cube pour la page 2
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0xff00FF }); // Rouge
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube); // Ajouter le cube à la scène
    cube.rotation.x = Math.PI / 4
    cube.rotation.y = Math.PI / 3


    console.log("Cube ajouté à la scène :", cube);
    
}



