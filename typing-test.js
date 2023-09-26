let str = "";

fetch('./data.json')
    .then((response) => response.json())
    .then((json) => { 
        str = json.quotes[Math.floor(Math.random() * json.quotes.length)].text.toLowerCase();
        AddElement();
    });


let wordsContainer = document.getElementById("words");
let correctCharacters = [words.length];

let spans = [];

let input = "";
let validKeys = "abcdefghijklmnopqrstuvwxyz!?,.':; ";

let dispalyTime = 30;
let firstKey = false;
let completed = false;
let time = 0;

window.addEventListener('keydown', function (e) {
    HandleInput(e.key);
}, false);

const button = document.getElementById("retry-btn");

button.addEventListener("click", function() {
    location.reload();
});

function HandleInput(key)
{
    if(completed) return;
    if(!firstKey)
    {
        setTimeout(Timer, 1000);
        firstKey = true;
    }
    if(key == 'Backspace')
    {
        input = input.slice(0, -1);
        RemoveColors(input);
    }
    if(validKeys.includes(key))
    {
        input += key;
    }
    if(input.length == str.length) 
    {
        CalculateWPM();
    }
    ChangeColors(input);
    MoveCaret(input.length);
}

function AddElement()
{
    for (let index = 0; index < str.length; index++) 
    {
        const element = document.createElement('span');
        const child = document.createElement('p');
        child.innerHTML = str[index];
        child.style = "display:inline;";
        element.appendChild(child);
        spans.push(element);
        wordsContainer.appendChild(element);
    }
}

function ChangeColors(input)
{
    for (let i = 0; i < input.length; i++) 
    {
        if(input[i] == str[i])
        {
            spans[i].style = "color:white";
            correctCharacters[i] = true;
        }
        else
        {
            spans[i].style = "color:red";
            correctCharacters[i] = false;
        }
    }
}

function RemoveColors(input)
{
    spans[input.length].style = "color:gray";
    correctCharacters[input.length] = false;
}

let cursor = true;
let speed = 220;

setInterval(() => {
   if(cursor) {
     document.getElementById('cursor').style.opacity = 0;
     cursor = false;
   }else {
     document.getElementById('cursor').style.opacity = 1;
     cursor = true;
   }
}, speed);

function MoveCaret(index)
{
    document.getElementById('cursor').remove();

    let caret = document.createElement('span');
    caret.innerHTML = "|";
    caret.id = "cursor";
    wordsContainer.insertBefore(caret,spans[index]);
}

function Timer() {
    if(completed) return;
    dispalyTime--;
    time++;
    document.getElementById("timer").innerHTML = dispalyTime;
    if(dispalyTime <= 0) {
        CalculateWPM();
    } else {
        setTimeout(Timer, 1000);
    }
}

function CalculateWPM()
{
    completed = true;
    let totalWords = str.split(' ').length;
    let wordCount = 0;
    let inputArray = input.split(' ');

    for (let index = 0; index < totalWords; index++) 
    {
        if (inputArray[index] == str.split(' ')[index])
        {
            wordCount++;
        }
    }

    let minutes = time/60;
    let wpm = Math.trunc(wordCount / minutes);

    let accurate = 0;
    correctCharacters.forEach(elt => 
    {
        if(elt == true)
        {
            accurate++;
        }
    });

    let accuracy = Math.trunc((accurate / str.length) * 100);
    document.getElementById("result").innerHTML = "WPM: " + wpm + " ACCURACY: " + accuracy + "%";
}