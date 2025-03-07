import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import CANNON, { Vec3 } from 'cannon'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'


//import { roughness } from 'three/tsl'

/**
 * Debug
 */
//const gui = new GUI()
const debugObject = {}
//const debugObject2 = {}

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
//scene.background = new THREE.Color("#fefae0");d8e2dc
scene.background = new THREE.Color("#000000")

// const axesHelper = new THREE.AxesHelper(5) // Longueur des axes = 5 unités
//scene.add(axesHelper)

//physics 
const world = new CANNON.World()
world.gravity.set(0, 0, 0)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.png',
    '/textures/environmentMaps/0/nx.png',
    '/textures/environmentMaps/0/py.png',
    '/textures/environmentMaps/0/ny.png',
    '/textures/environmentMaps/0/pz.png',
    '/textures/environmentMaps/0/nz.png'

])

const default_color = new THREE.Color("#880FeE")
    // Définir un tableau de 4 couleurs (vous pouvez les modifier selon vos préférences)
    const trailColors = [
  

        new THREE.Color("#0F00FF"), // Bleu
        new THREE.Color("#0F00FF"), // Bleu
        new THREE.Color("#8400eE"), // Bleu
        new THREE.Color("#FFAAFB"), 


    ];
    let currentColorIndex = 0; // Index pour suivre la couleur actuelle dans le cycle
    
const matcapTexture = textureLoader.load('/textures/matCap/3a.png'); // Remplace par le bon chemin

const normal_material = new THREE.MeshNormalMaterial()
//normal_material.flatShading = true

const defaultMaterial = new CANNON.Material('default')
const defaultContactMaterial = new CANNON.ContactMaterial(
    defaultMaterial,
    defaultMaterial,
    {
        friction: 0,
        restitution: 1
    }
)
world.addContactMaterial(defaultContactMaterial)
world.defaultContactMaterial = defaultContactMaterial

////////////////////////////////----SHPERE----///////////////////////////

const sphereGeometry = new THREE.SphereGeometry(0.8, 7, 12)
const sphereMaterial = new THREE.MeshStandardMaterial({
    metalness: 0.3,
    roughness: 0.1,
    wireframe : true,
    color: '#00FFF0',
    side: THREE.DoubleSide
    })


const shape = new CANNON.Sphere(0.5)
const body = new CANNON.Body({
    mass: 1.3,
    position: new CANNON.Vec3(0,0,0),
    shape: shape,
    material: defaultMaterial,
    velocity: new CANNON.Vec3(0, 0, 0)
})
// body.position.copy(position)
world.addBody(body)

const mesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
mesh.castShadow = true
mesh.scale.set(0.5, 0.5, 0.5)
mesh.position.copy(body.position)
//scene.add(mesh)

////////////////////////////////----TORU RING----///////////////////////////

const ringPointTexture = new THREE.TextureLoader().load('particles/1.png');

// Création du matériau des particules
const ringMaterial = new THREE.PointsMaterial({
    color: '#0070FF',
    size: 0.1,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    map: ringPointTexture,
    depthWrite: false
});


// Paramètres du ring
const ringRadius = 5.3; // Rayon moyen
const ringNumParticles = 700; // Nombre de points
const waveAmplitude = 0.5; // Hauteur des vagues
const waveFrequency = 10; // Fréquence des vagues

const ringGeometry = new THREE.BufferGeometry();
const pos = [];

for (let i = 0; i < ringNumParticles; i++) {
    const angle = (i / ringNumParticles) * Math.PI * 2;

    // Création d'une variation ondulée sur le rayon
    const wave = Math.sin(angle * waveFrequency) * waveAmplitude;
    const radius = ringRadius + wave; // Ajout de l’onde sur le rayon

    const y = Math.cos(angle) * radius;
    const x = Math.sin(angle) * radius;
    const z = 0; // Cercle en 2D // a inversé car c rigolo

    pos.push(x, y, z);
}

// Convertir en buffer
ringGeometry.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));

// Création des particules
const ringParticles = new THREE.Points(ringGeometry, ringMaterial);
scene.add(ringParticles);


// ---- Ajouter un helper d’axes ----
const axesHelper = new THREE.AxesHelper(3); // Longueur des axes
//ringParticles.add(axesHelper);


////////////////////////////////----RING GROUP----///////////////////////////

const torusRadius = 2; // Rayon du tore (cercle principal)
const numRings = 50; // Nombre de rings autour du tore

const ringGroup = new THREE.Group();

for (let i = 0; i < numRings; i++) {
    const angle = (i / numRings) * Math.PI * 2; // Angle en radians

    // Calcul des positions pour former un tube
    const x = Math.cos(angle) * torusRadius;
    const z = Math.sin(angle) * torusRadius;
    const y = 0; // Aligné sur le plan XZ

    const ringClone = ringParticles.clone();
    ringClone.position.set(x, y, z);

    // Faire en sorte que le ring soit perpendiculaire au tube
    ringClone.lookAt(0, y, 0); // Regarde vers l'axe du tore

    // Appliquer un quart de tour sur l'axe X
    ringClone.rotateY(Math.PI / 2); // Rotation de 90 degrés


    ringGroup.add(ringClone);
}

scene.add(ringGroup)



const ambientLight = new THREE.AmbientLight(0xffffff, 2.1)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

////////////////////////////////////////// CAMERA //////////////////////////////////////////
/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);

// 🔹 Placer la caméra en face de la ring (vue de dessus)
camera.position.set(0, 13, 8); // Déplacer sur l'axe Z pour voir le cercle de face

// 🔹 Orienter la caméra vers le centre
camera.lookAt(0, 0, 9);

scene.add(camera);
document.addEventListener('keydown', (event) => {
    if (event.key === 'p') { // Appuyez sur la touche 'p'
        console.log("Position de la caméra :", camera.position);
    }
});

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))



// Lancer l'animation
// animate();
/**
 * Animate
 */
const clock = new THREE.Clock()
let oldElapsedTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - oldElapsedTime
    oldElapsedTime = elapsedTime
    
    


// });

ringGroup.children.forEach((ring) => {
    ring.rotation.z += 0.002; // Rotation constante pour tous les rings
    // ring.rotation.y += 0.0001; // Si tu veux tourner autour de l'axe Y aussi
});


   // camera.lookAt(scene.position)

    controls.update()

    
    world.step(1 / 60, deltaTime, 3)



   
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()





