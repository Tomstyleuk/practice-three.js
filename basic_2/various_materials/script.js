/* https://ics.media/tutorial-three/material_variation/ 
///3Dの見栄えを決定する様々なマテリアルについて
*/

window.addEventListener('load', init);
function init() {

    const width = window.innerWidth;
    const height = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas'),
        antialias: true
    });
    //devicePixelRatio => 解像度の補正をする。CSS上の1pxが物理ピクセルいくつで表示されているかという値
    renderer.setPixelRatio(window.devicePixelRatio); 
    renderer.setSize(width, height);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 0, +1000);

    const geometry = new THREE.TorusGeometry(200, 100, 64, 100); //ドーナツ型の形状

    /*----------------- 1.MeshBasicMaterial 陰がつかないので均一な塗りつぶした状態 -----------------*/
    // const material = new THREE.MeshBasicMaterial({
    //     color: 0x6699ff,
    //     skinning: true,
    //     wireframe: true,
    //     vertrexColors: true
    // });
    
    ////////////////////////////////////////
    /*----------------- 2.MeshNormalMaterial ノーマルのカラーをRGBで可視化するマテリアル -----------------*/
    const material = new THREE.MeshNormalMaterial({
        color: 0x6699ff,
        flatShading: true   //球体の上に線を描く
    });


    ////////////////////////////////////////
    /*----------------- 3.MeshLambertMaterial ノーマルのカラーをRGBで可視化するマテリアル -----------------*/






    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    tick();
    function tick() {
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;

        //rendering
        renderer.render(scene, camera);

        requestAnimationFrame(tick);
    }//ENDE tick
/*-------------------------------------------------------*/
//////////////////////////////////////////////////////////




}   //ENDE init