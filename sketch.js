let ideaGifs = [];
let negativeIdeaGifs = [];
let blackEdge = [];
let scene="main";
let sprite;
let mind;
let face;
let hair;
let brainX, brainY, brainRadius;
let toby;
 let ideaPlaced=false
let returnTime=0
let headOffsetY = 0;
let headDragging = false;
let headGrabY = 0;
let headLifted = false;
let isWorking=false;
let errorPopup;
let errorDismissed = false;
let working;
let idea;
let workingClose;
let ideaReturnTime=0
let dialogue = "Hi! I'm Sprite.";
let showDialogue = false;
let talking;
let clickCount=0;
let introStarted = false;
let introFinished = false;
let dialogueIndex = 0;
let ideaCommentShown = false;
let mindPromptShown = false;
let dialogueFont;
let ideasCollected=0;
let workingClose2;
let workingClose3;
let workingClose4;
let workingClose5;
let ideaDialogues = [
  "Oh! What's that? I wonder what happens if you click on it...",
  "Another idea?! I'm still working on the last one!",
  "Oh! That one looks interesting, sure, add it in!",
  "Wow! We're really keeping 'em coming!",
  "Okay..I think I have enough to work with for now...",
  "It's getting a bit too much, slow down okay?",
  "...did you hear me? Are you doing this on purpose?",
  "I can't keep up! I'm not good enough!",
];

let mindStages=[];
let mindDialogueShown = false;
let workingStages = [];

let displayedText = "";
let typewriterIndex = 0;
let typewriterSpeed = 2;
let lastTypeTime = 0;
let talkingExpressions = [];
let currentExpression;

let workingDialogueIndexes = [0, 0, 0, 0,0,0];

let workingDialogue = [["Thanks! I'm working on it :)","...still working on it","...you really like clicking on me don't you?"],["Ok...I can do this...","You can stop watching me haha...I'm trying my best"],["I can't keep up with all this","Slow down with the ideas...kay?"],["Are you enjoying this? I asked you to stop","I just need some quiet"],["I can't....I.....I can't keep...up","please, please just stop"],
["I, I want to give up....","I just can't do this..."]];

let mindDialogue = ["Oh hey! You're up close! How could you get this into my head...?",
  "Oh..Another one! Sure, why not?","Another one...but...I'm not finished with the other ones.","It's getting a bit much, don't you think?","I'm not good enough for all this..."];

function showMindDialogue() {
  let index = min(ideasCollected, mindDialogue.length - 1);

  dialogue = mindDialogue[index];
  startTyping();
  showDialogue = true;
  mindDialogueShown = true;
}


let introDialogue = [
  "Hey! Glad you found me, I'm Sprite!",
  "I wanna make something, could you help?",
  "I get stuck sometimes...and overwhelm myself",
  "...maybe you can help me find a new idea?",
  "If you wait around a bit, maybe something will show up..."
];

let ideaStartTime = 0;

let headLiftAmount = -90;

function typewriterEffect() {
  if (millis() - lastTypeTime > 40) {
    if (typewriterIndex < dialogue.length) {
      typewriterIndex += typewriterSpeed;
      typewriterIndex = min(typewriterIndex, dialogue.length);

      displayedText = dialogue.substring(0, typewriterIndex);
      lastTypeTime = millis();
    }
  }
}

function startTyping() {
  displayedText = "";
  typewriterIndex = 0;
  lastTypeTime = millis();
}

async function setup() {
  createCanvas(windowWidth, windowHeight);
  updateLayout();
  sprite= await loadImage("assets/standing.gif");
  face=await loadImage("assets/mind1.gif");
    hair=await loadImage("assets/hair.gif");
  toby=await loadImage("assets/ideaPlaced.gif");
  working=await loadImage("assets/working.gif");
  dialogueFont=await loadFont("assets/W95F.otf")
    workingClose2=await loadImage("assets/workingClose2.gif");
  workingClose3=await loadImage("assets/workingClose3.gif");
  workingClose4=await loadImage("assets/workingClose4.gif");
  workingClose5=await loadImage("assets/workingClose5.gif");
  workingClose6= await loadImage("assets/workingClose6.gif")
  workingClose7=await loadImage("assets/workingClose7.gif");
  workingClose8=await loadImage("assets/workingClose8.gif");
  workingClose9=await loadImage("assets/workingClose9.gif");
  workingClose10= await loadImage("assets/workingClose10.gif")
  workingHappy = await loadImage("assets/workingHappy.gif")
  workingStressed = await loadImage("assets/workingStressed.gif")
  workingDown = await loadImage("assets/workingDown.gif")
  workingWhite= await loadImage("assets/workingWhite.gif")
  workingGlitch= await loadImage("assets/workingGlitch.gif")
  workingPixels = await loadImage("assets/workingPixels.gif")
  workingWiggle = await loadImage("assets/workingWiggle.gif")
  workingPixel = await loadImage("assets/workingPixel.gif")
  workingDot = await loadImage("assets/workingDot.png")
talkingExpressions[0] = await loadImage("assets/HappyTalk.gif");
talkingExpressions[1] = await loadImage("assets/talking.gif");
talkingExpressions[2] = await loadImage("assets/SadTalk.gif");
talkingExpressions[3] = await loadImage("assets/talkSad2.gif");
talkingExpressions[4] = await loadImage("assets/talkGlitch1.gif");
  ideaGifs[0] = await loadImage("assets/idea1.gif")
  ideaGifs[1] = await loadImage("assets/idea2.gif")
  ideaGifs[2] = await loadImage("assets/idea3.gif")
  mindStages[0] = await loadImage("assets/mind1.gif");
mindStages[1] = await loadImage("assets/mind2.gif");
mindStages[2] = await loadImage("assets/mind3.gif");
mindStages[3] = await loadImage("assets/mind4.gif");
mindStages[4] = await loadImage("assets/mind5.gif");
mindStages[5] = await loadImage("assets/mind6.gif");
mindStages[6] = await loadImage("assets/mind7.png");
mindStages[7] = await loadImage("assets/mind8.gif");
mindStages[8] = await loadImage("assets/mind9.gif");
errorPopup = await loadImage("assets/errorPopup.png");
blackEdge[0] = await loadImage("assets/blackEdge1.gif");
blackEdge[1] = await loadImage("assets/blackEdge2.gif");
blackEdge[2] = await loadImage("assets/blackEdge3.gif");
blackEdge[3] = await loadImage("assets/blackEdge4.gif");
blackEdge[4] = await loadImage("assets/notGoodOverlay1.gif")
blackEdge[5] = await loadImage("assets/notGoodOverlay.gif")
negativeIdeaGifs[0] = await loadImage("assets/notGoodEnough.gif")
negativeIdeaGifs[1] = await loadImage("assets/giveUp.gif")
darknessTest = await loadImage("assets/black edge test 1.png")


  /* 
  for(let i = 0; i < 10;i++.){
  idea[i] = push loadImage("assets/" + i + ".gif");
  }

  assets/0.gif
  assets/1.gif
  assets/2.gif
  */
  // idea[] ... use an array to store all the ideas. idea[i] = push loadImage("assets/...");
 talking=await loadImage("assets/talking.gif")
  workingClose=await loadImage("assets/workingclose.gif");
  idea1= new Idea();
}

function workingCloseDialogue() {
let stage = max(0, min(ideasCollected - 1, workingDialogue.length - 1));
  let comments = workingDialogue[stage];

  let lineIndex = min(
    workingDialogueIndexes[stage],
    comments.length - 1
  );

  dialogue = comments[lineIndex];
  startTyping();

  if (workingDialogueIndexes[stage] < comments.length - 1) {
    workingDialogueIndexes[stage]++;
  }

  showDialogue = true;
}

function getNextIdeaImage() {

  // First six ideas are normal
  if (ideasCollected < 6) {
    return ideaGifs[ideasCollected % ideaGifs.length];
  }

  // After six ideas, switch to negative ideas
  let negativeIndex = (ideasCollected - 6) % negativeIdeaGifs.length;

  return negativeIdeaGifs[negativeIndex];
}

function drawDarknessOverlay() {
  if (ideasCollected < 2) return;

  let darknessIndex = ideasCollected - 2;
  darknessIndex = min(darknessIndex, blackEdge.length - 1);

  // Darkness gets stronger with each idea
  let darknessOpacity = map(
    ideasCollected,
    2,
    6,
    70,
    230
  );

  darknessOpacity = constrain(darknessOpacity, 70, 230);

  imageMode(CENTER);

  tint(255, darknessOpacity);

  image(
    blackEdge[darknessIndex],
    width / 2,
    height / 2,
    windowWidth,
    windowHeight
  );

  noTint();
}

function drawDialogue() {

  if (showDialogue) {
    let glitchLevel = constrain(ideasCollected - 5, 0, 5); 
let boxWidth = width * 0.7;
let boxHeight = height * 0.30;

let boxX = (width - boxWidth) / 2;
let boxY = height - boxHeight - height * 0.04;


   let glitching = ideasCollected >= 6;

let glitchX = 0;
let glitchY = 0;

if (glitchLevel > 0 && random() < glitchLevel * 0.12) {
  glitchX = random(-glitchLevel * 3, glitchLevel * 3);
  glitchY = random(-glitchLevel * 2, glitchLevel * 2);
}

push();

// Random red glitch strips
if (glitchLevel > 0) {
  for (let i = 0; i < glitchLevel; i++) {
    if (random() < glitchLevel * 0.25) {
      fill(255, 0, 0);
      noStroke();

      rect(
        boxX + random(-10, 10),
        boxY + random(boxHeight),
        boxWidth,
        random(2, 5 + glitchLevel * 2)
      );
    }
  }
}

// Dialogue box
if (ideasCollected >= 6) {
  fill(0); // black box from the 6th idea onwards
} else {
  fill(255); // white box before the 6th idea
}

rect(
  boxX + glitchX,
  boxY + glitchY,
  boxWidth,
  boxHeight
);

pop();

    fill(255);
    strokeWeight(7)
    stroke(255,0,0);
  textFont(dialogueFont);
    textAlign(LEFT, TOP);

    textSize(min(width * 0.025, 24));

    typewriterEffect();
let textX = boxX + 250;
let textY = boxY + 35;

if (glitchLevel > 0 && random() < glitchLevel * 0.15) {
  textX += random(-glitchLevel * 3, glitchLevel * 3);
  textY += random(-glitchLevel * 2, glitchLevel * 2);
}

// Red ghost text
if (glitchLevel > 0 && random() < glitchLevel * 0.12) {
  fill(255, 0, 0);
  text(
    displayedText,
    textX + random(-glitchLevel * 2, glitchLevel * 2),
    textY,
    boxWidth - 50,
    boxHeight - 20
  );
}

// Main text stays white
fill(255);

text(
  displayedText,
  textX,
  textY,
  boxWidth - 50,
  boxHeight - 20
);

currentExpression = getCurrentExpression();

let portraitX = boxX + 120;
let portraitY = boxY + 105;

// Make the portrait jump around more with each idea after 6
if (glitchLevel > 0 && random() < glitchLevel * 0.15) {
  portraitX += random(-glitchLevel * 4, glitchLevel * 4);
  portraitY += random(-glitchLevel * 3, glitchLevel * 3);
}

// Draw a red ghost image occasionally
if (glitchLevel > 0 && random() < glitchLevel * 0.2) {
  tint(255, 100, 100);
  image(
    currentExpression,
    portraitX + random(-glitchLevel * 5, glitchLevel * 5),
    portraitY,
    190,
    190
  );
  noTint();
}

// Draw the normal portrait on top
image(
  currentExpression,
  portraitX,
  portraitY,
  190,
  190
);

// Add occasional horizontal glitch slices
if (glitchLevel > 0) {
  for (let i = 0; i < glitchLevel; i++) {
    if (random() < glitchLevel * 0.2) {
      fill(255, 0, 0);
      noStroke();
      rect(
        portraitX - 95 + random(-5, 5),
        portraitY - 95 + random(-90, 90),
        190,
        random(2, 4 + glitchLevel * 2)
      );
    }
  }
}
 
  }
}

function getCurrentExpression() {

  if (ideasCollected < 2) {
    return talkingExpressions[0];
  }

  if (ideasCollected < 3) {
    return talkingExpressions[1];
  }

  if (ideasCollected < 4) {
    return talkingExpressions[2];
  }

  if (ideasCollected < 5) {
    return talkingExpressions[3];
  }

  return talkingExpressions[4];
}

function nextDialogue() {

  dialogueIndex++;

  if (dialogueIndex < introDialogue.length) {

    dialogue = introDialogue[dialogueIndex];
    startTyping();

  } else {

    showDialogue = false;
    introFinished = true;
    introStarted = false;

    // Start the idea timer, NOT the working animation
ideaStartTime = millis() + 5000;
ideaCommentShown = false;
  }
}

function getWorkingGif() {
  if (ideasCollected < 2) return workingHappy;
  if (ideasCollected === 2) return working;
  if (ideasCollected === 3) return workingStressed;
  if (ideasCollected === 4) return workingDown;
  if (ideasCollected === 5) return workingGlitch;
  if (ideasCollected === 6) return workingWhite;
   if (ideasCollected === 7) return workingWiggle;
  if (ideasCollected === 8) return workingPixels;
  if (ideasCollected === 9) return workingPixel;
  if (ideasCollected === 10) return workingDot;

  return working5;
}


function draw() {
if (ideasCollected >= 6) {
  background(0);
} else {
  background(255);
}

imageMode(CENTER);

  if (scene === "error") {
  background(255);

  if (!errorDismissed) {
    imageMode(CENTER);
    image(
      errorPopup,
      width / 2,
      height / 2,
      errorPopup.width,
      errorPopup.height
    );
  }

  return;
}

  // MAIN SCENE
  if (scene === "main") {

    if (isWorking) {
      noSmooth();
      image(getWorkingGif(), width * 0.5, height * 0.5, 35, 70);
    } else {
      noSmooth();
      image(sprite, width * 0.5, height * 0.5, 55, 65);
    }

    // Show the floating idea
    if (
      introFinished &&
      millis() > ideaStartTime &&
      millis() > ideaReturnTime &&
      !ideaPlaced
    ) {
      idea1.move();
      idea1.show();
    }

    // Return to main after an idea has been placed
    
  }


  // MIND SCENE
  else if (scene === "mind") {

    noSmooth();

    let stage = min(ideasCollected, mindStages.length - 1);

    image(
      mindStages[stage],
      width * 0.515,
      height * 0.59,
      windowWidth,
      windowHeight
    );

    let head = getHeadLayout();

    image(
      hair,
      width * 0.5,
      height * 0.15 + headOffsetY,
      width * 0.5,
      height * 0.5
    );

    if (ideaPlaced) {
      image(toby, brainX, brainY - 150, 500, 500);
    } else {
      idea1.move();
      idea1.show();
    }
  }

  // WORKING CLOSE-UP SCENE
  else if (scene === "workingCloseup") {

    noSmooth();

    if (ideasCollected === 1) {
      image(workingClose, width * 0.5, height * 0.4, windowWidth, windowHeight);
    }
    else if (ideasCollected === 2) {
      image(workingClose2, width * 0.5, height * 0.5, windowWidth, windowHeight);
    }
    else if (ideasCollected === 3) {
      image(workingClose3, width * 0.5, height * 0.4, windowWidth, windowHeight);
    }
    else if (ideasCollected === 4) {
      image(workingClose4, width * 0.5, height * 0.4, windowWidth, windowHeight * 0.8);
    }
    else if (ideasCollected === 5) {
      image(workingClose5, width * 0.5, height * 0.4, windowWidth, windowHeight);
    }
    else if (ideasCollected === 6) {
      image(workingClose6, width * 0.5, height * 0.4, windowWidth, windowHeight);
    }
    else if (ideasCollected === 7) {
      image(workingClose7, width * 0.5, height * 0.4, windowWidth, windowHeight);
    }
    else if (ideasCollected === 8) {
      image(workingClose8, width * 0.5, height * 0.4, windowWidth, windowHeight * 0.8);
    }
    else if (ideasCollected === 9) {
      image(workingClose9, width * 0.5, height * 0.4, windowWidth, windowHeight);
    }
    else if (ideasCollected === 10) {
      image(workingClose10, width * 0.5, height * 0.4, windowWidth, windowHeight);
    }
  }
    if (ideaPlaced && millis() - returnTime >= 3000) {

    scene = "main";
    ideaPlaced = false;
    isWorking = true;

    secondIdeaCommentShown = false;
    ideaCommentShown = false;

    headOffsetY = 0;
    headLifted = false;

    idea1.x = 100;
    idea1.y = 150;
    idea1.img = getNextIdeaImage();

    showDialogue = false;
    ideaReturnTime = millis() + 10000;
  }

  // Darkness overlay
  drawDarknessOverlay();

  // Dialogue always appears on top
  drawDialogue();
}





function startIntro() {
  introStarted = true;
  dialogueIndex = 0;
  dialogue = introDialogue[dialogueIndex];
  showDialogue = true;
}

function getHeadLayout() {
  return {
    x: width * 0.5,
    y: height * 0.32,
    w: width * 0.6,
    h: height * 0.5
  };
}

function mousePressed() {
  if (scene === "error") {
  if (!errorDismissed) {
    errorDismissed = true;
  }
  return;
}
  if (!introStarted && !introFinished && !isWorking) {
    let spriteX = width * 0.5;
    let spriteY = height * 0.5;

    let d = dist(mouseX, mouseY, spriteX, spriteY);

    if (d < min(width, height) * 0.08) {
      startIntro();
      return;
    }
  }

  // Advance dialogue when the dialogue box is clicked
let boxWidth = width * 0.7;
let boxHeight = height * 0.30;

let boxX = (width - boxWidth) / 2;
let boxY = height - boxHeight - height * 0.04;

if (showDialogue) {
  if (
    mouseX > boxX &&
    mouseX < boxX + boxWidth &&
    mouseY > boxY &&
    mouseY < boxY + boxHeight
  ) {
    if (introStarted) {
      nextDialogue();
    } else {
      showDialogue = false;
    }
  }
  return;
}
  // Clicking the close-up returns to the main scene
  if (scene === "workingCloseup") {
    scene = "main";
    return;
  }




  if (scene === "main") {

  

if (isWorking) {
  let spriteX = width * 0.5;
  let spriteY = height * 0.5;

  if (dist(mouseX, mouseY, spriteX, spriteY) < min(width, height) * 0.08) {
    workingCloseDialogue();
    scene = "workingCloseup";
    return;
  
  }
}

    // Check if the idea was clicked
if (!ideaPlaced && millis() > ideaReturnTime) {
  let d = dist(mouseX, mouseY, idea1.x, idea1.y);

  if (d < 75) {
    scene = "mind";
    showMindDialogue();


    return;
  }
  }
}

  if (scene === "mind") {

    let d = dist(mouseX, mouseY, idea1.x, idea1.y);

    if (d < 40 && !ideaPlaced) {
      idea1.dragging = true;
      return;
    }

    let headTop = 95 + headOffsetY;
    let headBottom = 199 + headOffsetY;

let head = getHeadLayout();

if (
  mouseX > head.x - head.w / 2 &&
  mouseX < head.x + head.w / 2 &&
  mouseY > head.y + headOffsetY - head.h / 2 &&
  mouseY < head.y + headOffsetY + head.h / 2
) {
  headDragging = true;
  headGrabY = mouseY - headOffsetY;
}
  }
}

function updateLayout() {
  brainX = width * 0.5;
  brainY = height * 0.42;
  brainRadius = min(width, height) * 0.25;
}

function mouseDragged() {
  if (headDragging) {
headOffsetY = constrain(
  mouseY - headGrabY,
  -height * 0.3,
  0
);
  headLifted = headOffsetY <= -height * 0.1;
  }
}

function mouseReleased() {
  headDragging = false;
  idea1.dragging = false;

  let d = dist(idea1.x, idea1.y, brainX, brainY);

if (scene === "mind" && headLifted && d < brainRadius) {
  ideasCollected++;
  ideaPlaced = true;

  idea1.x = brainX;
  idea1.y = brainY;

  returnTime = millis();

  if (ideasCollected === 11) {
    scene = "error";
    showDialogue = false;
  }
}
}


class Idea {
  constructor(){
    this.img = getNextIdeaImage();
    this.x = width * 0.25;
    this.y = height * 0.4;
    this.dragging = false;
  }
  
  move() {
    this.x=this.x+random(-0.5,0.5);
    this.y=this.y+random(-2,2)
    if (this.dragging){
      this.x = mouseX;
      this.y=mouseY;
    
    }
  }
  
  show() {
  imageMode(CENTER);
    //image(idea[i],this.x,this.y,80,80)
  image(this.img, this.x, this.y, 150, 150);
  }
}