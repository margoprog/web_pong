// router.js
function loadPage(pageName) {
  // Charge le HTML
  fetch(`pages/${pageName}.html`)
    .then(response => response.text())
    .then(html => {
      document.getElementById('app-content').innerHTML = html;
      
      // Charge le CSS
      const oldStyle = document.querySelector('#page-style');
      if (oldStyle) oldStyle.remove();
      
      const style = document.createElement('link');
      style.id = 'page-style';
      style.rel = 'stylesheet';
      style.href = `styles/${pageName}.css`;
      document.head.appendChild(style);
      
      // Charge le JS
      const oldScript = document.querySelector('#page-script');
      if (oldScript) oldScript.remove();
      
      const script = document.createElement('script');
      script.id = 'page-script';
      script.src = `scripts/${pageName}.js`;
      document.body.appendChild(script);
    });
}

// Navigation globale
window.navigateTo = loadPage;