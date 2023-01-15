import { useEffect, useState, useRef } from "react";
import {
  Engine,
  World,
  Bodies,
  Composite,
  Render,
  Mouse,
  Runner,
  MouseConstraint,
} from "matter-js";
import "./App.css";

function App() {
  const app_div = useRef(null);
  useEffect(() => {
    // create an engine
    var engine = Engine.create();

    // create a renderer
    var render = Render.create({
      element: app_div.current,
      engine: engine,
    });

    // create two boxes and a ground

    var boxA = Bodies.rectangle(400, 200, 80, 80);
    var boxB = Bodies.rectangle(450, 50, 80, 80);
    var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

    const mouse = Mouse.create(render.canvas);
    const mouseContraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { render: { visible: false } },
    });
    // add all of the bodies to the world
    Composite.add(engine.world, [boxA, boxB, ground,mouseContraint]);

    // run the renderer
    Render.run(render);

    // create runner
    var runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);
    Runner.run(runner, engine);
  }, []);
  return <div id="hi" className="App" ref={app_div}></div>;
}

export default App;
