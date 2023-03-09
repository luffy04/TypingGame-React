import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [health, setHealth] = useState(100);

  const [bullets, setBullets] = useState([
    {
      speed: 3,
      right: 0,
      character: "A",
      damage: 10,
    },
  ]);
  const playerRef = useRef();
  const bulletRef = useRef();
  const gunRef = useRef();

  useEffect(() => {
    setInterval(gameLoop, 1000 / 60);
  }, []);

  useEffect(() => {
    console.log(health);
  }, [health]);

  const getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const keyUp = (e) => {
    const code = e.code;

    const key = code.charAt(code.length - 1);

    const Bullet = bullets;

    if (key == Bullet[0].character) {
      const newBullet = generateNewBullet();
      Bullet[0].right = newBullet.right;
      Bullet[0].character = newBullet.character;
      Bullet[0].speed = newBullet.speed;
      Bullet[0].damage = newBullet.damage;

      setBullets(Bullet);
    }
  };

  document.addEventListener("keyup", keyUp);

  const generateNewBullet = () => {
    const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const random = getRndInteger(0, 25);
    const bullet = {
      speed: 1,
      right: window.innerWidth - gunRef.current.offsetLeft,
      character: char.charAt(random),
      damage: 10,
    };

    return bullet;
  };

  const gameLoop = () => {
    const bulletsArr = bullets.map((bullet, index) => {
      const rightPosition = bullet.right + bullet.speed;
      bullet["right"] = rightPosition;

      const playerPosition = playerRef.current.offsetLeft;
      const playerWidth = playerRef.current.offsetWidth;
      const bulletPosition = bulletRef.current.offsetLeft;

      if (playerPosition + playerWidth >= bulletPosition) {
        const playerHealth = health - bullet.damage;
        console.log(playerHealth);
        setHealth(playerHealth);

        const newBullet = generateNewBullet();
        bullet.right = newBullet.right;
        bullet.character = newBullet.character;
        bullet.speed = newBullet.speed;
        bullet.damage = newBullet.damage;
        return bullet;
      }

      return bullet;
    });

    setBullets(bulletsArr);
  };

  return (
    <div>
      <img src={require("./background.webp")} />
      <h1>Typing Game</h1>
      <progress id="health" value={health} />

      <div className="player" ref={playerRef}>
        <img src={require("./character.png")} />
      </div>
      <div className="gun" ref={gunRef}>
        <img src={require("./tank.png")} />
      </div>

      {bullets.map((bullet, index) => {
        return (
          <span
            key={index}
            className="bullet"
            ref={bulletRef}
            style={{ right: bullet.right + "px" }}
          >
            <span className="bullet-triangle"></span>
            <span className="bullet-body">{bullet.character}</span>
          </span>
        );
      })}
    </div>
  );
}

export default App;
