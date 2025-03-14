import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let isFadingOut = true;

export function galaxy(scene, camera, controls, renderer, color_style, solid_color_style) {
    console.log("Création de la galaxie...");

    // Charger la texture des particules
    const ringPointTexture = new THREE.TextureLoader().load('particles/2b.png');

    // Variables pour la géométrie, le matériau et les points
    let geometry = null;
    let material = null;
    let points = null;

    // Paramètres de la galaxie
    const parameters = {
        count: 140000, // Nombre de particules
        size: 0.1, // Taille des particules
        radius: 3.5, // Rayon de la galaxie
        branches: 5, // Nombre de branches
        spin: 1.5, // Facteur de rotation
        randomness: 0.05, // Niveau de dispersion aléatoire
        randomnessPower: 0.7, // Influence de la dispersion
        insideColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Couleur centrale
        outsideColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Couleur extérieure
        stretchFactor: Math.random() * 3 + 2, // Facteur d'étirement
        hueMax: Math.floor(Math.random() * (360 - 100 + 1)) + 100, // Teinte maximale
        maxOpacity: 0.5 // Opacité maximale (ajustable)
    };

    // Appliquer une couleur solide si nécessaire
    if (color_style === 1 ) {
        const randomHue = Math.random();
        solid_color_style.setHSL(randomHue, 1, 0.5);
    }

    
    function generateGalaxy() {
        // Créer la géométrie
        geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(parameters.count * 3);
        const colors = new Float32Array(parameters.count * 4); // RGBA
        const baseOpacities = new Float32Array(parameters.count); // Stocker l'opacité de base
    
        // Trouver les valeurs minimales et maximales de y pour la normalisation
        let minY = Infinity;
        let maxY = -Infinity;
    
        // Remplir les positions et les couleurs
        for (let i = 0; i < parameters.count; i++) {
            const i3 = i * 3;
            const i4 = i * 4;
    
            // Position
            const radius = Math.random() * parameters.radius;
            const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2;
            const spinAngle = radius * parameters.spin;
  
    
            const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
            const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
            const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
    
            // Appliquer le facteur d'étirement
            positions[i3] = (Math.cos(branchAngle + spinAngle) * radius + randomX) * parameters.stretchFactor;
            positions[i3 + 1] = randomY - radius * parameters.stretchFactor * 4; // Abaissement en Y
            positions[i3 + 2] = (Math.sin(branchAngle + spinAngle) * radius + randomZ) * parameters.stretchFactor;
    
            // Mettre à jour les valeurs minimales et maximales de y
            if (positions[i3 + 1] < minY) minY = positions[i3 + 1];
            if (positions[i3 + 1] > maxY) maxY = positions[i3 + 1];
    
           // console.log(color_style)
            // Couleur
            let color;
            if ( color_style === 1 ) {
                color = solid_color_style;

            } 
            else if (color_style === 2 ) {
                const hue = (branchAngle / (Math.PI * 2)) * 110;
                color = new THREE.Color();
                color.setHSL(hue / 15, 2, 0.39);
                color.g = color.b;
             } 
            //  else if (color_style === 3 ) {
            //     console.log("cprout");
            //     const hue = (branchAngle / (Math.PI * 2)) * 110;
            //     color = new THREE.Color();
            //     color.setHSL(hue / 15, 2, 0.39);
            //     color.g = color.b;
            //  } 
             else if(color_style === 3) {
            // Sinon, calculer la teinte en fonction de l'angle et de hueMax
                 console.log("cprout")

                const hue = (branchAngle / (Math.PI * 2)) * parameters.hueMax;
                color = new THREE.Color();
                color.setHSL(hue / 360, 1, 0.7); // Conversion HSL vers RGB
            }
    
            colors[i4] = color.r;
            colors[i4 + 1] = color.g;
            colors[i4 + 2] = color.b;
            colors[i4 + 3] = 0.8; // Opacité initiale
        }
    
        // Normaliser les positions en y et ajuster l'opacité de base
        for (let i = 0; i < parameters.count; i++) {
            const i3 = i * 3;
            const i4 = i * 4;
    
            // Normaliser la position en y entre 0 et 1
            const normalizedY = (positions[i3 + 1] - minY) / (maxY - minY);
    
            // Ajuster l'opacité de base en fonction de la position en y
            baseOpacities[i] = (1 - normalizedY) * parameters.maxOpacity; // Appliquer l'opacité maximale
            colors[i4 + 3] = baseOpacities[i]; // Appliquer l'opacité de base


                const yPosition = positions[i * 3 + 1];
                if (yPosition < minY) minY = yPosition;
                if (yPosition > maxY) maxY = yPosition;
        
  
        }
    
        // Définir les attributs de la géométrie
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 4));
    
        // Créer le matériau
        material = new THREE.PointsMaterial({
            size: parameters.size,
            sizeAttenuation: true,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
            map: ringPointTexture,
        });
    
        // Créer les points et les ajouter à la scène
        points = new THREE.Points(geometry, material);
        scene.add(points);
    
        // Démarrer l'animation d'opacité
        //animateGalaxyOpacity(baseOpacities, minY, maxY);
    }
  
    function animateGalaxyOpacity(baseOpacities, minY, maxY) {
        const minOpacity = 0.005; // Opacité minimale
        const duration = 4; // Durée de l'animation en secondes
        const startTime = Date.now();
    
        function update() {
            const elapsedTime = (Date.now() - startTime) / 1000; // Temps écoulé
            const progress = Math.min(elapsedTime / duration, 1); // Progression (0 à 1)
            const easedProgress = easeOutQuad(progress); // Easing
    
            // Mettre à jour les opacités
            const colors = geometry.attributes.color.array;
            const positions = geometry.attributes.position.array; // Accéder aux positions
    
            for (let i = 0; i < parameters.count; i++) {
                const i3 = i * 3;
                const i4 = i * 4;
    
                // Opacité de base (basée sur la hauteur)
                const baseOpacity = baseOpacities[i];
    
                // Récupérer la position en Y
                const yPosition = positions[i3 + 1];
    
                // Normaliser la position en Y entre 0 et 1
                const normalizedY = (yPosition - minY) / (maxY - minY);
    
                // Calculer le délai d'animation en fonction de la position en Y
                let delay;
                if (isFadingOut) {
                    // Disparition : les particules en haut (normalizedY proche de 1) disparaissent en premier
                    delay = normalizedY * 0.01; // Utiliser directement la position normalisée
                } else {
                    // Réapparition : les particules en bas (normalizedY proche de 0) réapparaissent en premier
                    delay = 1 - normalizedY ; // Inverser la position normalisée
                }
    
                // Appliquer l'animation d'opacité en boucle
                const particleProgress = Math.max((easedProgress - delay) / (1 - delay + 0.0001), 0);
                const animatedOpacity = baseOpacity * (-isFadingOut ? 1 - particleProgress : particleProgress);
    
                // Limiter l'opacité entre minOpacity et l'opacité maximale
                colors[i4 + 3] = Math.max(minOpacity, Math.min(parameters.maxOpacity, animatedOpacity));
            }
    
            geometry.attributes.color.needsUpdate = true;
    
            // Continuer l'animation si elle n'est pas terminée
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                // Inverser l'état de l'animation pour la prochaine itération
                isFadingOut = !isFadingOut;
    
                // Réinitialiser les opacités au début de la nouvelle phase
                if (!isFadingOut) {
                    // Phase de disparition : réinitialiser les opacités à leur valeur de base
                    for (let i = 0; i < parameters.count; i++) {
                        const i4 = i * 4;
                        colors[i4 + 3] = baseOpacities[i];
                    }
                } else {
                    // Phase de réapparition : réinitialiser les opacités à minOpacity
                    for (let i = 0; i < parameters.count; i++) {
                        const i4 = i * 4;
                        colors[i4 + 3] = minOpacity;
                    }
                }
    
                geometry.attributes.color.needsUpdate = true;
    
                // Redémarrer l'animation
                animateGalaxyOpacity(baseOpacities, minY, maxY);
            }
        }
    
        update(); // Démarrer l'animation
    }
    
    // Fonction d'easing
    function easeOutQuad(t) {
        return t * (2 - t);
    }
  
////////////////////////////////////////////////////////////////////////////////////////////
   

const mouse = { x: 0, y: 0 };
const mouseTrail = []; // Tableau pour stocker les positions de la souris
const trailLength = 50; // Nombre de points dans la traînée
const particleCount = 100; // Nombre de particules dans le ruban
const spacing = 0.1; // Distance entre les particules

// Écouter les mouvements de la souris
window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1; // Normalisé entre -1 et 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1; // Normalisé entre -1 et 1

    // Ajouter la position actuelle de la souris à la traînée
    mouseTrail.push({ x: mouse.x * 10, y: mouse.y * 10 }); // Ajuster l'échelle

    // Garder la traînée à une longueur fixe
    if (mouseTrail.length > trailLength) {
        mouseTrail.shift(); // Supprimer le point le plus ancien
    }
});

   // Fonction pour animer le ruban de particules
   function animateRibbon() {
    console.log("animateRibbon appelée");

    // Vérifier que geometry et mouseTrail sont définis
    if (!geometry || !geometry.attributes.position || mouseTrail.length === 0) {
        console.log("geometry ou mouseTrail non défini");
        return;
    }

    const positions = geometry.attributes.position.array;
    console.log("positions:", positions);

    for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3;

        // Calculer l'index dans la traînée pour cette particule
        const trailIndex = Math.floor((i / parameters.count) * mouseTrail.length);

        // Récupérer la position correspondante dans la traînée
        const target = mouseTrail[trailIndex];
        console.log("target:", target);

        if (target) {
            console.log("test"); // Ce message devrait s'afficher si target est défini

            // Interpolation pour un mouvement fluide
            const dx = target.x - positions[i3];
            const dy = target.y - positions[i3 + 1];

            // Déplacer la particule vers la cible
            positions[i3] += dx * 0.1; // Ajuster la vitesse de déplacement
            positions[i3 + 1] += dy * 0.1;

            // Maintenir une distance entre les particules
            if (i > 0) {
                const prevX = positions[(i - 1) * 3];
                const prevY = positions[(i - 1) * 3 + 1];
                const distance = Math.sqrt((prevX - positions[i3]) ** 2 + (prevY - positions[i3 + 1]) ** 2);

                if (distance < ribbonSpacing) {
                    positions[i3] = prevX + (positions[i3] - prevX) * (ribbonSpacing / distance);
                    positions[i3 + 1] = prevY + (positions[i3 + 1] - prevY) * (ribbonSpacing / distance);
                }
            }
        }
    }

    // Mettre à jour la géométrie
    geometry.attributes.position.needsUpdate = true;
}
generateGalaxy();
// Boucle d'animation


//////////////////////////////////////////////////////////////////////////////////////////////
    // Animation principale
    function animate() {
        requestAnimationFrame(animate);
   //    animateGalaxy();
       animateRibbon();
      //  updateParticles(particles);
        controls.update();
        renderer.render(scene, camera);
    }

    animate();

    // Rendre le fond transparent
    scene.background = null;

    return points;
}


