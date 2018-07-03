function Tool(s){
  this.scene=s;

  this.drawGround=function(){
    var geometry1 = new THREE.Geometry();
    geometry1.vertices.push( new THREE.Vector3( 100, 0, 0 ) );
    geometry1.vertices.push( new THREE.Vector3( -100, 0, 0 ) );
    for(var i=0;i<100;i++){
      var row=new THREE.Line(geometry1,new THREE.LineBasicMaterial( { color: 0xffffff,opacity:0.8} ) );
      row.position.z=-100+i*5;
    this.scene.add(row);
      var col=new THREE.Line(geometry1,new THREE.LineBasicMaterial( { color: 0xffffff,opacity:0.8} ) );
      col.rotation.y=90 * Math.PI / 180;
      col.position.x=-100+i*5;
    this.scene.add(col);
    }
  }
  
  this.drawAxias=function(){
    var geometry = new THREE.Geometry();
    geometry.vertices.push( new THREE.Vector3( 10000, 0, 0 ) );
    geometry.vertices.push( new THREE.Vector3( 0, 0, 0 ) );
    var xaixs = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0xff0000} ) );
    var yaixs = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x00ff00} ) );
    yaixs.rotation.z=90 * Math.PI / 180;
    var zaixs = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x0000ff} ) );
    zaixs.rotation.y=270 * Math.PI / 180;
    this.scene.add(xaixs);
    this.scene.add(yaixs);
    this.scene.add(zaixs);
  }
}
