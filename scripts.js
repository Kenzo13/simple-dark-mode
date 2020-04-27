// Pega todo o html construido
const html = document.querySelector("html");
// pega o input
const checkBox = document.querySelector("input[name=theme]");

// Pega os estilos de forma dinâmica 
const getStyle = (element, style) => 
    window.getComputedStyle(element).getPropertyValue(style);

// Inicializa os valores já presentes na página(light theme).
const initialColors = {
    bg: getStyle(html, "--bg"),
    bgPanel: getStyle(html, "--bg-panel"),
    colorHeadings: getStyle(html, "--color-headings"),
    colorText: getStyle(html, "--color-text"),
};

// Constroi o darkMode
const darkMode = {
    bg: "#333333",
    bgPanel: "#434343",
    colorHeadings: "#3664FF",
    colorText: "#B5B5B5"
};

// Aqui ele pega os elementos Contruidos acima e remonta eles no formato escrito no browser,
// um colorHeadings equivale a --color-headings agora
const transformKey = key => 
    "--" + key.replace(/([A-Z])/g, "-$1").toLowerCase()

// Mapeia e percorre os elementos, setando as novas propriedades.
const changeColors = (colors) => {
    Object.keys(colors).map(key => 
        html.style.setProperty(transformKey(key), colors[key]) 
    );
};

// Verifica se o input está com checked ou não e com isso retorna a nova cor da página
checkBox.addEventListener("change", ({target}) => {
    target.checked ? changeColors(darkMode) : changeColors(initialColors)
});


/*Salvando no LocalStorage as informações*/

// Pega o item caso ele exista
const isExistLocalStorage = (key) => localStorage.getItem(key) != null;
// Envia os novos dados para o local storage
const createOrEditLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));
// Pega o valor do localStorage
const getValeuLocalStorage = (key) => JSON.parse(localStorage.getItem(key));

// Verifica as alterações do input e envia os dados modo e cor para o localStorage
checkBox.addEventListener("change", ({target}) => {
    if(target.checked){
        changeColors(darkMode);
        createOrEditLocalStorage('modo','darkMode');
    }else{
        changeColors(initialColors)
        createOrEditLocalStorage('modo','initialColors')
    };
});

// Verifica se existe um modo criado no localStorage, caso não exista,ele inicializa um modo com a cor branca
if(!isExistLocalStorage('modo')){
    createOrEditLocalStorage('modo', 'initialColors');
};

// Pega o valor que está no localStorage e retorna para a tela.
if(getValeuLocalStorage('modo') === 'initialColors'){
    checkBox.removeAttribute('checked');
    changeColors(initialColors);
} else {
    checkBox.setAttribute('checked', "");
    changeColors(darkMode);
};