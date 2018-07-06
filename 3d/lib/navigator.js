function navigator(){
  this.current=0;
  this.callbacks=[];
  var that=this;
  this.add=function(){
    if(this.current==3) return;
    this.callbacks.forEach(function(f){

      f(that.current,that.current+1);
    });
    this.current+=1;
  }
  this.minus=function(){
    if(this.current==0) return;
    this.callbacks.forEach(function(f){
      f(that.current,that.current-1);
    });
    this.current-=1;
  }
  this.set=function(index){
    if(this.current==index) return;
    this.callbacks.forEach(function(f){
      f(that.current,index);
    });
    this.current=index;
  }
  this.addcallback=function(cb){
    this.callbacks.push(cb);
  }

}
