// Loads shared navbar HTML into the page and wires up toggle/active link behavior
(async function(){
    const placeholder = document.getElementById('navbar');
    if(!placeholder) return;

    try{
        const res = await fetch('/assets/html/navbar.html');
        if(!res.ok) throw new Error('Navbar fetch failed');
        const html = await res.text();
        placeholder.innerHTML = html;

        // Mobile toggle
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        if(navToggle && navMenu){
            navToggle.addEventListener('click', ()=>{
                navMenu.classList.toggle('active');
            });
        }

        // Active link highlighting
        const links = placeholder.querySelectorAll('.nav-link');
        const currentPath = window.location.pathname.replace(/\/+$/,'');
        links.forEach(link=>{
            const href = link.getAttribute('href');
            if(!href) return;
            // Normalize
            const url = href.startsWith('/') || href.startsWith('#') ? href : ('/' + href);
            if(url === currentPath || (url === '/' && (currentPath === '' || currentPath === '/')) ){
                link.classList.add('active');
            }
        });

    }catch(e){
        console.error('Failed to load navbar:', e);
    }
})();
