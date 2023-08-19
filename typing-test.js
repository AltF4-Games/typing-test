let str = "the quick brown fox jumps over the lazy dog exciting adventure awaits in the enchanted forest beautiful flowers bloom in vibrant colors majestic mountains stand tall against the azure sky serene lakes shimmer under the gentle moonlight a melodious song fills the air as birds sing harmoniously brilliant fireworks light up the night sky whispering winds carry secrets through the ancient trees busy streets bustle with life as people rush to their destinations delicious aromas waft from the bustling cafes silky sand tickles toes on sunny beaches quaint cottages line the cobblestone streets charming shops display unique treasures that beckon to be discovered vibrant markets bustle with colors and scents ancient ruins whisper tales of the past glimmering stars adorn the night sky as a crescent moon watches over the world inspiring books transport minds to different realms with their vivid stories sparkling fountains dance in the sunlight while children laugh with joy tranquil temples offer solace and peace to weary souls endless possibilities await those who embrace the unknown timeless wisdom guides us on our journey kind-hearted friends lend a helping hand during difficult times juicy strawberries tempt taste buds with their sweetness captivating artworks evoke emotions and ignite imagination rainy days create a cozy atmosphere for curling up with a good book thunderous applause fills the concert hall as the orchestra performs a breathtaking symphony the scent of freshly brewed coffee awakens the senses on a crisp morning breeze wise elders share their stories around the crackling fireplace twinkling fairy lights create a magical ambiance in the garden soothing raindrops create a rhythmic melody on the roof a gentle breeze rustles through the autumn leaves as they fall to the ground delightful laughter echoes through the playground as children play games of tag and hide-and-seek intricate lace patterns adorn the wedding dress of the blushing bride colorful kites soar high in the sky during a windy day a lively street parade";
let words = str.split(' ');

shuffleArray(words);
words = words.splice(50,50);
str = words.join(' ');

let wordsContainer = document.getElementById("words");
let correctCharacters = [words.length];

let spans = [];
AddElement()

let input = "";
let validKeys = "abcdefghijklmnopqrstuvwxyz ";

let dispalyTime = 30;
let firstKey = false;
let completed = false;
let time = 0;

window.addEventListener('keydown', function (e) {
    HandleInput(e.key);
}, false);

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}

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
        if(inputArray[index] == words[index])
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

    let accuracy = Math.trunc(accurate/input.length * 100);
    document.getElementById("result").innerHTML = "WPM: " + wpm + " ACCURACY: " + accuracy + "%";
}