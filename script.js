window.onload=function(){
 document.querySelector('#hitbutton').addEventListener('click',hitfunction);
 document.querySelector('#standbutton').addEventListener('click',standfunction);
 document.querySelector('#dealbutton').addEventListener('click',dealfunction);

  
}

   let BlackjackGame={
       you:{'div':'your-box','span':'your-play','score':0},
       dealer:{'div':'dealer-box','span':'dealer-play','score':0},
       cards:['A','2','3','4','5','6','7','8','9','10','j','Q','K'],
       cardmap:{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'j':10,'Q':10,'K':10,A:[1,11]},
       wins:0,
       losses:0,
       draws:0,
       ishit:true,
       isStand:false,
       turnOver:false
   }
   const hitSound=new Audio("./sounds/swish.m4a");
   const awwSound=new Audio("./sounds/aww.mp3");
   const winSound=new Audio("./sounds/cash.mp3");
   function RandomIndex(yourbox,cards){
        let random=Math.floor((Math.random())*13);
        return (cards[random]);
   }
   const YOU=BlackjackGame['you'];
   const DEALER=BlackjackGame.dealer;
   const CARDS=BlackjackGame.cards;
   
   function hitfunction(){
       if(BlackjackGame.ishit){
       showCard(YOU,CARDS);
       if(YOU.score<=21){
       hitSound.play();
       }
       showScore(YOU);
       BlackjackGame.isStand=true;
       }
}
function sleep(ms){
    return new Promise(Response=>setTimeout(Response,ms));
}

 async function standfunction(){
      BlackjackGame.ishit=false;
      while(BlackjackGame.isStand&& DEALER.score<17){
          showCard(DEALER,CARDS);
          hitSound.play();
          showScore(DEALER);
      }
     showResult();
    BlackjackGame.turnOver=true;
    await sleep(1000);
          }

  function dealfunction(){
     if(BlackjackGame.turnOver){
         BlackjackGame.ishit=true;
         BlackjackGame.isStand=false;
         removeCards(YOU);
         removeCards(DEALER);
         document.querySelector("#Result").textContent="Let's Play";
         document.querySelector("#Result").style.color="black";
         BlackjackGame.turnOver=false;
     }
  
  }
function removeCards(box){
     let yourImages= document.querySelector(`.${box.div}`).querySelectorAll('img');
     for(let i=0;i<yourImages.length;i++){
     yourImages[i].remove();
      }
     box.score=0;
     document.querySelector(`#${box.span}`).textContent=0;
     document.querySelector(`#${box.span}`).style.color="white";
  
  }

 function showCard(box,cards){
    
    let cardImageIndex=RandomIndex(box,cards);
    updateScore(box,cardImageIndex,BlackjackGame.cardmap);
    if(box.score<22){
    let cardImage=document.createElement('img');
    cardImage.src=`./images/${cardImageIndex}.png`;
  
    document.querySelector(`.${box.div}`).appendChild(cardImage);
     }
}

function updateScore(box,card,cardsmap){
    if(card==='A'){
        if((box.score+cardsmap[card][1])<=21){
            box.score+=cardsmap[card][1];
        }else{
            box.score+=cardsmap[card][0];
        }
    }
    else{
    box.score+=cardsmap[card];
    }
}

function showScore(box){
    if(box.score>21){
        document.querySelector(`#${box.span}`).textContent="Bust!";  
        document.querySelector(`#${box.span}`).style.color="red";
    }else{
        document.querySelector(`#${box.span}`).textContent=box.score;
    }
}

function computeWinner(){
    let winner;
    if(YOU.score<=21){
        if(YOU.score>DEALER.score ||DEALER.score>21){
            winner=YOU;
            BlackjackGame.wins++;
        }else if(YOU.score<DEALER.score){
            winner=DEALER;
            BlackjackGame.losses++;
         }else if(YOU.score===DEALER.score){
             console.log("draw");
             BlackjackGame.draws++;
         }
    }else if(YOU.score>21 &&DEALER.score<=21){
        winner=DEALER;
        BlackjackGame.losses++;
    }else if(YOU.score>21&&DEALER.score>21){
        console.log("draw");
        BlackjackGame.draws++;
    }
    return winner;
}

function showResult(){
    let winner =computeWinner();
    let message,messageColor;
    
   if(winner===YOU){
   message="You Won!";
   messageColor="green";
   winSound.play();
   }else if(winner===DEALER){
        messageColor="red";
        message="You Lost!";
        awwSound.play();
    }else{
        message="draw";
        messageColor="black";
        
    }
    document.getElementById("Result").textContent = message;
    document.getElementById("Result").style.color=messageColor;
    document.querySelector('#win').textContent=BlackjackGame.wins;
    document.querySelector('#loses').textContent=BlackjackGame.losses;
    document.querySelector('#draw').textContent=BlackjackGame.draws;
    
}
