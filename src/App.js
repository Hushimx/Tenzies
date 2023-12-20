import React from "react";
import Btn from "./button";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import "./style.css";

let numArrays = Array.from({ length: 8 }, () => {
  return { num: Math.floor(randomize(10)), isActive: 0 };
});
function randomize(num) {
  return Math.random() * (num + 1);
}
export default function App() {
  const [win, setWin] = React.useState(0);
  const [nums, setNums] = React.useState(numArrays);
  const { width, height } = useWindowSize();
  React.useEffect(() => {
    let winn = 1;
    for (let i = 1; i < nums.length; i++) {
      if (nums[0].num != nums[i].num) {
        winn = 0;
        break;
      }
    }
    if (winn) {
      setWin(1);
    }
  }, [nums]);

  function roll() {
    if (win) {
      let newArr = Array.from({ length: 8 }, () => {
        return { num: Math.floor(randomize(10)), isActive: 0 };
      });

      setNums(newArr);
      setWin(0);
    } else {
      setNums((prev) => {
        let newArr = prev.map((ele) => {
          return ele.isActive
            ? ele
            : { ...ele, num: Math.floor(randomize(10)) };
        });
        return newArr;
      });
    }
  }
  function btnClick(index) {
    setNums((prev) => {
      return prev.map((ele, mapIndex) => {
        return mapIndex == index ? { ...ele, isActive: !ele.isActive } : ele;
      });
    });
  }

  return (
    <>
      {win && <Confetti width={width} height={height} />}
      <div className="Box">
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="buttons">
          {nums.map((ele, index) => {
            return (
              <Btn
                ele={ele}
                btnClick={() => {
                  btnClick(index);
                }}
                key={index}
                number={ele.num}
              />
            );
          })}
        </div>
        <button onClick={roll}>{win ? "Play Again" : "Roll"}</button>
      </div>
    </>
  );
}
