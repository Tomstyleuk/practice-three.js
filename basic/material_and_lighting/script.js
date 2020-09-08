/* https://ics.media/tutorial-three/material_basic/
3Dの見栄えを決定するマテリアルとライティングについて
マテリアルとは物体の質感設定のこと。3Dで形状を作る際には、見栄えを決める「マテリアル」を指定することで、たとえば、着色や画像・陰影の割り当て、ライティングの反射などを適用できます。

代表的なマテリアルとして「単色塗りのマテリアル」と「画像を使ったマテリアル」の二種類があります。
どちらもTHREE.MeshStandardMaterialクラスを使用しますが、コンストラクタの引数に色（16進数表記の色）か画像テクスチャを指定するかで自動的に適したマテリアルになります。 */

// ページの読み込みを待つ
window.addEventListener('load', init);

// サイズを指定
const width = 960;
const height = 540;


function init() {

  // 1.レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#myCanvas')
  });
  renderer.setSize(width, height);

  // 2.シーンを作成
  const scene = new THREE.Scene();

  // 3.カメラを作成
  const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
  camera.position.set(0, 0, +1000);

  // 4.球体を作成
  const geometry = new THREE.SphereGeometry(300, 30, 30);
  const material = new THREE.MeshStandardMaterial( {color: 0xFF0000} );
  
  // 5.メッシュを作成
  const mesh = new THREE.Mesh(geometry, material);

  // 6.3D空間にメッシュを追加
  scene.add(mesh);

  /////////////////// 7.平行光源 ///////////////////
  /* ライトを作る
    ライティングがないと陰影はなく画面が真っ暗となり、3Dの質感がわからないため,THREE.DirectionalLightクラスのインスタンスを作成しています。THREE.DirectionalLightクラスは指定した方向からライトを適用でき, これを平行光源といいます。 
    Three.jsで使用できるライティングには以下の種類があります。
    1.THREE.DirectionalLightクラス
    平行光源。ライトの位置と方向を指定し平行に到達する光として使用できます。

    2.THREE.AmbientLightクラス
    環境光。空間全体を照らす光として使用できます。
*/
  const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
  directionalLight.position.set(1, 1, 1);

  /* TEST AmbientLight */
  const light = new THREE.AmbientLight( 0x404040 ); // soft white light

  // シーンに追加
  scene.add(directionalLight);
  scene.add( light );

  // 毎フレーム時に実行されるループイベントです
  tick();

  function tick() {
    
    // メッシュを回転させる
    mesh.rotation.y += 0.02;
    // mesh.rotation.x += 0.02;
    
    // レンダリング
    renderer.render(scene, camera);

    //Animation
    requestAnimationFrame(tick);
  }    


} // ENDE init