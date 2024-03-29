import React, { useState, useEffect } from "react";
import Wrongletters from "./Word/Wrongletters/Wrongletters";
import Word from "./Word/Word";
import Notification from "../../../helpers/Notification/Notification";
import Popup from "../../../helpers/Popup/Popup";
import Hearts from "./Heart";
import axios from "axios";
import "./Playground.css";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../../utils/Hooks/context";
import { socket } from "../../../socket";
import { __GAME_DATA_URI__ } from "../../../utils/constants";

// const words = ["fanna", "ramleela", "vikramvedha", "singam", "raazi"]; // to be fetched from db

const Playground = (props) => {
  const { roomID } = useParams();
  const { auth, roomDetails, setRoomDetails } = useGlobalContext();

  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [time, setTime] = useState(60);
  const [arrowPosition, setArrowPosition] = useState(0);
  const [lives, setLives] = useState(9);
  const [storedTime, setStoredTime] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    axios
      .get(__GAME_DATA_URI__ + "/" + roomID, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then((res) => {
        // setRoomDetails(res.data.roomDetails);
        // setGameState(res.data.roomDetails);
        // socket.emit("start", roomID);
      })
      .catch((err) => console.log(err.message));

    // Listen for game state updates
    // socket.on("start", (movie) => {
    //   set
    // });
  }, []);

  useEffect(() => {
    const handleKeydown = (event) => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();

        if (props.movie.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            setShowNotification(true);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters((wrongLetters) => [...wrongLetters, letter]);
            setLives((prevLives) => prevLives - 1);
          } else {
            setShowNotification(true);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  useEffect(() => {
    if (time === 30 && !showPopup) {
      // setShowPopup(true);
    }

    if (time === 0) {
      setLives(0);
      setPlayable(false);
      setGameOver(true);
    }
  }, [time, showPopup, correctLetters, props.movie.length]);

  useEffect(() => {
    let interval = null;
    if (playable) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
        setArrowPosition((prevPosition) => prevPosition + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [playable]);

  function playAgain() {
    setPlayable(true);
    setCorrectLetters([]);
    setWrongLetters([]);
    setLives(9);
    setTime(60);
    setGameOver(false);

    socket.emit("start", roomID);
    // const random = Math.floor(Math.random() * words.length);
    // props.movie = words[random];
  }

  return (
    <>
      <div className="game-container">
        <div className="hearts-slider-container">
          <div className="slider-container">
            <div
              className="slider-arrow"
              style={{ left: `${arrowPosition}%` }}
            />
            <input
              type="range"
              min="0"
              max="60"
              value={time}
              className="slider"
              readOnly
            />
            {time}
          </div>
          <div className="hearts-container">
            <Hearts lives={lives} />
          </div>
        </div>
        <Word selectedWord={props.movie} correctLetters={correctLetters} />
        <Wrongletters wrongLetters={wrongLetters} />
      </div>
      <Popup
        setStoredTime={setStoredTime}
        isCreator={props.isCreator}
        correctLetters={correctLetters}
        lives={lives}
        time
        selectedWord={props.movie}
        playAgain={playAgain}
      />
      {showNotification && (
        <Notification
          showNotification={showNotification}
          setShowNotification={setShowNotification}
        />
      )}
    </>
  );
};

export default Playground;
