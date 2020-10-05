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
    // const material = new THREE.MeshNormalMaterial({
    //     color: 0x6699ff,
    //     flatShading: true   //球体の上に線を描く
    // });

    ////////////////////////////////////////
    /*----------------- 3.MeshLambertMaterial ランバート・シェーディングと言う、光沢感のないマットな質感を表現できる。陰ができるため奥行き感を表現できる。陰影を必要とするマテリアルなので、ライトが必要 -----------------*/
    // const material = new THREE.MeshLambertMaterial({
    //     color: 0x10b5b5,
    //     emmisive: 0xbc8722, //放射性の光, Emissive (light) color of the material, essentially a solid color unaffected by other lighting. 
    //     wireframe: true
    // });

    // ////////////////////////////////////////
    // /*----------------- 4.MeshPhongMaterial　フォン・シェーディングと言う、光沢感のある質感を表現できるマテリアル -----------------*/
    // const material = new THREE.MeshPhongMaterial({
    //     color: 0x6699ff,
    //     specular: 0xf2000e,
    //     shininess: 10,   //色がついた艶を出す
    //     // flatShading: true
    // });


    ////////////////////////////////////////
    /*----------------- 5.MeshToonMaterial アニメのようなトゥーンシェーディングを実現できるマテリアル -----------------*/
    const material = new THREE.MeshToonMaterial({
        color: 0x6699ff
    });





    //lightning 
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    directionalLight.position.set(1, 1, 1);
  
    /* AmbientLight */
    const light = new THREE.AmbientLight( 0x404040 ); //soft white light
    scene.add(directionalLight);
    scene.add(light);



    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    tick();
    function tick() {
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;

        // rotating the light
        directionalLight.position.set(
        500 * Math.sin(Date.now() / 500),
        500 * Math.sin(Date.now() / 1000),
        500 * Math.cos(Date.now() / 500)
        );

        //rendering
        renderer.render(scene, camera);

        requestAnimationFrame(tick);
    }//ENDE tick
/*-------------------------------------------------------*/
//////////////////////////////////////////////////////////




}   //ENDE init