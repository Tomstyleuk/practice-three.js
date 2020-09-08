/* https://ics.media/tutorial-three/material_basic/
    画像をマテリアルに使用する方法

    おそらく一番使用頻度が高いと思われれるのが、画像を使ったマテリアルです。画像はGPUの制約から、2の累乗の高さ・幅である画像のみが利用できます。
*/

// ページの読み込みを待つ
window.addEventListener('load', init);

// サイズを指定
const width = 960;
const height = 540;

function init() {
  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#canvas2')
  });
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  camera.position.set(0, 0, +1000);

  // 球体を作成
  const geometry = new THREE.SphereGeometry(300, 30, 30);
  // 画像を読み込む
  const loader = new THREE.TextureLoader();
  const texture = loader.load('imgs/earthmap1k.jpg');
  // マテリアルにテクスチャーを設定
  const material = new THREE.MeshStandardMaterial({
    map: texture
  });
  // メッシュを作成
  const mesh = new THREE.Mesh(geometry, material);
  // 3D空間にメッシュを追加
  scene.add(mesh);

  // 平行光源
  const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
  directionalLight.position.set(1, 1, 1);
  // シーンに追加
  scene.add(directionalLight);

  tick();

  // 毎フレーム時に実行されるループイベントです
  function tick() {
    // メッシュを回転させる
    mesh.rotation.y += 0.01;
    // レンダリング
    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  }


}// ENDE init