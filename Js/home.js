//Your age in days
function ageInDays(){
    var birthYear=prompt("What is your birth year...?");
    var days=(2020-birthYear)*365;
    var h1=document.createElement('h1');
    var textAnswer= document.createTextNode('You are '+ days+' days old');
    h1.setAttribute('id','ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);

}

function reset()
{
    document.getElementById('ageInDays').remove();
}

// Challenge:2 Generate Cat
document.querySelector("#cat-reset").addEventListener('click',resetCat);
function generateCat()
{
    var image=document.createElement('img');
    var div=document.getElementById('flex-cat-gen');
    image.src="https://cdn2.thecatapi.com/images/19p.gif";
    div.appendChild(image);
}

function resetCat()
{
    let cat_images= document.querySelector("#flex-cat-gen").querySelectorAll("img");
   // console.log(cat_images);
    for(let i=0;i<cat_images.length;i++)
    {
        cat_images[i].remove();
    }
}


//challenge 3: Rock, paper, scissors

function rpsGame(yourChoice)
{
   // console.log(yourChoice);
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = randomChoice();
    console.log(botChoice);
    results=decideWinner(humanChoice, botChoice);
    console.log(results);
    message = finalMessage(results); //{'message':'You Won', 'color':'green'}
    rpsFrontEnd(humanChoice, botChoice, message);
}

function randomChoice()
{
    var rand=["rock","paper","scissors"][Math.floor(Math.random()*3)];
    return rand;
}

function decideWinner(humanChoice,botChoice)
{
    var rpsDatabase={
        'rock': {'scissors': 1, 'rock':0.5, 'paper':0},
        'paper':{'rock':1, 'paper':0.5, 'scissors':0},
        'scissors':{'rock':0, 'paper':1, 'scissors':0.5}
    }
    var yourScore=rpsDatabase[humanChoice][botChoice];
    var computerScore=rpsDatabase[botChoice][humanChoice];
    return [yourScore, computerScore];
}

function finalMessage([humanScore, botScore])
{
    if(humanScore===0)
    return {'message':'You Lost!', 'color':'red'};
    else if(humanScore===1)
    return {'message':'You Won!', 'color':'green'};
    else
    return {'message':'Tied!', 'color':'blue'};
}

function rpsFrontEnd(humanImageChoice, botImageChoice, message)
{
    var imagesDatabase={
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }

    //remove all images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv =  document.createElement('div');
    var messageDiv =  document.createElement('div');

    humanDiv.innerHTML="<img src='"+ imagesDatabase[humanImageChoice]+"' width=200 height=200 style='box-shadow: 0px 10px 50px rgba(11, 97, 224, 0.7)'>";
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);

    messageDiv.innerHTML = "<h1 style='color:"+ message.color+ "; font-size:60px; padding:30px;  text-align:center;  font-family: Verdana, Geneva, Tahoma, sans-serif;'>"+ message.message+"</h1>"
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);

    botDiv.innerHTML="<img src='"+ imagesDatabase[botImageChoice]+"' width=200 height=200 style='box-shadow: 0px 10px 50px rgba(252, 45, 30, 0.7)'>";
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
}

//challene 4: change color of all buttons
var all_buttons=document.getElementsByTagName("button");
//console.log(all_buttons);

var copyAllButtons=[];
for(let i=0;i<all_buttons.length;i++)
{
    copyAllButtons.push(all_buttons[i].classList[1]);
}
console.log(copyAllButtons);
function buttonColorChange(buttonThingy)
{
    if(buttonThingy.value==='red')
    buttonRed();
    else if(buttonThingy.value==='green')
    buttonGreen();
    else if(buttonThingy.value==='reset')
    buttonReset();
    else if(buttonThingy.value==='random')
    buttonRandom();
}

function buttonRed()
{
    for(let i=0;i<all_buttons.length;i++)
    {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonGreen()
{
    for(let i=0;i<all_buttons.length;i++)
    {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonRandom()
{
    for(let i=0;i<all_buttons.length;i++)
    {
 //   var rand=['btn-primary','btn-success','btn-danger','btn-warning'][Math.floor(Math.random()*4)];
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(['btn-primary','btn-success','btn-danger','btn-warning'][Math.floor(Math.random()*4)]);
    }
}


function buttonReset()
{
    for(let i=0;i<all_buttons.length;i++)
    {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}


//Challenge 5: BlackJack

let blackjackGame={
    'you': {'scoreSpan':"#your-blackjack-result", 'div': "#your-box", 'score': 0},
    'dealer': {'scoreSpan':"#dealer-blackjack-result", 'div': "#dealer-box", 'score': 0},
    'cards': ['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap' : {'2':2,'3':3, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'K':10, 'J':10, 'Q':10, 'A':[1,11]},
    'wins':0,
    'losses':0,
    'draws':0,
    'isStand': false,
    'isHit':false,
    'turnsOver':false,
};

const YOU = blackjackGame['you'];
const DEALER= blackjackGame['dealer'];

const hitSound=new Audio('sounds\\swish.m4a');
const winSound=new Audio('sounds\\cash.mp3');
const lostSound=new Audio('sounds\\aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);
function blackjackHit()
{
    if(blackjackGame['isStand']===false)
    {
    var card=randomCard();
    showCard(card, YOU);
    updateScore(card,YOU);
    showScore(YOU);
   // console.log(YOU['score']);
    }
    blackjackGame['isHit']=true;
    
}
function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve,ms));
}
async function dealerLogic()
{
    if(blackjackGame['isHit']===true)
    {
        blackjackGame['isStand']=true;
        while(DEALER['score']<15 && blackjackGame['isStand']===true)
        {
            var card=randomCard();
            showCard(card, DEALER);
            updateScore(card,DEALER);
            showScore(DEALER);
            await sleep(1000);
        }
    
        blackjackGame['turnsOver']=true;
        let winner= computeWinner();
        showResult(winner);
    }
   
    
}

function randomCard()
{
    var randIndex = Math.floor(Math.random()*13)
    var randCard=blackjackGame['cards'][randIndex];
    return randCard;
}
function showCard(card, activePlayer)
{
    if(activePlayer['score']<=21)
    {
    let cardImage = document.createElement('img');
    cardImage.src=`images\\${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
    }
}

function blackjackDeal()
{
   // let winner=computeWinner();
    //showResult(winner);
    if(blackjackGame['turnsOver']==true)
    {
    let yourImages = document.querySelector("#your-box").querySelectorAll('img');
    let dealerImages = document.querySelector("#dealer-box").querySelectorAll('img');
   
    for(let i=0;i<yourImages.length;i++)
    {
        yourImages[i].remove();
    }

    for(let i=0;i<dealerImages.length;i++)
    {
        dealerImages[i].remove();
    }

    YOU['score']=0;
    DEALER['score']=0;
    document.querySelector(YOU['scoreSpan']).textContent=0;
    document.querySelector(YOU['scoreSpan']).style.color = 'white';
    document.querySelector(DEALER['scoreSpan']).textContent=0;
    document.querySelector(DEALER['scoreSpan']).style.color = 'white';
    document.querySelector("#blackjack-result").textContent="Let's Play!";
    document.querySelector("#blackjack-result").style.color="black";
    blackjackGame['isStand']=false;
    blackjackGame['turnsOver']=false;
    blackjackGame['isHit']=false;
    }
}

function updateScore(card, activePlayer)
{
    if(card==='A')
    {
        //if adding 11 keeps me below 21, then add 11 when A is chosen, else add 1
        if(activePlayer['score'] + blackjackGame['cardsMap'][card][1]<=21)
        activePlayer['score']+=blackjackGame['cardsMap'][card][1];
        else
        activePlayer['score']+=blackjackGame['cardsMap'][card][0];
    }
    else
    activePlayer['score']+=blackjackGame['cardsMap'][card];
}

function showScore(activePlayer)
{
    if(activePlayer['score']>21){
    document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST';
    document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }
    else{
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function computeWinner()
{
    let winner;
    if(YOU['score']<=21)
    {
        if(DEALER['score']<YOU['score'] || DEALER['score']>21)
        {
            blackjackGame['wins']++;
            winner=YOU;
        }
        else if(DEALER['score']===YOU['score'])
        {
           blackjackGame['draws']++;
        }
        else if(DEALER['score']>YOU['score'])
        {
            blackjackGame['losses']++;
            winner=DEALER;
        }
    }
    else if(YOU['score']>21 && DEALER['score']<=21)
    {
        winner=DEALER;
        blackjackGame['losses']++;
    }
    else if(YOU['score']>21 && DEALER['score']>21)
    {
        blackjackGame['draws']++;
    }
    return winner;
}

function showResult(winner)
{
    if(blackjackGame['turnsOver']===true)
    {
        if(winner===YOU)
        {
            document.querySelector("#blackjack-result").textContent="YOU WON!";
            document.querySelector("#blackjack-result").style.color="green";
            winSound.play();
        }
        else if(winner===DEALER)
        {
            document.querySelector("#blackjack-result").textContent="YOU LOST!";
            document.querySelector("#blackjack-result").style.color="red";
            lostSound.play();
        }
        else{
            document.querySelector("#blackjack-result").textContent="Draw";
            document.querySelector("#blackjack-result").style.color="blue";
        }
        document.querySelector("#wins").textContent=blackjackGame['wins'];
        document.querySelector("#losses").textContent=blackjackGame['losses'];
        document.querySelector("#draws").textContent=blackjackGame['draws'];
    }
}