import {Application, SCALE_MODES, Sprite, Spritesheet, Text} from 'pixi.js-legacy';
import {Assets} from "@pixi/assets";

async function create(canvas) {
    const app = new Application({ forceCanvas: canvas, resolution: 1 });
    (app.view.style as any) = "margin: 0 5px";
    document.body.appendChild(app.view as any);
    (window as any).app = app;

    const title = new Text(canvas ? "Canvas" : "WebGL", { fill: "#fff", fontSize: "18px" });
    title.position.set(10, 30);
    app.stage.addChild(title);

    // @ts-ignore
    const atlasJson = await import("./assets/atlas-bar/atlas-bar-24.png.json");
    // @ts-ignore
    const atlasSrc = await import("./assets/atlas-bar/atlas-bar-24.png");
    const atlasImg = await Assets.load(atlasSrc.default);
    atlasImg.scaleMode = SCALE_MODES.NEAREST;

    const spritesheet = new Spritesheet(atlasImg, atlasJson.default);
    await spritesheet.parse();

    const tex = spritesheet.textures['loading/images/loading-bar.png'];
    const sprite = new Sprite(tex);

    sprite.anchor.set(0, 0); // default, but here for demonstration
    sprite.position.set(200, 2);

    for (let i = 0; i < 8; i++) {
        const txt = new Text(`${i * 100}`, { fill: "#fff", fontSize: "16px" });
        txt.position.set(i * 100, 10);
        app.stage.addChild(txt);
    }

    let time = 0;
    app.ticker.add(dt => {
        sprite.width = (1 + Math.sin(time / 20)) * 100;

        time += dt;
    });

    app.stage.addChild(sprite);
}

create(true);
create(false);
