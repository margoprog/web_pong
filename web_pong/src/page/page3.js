import * as THREE from 'three';

export function loadPage3(scene) {
    const geometry = new THREE.ConeGeometry(1, 2, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const cone = new THREE.Mesh(geometry, material);
    scene.add(cone);
}