const form = document.querySelector("#translator");
const subhead = document.getElementById("info");
const pigWrap = document.querySelector('#translation-wrap');
const input = form.querySelector('textarea');
const phraseBox = document.querySelector('#translation');
const vowel = "aeiouy";
const punctuation = ".!?,;";
const button = form.querySelector('button');
let transFlag = false;

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(!transFlag){
        input.style.display = "none";
        pigWrap.style.display = "flex";
        subhead.textContent = "The pig replies...";
        button.textContent = "Back to English";
        transFlag = true;
        let utText = input.value;
        const translation = pigConvert(utText.split(" "));
        phraseBox.textContent = translation.join(" ");
    }
    else if(transFlag){
        pigWrap.style.display = "none";
        input.style.display = "flex";
        subhead.textContent = "My phrase is...";
        button.textContent = "Translate!";
        transFlag = false;
    }
});


function pigConvert(phrase){
    let words = phrase.map(word => piggify(word));
    return words;
}

function piggify(word){
    let newWord = "";
    let shifted = "";
    let wordpunc = "";
    let vowelized = false;
    for(let a = 0; a < word.length; a++){
        for(let b = 0; b < vowel.length; b++){
            if(word[a].toLowerCase() === vowel[b] && !vowelized){
                newWord += word.slice(a) + shifted + "ay";
                vowelized = true;
            }
        }
        if (!vowelized){
            shifted += word[a];
        }
        for(let c = 0; c < punctuation.length; c++){
            if(word[a] === punctuation[c]){
                wordpunc += word.slice(a,a+1);
            }
        }
    }
    if(/[A-Z]/.test(newWord)){
        let properCase = newWord.toLowerCase().split("").map((letter,i)=>
            {
                if(i === 0){
                    return letter.toUpperCase();
                }
                return letter;
            }).join("");
        newWord = properCase;
    }
    if(wordpunc !== ""){
        let fixedWord = newWord.replace(/[!,\.\?;]/g,"");
        fixedWord += wordpunc;
        return fixedWord;

    }
    return newWord;
}

console.log(pigConvert(input).join(" "));
