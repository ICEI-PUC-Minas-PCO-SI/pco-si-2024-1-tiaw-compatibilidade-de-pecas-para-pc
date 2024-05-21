//Função ler dados
function ler() {
    let local = localStorage.getItem('db');

    //Local Storage
    let db = {
        videos: [
            {
                id: 1,
                title: "Video 1",
                thumbnail: "path/to/thumbnail1.jpg",
                url: "https://youtube.com/embed/77WHkE3hOyo?si=1dDE94d70g5_gzN9"
            },
            {
                id: 2,
                title: "Video 2",
                thumbnail: "path/to/thumbnail2.jpg",
                url: "https://youtube.com/embed/2_DyQieE9-0?si=01sc8887EsvUbohW"
            },
            {
                id: 3,
                title: "Video 3",
                thumbnail: "path/to/thumbnail2.jpg",
                url: "https://www.youtube.com/embed/88o7op5yVTw"
            },
            {
                id: 4,
                title: "Video 4",
                thumbnail: "path/to/thumbnail2.jpg",
                url: "https://www.youtube.com/embed/vo5Mk-1CYfc"
            }
        ]
    }
if (local) {
    db = JSON.parse(local);
}
return db;
}




//Pega o botão CPU
document.getElementById('btn-cpu').addEventListener('click', abremodalCPU);

//MODAL CPU
//Abre o modal CPU
function abremodalCPU() {
    let mod = '';
    let db = ler();
    let modal = db.videos[0];

    mod = `<div class="cssMod">
    <span class="close">&times;</span>
    <h1>Tudo sobre processador</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, dolorem molestiae? Adipisci, qui similique. Maiores recusandae nihil hic laboriosam reprehenderit exercitationem repellendus accusantium est maxime assumenda, eum incidunt repellat sequi!</p>
    <iframe width="640" height="360" src="${modal.url}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    `
    document.querySelector('#modal-cpu').innerHTML = mod;
    // Fechar modal
    // Encontra o botão de fechar
    var closeButton = document.querySelector(".close");
    // Fecha o modal quando o botão de fechar é clicado
    closeButton.addEventListener("click", function() {
    mod = '';
    document.querySelector('#modal-cpu').innerHTML = mod;
    });

}


//MODAL GPU
//Pega o botão GPU
document.getElementById('btn-gpu').addEventListener('click', abremodalGPU);

//MODAL GPU
//Abre o modal GPU
function abremodalGPU() {
    let mod = '';
    let db = ler();
    let modal = db.videos[1];

    mod = `<div class="cssMod">
    <span class="close">&times;</span>
    <h1>Tudo sobre Placa de Vídeo</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, dolorem molestiae? Adipisci, qui similique. Maiores recusandae nihil hic laboriosam reprehenderit exercitationem repellendus accusantium est maxime assumenda, eum incidunt repellat sequi!</p>
    <iframe width="640" height="360" src="${modal.url}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    `
    document.querySelector('#modal-cpu').innerHTML = mod;
    // Fechar modal
    // Encontra o botão de fechar
    var closeButton = document.querySelector(".close");
    // Fecha o modal quando o botão de fechar é clicado
    closeButton.addEventListener("click", function() {
    mod = '';
    document.querySelector('#modal-cpu').innerHTML = mod;
    });

}

//Modal Placa-Mãe
//Pega o botão Placa-mãe
document.getElementById('btn-placa-mae').addEventListener('click', abremodalPlacaMae);

//MODAL Placa-Mãe
//Abre o modal Placa-Mãe
function abremodalPlacaMae() {
    let mod = '';
    let db = ler();
    let modal = db.videos[2];

    mod = `<div class="cssMod">
    <span class="close">&times;</span>
    <h1>Tudo sobre Placas Mãe</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, dolorem molestiae? Adipisci, qui similique. Maiores recusandae nihil hic laboriosam reprehenderit exercitationem repellendus accusantium est maxime assumenda, eum incidunt repellat sequi!</p>
    <iframe width="640" height="360" src="${modal.url}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    `
    document.querySelector('#modal-cpu').innerHTML = mod;
    // Fechar modal
    // Encontra o botão de fechar
    var closeButton = document.querySelector(".close");
    // Fecha o modal quando o botão de fechar é clicado
    closeButton.addEventListener("click", function() {
    mod = '';
    document.querySelector('#modal-cpu').innerHTML = mod;
    });

}

//Modal RAM
//Pega o botão RAM
document.getElementById("btn-ram").addEventListener('click', abremodalRAM);

//Modal RAM
//Abre modal RAM
function abremodalRAM(){
    let mod = '';
    let db = ler();
    let modal = db.videos[3];

    mod = `<div class="cssMod">
    <span class="close">&times;</span>
    <h1>Tudo sobre Memórias RAM</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, dolorem molestiae? Adipisci, qui similique. Maiores recusandae nihil hic laboriosam reprehenderit exercitationem repellendus accusantium est maxime assumenda, eum incidunt repellat sequi!</p>
    <iframe width="640" height="360" src="${modal.url}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    `
    document.querySelector('#modal-cpu').innerHTML = mod;
    // Fechar modal
    // Encontra o botão de fechar
    var closeButton = document.querySelector(".close");
    // Fecha o modal quando o botão de fechar é clicado
    closeButton.addEventListener("click", function() {
    mod = '';
    document.querySelector('#modal-cpu').innerHTML = mod;
    });
}
