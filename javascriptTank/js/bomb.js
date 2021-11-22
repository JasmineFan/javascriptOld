var Bomb=function(crackObj,type){
	this.times = 0;
	this.size = 0;
	this.tempDir = 1;
	this.frame = 0;
	this.owner=crackObj;
	this.isOver = false;
	

	if(type == "tank"){
		this.posName = "tankBomb";
		this.size = 66;
		this.frame = 4;
	}else{
		this.posName = "bulletBomb";
		this.size = 32;
		this.frame = 3;
	}

	this.x = crackObj.x + (parseInt(crackObj.size - this.size)/2);
	this.y = crackObj.y + (parseInt(crackObj.size - this.size)/2);



	this.draw = function(){

		var gaptime = 3;
		var temp = parseInt(this.times/gaptime);
		
		crackObj.context.drawImage(smallImage,POS[this.posName][0]+temp*this.size,POS[this.posName][1],this.size,this.size,this.x,this.y,this.size,this.size);
		
		this.times += this.tempDir;
		if(this.times > this.frame * gaptime - parseInt(gaptime/2)){
			this.tempDir = -1;
		}
		if(this.times <= 0){

			this.isOver = true;
		}
	};

}
