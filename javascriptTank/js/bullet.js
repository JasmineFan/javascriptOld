var Bullet=function(context,owner,type,dir){
	this.dir=dir;
	this.isLive=true;
	this.speed=3;
	this.context=context;
	this.type = type;
	this.owner=owner;
	this.x=0;
	this.y=0;
	this.size=6;
	this.draw=function(){
		this.context.drawImage(smallImage,80+this.dir*6, 96, 6, 6, this.x,this.y, 6, 6);
		this.move();
	}
	this.move=function(){
	
		switch (this.dir)
		{
			case UP:
				this.y=this.y-this.speed;
				
				break;
			case DOWN:
				this.y=this.y+this.speed;
				
				break;
			case LEFT:
				this.x=this.x-this.speed;
			
				break;
			case RIGHT:
				this.x=this.x+this.speed;
				
				
				break;
		}
		this.isHit();
	}



	this.isHit = function(){
		if(! this.isLive){
			return;
		}
		//临界检测
		if(this.x < map.offsetX){
			this.x = map.offsetX;
			this.hit = true;
		}else if(this.x > map.offsetX + map.mapWidth - this.size){
			this.x = map.offsetX + map.mapWidth - this.size;
			this.hit = true;
		}
		if(this.y < map.offsetY){
			this.y = map.offsetY;
			this.hit = true;
		}else if(this.y > map.offsetY + map.mapHeight - this.size){
			this.y = map.offsetY + map.mapHeight - this.size;
			this.hit = true;
		}
	
		if(!this.hit){
			//地图检测
			if(bulletMapCollision(this,map)){
				this.hit = true;
			}

		//是否击中坦克
			if(this.type == 1){
					if(EnemyTanks != null || EnemyTanks.length > 0){

						for(var i=0;i<EnemyTanks.length;i++){
							var enemy = EnemyTanks[i];

							if(enemy.isLive && CheckIntersect(this,enemy,0)){

								CheckIntersect(this,enemy,0);
								enemy.destroy();
								
								
								this.hit = true;
								break;
							}
						}
					}
			}else if(this.type == 2){
				if(myTank.lives > 0 && CheckIntersect(this,myTank,0)){
				
					if( myTank.isLive){

						myTank.destroy();
					}
					this.hit = true;
				}
			}
				


		}


		if(this.hit){
			this.destroy();
		}	
	}
	
	this.destroy = function(){
		this.isLive=false;
		var bomb=new Bomb(this,"bullet")

		bombs.push(bomb);	
	}

}



			//是否击中坦克
			/*
			if(this.type == 1){
				if(EnemyTanks != null || EnemyTanks.length > 0){
					for(var i=0;i<EnemyTanks.length;i++){
						var enemy = EnemyTanks[i];
						if(enemy.isLive){
								enemy.distroy();
							}
							this.hit = true;
							break;
						}
					}
				}
			}else if(this.type == 2){
				if(myTank.lives > 0 ){
					if( myTank.isLive){
						myTank.distroy();
					}
					this.hit = true;
				
			}
			*/



		
