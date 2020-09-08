/* rotating colourful squares
https://ics.media/tutorial-three/quickstart/ */

window.addEventListener('load', init);

//init() schreibt hier function von three.js
function init() {

    // サイズを指定 Setzt der Größ
    const width = 960;
    const height = 540;


    //1. WebGLのレンダリングをするためのレンダラーを作成. Erstellung Rendere for WebGL Rendering, Geben Sie ein in HTML platziertes Canvas-Element als Argument an
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
    });

    //setPixelRatio（デバイスの解像度） レンダラーのサイズを調整する

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    //2. setSize()メソッドでサイズを設定. Setzen der Größe in der setSize()-Methode
    renderer.setSize(960, 540);

    //3. シーンを作成します。シーンとは3D空間のことで、3Dオブジェクトや光源などの置き場となります。Erstellung eine Szene. Eine Szene ist ein 3D-Raum, der ein Ort für 3D-Objekte und Lichtquellen ist.
    const scene = new THREE.Scene();

    //4. Erstellung Camera. 3Dではどの視点から空間を撮影するか.THREE.PerspectiveCameraクラスのコンストラクターで画角、アスペクト比、描画開始距離、描画終了距離の4つの情報を引数として渡しカメラを作成します。
    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 0, +1000);

    //5.立方体を作る. 立方体はメッシュという表示オブジェクトを使用して作成します。メッシュを作るには、ジオメトリ（形状）とマテリアル（素材）の二種類を用意する必要があります
    //立方体や直方体のような箱状の形状を生成するためのBoxGeometryを使用
    const geometry = new THREE.BoxGeometry(200, 200, 200);
    const material = new THREE.MeshNormalMaterial();

    // Erstellung Mesh(立方体) => new THREE.Mesh(ジオメトリ,マテリアル)
    const box = new THREE.Mesh(geometry, material);

    // add const box(Mesh) into the scene
    scene.add(box);

    //6. Animation => JavaScriptでアニメーションをさせるには、時間経過で関数を呼び続ける必要がある。そのために、requestAnimationFrame()というグローバルメソッドを使用して、requestAnimationFrame()は引数として渡された関数を、毎フレーム実行します。
    tick();
    function tick() {
        
        /*アニメーション処理をここに書く 
        アニメーションの処理として、立方体が回転するようにする。時間経過で回転するようにrotation.yプロパティの数値を加算する。*/
        box.rotation.y += 0.01;
        box.rotation.x += 0.01;
        
        //Three.jsの表示結果を更新する命令を書きます。Three.jsでは自動的に画面が最新に切り替わらないので、明示的に画面が更新されるように命令を書く必要があります。renderer.render()という命令で更新を指示できます。
        renderer.render(scene, camera); //レンダリング
        requestAnimationFrame(tick);
    }

} //ENDE init