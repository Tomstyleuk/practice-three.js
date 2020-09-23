/* https://www.youtube.com/watch?v=6oFvqLfRnsU&list=WL&index=28 */

// ページの読み込みを待つ
window.addEventListener('load', init);

function init() {

//1. create a Scene
const scene = new THREE.Scene();

//2. create camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

//3. create renderer & set antialias(物体の輪郭がギザギザになることを抑える)
//canvasを使用して、html内のid:myCanvasに出力する宣言
// const renderer = new THREE.WebGLRenderer({
// canvas: document.querySelector('#myCanvas')
// });

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#e5e5e5");

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

//7.create a box geometry             (x, y, z)
const geometry = new THREE.BoxGeometry(1, 1, 1);

//8.create a mesh Material
const material = new THREE.MeshLambertMaterial({color: 0xFFCC00});

//9. combine into mash annd then mesh add into scene
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);



//10.
// mesh.position.set(2, 2, -2)
// mesh.rotation.set(45,0,0);
// mesh.scale.set(1,2,1)


//9. light
const light = new THREE.PointLight(0xFFFFFF, 1, 500);
light.position.set(10, 0, 25);
scene.add(light);

const render = function() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);

    //回転する
    // mesh.rotation.x += 0.01; // 縦に動く
    // mesh.rotation.y += 0.01; // 横に動く
    // mesh.scale.x += 0.01;
}

render();

//TimelineMax => TweenMax method
this.tl = new TimelineMax().delay(.3);
this.tl.to(mesh.scale, 1, {x: 2, ease: Expo.easeOut});
this.tl.to(mesh.scale, .5, {x: .5, ease: Expo.easeOut});
this.tl.to(mesh.position, .5, {x: 2, ease: Expo.easeOut});
this.tl.to(mesh.rotation, .5, {y: Math.PI* 2.5, ease: Expo.easeOut}, "=-1.5"); //回転数



} //END init