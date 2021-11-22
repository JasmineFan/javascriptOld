var Tank= function (){
	this.x=0;
	this.y=0;
	this.newX=0;
	this.newY=0;
	this.dir=UP;
	this.speed=1;
	this.size=32;
	this.bullet=null;
	this.count=0;
	this.hit = false;

	this.shoot=function(type){

		var bullet=new Bullet(this.context,this,type,this.dir);
	

		var tempX = this.x;
		var tempY = this.y;


		this.bullet=bullet;
		
		if(this.dir == UP){
			tempX = this.x + parseInt(this.size/2) - parseInt(this.bullet.size/2);
			tempY = this.y - this.bullet.size;
		}else if(this.dir == DOWN){
			tempX = this.x + parseInt(this.size/2) - parseInt(this.bullet.size/2);
			tempY = this.y + this.size;
		}else if(this.dir == LEFT){
			tempX = this.x - this.bullet.size;
			tempY = this.y + parseInt(this.size/2) - parseInt(this.bullet.size/2);
		}else if(this.dir == RIGHT){
			tempX = this.x + this.size;
			tempY = this.y + parseInt(this.size/2) - parseInt(this.bullet.size/2);
		}
			this.bullet.x = tempX;
			this.bullet.y = tempY;
			
			this.bullet.draw();

			bullets.push(this.bullet);
			
		
			//setInterval("bullets["+(bullets.length-1)+"].run()",1000);
		//	var timer=setInterval("bullets["+(bullets.length-1)+"].run()",10);
		//	bullets[bullets.length-1].timer=timer;

	}	


	

/*

	this.run=function () {
		this.hit=false;
		this.newX=this.x;
		this.newY=this.y;
		switch (this.dir) {
			case UP:
			  	if (this.y>=map.offsetY){
			  		this.newY=this.newY-this.speed;
					break;
			 	}
				
			case DOWN:
				if (this.y<=map.offsetY+416){
					this.newY=this.newY+this.speed;
					break;
				}
			case LEFT:
				if (this.x>=map.offsetX){
					this.newX=this.newX-this.speed;
					break;
				}
			case RIGHT:
				if (this.x<=map.offsetX+416){
					this.newX=this.newX+this.speed;
					break;
				}

		}
		if(tankMapCollision(this, map)){
			this.hit=true;
		}

		if(!this.hit){
			this.x=this.newX;

			this.y=this.newY;
		

	};

*/

//	this.tempX = 0;
//	this.tempY = 0;
	
	this.move = function(){
		//如果是AI坦克，在一定时间或者碰撞之后切换方法
		this.hit = false;
		
		this.tempX = this.x;
		this.tempY = this.y;
		
		if(this.isEnemy){
			
			if(this.count % 100 == 0 || this.hit){
				

				this.dir = parseInt(Math.random()*4);//随机一个方向
				this.hit = false;
				this.count = 0;
			}
		}
		
		if(this.dir == UP){
			this.tempY -= this.speed;
		}else if(this.dir == DOWN){
			this.tempY += this.speed;
		}else if(this.dir == RIGHT){
			this.tempX += this.speed;
		}else if(this.dir == LEFT){
			this.tempX -= this.speed;
		}
		this.isHit();
		if(!this.hit){
			this.x = this.tempX;
			this.y = this.tempY;
		}
	};
	
	/**
	 * 碰撞检测
	 */
	this.isHit = function(){
		//临界检测
		if(this.dir == LEFT){
			if(this.x <= map.offsetX){
				this.x = map.offsetX;
				this.hit = true;
			}
		}else if(this.dir == RIGHT){
			if(this.x >= map.offsetX + map.mapWidth - this.size){
				this.x = map.offsetX + map.mapWidth - this.size;
				this.hit = true;
			}
		}else if(this.dir == UP ){
			if(this.y <= map.offsetY){
				this.y = map.offsetY;
				this.hit = true;
			}
		}else if(this.dir == DOWN){
			if(this.y >= map.offsetY + map.mapHeight - this.size){
				this.y = map.offsetY + map.mapHeight - this.size;
				this.hit = true;
			}
		}
		if(!this.hit){
			//地图检测
			if(tankMapCollision(this,map)){
				this.hit = true;
			}
		}
	};


	this.destroy=function() {
		this.isLive=false;
		var bomb=new Bomb(this,"tank")
		bombs.push(bomb);	
		
	}
}


var MYTank=function(context){
	//this.x=161;
	//this.y=401;
	this.context=context;
	this.speed = 2;
	this.lives = 3;	
	this.isLive=true;
	this.isEnemy=false;
	
	this.drawTank=function(){

		context.drawImage(smallImage,this.dir*32, 0, 32, 32, this.x, this.y, 32, 32); //坦克的大小是30
		//（图片，取得原图里面的x, 原图里面的y起点，坦克自己大小，坦克自己大小， 在地图中的定位160， 402(坦克也就是小图片左上角点在大图片就是地图中
		//的位置， y = 16 边+ 416 总长 - 坦克y 长32)
		//x=32 边 +8*16 
	}
	this.destroy=function() {
		this.isLive=false;
		var bomb=new Bomb(this,"tank")
		bombs.push(bomb);	
		
	}
	this.newLive=function(){
		
		this.lives--;
		this.dir = UP;
		this.isLive=true;
		temp = 129;
		this.x = temp + map.offsetX;
		this.y = 385 + map.offsetY;
	}


}

 MYTank.prototype=new Tank();


var EnemyTank=function(context){
	this.isLive=true;
	this.dir=DOWN;
	this.context=context;
	this.speed=1.5;
	this.live=1;
	this.shootRate=0.6;
	this.isEnemy=true;
	this.count=0;
	this.draw=function(){
		this.count++;
		this.context.drawImage(smallImage,this.dir*this.size,32,32,32,this.x,this.y,32,32);
	
		if(this.count %50 ==0){
			
			var ra = Math.random();
			if(ra < this.shootRate){

				this.shoot(2);
				
			}
			this.count = 0;

		}


		this.move();  
			
	}
}

EnemyTank.prototype= new Tank();