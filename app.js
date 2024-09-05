const answer = "APPLE";

let index = 0;
let attempts = 0;
let timer;

function appStart() {
  const displayGameover = (str) => {
    const div = document.querySelector(".result");
    console.log(str);
    if (str === "fail") {
      div.innerText = "게임이 종료되었습니다. 실패!";
      div.style =
        "display:flex; justify-content:center; align-items:center; position:absolute; top:32vh; left:31vw; background-color:white; width:200px; height:100px; animation: gameResult 2s infinite;";
    } else if (str === "success") {
      div.innerText = "정답을 맞췄습니다!";
      div.style =
        "display:flex; justify-content:center; align-items:center; position:absolute; top:32vh; left:31vw; background-color:white; width:200px; height:100px; animation: gameResult 2s;";
    }
  };

  const handleBackspaceKey = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }

    if (index !== 0) {
      index -= 1;
    }
  };
  const nextLine = () => {
    if (attempts === 6) {
      return gameover("fail");
    }
    attempts += 1;
    index = 0;
  };

  const gameover = (str) => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover(str);
    clearInterval(timer);
  };

  const handleEnterKey = () => {
    let correct = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );

      const inputChar = block.innerText;
      const answerChar = answer[i];
      const selectKey = document.querySelector(`[data-key='${inputChar}']`);

      if (inputChar === answerChar) {
        block.style.background = "#6AA964";
        selectKey.style.background = "#6AA964";
        correct += 1;
      } else if (answer.includes(inputChar)) {
        block.style.background = "#B49F3A";
        selectKey.style.background = "#B49F3A";
      } else {
        block.style.background = "#3A3A3C";
        selectKey.style.background = "#3A3A3C";
      }
      block.style.color = "white";
    }
    if (correct === 5) {
      gameover("success");
    } else {
      nextLine();
    }
  };

  const handleClick = (event) => {
    const clickClass = event.target.className;
    const clickKey = event.target.dataset.key;

    if (clickClass === "keyboard-block") {
      const thisBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index}']`
      );
      thisBlock.innerText = clickKey;
      index += 1;
    } else if (clickClass === "enter") {
      if (index === 5) {
        handleEnterKey();
      } else {
        return;
      }
    } else if (clickClass === "back") {
      handleBackspaceKey();
    }
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (key === "BACKSPACE") {
      handleBackspaceKey();
    } else if (index === 5) {
      if (key === "ENTER") {
        handleEnterKey();
      } else {
        return;
      }
    } else if (keyCode >= 65 && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };
  const startTimer = () => {
    const startTime = new Date();
    function setTime() {
      const now_time = new Date();
      const time = new Date(now_time - startTime);

      const min = time.getMinutes().toString();
      const sec = time.getSeconds().toString();

      //추가한 코드
      const year = now_time.getFullYear();
      const month = now_time.getMonth();
      const date = now_time.getDate();

      const timeH1 = document.querySelector(".time");
      timeH1.innerText = `${year}년 ${month}월 ${date}일 Time : ${min.padStart(
        2,
        "0"
      )} : ${sec.padStart(2, "0")}`;
    }

    timer = setInterval(setTime, 1000);
  };

  startTimer();

  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("click", handleClick);
}

appStart();
