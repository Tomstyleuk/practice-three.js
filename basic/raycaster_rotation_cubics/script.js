/* https://www.youtube.com/watch?v=6oFvqLfRnsU&list=WL&index=28 */

// ページの読み込みを待つ
window.addEventListener('load', init);

function init() {

//1. create a Scene
const scene = new THREE.Scene();

//2. create camera
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

//canvasを使用して、html内のid:myCanvasに出力する宣言
// const renderer = new THREE.WebGLRenderer({
    // canvas: document.querySelector('#myCanvas')
    // });
    
//3. create renderer & set antialias(物体の輪郭がギザギザになることを抑える)
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#e5e5e5");  //set background-color

//4. set a Size
renderer.setSize(window.innerWidth, window.innerHeight);

//5. create a canvas in body
document.body.appendChild(renderer.domElement);

//6. set responsive a window size
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);

    //readjust a camera aspect ratio, カメラのアスペクト比を正す
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
})

/*raycaster => 画面をタッチした時に、画面上である点をタッチした時に、その点と重なったオブジェクトは全てにタッチされたことになる
　プログラミングでは、RaycasterはEventSystemやCanvasと併用され、ユーザーが画面をタッチすると、
 Canvasオブジェクト上にある全てのオブジェクトに対して、透明な線がどのオブジェクトに当たったのかを判定する */
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();


//7.create a box geometry             (x, y, z)
const geometry = new THREE.BoxGeometry(1, 1, 1);

//8.create a mesh Material
const material = new THREE.MeshLambertMaterial({color: 0xF7F7F7});

//9. combine into mash annd then mesh add into scene
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/*------------ add one more mesh ------------*/
// const geometry2 = new THREE.BoxGeometry(1, 1, 1);
// const material2 = new THREE.MeshLambertMaterial({color: 0xFFCC00});
// const mesh2= new THREE.Mesh(geometry2, material2);
// mesh.position.y = 2;
// scene.add(mesh2);


/*------------ add more cubes  ------------ */
// const meshX = -10;
for(let meshX = 0; meshX < 15; meshX++) {

    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (Math.random() - 0.5) * 10;
    mesh.position.y = (Math.random() - 0.5) * -15;
    mesh.position.z = (Math.random() - 0.5) * -5;
    scene.add(mesh);
    meshX + 1;
}


//10.
// mesh.position.set(2, 2, -2)
// mesh.rotation.set(45,0,0);
// mesh.scale.set(1,2,1)


//9. light
const light = new THREE.PointLight(0xFFFFFF, 1, 1000);
light.position.set(0,0,0);
scene.add(light);

//9. add another light
const light2 = new THREE.PointLight(0xFFFFFF, 2, 1000);
light2.position.set(0, 0, 25);
scene.add(light2);

//loop Event
const render = function() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);

    // rotate the cubes, 回転する
    // mesh.rotation.x += 0.01; // 縦に動く
    // mesh.rotation.y += 0.01; // 横に動く
    // mesh.scale.x += 0.01;
}

// Event onMouseMove
function onMouseMove(event) {
    event.preventDefault();

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    // when you hover the mouse, cubics are moving 
    const intersects = raycaster.intersectObjects(scene.children, true);
    for (let i = 0; i < intersects.length; i++) {

        //when mousemove => randomly cubic's color is changing 
        const r = Math.round(Math.random() * 255);
        const g = Math.round(Math.random() * 255);
        const b = Math.round(Math.random() * 255);
        intersects[i].object.material.color.set(`rgb(${r},${g},${b})`); 
        //intersects[i].object.material.color.set(0xff0000);

        //TimelineMax => TweenMax method
        this.tl = new TimelineMax().delay(.3);   //cube rotation
        //this.tl = new TimelineMax({paused: true}); //not rotation
        this.tl.to(intersects[i].object.scale, 1, {x: 2, ease: Expo.easeOut});
        this.tl.to(intersects[i].object.scale, .5, {x: .5, ease: Expo.easeOut});
        this.tl.to(intersects[i].object.position, .5, {x: 2, ease: Expo.easeOut});
        this.tl.to(intersects[i].object.position, .15, {y: 2, ease: Expo.easeOut}); //これを追加したら、hover後は全部一箇所に集まり重なる
        this.tl.to(intersects[i].object.position, .95, {z: 2, ease: Expo.easeOut}); //これを追加したら、hover後は全部一箇所に集まり重なる
        this.tl.to(intersects[i].object.rotation, .5, {y: Math.PI* 1.5, ease: Expo.easeOut}, "=-1.5"); //回転数
    }
}   // ENDE onMouseMove


render();

/* click event. when you click elements in body, they rotate */
// document.body.addEventListener('click', () => {
//     this.tl.play(); 
// })

window.addEventListener('mousemove', onMouseMove);



} //END init
