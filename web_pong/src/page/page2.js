import * as THREE from 'three';


export function loadPage2(scene) {
    console.log("Chargement de la page 2");




    
    function loadCSS(filename) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = filename;
        document.head.appendChild(link);
    }
    
    function removeCSS(filename) {
        // Sélectionne toutes les balises <link> dans le <head>
        const links = document.querySelectorAll('link[rel="stylesheet"]');
    
        // Parcourt toutes les balises <link>
        links.forEach(link => {
            // Si l'attribut href correspond au fichier CSS à supprimer
            if (link.href.includes(filename)) {
                link.remove(); // Supprime la balise <link>
            }
        });
    }

    // Supprime les CSS des autres pages
    removeCSS('/styles/page1.css');
    removeCSS('./style.css');

    // Charge le CSS spécifique à la page 2
    loadCSS('./styles/page2.css');

    // Créez le contenu HTML de la page 2
    const page2Content = document.createElement('div'); // Utilisez un élément HTML valide
    page2Content.id = 'page2';
    page2Content.innerHTML = `
        <h1>Page 2</h1>
        <button id="btnPage2">prout</button>
        <button class="bouton_prout">prout</button>
        <button class="bouton_prout">prout</button>
    `;



      // Ajoutez le contenu au conteneur principal
      document.body.appendChild(page2Content); // Ajoutez pageContent au DOM


      function showPage(pageId) {
          // Masque toutes les pages
          document.querySelectorAll('.page').forEach(page => {
              page.classList.remove('active');
          });
      
          // Affiche la page spécifiée
          document.getElementById(pageId).classList.add('active');
      }
      
      // Exemple d'utilisation
      showPage('page2Content'); // Affiche la page 1
  
    // Ajoutez le contenu au conteneur principal
    document.body.appendChild(page2Content); // Ajoutez page2Content au DOM


    // Créer un cube pour la page 2
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0xff00FF }); // Rouge
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube); // Ajouter le cube à la scène
    cube.rotation.x = Math.PI / 4
    cube.rotation.y = Math.PI / 3


    console.log("Cube ajouté à la scène :", cube);
    
}



