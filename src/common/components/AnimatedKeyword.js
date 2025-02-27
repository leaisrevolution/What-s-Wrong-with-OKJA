import { useState, useEffect, useRef } from 'react';

// components
import Button from './Button';
import Matter from 'matter-js';

const AnimatedKeyword = ({
  keywordsData,
  questionTitle,
  clickedKeywords,
  onChangeClickedKeywords,
}) => {
  const [keywordBalls, setKeywordBalls] = useState(keywordsData);
  const scene = useRef(null);
  const screenwidth =
    window.innerWidth > 0 ? window.innerWidth : window.screen.width;
  const canvasWidth = screenwidth > 767 ? 870 : 400;
  const canvasHeight = screenwidth > 767 ? 350 : 400;
  useEffect(() => {
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const Runner = Matter.Runner;
    const Composite = Matter.Composite;
    const MouseConstraint = Matter.MouseConstraint;
    const Mouse = Matter.Mouse;
    const Bodies = Matter.Bodies;

    const engine = Engine.create();
    const world = engine.world;
    engine.gravity.y = 0.04;

    const render = Render.create({
      element: scene.current,
      engine: engine,
      options: {
        width: canvasWidth,
        height: canvasHeight,
        wireframes: false,
        background: 'var(-white)',
      },
    });

    Render.run(render);

    const runner = Runner.create();
    Runner.run(runner, engine);

    Composite.add(world, [
      Bodies.rectangle(canvasWidth / 2, 0, canvasWidth, 10, {
        isStatic: true,
        render: { fillStyle: 'var(-white)' },
      }),
      Bodies.rectangle(canvasWidth / 2, canvasHeight, canvasWidth, 10, {
        isStatic: true,
        render: { fillStyle: 'var(-white)' },
      }),
      Bodies.rectangle(canvasWidth, canvasHeight / 2, 10, canvasHeight, {
        isStatic: true,
        render: { fillStyle: 'var(-white)' },
      }),
      Bodies.rectangle(0, canvasHeight / 2, 10, canvasHeight, {
        isStatic: true,
        render: { fillStyle: 'var(-white)' },
      }),
    ]);

    const stack = [];
    for (let i = 0; i < keywordBalls.length; i++) {
      const keywordBall = keywordBalls[i];
      const keywordBallBody = Bodies.circle(
        keywordBall['x'],
        keywordBall['y'],
        keywordBall['radius'],
        {
          restitution: 0.6,
          friction: 0.1,
          label: keywordBall['keyword'],
          render: {
            sprite: {
              texture: keywordBall['img'],
            },
          },
        },
      );
      stack.push(keywordBallBody);
    }

    Composite.add(world, [...stack]);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: true,
        },
      },
    });

    Matter.Events.on(mouseConstraint, 'mousedown', function (event) {
      if (event.source?.body?.id) {
        const bodyId = event.source.body.id;
        const clickedBody = Composite.get(world, bodyId, 'body');
        const clickedBodyRef = keywordBalls[bodyId - 5];
        const bodyLabel = clickedBodyRef['keyword'];
        if (clickedBodyRef['isClicked']) {
          clickedBody.render.sprite.texture = clickedBodyRef['img'];
          Matter.Body.scale(clickedBody, 80 / 100, 80 / 100);
          onChangeClickedKeywords((prevState) => {
            return prevState.filter((ele) => ele !== bodyLabel);
          });
        } else {
          clickedBody.render.sprite.texture = clickedBodyRef['clickedImg'];
          Matter.Body.scale(clickedBody, 100 / 80, 100 / 80);
          onChangeClickedKeywords((prevState) => {
            return [...prevState, bodyLabel];
          });
        }
        let newArr = [...keywordBalls];
        newArr[bodyId - 5] = Object.assign(newArr[bodyId - 5], {
          isClicked: !newArr[bodyId - 5].isClicked,
        });
        setKeywordBalls(newArr);
      }
    });

    Composite.add(world, mouseConstraint);

    render.mouse = mouse;

    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: canvasWidth, y: canvasHeight },
    });

    return {
      engine: engine,
      runner: runner,
      render: render,
      canvas: render.canvas,
      stop: function () {
        Matter.Render.stop(render);
        Matter.Runner.stop(runner);
      },
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div ref={scene} style={{ width: '100%', height: '100%' }} />
      <span style={{ color: 'var(--blackcream)', margin: '60px 0 0 0' }}>
        {questionTitle}
      </span>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          margin: '10px 0 0 0',
          color: 'var(--blackcream)',
          flexWrap: 'wrap',
        }}
        onClick={() => {
          // console.log(keywordBalls);
        }}
      >
        {clickedKeywords.map((clickedKeyword) => {
          if (clickedKeyword !== '빈공') {
            return (
              <Button
                height="23px"
                bg="var(--darkcream)"
                color="var(--white)"
                radius="10px"
                margin="5px 5px 0 0"
              >
                {clickedKeyword}
              </Button>
            );
          }
        })}
      </div>
    </div>
  );
};

export default AnimatedKeyword;
