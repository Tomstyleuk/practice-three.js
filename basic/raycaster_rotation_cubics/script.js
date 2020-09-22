/* https://www.youtube.com/watch?v=6oFvqLfRnsU&list=WL&index=28 */

// ページの読み込みを待つ
window.addEventListener('load', init);

function init() {

//1. create a Scene
const scene = new THREE.Scene();

//2. create camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
 
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

    camera.updateMatrix();
})

renderer.render(scene, camera);



} //END init