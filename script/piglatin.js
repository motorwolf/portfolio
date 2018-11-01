const form = document.querySelector("#translator");
const subhead = document.getElementById("info");
const pigWrap = document.querySelector('#translation-wrap');
const input = form.querySelector('textarea');
const phraseBox = document.querySelector('#translation');
let vowel = "aeiou";
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


const pigConvert = (phrase) => {
    let words = phrase.map(word => piggify(word));
    return words;
}

const piggify = (word,bonus) => {
  //console.log("PIGGIFY RAN");
    let bonusTried = true;
    if(bonus){
      vowel += bonus;
      bonusTried = true;
    }
    let newWord = "";
    let shifted = "";
    for(let a = 0; a < word.length; a++){
      if(vowel.indexOf(word[a].toLowerCase()) !== -1){
        //console.log("a vowel found at " + word[a]);
        newWord = word.slice(a) + word.slice(0,a) + "ay";
        //console.log(newWord);
        if(/[A-Z]/.test(newWord)){
          const properCase = newWord.split("").map((l,i) => {
            if(i === 0){
              return l.toUpperCase();
            } else {
              return l.toLowerCase();
            }
          }).join("");
          newWord = properCase;
          //          console.log("newword contained a capital " + newWord);
        }
        const wordpunc = newWord.split("").filter(char => punctuation.indexOf(char) !== -1).join("");
        if(wordpunc.length !== 0){
          let fixedWord = newWord.replace(/[!,\.\?;]/g,"");
          newWord = fixedWord + wordpunc;
        }
        return newWord;
      }
    }
  if(bonusTried){
    return word;
  } else {
    piggify(word,"y");
  }
}

//console.log(pigConvert(input).join(" "));
