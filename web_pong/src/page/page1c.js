import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as CANNON from 'cannon-es';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

// import * as dat from 'dat.gui';
// // const gui = new dat.GUI();

const Page1 = {
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    world: null,
    sphere: null,
    ringGroup: null,
    clock: null,
    oldElapsedTime: 0,
    floatAmplitude: 0.3,
    floatSpeed: 0.05,
    floatOffset: 0,
    mouse: new THREE.Vector2(),
    targetRotation: new THREE.Vector3(),
    smoothingFactor: 0.1,

    init() {
        // Initialisation de la scène, de la caméra, du rendu, etc.
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        this.renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('canvas.webgl'), alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Ajouter des éléments à la scène
        this.setupScene();
        this.setupPhysics();
        this.setupParticles();
        this.setupLights();
        this.setupCamera();

        // Contrôles de la caméra
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;

        // Animation
        this.clock = new THREE.Clock();
        this.animate();

        // Écouter les mouvements de la souris
        window.addEventListener('mousemove', (event) => this.onMouseMove(event));
    },

    setupScene() {
        // Ajouter une sphère à la scène
        const sphereGeometry = new THREE.SphereGeometry(0.8, 12, 12);
        const sphereMaterial = new THREE.MeshStandardMaterial({
            metalness: 0.3,
            roughness: 0.1,
            wireframe: true,
            color: '#FFFFFF',
            side: THREE.DoubleSide,
        });
        this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        this.sphere.castShadow = true;
        this.sphere.scale.set(0.5, 0.5, 0.5);
        this.scene.add(this.sphere);
    },

    setupPhysics() {
        // Initialisation de la physique (CANNON.js)
        this.world = new CANNON.World();
        this.world.gravity.set(0, 0, 0);

        const shape = new CANNON.Sphere(0.5);
        const body = new CANNON.Body({
            mass: 1.3,
            position: new CANNON.Vec3(0, 0, 0),
            shape: shape,
        });
        this.world.addBody(body);
    },

    setupParticles() {
        // Initialisation des particules
        const ringGeometry = new THREE.BufferGeometry();
        const ringMaterial = new THREE.PointsMaterial({
            vertexColors: true,
            size: 0.1,
            transparent: true,
            opacity: 0.3,
            map: new THREE.TextureLoader().load('particles/2b.png'),
        });

        const ringParticles = new THREE.Points(ringGeometry, ringMaterial);
        this.scene.add(ringParticles);

        // Ajouter des particules en cercle
        const params = {
            ringNumParticles: 600,
            ringRadius: 5.3,
            waveFrequency: 10,
            waveAmplitude: 0.5,
            hueMax: 300,
            size: 0.1,
        };

        this.generateParticles(ringGeometry, params);
    },

    generateParticles(geometry, params) {
        const pos = [];
        const colors = [];
        const solidColor = new THREE.Color(0xffffff);

        for (let i = 0; i < params.ringNumParticles; i++) {
            const angle = (i / params.ringNumParticles) * Math.PI * 2;
            const wave = Math.sin(angle * params.waveFrequency) * params.waveAmplitude;
            const radius = params.ringRadius + wave;

            const y = Math.cos(angle) * radius;
            const x = Math.sin(angle) * radius;
            const z = 0;

            let color;
            if (params.ringNumParticles % 3 === 0) {
                color = solidColor;
            } else if (params.ringNumParticles % 4 === 0) {
                const hue = (angle / (Math.PI * 2)) * 110;
                color = new THREE.Color();
                color.setHSL(hue / 15, 2, 0.39);
            } else {
                const hue = (angle / (Math.PI * 2)) * params.hueMax;
                color = new THREE.Color();
                color.setHSL(hue / 360, 1, 0.5);
            }

            colors.push(color.r, color.g, color.b);
            pos.push(x, y, z);
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    },

    setupLights() {
        // Ajouter des lumières
        const ambientLight = new THREE.AmbientLight(0xffffff, 2.1);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
        directionalLight.castShadow = true;
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);
    },

    setupCamera() {
        // Positionner la caméra
        this.camera.position.set(0, 13, 25);
        this.camera.lookAt(0, 0, 9);
    },

    onMouseMove(event) {
        // Gérer les mouvements de la souris
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        this.targetRotation.y = this.mouse.x * 0.2;
        this.targetRotation.x = this.mouse.y * 0.2;
        this.targetRotation.z = this.mouse.x * -0.1;
    },

    animate() {
        const elapsedTime = this.clock.getElapsedTime();
        const deltaTime = elapsedTime - this.oldElapsedTime;
        this.oldElapsedTime = elapsedTime;

        // Mettre à jour la physique
        this.world.step(1 / 60, deltaTime, 3);

        // Interpoler la rotation
        if (this.ringGroup) {
            this.ringGroup.rotation.x += (this.targetRotation.x - this.ringGroup.rotation.x) * this.smoothingFactor * 1.5;
            this.ringGroup.rotation.y += (this.targetRotation.y - this.ringGroup.rotation.y) * this.smoothingFactor;
            this.ringGroup.rotation.z += (this.targetRotation.z - this.ringGroup.rotation.z) * this.smoothingFactor;
        }

        // Faire flotter la sphère
        this.sphere.position.y = this.floatAmplitude * Math.sin(this.floatOffset);
        this.floatOffset -= this.floatSpeed;

        // Mettre à jour les contrôles
        this.controls.update();

        // Rendu
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.animate());
    },

    hide() {
        // Masquer la scène de la page 1
        this.renderer.domElement.style.display = 'none';
    },

    show() {
        // Afficher la scène de la page 1
        this.renderer.domElement.style.display = 'block';
    },
};

export default Page1;