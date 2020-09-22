//1. create a Scene
const scene = new THREE.Scene();

//2. create camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerWidth, 0.1, 1000);
 
//3. create renderer & set antialias(物体の輪郭がギザギザになることを抑える)
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#e5e5e5");

//4. set a Size
renderer.setSize(window.innerWidth, window.innerHeight);

//5. create a canvas in html
// const canvas = document.getElementById('#canvas')
document.body.appendChild(renderer.domElement);

//6. set responsive a window size
window.addEventListener('reseize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);

    //readjust a camera aspect ratio, カメラのアスペクト比を正す
    camera.aspect = window.innerWidth, window.innerHeight;
    camera.updateProjectMatrix();

})