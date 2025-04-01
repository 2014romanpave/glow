function loadMenu() {
    return new Promise((resolve, reject) => {
        fetch('menu.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('menu-container').innerHTML = html;
            activateCurrentPageLink(); // Добавить вызов здесь
            resolve();
        })
        .catch(error => reject(error));
    });
}
function activateCurrentPageLink() {
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if(currentPage === linkPage || 
           (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}
  