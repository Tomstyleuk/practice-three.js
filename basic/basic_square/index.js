/*Spinning blue square */
window.addEventListener("DOMContentLoaded", init);

// function init() => ここに処理を追加していきます
function init() {
  const width = 960;
  const height = 540;

  /* 1. WebGLのレンダリングをするためのレンダラーを作成します。引数にはHTMLコード上に記載したcanvas要素の参照を渡します。*/
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#myCanvas")
  });
  /* デフォルトではレンダラーのサイズが小さいため、setSize()メソッドでサイズを設定します。 */
  renderer.setSize(width, height);
  /*スマホでも綺麗に見えるように、デバイスピクセル比も設定しておきましょう。これを設定しないとスマホだとぼやけて表示されます。*/
  renderer.setPixelRatio(window.devicePixelRatio);

  /* 2.シーン(3D空間)を作成します。シーンはオブジェクトや光源などの置き場です。 */
  const scene = new THREE.Scene();

  /* 3. カメラを作成. THREE.PerspectiveCameraに画角、アスペクト比、描画開始距離、描画終了距離の4つの情報を引数として渡しカメラを作成します。
    new THREE.PerspectiveCamera(画角, アスペクト比, 描画開始距離, 描画終了距離) */
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  camera.position.set(0, 0, +1000);

  /* 4. 立方体を作る. 立方体はメッシュという表示オブジェクトを使用して作成します。メッシュを作るには、ジオメトリ（形状）とマテリアル（素材）を用意する必要があります。ジオメトリは頂点情報や面情報を持っています。Three.jsにはさまざまなジオメトリが用意されていますが、今回は立方体や直方体のような箱状の形状を生成するためのBoxGeometryを使用します。 */

  // new THREE.BoxGeometry(幅, 高さ, 奥行き)
  const geometry = new THREE.BoxGeometry(300, 500, 300);

  /* マテリアルは色や質感の情報を持っています。今回は青色の箱を表示させたいので、以下のようにマテリアルを生成します。 */
  const material = new THREE.MeshStandardMaterial({
    color: 0x0000ff
  });
  // new THREE.Mesh(ジオメトリ,マテリアル) Mesh = geometry+material
  const box = new THREE.Mesh(geometry, material);
  scene.add(box); // シーンに追加

  /* 5.ライトを作る. このままでは真っ暗なのでライトを作成します。DirectionalLightは平行光源を意味します。平行光源は太陽光のように一定方向から差し込む光です。 */
  // new THREE.DirectionalLight(色)
  const light = new THREE.DirectionalLight(0xffffff);
  light.intensity = 2; // 光の強さを倍に
  scene.add(light); // シーンに追加
  light.position.set(1, 1, 1); //ライトの位置を変更. 光源が斜めから差し込むように位置も変更

  /* 6. 描画する. 最後はレンダリングです。renderer.render()メソッドに、さきほど作成したシーンとカメラを引数に渡すことではじめてcanvas上に描かれます。*/
  renderer.render(scene, camera);

  /* 7.アニメーション
    アニメーションをさせるには、パラパラアニメのようにコマ送りにする必要があり,
    そのためには、requestAnimationFrame()というグローバルメソッドを使用します。requestAnimationFrame()は引数として渡された関数を、毎フレーム実行します */

  // 初回実行
  tick();

  function tick() {
    requestAnimationFrame(tick);

    // rotate the box
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;

    // rendering
    renderer.render(scene, camera);
  }
}
