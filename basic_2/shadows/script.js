window.addEventListener('load', init);

function init() {
    //1. size
    const width = 1000;
    const height = 600;

    //2. create a renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    //3. renderer shadow true
    renderer.shadowMap.enabled = true;

    //4. create a scene
    const scene = new THREE.Scene();

    //5. creare a camera
    const camera = new THREE.PerspectiveCamera(50, width / height);
    camera.position.set(20, 20, 20);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    //6. create a floor 
    const meshFloor = new THREE.Mesh(
        new THREE.BoxGeometry(2000, 0.1, 2000),
        new THREE.MeshStandardMaterial({ color:0x808080, roughness: 0.0 })
    );

    //影をつけたいメッシュに対して、receiveShadowプロパティーを有効にします。
    //7. receive a shadow and add it into  a scene
    meshFloor.receiveShadow = true;
    scene.add(meshFloor);

    //8. create a object
    const meshKnot = new THREE.Mesh(
        new THREE.TorusKnotGeometry(3, 1, 100, 16),
        new THREE.MeshStandardMaterial({ color: 0xaaa000, roughness: 0.0 })
    );
    meshKnot.position.set(0, 5, 0);

    //9. drop the shadow 影を落とすメッシュに対して、castShadowプロパティーを有効にする　
    meshKnot.castShadow = true;
    scene.add(meshKnot);

    //10. create a light 
    //// new THREE.SpotLight(色, 光の強さ, 距離, 照射角, ボケ具合, 減衰率)
    // const light = new THREE.SpotLight(0xffffff, 2, 100, Math.PI / 4, 1);
    const light = new THREE.PointLight(0xffffff, 2, 100, Math.PI / 4, 1);
    
    //11. lightn shadow true 
    /* 影の解像度はデフォルトだと低く設定されているため（デフォルトは512）影が汚くみえることがある。その場合は、光源のshadow.mapSize.widthとshadow.mapSize.heightプロパティーの大きさを調整し、これは2の累乗の値を使う */
    light.castShadow = true;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    scene.add(light);

    tick();

    //12. event 
    function tick() {
        renderer.render(scene, camera);

        //update a light position
        const t = Date.now() / 500;
        const r = 20.0;
        const lx = r * Math.cos(t);
        const lz = r * Math.sin(t);
        const ly = 20.0 + 5.0 * Math.sin(t / 3.0);
        light.position.set(lx, lz, ly);

        requestAnimationFrame(tick);
    }

} // Ende init