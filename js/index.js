
const input = document.querySelector('#input');
const btnSearch = document.querySelector('#btn-search');
const definitionText = document.querySelector('.definition-text');
const definitionTitle = document.querySelector('.definition-title');
const synomymsText = document.querySelector('.synomyms-text');
const synomymsTitle = document.querySelector('.synomyms-title');
const wikipediaTitle = document.querySelector('.wikipedia-title');
const wikipediaLink = document.querySelector('.wikipedia a');

btnSearch.addEventListener('click', () => {
    const word = input.value;
    const API = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    const date = fetch(API)
        .then(res => {
            if(res.status === 200){
                return res.json();
            } else {
                alert('Please insert an existent english word');
            }
            
        }) 
        .then(data => showDexInfo(data))
        .catch(err => console.log(err));
});

function showDexInfo(dataServer){
    definitionText.innerHTML = ``;
    synomymsText.innerHTML = ``;
    synomymsTitle.innerHTML = 'Synomyms';
    definitionTitle.innerHTML = `Definition`;
    wikipediaTitle.innerHTML = `Wikipedia`;
    wikipediaLink.innerHTML = '';

    dataServer[0].meanings[0].definitions.forEach(element => {
        definitionText.innerHTML += `${element.definition}<br>`;
    });
    
    dataServer[0].meanings[0].synonyms.forEach(element => {
        synomymsText.innerHTML += `${element}, `;
    });

    if(synomymsText.innerHTML == ''){
        synomymsText.innerHTML = 'No synonyms found';
    }
    
    wikipediaLink.innerHTML = `${dataServer[0].sourceUrls[0]}`;
    wikipediaLink.setAttribute('href', `${dataServer[0].sourceUrls[0]}`);
}