var scene= new THREE.Scene();
scene.fog = new THREE.Fog(0x000000,0,5);
var camera=new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.x = 0
camera.position.y = 1
camera.position.z =2
camera.up =  new THREE.Vector3( 0, 1, 0 );
camera.lookAt(new THREE.Vector3(.8,0,0));

var renderer= new THREE.WebGLRenderer({
  antialias: true
});

renderer.setClearColor(0x0c0c1e)
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


var mstart=null;
var aner=0;
document.getElementById('nav-ul').addEventListener("click",function(e){
  if(e.target.nodeName=="A"){
    (obj.transfromend)&&nav.set(parseInt(e.target.getAttribute("itemnum")));
  }
}
);
document.body.addEventListener("mousemove",function(e){
  (!mstart)&&(mstart=e.screenX);
    aner+=0.25*(e.screenX-mstart)/1200;
    camera.position.set(2*Math.sin(aner),1,2*Math.cos(aner));
    camera.lookAt(new THREE.Vector3(.8,0,0));
    mstart=e.screenX;
});
document.body.addEventListener("wheel",function (e) {
  if(obj.transfromend){

    if(e.deltaY>0){
      nav.add();
    }else{
      nav.minus();
    }
  }
})
window.addEventListener("resize",onWindowResize);
function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}
var navitems=document.getElementById('nav-ul').childNodes;
var liitems=[];
for(var i=0;i<navitems.length;i++){
  if(navitems[i].nodeName=="LI"){
    liitems.push(navitems[i]);
  }
}
var animation=new animationer();
var nav=new navigator();
var obj=new pointObj(5000,5,animation);
var sky=new skystars(500,animation);
var message=new messager();
    message.init();
function mcb(o,n){
  animation.clear();
  message.clear();
  liitems[o].className="";
  liitems[n].className="item-active";
  obj.transformModel(o,n,function(){
    message.to(n);
    sky.playstar();
  });
};
nav.addcallback(mcb);
function initobjstars(){
   obj.init([bluamore,tmall,tao,jd]);
   obj.rotationStars(function(){
        obj.transformModel(0,1,function(){
        scene.add(sky.points);
        sky.playstar();
        message.to(0);
        });
  });
  scene.add(obj.points);
}
function render() {
        requestAnimationFrame(render);
        animation.run();
        renderer.render(scene, camera);
    }
    initobjstars();
    render();
