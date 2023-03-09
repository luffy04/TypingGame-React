import React, { useEffect, useRef } from "react";
import Player from "./Player.js";
import BulletController from "./BulletController.js";

const Canvas = (props) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationFrameId;

    canvas.width = window.screen.width;
    canvas.height = window.screen.height;

    const render = () => {
      gameLoop(canvas, ctx);

      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  function gameLoop(canvas, ctx) {
    setCommonStyle(ctx);
    ctx.fillStyle = "transparent";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const image = new Image();
    image.src = "./background.webp";
    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
    // ctx.drawImage(image, 0, 0);

    // const bulletController = new BulletController(canvas);
    // const player = new Player(
    //   canvas.width / 10,
    //   canvas.height / 2,
    //   10,
    //   bulletController
    // );

    // const bulletCtx = canvas.getContext("2d");
    // bulletController.draw(bulletCtx);

    // if (bulletController.collideWith(player)) {
    //   if (player.health <= 0) {
    //     alert("Game Over");
    //     player.stop();
    //   }
    // } else {
    //   player.draw(ctx);
    // }
  }

  function setCommonStyle(ctx) {
    ctx.shadowColor = "#d53";
    ctx.shadowBlur = 20;
    ctx.lineJoin = "bevel";
    ctx.lineWidth = 5;
  }

  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
