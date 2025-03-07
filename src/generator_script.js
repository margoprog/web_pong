import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
// import CANNON, { Vec3 } from 'cannon'
import * as CANNON from 'cannon-es';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'


//import { roughness } from 'three/tsl'

/**
 * Debug
 */
//  const gui = new GUI()
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
//scene.background = new THREE.Color("#FF00FF")

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
      //  new THREE.Color("#8400eE"), // Bleu
      //  new THREE.Color("#0F00FF"), // Bleu

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

const sphereGeometry = new THREE.SphereGeometry(0.8, 12, 12)
const sphereMaterial = new THREE.MeshStandardMaterial({
    metalness: 0.3,
    roughness: 0.1,
    wireframe : true,
    color: '#FFFFFF',
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

const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.castShadow = true
sphere.scale.set(0.5, 0.5, 0.5)
sphere.position.copy(body.position)
scene.add(sphere)



const params = {
    ringNumParticles: 600, // Nombre de particules dans le cercle
    ringRadius: 5.3,       // Rayon du cercle
    waveFrequency: 10,     // Fréquence de l'onde
    waveAmplitude: 0.5,    // Amplitude de l'onde
    hueMax: 300,           // Valeur initiale de hueMax
    size : 0.1,
};

function initRandomParams() {
    params.ringNumParticles = Math.floor(Math.random() * (1000 - 300 + 1)) + 300; // Entre 100 et 1000
    params.ringRadius = Math.random() * (13 - 4) + 4; // Entre 1 et 20
    params.waveFrequency = Math.random() * (16 - 0.1) + 0.1; // Entre 0.1 et 20
    params.waveAmplitude = Math.random() * (4 - 0.1) + 0.1; // Entre 0.1 et 5
    params.hueMax = Math.floor(Math.random() * (360 - 100 + 1)) + 100; // Entre 100 et 360
    params.size = Math.random() * (0.25 - 0.18) + 0.16; 
}

initRandomParams();





// gui.add(params, 'ringNumParticles', 300, 1000,1).name('Nombre de particules').onChange(updateParticles);
// gui.add(params, 'ringRadius', 4, 13).name('Rayon du cercle').onChange(updateParticles);
// gui.add(params, 'waveFrequency', 0.1, 16).name('Fréquence de l\'onde').onChange(updateParticles);
// gui.add(params, 'waveAmplitude', 0.1, 4).name('Amplitude de l\'onde').onChange(updateParticles);
// gui.add(params, 'hueMax', 100, 360).name('Teinte Max (hue)').onChange(updateParticles);
// gui.add(params, 'size', 0.12, 0.25).name('Taille des particules').onChange(updateParticleSize);


// Variables globales
let ringGeometry;
const ringNumParticles = 600; // Nombre de particules dans le cercle
const ringRadius = 5.3; // Rayon du cercle
const waveFrequency = 10; // Fréquence de l'onde
const waveAmplitude = 0.5; // Amplitude de l'onde

// Texture des particules
const ringPointTexture = new THREE.TextureLoader().load('particles/2b.png');


function generateParticles() {
    const pos = [];
    const colors = [];
    const solidColor = new THREE.Color(0xffffff); // Blanc
    const randomHue = Math.random(); // Teinte aléatoire entre 0 et 1
    solidColor.setHSL(randomHue, 1, 0.5); // Couleur aléatoire vive

    for (let i = 0; i < params.ringNumParticles; i++) {
        const angle = (i / params.ringNumParticles) * Math.PI * 2;

        // Création d'une variation ondulée sur le rayon
        const wave = Math.sin(angle * params.waveFrequency) * params.waveAmplitude;
        const radius = params.ringRadius + wave; // Ajout de l’onde sur le rayon

        const y = Math.cos(angle) * radius;
        const x = Math.sin(angle) * radius;
        const z = 0; // Cercle en 2D

        let color;
        if (params.ringNumParticles%3 == 0) {
            console.log("chance");
           
            color = solidColor;
        } 
        else if (params.ringNumParticles%4 == 0) {
            console.log("aloooq");
            const hue = (angle / (Math.PI * 2)) * 110; // idem //ici300
            color = new THREE.Color();
            color.setHSL(hue / 15, 2, 0.39); // division hue a modif  //ici tout
            color.g = color.b;
        }
        else {
            // Sinon, calculer la teinte en fonction de l'angle et de hueMax
            const hue = (angle / (Math.PI * 2)) * params.hueMax;
            color = new THREE.Color();
            color.setHSL(hue / 360, 1, 0.5); // Conversion HSL vers RGB
        }

        colors.push(color.r, color.g, color.b);
        pos.push(x, y, z);
    }

//     // Retourner les positions et les couleurs
//     return { positions: pos, colors: colors };
// }

    // Mettre à jour la géométrie
    ringGeometry.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    ringGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
}

// Fonction pour mettre à jour les particules
function updateParticles() {
    generateParticles();
    ringGeometry.attributes.position.needsUpdate = true; // Mettre à jour les positions
    ringGeometry.attributes.color.needsUpdate = true; // Mettre à jour les couleurs

    // Mettre à jour tous les clones dans ringGroup
    ringGroup.children.forEach((ringClone) => {
        ringClone.geometry.attributes.position.needsUpdate = true;
        ringClone.geometry.attributes.color.needsUpdate = true;
    });
}

function updateParticleSize() {
    ringMaterial.size = params.size; // Mettre à jour la taille des particules
    ringMaterial.needsUpdate = true; // Indiquer que le matériau doit être mis à jour
}

ringGeometry = new THREE.BufferGeometry();
generateParticles();

// Création des particules
const ringMaterial = new THREE.PointsMaterial({

        vertexColors: true,
        size: params.size,
        transparent: true,
        opacity: 0.3,
        blending: THREE.NormalBlending, // Essayez ce mode de blending
        map: ringPointTexture,
        depthWrite: false,
        premultipliedAlpha: true,
        alphaTest: 0.1, // Ajustez cette valeur pour éliminer les bords noirs
    


});


const ringParticles = new THREE.Points(ringGeometry, ringMaterial);
scene.add(ringParticles);

updateParticleSize();

// ---- Ajouter un helper d’axes ----
const axesHelper = new THREE.AxesHelper(3); // Longueur des axes
// ringParticles.add(axesHelper);

// ---- RING GROUP ----

// Ajouter 3 copies avec un décalage et une rotation unique
const torusRadius = 2; // Rayon du tore (cercle principal)
const numRings = 120; // Nombre de rings autour du tore

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

scene.add(ringGroup);






////////////////////////////////----TORUS BACK ----///////////////////////////
// Géométrie et matériau du torus de fond
const torusBackGeometry = new THREE.TorusGeometry(3, 1.4, 29, 100);
const torusBackMaterial = new THREE.MeshStandardMaterial({
    metalness: 1,
    //roughness: 0.5,
    color: '#000000',
   // color: '#FF0000'

});

// Création du torus de fond
const torusBack = new THREE.Mesh(torusBackGeometry, torusBackMaterial);
//scene.add(torusBack);

// Positionner et ajuster la rotation pour que le torus soit visible
torusBack.position.set(0, 0, 0); // Décalage dans la profondeur (z) pour ne pas être collé au centre
torusBack.scale.set(0.66, 0.66, 0.66); // Décalage dans la profondeur (z) pour ne pas être collé au centre

torusBack.rotation.x = Math.PI / 2; // Rotation sur l'axe Y pour le placer correctement

// Position de la caméra pour voir les deux objets
// camera.position.set(0, -10, 20); // Ajuste la position de la caméra pour bien voir les deux objets
// camera.lookAt(0, 0, 0); // S'assurer que la caméra regarde l'origine


//////////////////////////////////BACK <



/**
 * Lights
 */
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
camera.position.set(0, 13, 25); // Déplacer sur l'axe Z pour voir le cercle de face
if (params.ringRadius < 8)
{
    sphere.scale.set(0.4, 0.4, 0.4);
    camera.position.set(0, 13, 15); 
}

// 🔹 Orienter la caméra vers le centre
camera.lookAt(0, 0, 9);

scene.add(camera);
document.addEventListener('keydown', (event) => {
    if (event.key === 'p') { // Appuyez sur la touche 'p'
      //  console.log("Position de la caméra :", camera.position);
    }
});

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true



/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

document.body.appendChild(renderer.domElement);

scene.background = null; // Rend le fond transparent


// Variables pour stocker la rotation cible
const targetRotation = new THREE.Vector3();

// Facteur de lissage (entre 0 et 1)
const smoothingFactor = 0.1;

let floatAmplitude = 0.3; // Amplitude du mouvement (distance maximale de montée/descente)
let floatSpeed = 0.05; // Vitesse du mouvement (plus petit pour plus de douceur)
let floatOffset = 0; // Décalage pour la sinusoïde




const mouse = new THREE.Vector2();

// Écouter les mouvements de la souris
window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Définir la rotation cible en fonction de la souris
    targetRotation.y = mouse.x * 0.2; // Rotation autour de l'axe Y
    targetRotation.x = mouse.y * 0.2; // Rotation autour de l'axe X
    targetRotation.z = mouse.x * -0.1; // Rotation autour de l'axe Z
});


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
    
    // Interpoler progressivement vers la rotation cible
    ringGroup.rotation.x += (targetRotation.x - ringGroup.rotation.x) * smoothingFactor * 1.5;
    ringGroup.rotation.y += (targetRotation.y - ringGroup.rotation.y) * smoothingFactor;
    ringGroup.rotation.z += (targetRotation.z - ringGroup.rotation.z) * smoothingFactor;


    // Rot

    ringGroup.children.forEach((ring) => 
        {
            
            ring.rotation.z += 0.001; // Rotation constante pour tous les rings

           // ring.rotation.z = 0.002; forme coupée en 2 stylée

      
        });
 
    // 6. Utilisation de la fonction sinus pour un mouvement plus smooth
    sphere.position.y = floatAmplitude * Math.sin(floatOffset);

    // 7. Ralentir et accélérer en fonction de la sinusoïde
    floatOffset -= floatSpeed;  // Augmente progressivement la valeur pour un mouvement constant

   // camera.lookAt(scene.position)

    controls.update()

    
    world.step(1 / 60, deltaTime, 3)



   
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()





