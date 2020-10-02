/* https://ics.media/tutorial-three/camera_position/ 
スライダーによって、カメラの位置と角度を制御できるようにしている
「Camera Position」(座標)のXYZのそれぞれのスライダーを変更すると、
カメラの位置が移動し地球の見え方が変わる。
Camera LookAtのトグルを解除すると、自由にカメラの角度を変更できる　*/

//////////// 1.地球を中心としてカメラを回転させる /////////////
/* 地球を中心としてカメラが円周上を自動的に移動する、カメラの位置の設定はcameraオブジェクトのpositionプロパティーに数値を代入する */

// waiting for a page loading 
window.addEventListener('load', init);

function init() {

    //1. set a size
    const width = 1000;
    const height = 600;
    let rot = 0;

    //2. create a renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
    });
    renderer.setSize(width, height);

    //3. create a scene
    const scene = new THREE.Scene();
    //4. create a camera
    const camera = new THREE.PerspectiveCamera(45, width / height);

    //5. create a directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1);

    const light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add(directionalLight);
    scene.add(light);

    //6. create a material
    const material = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load('img/earthmap1k.jpg'),
        side: THREE.DoubleSide
    });

    //7. create a geometry 
    const geometry = new THREE.SphereGeometry(300, 30, 30);
    
    //8. create a mesh
    const earthMesh = new THREE.Mesh(geometry, material);
    scene.add(earthMesh);

    //9. create a stars
    createStarField();
    
    function createStarField() {
        // 形状データを作成
        const geometry = new THREE.Geometry();
        for (let i = 0; i < 1000; i++) {
            geometry.vertices.push(
                new THREE.Vector3(
                    3000 * (Math.random() - 0.5),
                    3000 * (Math.random() - 0.5),
                    3000 * (Math.random() - 0.5)
                )
            );
        }
        //  create a material 
        const material = new THREE.PointsMaterial({
            size: 10,
            color: 0xffffff
        });

        // create a mesh
        const mesh = new THREE.Points(geometry, material);
        scene.add(mesh);
    }   //ENDE createStarField

    tick();
    function tick() {
        // 毎フレーム角度を0.5度ずつ足していく
        rot += 1.0;

        // ラジアンに変換する
        const radian = (rot * Math.PI) / 180;

        // 角度に応じてカメラの位置を設定, カメラの位置の設定はcameraオブジェクトのpositionプロパティーに数値を代入する
        //動きの演出については、フレーム毎に衛星の配置角度を0.5度ずつ加算し、それをカメラの座標に変換しています。カメラの座標は三角関数（sinとcos）を使って、角度から求めています。1000という値は円の半径

        // view.camera.x = 円周の半径 * Math.sin(角度 * Math.PI / 180);
        // view.camera.z = 円周の半径 * Math.cos(角度 * Math.PI / 180);

        camera.position.x = 1000 * Math.sin(radian);
        // camera.position.y = 1000 * Math.cos(radian);
        camera.position.z = 1000 * Math.cos(radian);

        // 原点方向を見つめる
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        //rendere
        renderer.render(scene, camera);

        requestAnimationFrame(tick);
    } //ENDE function tick()

}   //ENDE init