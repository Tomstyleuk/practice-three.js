// ページの読み込みを待つ
window.addEventListener("load", init);

function init() {
  // サイズを指定
  const width = 960;
  const height = 540;

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#myCanvas")
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(20, 20, 20);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // 床を作成
  const meshFloor = new THREE.Mesh(
    new THREE.BoxGeometry(2000, 0.1, 2000),
    new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.0 })
  );
  scene.add(meshFloor);

  // オブジェクトを作成
  const meshKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(3, 1, 100, 16),
    new THREE.MeshStandardMaterial({ color: 0xaa0000, roughness: 0.0 })
  );
  meshKnot.position.set(0, 5, 0);
  scene.add(meshKnot);

  // ------------- 環境光源を作成 -------------
  /* 3D空間全体に均等に光を当てます。一律に明るくしたいときに使うといいでしょう。
  陰影や影(cast shadow)ができないので、この光源だけだと立体感を表現することはできません。たいてい他のライトと一緒に利用します。 */
  //const light = new THREE.AmbientLight(0xffffff, 1.0);

  // ------------- 平行光源 -------------
  /*特定の方向に放射される光。光源は無限に離れているものとして、そこから発生する光線はすべて平行になります。わかりやすい利用例としては、太陽の光です。太陽は地球から遠く離れているので、その位置は無限であるとみなすことができます。 */
  //   const light = new THREE.DirectionalLight(0xffffff, 1);

  // ------------- 半球光源 -------------
  /* 上からの光の色と下からの光の色を分けられます。下からの光は反射光として、屋外での光の見え方に近くなります。 */
  //new THREE.HemisphereLight(空の色, 地の色, 光の強さ)
  //const light = new THREE.HemisphereLight(0x888888, 0x0000FF, 1.0);

  // ------------- 点光源 -------------
  /* 単一点からあらゆる方向から放射される光源です。わかりやすい例としては、裸電球です。裸電球は周辺を明るくします。 */
  // new THREE.PointLight(色, 光の強さ, 距離, 光の減衰率)
  //const light = new THREE.PointLight(0xffffff, 2, 80, 2.0);

  // ------------- スポットライト光源 -------------
  /* 単一の点から一方向に放出され、円錐に沿って放出される光源です。わかりやすい例としては懐中電灯や、ステージのスポットライトを想像するといいでしょう。減衰率や光の方向の指定ができるので、指定できるパラメーターも多いです。たくさん配置すれば立体感・臨場感が生まれます。
  new THREE.SpotLight(色, 光の強さ, 距離, 照射角, ボケ具合, 減衰率) */
  const light = new THREE.SpotLight(0xffffff, 4, 90, Math.PI / 4, 10, 0.5);

  // ヘルパーを作成
  const lightHelper = new THREE.SpotLightHelper(light);
  scene.add(lightHelper);
  scene.add(light);

  tick();

  // 毎フレーム時に実行されるループイベントです
  function tick() {
    // レンダリング
    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  }
}
