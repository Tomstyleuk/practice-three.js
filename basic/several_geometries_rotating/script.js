/* https://ics.media/tutorial-three/geometry_general/ */

// Loading the page
window.addEventListener('load', init);

function init() {
    // 1. set a size
    const width = 960;
    const height = 540;

    //2. create a renderer and accsses to the canvas in html
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
    });
    renderer.setSize(width, height);

    //3.creat a scene
    const scene = new THREE.Scene();

    //4. create a camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.set(0, 500, +1000);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    //5. create a container
    const container = new THREE.Object3D();
    scene.add(container); // add container into scene

    //6. create a material 
    const material = new THREE.MeshStandardMaterial({
        color: 0xff0000,
        side: THREE.DoubleSide  //add shadow on front and back side
    });

    //7. set a directional light 
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    //7.環境光を作成
    const ambientLight = new THREE.AmbientLight(0x999999);
    scene.add(ambientLight);

    //8.create an array for geometries
    const geometryList = [
        new THREE.SphereGeometry(50),  // 球体
        new THREE.BoxGeometry(100, 100, 100),      // 直方体 
        new THREE.PlaneGeometry(200, 200),    // 平面
        new THREE.TetrahedronGeometry(100, 0),  // カプセル形状
        new THREE.ConeGeometry(100, 100, 32),     // 三角錐
        new THREE.CylinderGeometry(50, 50, 100, 32), // 円柱
        new THREE.TorusGeometry(50, 30, 16, 100)     // ドーナツ形状
    ];
    geometryList.map(( geometry, index ) => {
        const mesh = new THREE.Mesh(geometry, material);

        //3D表示インスタンスのsceneプロパティーが3D表示空間となります
        container.add(mesh);

        // 円周上に配置
        mesh.position.x = 400 * Math.sin(( index / geometryList.length ) * Math.PI *2);

        mesh.position.z = 400 * Math.cos(( index / geometryList.length ) * Math.PI *2);
    });

    tick();

    //loop event
    function tick() {
        //rotate the container
        // container.rotation.x += 0.01;
        container.rotation.y += 0.01;

        //renderer
        renderer.render(scene, camera);

        requestAnimationFrame(tick);
    }

}   //ENDE init