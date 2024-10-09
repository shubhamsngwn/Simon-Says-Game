let started = true;
let h2 = document.querySelector("h2");
let level = 0;
let btns = ["red", "green", "orange", "blue"];
let gameSeq = [];
let userSeq = [];
let highScore = 0;
let body = document.querySelector("body");

document.addEventListener("keypress", function () {
  if (started) {
    started = false;
    levelUp();
  }
});

function levelUp() {
  highScore = Math.max(highScore, level);
  ++level;
  h2.innerText = `Level ${level}\n\nHighest Score: ${highScore}`;
  let randColor = btns[Math.floor(Math.random() * 4)];
  flash(document.querySelector(`.${randColor}`));
  gameSeq.push(randColor);
  console.log(gameSeq);
}

function flash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 200);
}

let allBtns = document.querySelectorAll(".btn");

for (btn of allBtns) {
  btn.addEventListener("click", btnClick);
}

function btnClick() {
  flash(this);

  userSeq.push(this.getAttribute("id"));
  console.log(userSeq);

  getAns(userSeq.length - 1);
}

function getAns(idx) {
  if (gameSeq[idx] === userSeq[idx]) {
    if (idx === gameSeq.length - 1) {
      userSeq = [];
      setTimeout(levelUp, 500);
    }
  } else {
    body.style.backgroundColor = "red";
    setTimeout(function () {
      body.style.backgroundColor = "white";
    }, 150);
    h2.innerText = `Game Over! Press any key to start again\n\nYour score: ${level}\n\nHighest Score: ${highScore}`;
    reset();
  }
}

function reset() {
  started = true;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
