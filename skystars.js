function skystars(size,animationer){
  function canvatexture() {

           var canvas = document.createElement('canvas');
           canvas.width = 100;
           canvas.height = 100;

           var context = canvas.getContext('2d');
           var gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
           gradient.addColorStop(0.13, 'rgba(255,255,255,1)');
           gradient.addColorStop(0.14, 'rgba(10,10,10,1)');
          //gradient.addColorStop(0.9, 'rgba(0,0,0,1)');
          gradient.addColorStop(0.9, 'rgba(0,0,0,1)');
          gradient.addColorStop(1, 'rgba(0,0,0,1)');


           context.fillStyle = gradient;
           context.fillRect(0, 0, canvas.width, canvas.height);

           var texture = new THREE.Texture(canvas);
           texture.needsUpdate = true;
           return texture;

       }
  this.animationer=animationer;
  this.pointMaterial=new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      opacity: 1,
      fog:true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      map:canvatexture(),
      depthTest: false
  });
  this.geometry=new THREE.Geometry();
  for(var i=0;i<size;i++){
    var temp=new THREE.Vector3();
    temp.x=THREE.Math.randFloatSpread(5);
    temp.y=THREE.Math.randFloatSpread(5);
    temp.z=THREE.Math.randFloatSpread(5);
    this.geometry.vertices.push(temp);
  }
  this.points = new THREE.Points(this.geometry,this.pointMaterial);
  this.playstar=function(){
    var that=this;
    this.animationer.addtask(new this.animationer.tasker(function(){
      for(var i=0;i<size;i++){
        if(i<(size/2)){
          that.geometry.vertices[i].x>2?(that.geometry.vertices[i].x=-2):(that.geometry.vertices[i].x+=0.001);
        }else{
          that.geometry.vertices[i].y>2?(that.geometry.vertices[i].y=-2):(that.geometry.vertices[i].y+=0.001);
        }
      }
      that.geometry.verticesNeedUpdate=true;
    }));
  }
}
