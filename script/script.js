//$("#header").load("inc/header.html");
//$('head').load("inc/head.html");
//$('footer').load('inc/footer.html');
let today = new Date();
let thisYear = today.getUTCFullYear();
let year = document.getElementById("year");
year.textContent = `${thisYear}`;
//thisYear;
//document.getElementById("year").textContent = thisYear;
const pns = document.getElementById("pns");
const ip = document.getElementById("ip");
const email = document.getElementById("email");
const overlay = document.getElementById("overlay");
const pages = document.getElementsByClassName("webpage");
const displayBox = document.getElementById('displaybox');
const artbox = document.getElementsByClassName('imgbox');
const lightBox = document.getElementById('lightbox');
const pageimg = document.getElementsByClassName('pageimg');
const form = document.getElementById('contact');
const formName = document.getElementById('name');
const formEmail = document.getElementById('email');
const formMsg = document.getElementById('message');
const errorBox = document.getElementById('errorBox');
let displayBoxClicked = false;
let splash = false;
let splashFeature;
let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

form.addEventListener('submit', (e) => {
    e.preventDefault();
    formChecker();
});
for(let c = 0; c < artbox.length; c++){
    let type = "art";
    artbox[c].addEventListener('click',imgClick);
}
for(let d = 0; d < pageimg.length; d++){
    let type = 'page';
    pageimg[d].addEventListener('click',pageClick);
}
function newPageCloseListener(){
    let close = document.getElementsByClassName("close");
    if(close){
        for(let d = 0; d < close.length; d++){
            close[d].addEventListener('click',closeClick);
        }
    }

}
function formChecker(event){
    if(!formName.value || !formMsg.value || !formEmail.value){
        if(!formName.value){
            formName.focus();
            errorBox.textContent = "You forgot to add your name!";
        }
        if(!formEmail.value){
            formEmail.focus();
            errorBox.textContent = "Oops! You forgot to add your email!"
        }
        if(!formMsg.value){
            formMsg.focus();
            errorBox.textContent = "Did you want to add a message?"
        }
    }
    else if(!formEmail.value.match(emailRegex)){
        errorBox.textContent = "Is your email typed in correctly?"
    }
    else {
        let contactForm = $('#contact');
        let messageBox = $('#errorBox');
        let formData = contactForm.serialize();
        console.log(formData);
    $.ajax({
        type: 'POST',
        url: 'sendemail.php',
        data: formData
    })
    .done(function(response) {
        messageBox.text(response);
    })
    .fail(function(data) {
        if(data.responseText !== '') {
            messageBox.text(data.responseText);
        } else {
            messageBox.text('It went wrong. Oops');
        }
    });


//        form.action = "sendemail.php";
//        form.target = "_self";
//        form.submit();
    }
}
function closeClick(){
        displayBoxClicked = false;
        removeOverlay();
}
function pageClick(){
    revealThing(overlay);
    revealThing(displayBox);
    let picToDisplay = this;
    let captionText = picToDisplay.title;
    splashFeature = picToDisplay.cloneNode(true);
    console.log(picToDisplay);
    let captionContainer = document.getElementById('caption');
    lightBox.appendChild(splashFeature);
    captionContainer.textContent = captionText;
}
function imgClick(typeClicked){
    revealThing(overlay);
    revealThing(displayBox);
    //console.log(this);
 //   console.log(this.children.firstElementChild.src);
    let picToDisplay = this.children[0].firstElementChild;
    let captionText = picToDisplay.title;
    splashFeature = picToDisplay.cloneNode(true);
    console.log(picToDisplay);
    let captionContainer = document.getElementById('caption');
    lightBox.appendChild(splashFeature);
    captionContainer.textContent = captionText;

}
function hideThing(thing){
    thing.style = "display:none";
}
function revealThing(thing){
    thing.style = "display:block";
}
function removeOverlay(){
    if(!displayBoxClicked){
    hideThing(overlay);
    hideThing(displayBox);
    }
    if(splashFeature){
        lightBox.removeChild(splashFeature);
        hideThing(overlay);
        hideThing(displayBox);
    }
    displayBoxClicked = false;
}
if(overlay){
    overlay.addEventListener('click', removeOverlay);
}
if(displayBox) {displayBox.addEventListener('click', () => { displayBoxClicked = true;});
}
