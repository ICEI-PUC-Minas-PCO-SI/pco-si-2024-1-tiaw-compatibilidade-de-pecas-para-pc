//Função ler dados
function ler() {
    let local = localStorage.getItem('db');

    //Local Storage
    let db = {
        videos: [
            {
                id: 1,
                title: "O que é um Processador",
                thumbnail: "path/to/thumbnail1.jpg",
                url: "https://www.youtube.com/embed/lxFtLVzsR-8"
            },
            {
                id: 2,
                title: "O que é uma Placa de Vídeos",
                thumbnail: "path/to/thumbnail2.jpg",
                url: "https://www.youtube.com/embed/RSJpkbB-Vdk"
            },
            {
                id: 3,
                title: "O que é placa mãe",
                thumbnail: "path/to/thumbnail2.jpg",
                url: "https://www.youtube.com/embed/HelOCtifcfo"
            },
            {
                id: 4,
                title: "O que é memória RAM",
                thumbnail: "path/to/thumbnail2.jpg",
                url: "https://www.youtube.com/embed/UAjK8iFCbMA"
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

    mod = `<div class="modal-L">
    <div class="conteudoModal">
    <span class="close">&times;</span>
    <h1>O que é um processador?</h1>
    <p class = "text-justify">Um processador, ou CPU, é o "cérebro" do computador, responsável por executar todas as instruções e comandos que fazem o computador funcionar. No contexto dos desktops para jogos, o processador desempenha um papel crucial, garantindo que os jogos rodem de maneira suave e rápida. Ele executa instruções, realiza cálculos matemáticos e lógicos, e gerencia tarefas, controlando quais são feitas e em que ordem.<br><br>
    Para jogos, os componentes mais importantes de um processador incluem a Unidade de Controle, que dirige as operações do computador; a Unidade Lógica e Aritmética, que faz cálculos e comparações; e a memória cache, que armazena dados temporários para acesso rápido, ajudando a reduzir o tempo de carregamento e a melhorar a fluidez do jogo.<br><br>
    Processadores mais rápidos e modernos, como os da linha Intel Core i7 e i9, ou AMD Ryzen 7 e 9, são especialmente importantes para jogos, pois possuem múltiplos núcleos e threads que permitem a execução simultânea de várias tarefas complexas. Isso melhora significativamente o desempenho em jogos que demandam muita potência de processamento.<br><br>
    Em resumo, para desktops de jogos, o processador é essencial para garantir uma experiência de jogo fluida e responsiva, permitindo que você desfrute de gráficos avançados e tempos de resposta rápidos, tornando a experiência de jogo mais agradável e imersiva.</p>
    <div class="alinhar">
    <iframe class="video" width="640" height="360" src="${modal.url}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    </div>
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

    mod = `<div class="modal-L">
    <div class="conteudoModal">
    <span class="close">&times;</span>
    <h1>O que é uma placa de vídeo?</h1>
    <p">Uma GPU, ou unidade de processamento gráfico, é um componente crucial em desktops para jogos, responsável por renderizar imagens, vídeos e animações. Ela desempenha um papel vital ao garantir que os jogos rodem com gráficos de alta qualidade e com taxas de quadros suaves.<br><br>
    As GPUs executam cálculos complexos rapidamente, o que permite a criação de gráficos detalhados e efeitos visuais realistas. Diferente da CPU, que é o "cérebro" do computador realizando várias tarefas, a GPU é especializada em processamento gráfico e pode lidar com milhares de operações simultaneamente, tornando-a ideal para jogos que exigem renderização de gráficos em tempo real.<br><br>
    GPUs modernas, como as da série NVIDIA GeForce RTX e AMD Radeon RX, vêm equipadas com múltiplos núcleos e grandes quantidades de memória dedicada (VRAM), o que melhora a qualidade visual dos jogos e permite o uso de tecnologias avançadas como ray tracing, que simula de forma realista o comportamento da luz. Além disso, essas GPUs suportam altas resoluções e taxas de atualização elevadas, proporcionando uma experiência de jogo mais fluida e imersiva.<br><br>
    Em resumo, a GPU é essencial para desktops de jogos, pois processa gráficos complexos e permite que os jogos sejam exibidos com alta qualidade visual e desempenho, proporcionando uma experiência de jogo superior e envolvente.</p>
    <iframe width="640" height="360" src="${modal.url}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
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

    mod = `<div class="modal-L">
    <div class="conteudoModal">
    <span class="close">&times;</span>   
    <h1>O que é uma placa mãe</h1>
    <p>A placa-mãe é um componente fundamental em desktops para jogos, funcionando como a espinha dorsal do computador. Ela conecta e permite a comunicação entre todos os outros componentes, como a CPU, GPU, memória RAM, discos rígidos, SSDs e dispositivos periféricos.<br><br>
    A placa-mãe determina quais componentes você pode usar, pois cada modelo suporta diferentes tipos de processadores (CPU), memória (RAM), placas gráficas (GPU) e dispositivos de armazenamento. Placas-mãe para jogos geralmente oferecem recursos avançados, como suporte para múltiplas GPUs (SLI ou CrossFire), overclocking, e portas de alta velocidade para armazenamento e periféricos (USB 3.1, M.2, SATA 6Gbps).<br><br>
    Placas-mãe modernas para jogos, como as da linha ASUS ROG, MSI Gaming ou Gigabyte AORUS, incluem dissipadores de calor e sistemas de resfriamento aprimorados para manter a temperatura baixa durante sessões de jogo intensas. Elas também possuem slots de expansão suficientes para adicionar componentes extras, como placas de som dedicadas, placas de rede e mais armazenamento. Além disso, muitas placas-mãe para jogos vêm com iluminação RGB personalizável, permitindo que os usuários ajustem a estética do seu setup.<br><br>
    Em resumo, a placa-mãe é essencial em desktops para jogos, pois conecta e coordena todos os componentes do sistema, permitindo que funcionem juntos de maneira eficiente. Escolher uma boa placa-mãe garante compatibilidade, desempenho e potencial de atualização, proporcionando uma experiência de jogo estável e de alta performance.</p>
    <iframe width="640" height="360" src="${modal.url}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
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

    mod = `<div class="modal-L">
    <div class="conteudoModal">
    <span class="close">&times;</span>
    <h1>O que é uma Memória RAM?</h1
    <p>A memória RAM (Random Access Memory) é um componente essencial em desktops para jogos, responsável por armazenar temporariamente os dados que o processador e a GPU precisam acessar rapidamente. A RAM permite que os jogos carreguem texturas, modelos e outros dados de forma eficiente, contribuindo para uma experiência de jogo suave e sem atrasos.Mais RAM significa que o sistema pode lidar com mais dados ao mesmo tempo, o que é especialmente importante para jogos modernos que exigem muitos recursos.<br><br>
    Em resumo, a memória RAM é vital para desktops de jogos, pois oferece armazenamento temporário rápido para dados essenciais, melhorando a fluidez e o desempenho dos jogos. Escolher a RAM certa, em termos de capacidade e velocidade, garante que seu sistema possa lidar com os requisitos dos jogos modernos, proporcionando uma experiência de jogo superior.</p>
    <iframe width="640" height="360" src="${modal.url}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
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
