import AudioPlayer = g.AudioPlayer;

declare var window: any;

function main(param: g.GameMainParameterObject): void {
    const scene = new g.Scene({game: g.game, assetIds: ["bgm_002_BPM222"]});
    const initialVolume = 1;
    const label = new g.Label({
        scene: scene,
        font: new g.DynamicFont({game: g.game, fontFamily: g.FontFamily.Serif, size: 15}),
        text: `vol: ${initialVolume}`,
        textColor: "black",
        fontSize: 15
    });

    let player: AudioPlayer;

    scene.loaded.add(() => {
        scene.pointDownCapture.add(onPointDown);
        scene.append(label);

        player = g.game.audio.music.createPlayer();
        player.changeVolume(initialVolume);
        player.play(<g.AudioAsset>scene.assets["bgm_002_BPM222"]);
    });
    g.game.pushScene(scene);


    function onPointDown(e: g.PointDownEvent): void {
        if (e.point.x >= g.game.width / 2) {
            player.changeVolume(Math.min(player.volume + 0.1, 1.0));
        } else {
            player.changeVolume(Math.max(0, player.volume - 0.1));
        }

        label.text = `vol: ${player.volume}`;
        label.invalidate();
    }
}

export = main;