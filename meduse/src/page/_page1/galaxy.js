import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
//import GUI from 'lil-gui'


export function galaxy(scene, camera, controls, renderer, color_style, solid_color_style) {
    console.log("Création de la galaxie...");
    const ringPointTexture = new THREE.TextureLoader().load('particles/2b.png');
    
    let geometry = null; // Declare geometry here
    let material = null;
    let points = null;

    // Paramètres de la galaxie
    const parameters = {
        count: 120000, // Entre 10 000 et 100 000
        size:  0.4, // Entre 0,005 et 0,025
        radius: 3.5, // Entre 5 et 11
        branches: Math.floor(Math.random() * 4) + 4, // Entre 3 et 8 branches
        spin: 1.5,
        randomness: 0.6, // Niveau de dispersion aléatoire
        randomnessPower: 9, // Influence de la dispersion
        insideColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Couleur centrale aléatoire
        outsideColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Couleur extérieure aléatoire
        stretchFactor: Math.random() * 3 + 2, // Facteur d'étirement entre 2 et 5
        hueMax: Math.floor(Math.random() * (360 - 100 + 1)) + 100 // Teinte maximale entre 100 et 360
    };

    if (color_style === 1) {
        const randomHue = Math.random(); // Teinte aléatoire entre 0 et 1
        solid_color_style.setHSL(randomHue, 1, 0.5); // Couleur aléatoire vive
    }
    function generateGalaxy() {
        // Géométrie
        geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(parameters.count * 3);
        const colors = new Float32Array(parameters.count * 4); // RGBA
        let opacity = 1; // Plus proche du centre = plus transparent

    
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
    
            // Application du facteur d'étirement
            positions[i3] = (Math.cos(branchAngle + spinAngle) * radius + randomX) * parameters.stretchFactor;
            positions[i3 + 1] = randomY - radius * parameters.stretchFactor * 5; // Abaissement en Y
            positions[i3 + 2] = (Math.sin(branchAngle + spinAngle) * radius + randomZ) * parameters.stretchFactor;
    
            // Couleur
            let color;
            if (color_style === 1) {
                color = solid_color_style;
            } else if (color_style === 2) {
                const hue = (branchAngle / (Math.PI * 2)) * 110;
                color = new THREE.Color();
                color.setHSL(hue / 15, 2, 0.39);
                color.g = color.b;
            } else if (color_style === 3) {
                const hue = (branchAngle / (Math.PI * 2)) * parameters.hueMax;
                color = new THREE.Color();
                color.setHSL(hue / 360, 1, 0.5);
            }
    
            colors[i4] = color.r;
            colors[i4 + 1] = color.g;
            colors[i4 + 2] = color.b;
            
    
            // Calcul de l'opacité en fonction de la distance au centre
            let distanceFromCenter = positions[i3 + 1] ;
            // console.log(distanceFromCenter);

        //     const maxDistance = parameters.radius * parameters.stretchFactor;
            
             opacity = distanceFromCenter * -0.01 ; // Plus proche du centre = plus transparent
             console.log(distanceFromCenter);

              opacity -= 0.03
             
        //    // const opacity = 1; // Plus proche du centre = plus transparent
        // //    opacity -= 0.0001;
             colors[i4 + 3] = opacity;

            //  if(distanceFromCenter >= -25)
            //     {
            //         if(i % 5 == 0)
            //             colors[i4 + 3] = 0;
            //     }
            //     if(distanceFromCenter >= -17)
            //         {
            //             if(i % 4 == 0)
            //                 colors[i4 + 3] = 0;
            //         }
            //         if(distanceFromCenter >= -10)
            //             {
            //                 if(i % 3 == 0)
            //                     colors[i4 + 3] = 0;
            //                  console.log("yeaaah");

            //             }
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 4)); // Utilisation de 4 composantes pour la couleur
    
        // Matériau
        material = new THREE.PointsMaterial({
            size: parameters.size,
            sizeAttenuation: true,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
            map: ringPointTexture,
        });
    
        // Points
        points = new THREE.Points(geometry, material);
        scene.add(points);
    }

    let isFadingOut = true

    function animateGalaxyOpacity() {
        const minOpacity = 0.01; // Opacité minimale des particules
        const duration = 4; // Durée de l'animation en secondes
        const startTime = Date.now();
    
        function update() {
            const elapsedTime = (Date.now() - startTime) / 1000; // Temps écoulé en secondes
            const progress = Math.min(elapsedTime / duration, 1); // Progression de l'animation (0 à 1)
            const easedProgress = easeOutQuad(progress); // Appliquer l'easing
    
            // Mise à jour des opacités
            const colors = geometry.attributes.color.array;
            const numParticles = colors.length / 4;
    
            for (let i = 0; i < numParticles; i++) {
                let delay;
    
                if (isFadingOut) {
                    // Disparition : les particules du bas disparaissent en premier
                    delay = (numParticles - i) / numParticles; // Délai inversé
                } else {
                    // Réapparition : les particules du haut réapparaissent en premier
                    delay = i / numParticles; // Délai normal
                }
    
                const particleProgress = Math.max((easedProgress - delay) / (1 - delay), 0); // Progression pour cette particule
    
                // Mettre à jour le canal alpha (a) de la particule
                if (isFadingOut) {
                    // Disparition : opacité diminue de 1 à minOpacity
                    colors[i * 4 + 3] = Math.max(minOpacity, 1 - particleProgress * (1 - minOpacity)); // 1 -> minOpacity
                } else {
                    // Réapparition : opacité augmente de minOpacity à 1
                    colors[i * 4 + 3] = Math.min(1, minOpacity + particleProgress * (1 - minOpacity)); // minOpacity -> 1
                }
            }
    
            geometry.attributes.color.needsUpdate = true; // Indiquer que les couleurs ont été modifiées
    
            // Continuer l'animation si elle n'est pas terminée
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                // Inverser l'état de l'animation pour la prochaine itération
    
                    // Inverser l'état de l'animation pour la prochaine itération
                    isFadingOut = !isFadingOut;
        
                    // Relancer l'animation en boucle
                    animateGalaxyOpacity();
                }
            }
        
            update(); // Démarrer l'animation
        }
        
        // Fonction d'easing (ralentit à la fin)
        function easeOutQuad(t) {
            return t * (2 - t);
        }

       // animateGalaxyOpacity();
        
    
     
    

    function animateGalaxy() {
        if (!geometry) return; // Assurez-vous que la géométrie est initialisée
    
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
    
            // Calculer la direction de la branche
            const branchDirectionX = Math.cos(branchAngle);
            const branchDirectionZ = Math.sin(branchAngle);
    
            // Appliquer une ondulation sinusoïdale le long de la branche
            const wave = Math.sin(branchAngle * parameters.branches + time * 2) * 0.015; // Amplitude et fréquence de l'ondulation
    
            const radius = 0.05;
            const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
            const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
    

            // Mettre à jour les positions
            positions[i3] = x + branchDirectionX * wave + randomX;
            positions[i3 + 2] = z + branchDirectionZ * wave + randomZ;
        }
    
        geometry.attributes.position.needsUpdate = true; // Indiquer que les positions ont été modifiées
    }

    // Appel de la fonction pour générer la galaxie
    generateGalaxy();
      // Appel de la fonction pour générer la galaxie
   
    
      // Démarrer l'animation d'opacité
      //animateGalaxyOpacity();

    // Animation de la galaxie
    function animate() {
        requestAnimationFrame(animate);
        animateGalaxy();
        
        controls.update();
        renderer.render(scene, camera);
    }

    animate();




scene.background = null; // Rend le fond transparent
console.log("prout");





return(points)

}



