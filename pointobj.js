function pointObj(size,range,animationer){
  var that=this;
  this.size=size;
  this.range=range;
  this.models=[];
  this.animationer=animationer;
  this.rotationcount=0;
  this.shadermaterial = new THREE.ShaderMaterial( {
            uniforms: {
              run:{value:false},
              time:   { value: 0},
              texture: { value: new THREE.TextureLoader().load( "http://easyhome-easyhome.stor.sinaapp.com/1.png" ) },
              texture1: { value: new THREE.TextureLoader().load( "http://easyhome-easyhome.stor.sinaapp.com/2.png" ) }
            },
            vertexShader: document.getElementById( 'vertexshader' ).textContent,
            fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
            opacity:1,
            transparent: true,
            // 设置元素与背景的融合模式
            blending: THREE.AdditiveBlending,
            depthTest: false
          } );
  this.now;
  this.transfromend;
  this.buffer=new THREE.BufferGeometry();
  this.points=null;
  this.rotatedirection=true;
  this.init=function(models){
    var pos=new Float32Array( size*3 );
    for(var i=0;i<size;i++){
      pos[i*3]=THREE.Math.randFloatSpread(range);
      pos[i*3+1]=THREE.Math.randFloatSpread(range);
      pos[i*3+2]=THREE.Math.randFloatSpread(range);
    }
    this.models.push({
      position:pos,
      start:null,
      show:null
    });
    for(var i=0;i<models.length;i++){
      this.addmodel(models[i]);
    }
    this.buffer.addAttribute( "position",new THREE.BufferAttribute(this.models[0].position, 3 ) );
    this.points=new THREE.Points(this.buffer, this.shadermaterial );
    this.points.rotation.y=-1.19;
  }


  this.addmodel=function(model){
    var pos=new Float32Array(this.size*3);
    var start = new Float32Array(this.size);
    var show = new Float32Array(this.size);
    for(var i=0;i<this.size;i++){
      if(i<model.vertices.length/3){
        pos[i*3]=model.vertices[i*3];
        pos[i*3+1]=model.vertices[i*3+1];
        pos[i*3+2]=model.vertices[i*3+2];
        start[i]=Math.random()*1000;
        show[i]=1.0;
      }else{
      pos[i*3]=(THREE.Math.randFloatSpread(range));
      pos[i*3+1]=(THREE.Math.randFloatSpread(range));
      pos[i*3+2]=(THREE.Math.randFloatSpread(range));
      start[i]=Math.random()*1000;
      show[i]=0.0;
    }
    }
    this.models.push({
      position:pos,
      start:start,
      show:show
    });
    //this.buffer.addAttribute( name,new THREE.BufferAttribute(  pos, 3 ) );
    //this.buffer.addAttribute( name+'s',new THREE.BufferAttribute(start,1) );
  }
  this.transfromTo=function(from,to){

    var po=this.buffer.getAttribute("position");
    var pe=this.buffer.getAttribute("eposition");
    var s=this.buffer.getAttribute("start");
    var sh=this.buffer.getAttribute("show");
    if(po&&pe&&s&&sh){
      po.setArray(this.models[from].position);
      po.needsUpdate=true;
      pe.setArray(this.models[to].position);
      pe.needsUpdate=true;
      s.setArray(this.models[to].start);
      s.needsUpdate=true;
      sh.setArray(this.models[to].show);
      sh.needsUpdate=true;
    }else{
      this.buffer.addAttribute( "position",new THREE.BufferAttribute(this.models[0].position, 3 ) );
      this.buffer.addAttribute( "eposition",new THREE.BufferAttribute(this.models[1].position, 3 ) );
      this.buffer.addAttribute( "start",new THREE.BufferAttribute(this.models[1].start, 1 ) );
      this.buffer.addAttribute( "show",new THREE.BufferAttribute(this.models[1].show, 1 ) );
    }
  };
  this.transformModel=function(from,to,callback){
    this.transfromTo(from+1,to+1);
    that.transfromend=false;
    that.shadermaterial.uniforms.run={value:false};
    that.shadermaterial.needsUpdate=true;
    that.now=Date.now();
    that.animationer.addtask(new that.animationer.tasker(function(){
    that.shadermaterial.uniforms.time= { value: Date.now()-that.now };
    that.shadermaterial.needsUpdate=true;
      if((Date.now()-that.now>2600)){
        that.transfromend=true;
        callback();
        this.end=true;
        //that.animationer.addtask(new that.animationer.tasker(function(){addStar();this.end=true;}));
        //that.animationer.addtask(new that.animationer.tasker(runstars));
        that.now=Date.now();
        that.animationer.addtask(new that.animationer.tasker(that.moveVertices));
        that.animationer.addtask(new that.animationer.tasker(that.rotateself));
      }
    }))

  };
  this.rotationStars=function(callback){

    that.animationer.addtask(new that.animationer.tasker(function(){
      that.rotationcount++;
      if(that.rotationcount>202){
        this.end=true;
        that.now=Date.now();
        callback();
      }
      switch(true){
        case that.rotationcount<=100:that.points.rotation.y+=0.01;break;
        case that.rotationcount<=120:that.points.rotation.y+=0.005;break;
        case that.rotationcount<=140:that.points.rotation.y+=0.0025;break;
        case that.rotationcount<=160:that.points.rotation.y+=0.00125;break;
        case that.rotationcount<=180:that.points.rotation.y+=0.0006;break;
        case that.rotationcount<=200:that.points.rotation.y+=0.0006;break;
      }
    }));
  };
  this.moveVertices=function(){
    that.shadermaterial.uniforms.run={value:true};
    that.shadermaterial.uniforms.time= { value: Date.now()-that.now };
    that.shadermaterial.needsUpdate=true;
  };
  this.rotateself=function(){
    ((that.points.rotation.y>0.3)||(that.points.rotation.y<0))&&(that.rotatedirection=!that.rotatedirection);
    that.rotatedirection?(that.points.rotation.y+=0.0006):(that.points.rotation.y-=0.0006);
  }
}
