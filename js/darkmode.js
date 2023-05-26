let target = document.body;
let theme = sessionStorage.getItem('theme');

let darkTheme = document.getElementById('dark-mode');
let lightTheme = document.getElementById('light-mode');

if(theme != null) {
    target.classList.toggle('darkmode');
}

if(target.className == 'darkmode'){
    darkTheme.style.display = 'none';
    lightTheme.style.display = 'block';
} else {
    darkTheme.style.display = 'block';
    lightTheme.style.display = 'none';
}


function darkMode(t){
    let theme = sessionStorage.getItem('theme');

    if(t == 'darkmode'){
        darkTheme.style.display = 'none';
        lightTheme.style.display = 'block';
    } else {
        darkTheme.style.display = 'block';
        lightTheme.style.display = 'none'
    }

    if(theme != null) {
        sessionStorage.removeItem('theme');
    } else {
        sessionStorage.setItem('theme', 'darkmode');
    }

    target.classList.toggle('darkmode');
}

