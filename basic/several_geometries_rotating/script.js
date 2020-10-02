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
    renderer.setClearColor("#e5e5e5");  //set background-color

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
        // color: 0xff0000, //red
        color: 0xF7F7F7,    //light grey
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
        new THREE.IcosahedronBufferGeometry(100, 50),
        new THREE.SphereGeometry(50),              // 球体
        new THREE.BoxGeometry(100, 100, 100),      // 直方体 
        new THREE.PlaneGeometry(200, 200),         // 平面
        new THREE.TetrahedronGeometry(100, 0),     // カプセル形状
        new THREE.ConeGeometry(100, 100, 32),      // 三角錐
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

    //set responsive a window size
    window.addEventListener('resize', () => {
        renderer.setSize(width, height);

        //readjust a camera aspect ratio, カメラのアスペクト比を正す
        camera.aspect = width / height;

        camera.updateProjectionMatrix();
    })

    /* raycaster => 画面をタッチした時に、画面上である点をタッチした時に、その点と重なったオブジェクトは全てにタッチされたことになる
    プログラミングでは、RaycasterはEventSystemやCanvasと併用され、ユーザーが画面をタッチすると、
    Canvasオブジェクト上にある全てのオブジェクトに対して、透明な線がどのオブジェクトに当たったのかを判定する */
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onMouseMove(event) {
        event.preventDefault();
    
        mouse.x = ( event.clientX / width ) * 2 - 1;
        mouse.y = - ( event.clientY / height ) * 2 + 1;
    
        raycaster.setFromCamera(mouse, camera);
    
        // when you hover cubics, they are moving 
        const intersects = raycaster.intersectObjects(scene.children, true);
        for (let i = 0; i < intersects.length; i++) {
            //when mousemove => randomly cubic's color is changing 
            const r = Math.round(Math.random() * 255);
            const g = Math.round(Math.random() * 255);
            const b = Math.round(Math.random() * 255);
            intersects[i].object.material.color.set(`rgb(${r},${g},${b})`); 
    
            //TimelineMax => TweenMax method
            this.tl = new TimelineMax().delay(.3);   //cube rotation
            //this.tl = new TimelineMax({paused: true}); //not rotation
            this.tl.to(intersects[i].object.scale, 1, {x: 2, ease: Expo.easeOut});
            this.tl.to(intersects[i].object.scale, .5, {x: .5, ease: Expo.easeOut});
            this.tl.to(intersects[i].object.position, .5, {x: 2, ease: Expo.easeOut});
            this.tl.to(intersects[i].object.rotation, .5, {y: Math.PI* 0.5, ease: Expo.easeOut}, "=-1.5"); //回転数
        }
    }   // ENDE onMouseMove

    window.addEventListener('mousemove', onMouseMove);

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