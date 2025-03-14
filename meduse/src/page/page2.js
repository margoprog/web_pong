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






function animateGalaxy() {
    if (!geometry || !geometry.attributes.position) return;

    const positions = geometry.attributes.position.array;
    const time = performance.now() * 0.001; // Temps en secondes

    for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3;

        // Récupérer les positions actuelles
        const x = positions[i3];
        const y = positions[i3 + 1];
        const z = positions[i3 + 2];

        // Calculer l'angle de la branche
        const branchAngle = Math.atan2(z, x);

        // Appliquer une ondulation sinusoïdale
        const wave = Math.sin(branchAngle * parameters.branches + time * 2) * 0.015;

        // Mettre à jour les positions
        positions[i3] = x + Math.cos(branchAngle) * wave;
        positions[i3 + 2] = z + Math.sin(branchAngle) * wave;
    }

    geometry.attributes.position.needsUpdate = true;
}

// Générer la galaxie
generateGalaxy();
