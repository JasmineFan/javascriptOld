
var firstImage= new Image();
firstImage.src="image/menu.gif";
var smallImage= new Image();
smallImage.src="image/tankAll.gif";
var status='iniS';
//var status='startGameS';
var menu=null;
var map= null;
var UP=0;
var DOWN = 1;
var LEFT = 2;
var RIGHT = 3;
var bullets=new Array();
var BULLET_TYPE_PLAYER = 1;
var BULLET_TYPE_ENEMY = 2;
var canvas, ctx;
var bombs = new Array();
var isGameOver = false;
var POS = new Array();
POS["tankBomb"] = [0,160];
POS["bulletBomb"] = [320,0];

var EnemyTanks= new Array();
var myTank = null;
var isReload=false; 

 // 1：水泥墙 2：铁墙 3：草 4：水 5：冰 9：家   x18  y16
var xLengh=26;
var yLengh=26;
var map1 = 
[
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0],
	[0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0],
	[0,0,1,1,0,0,1,1,2,2,1,1,0,0,1,1,0,0],
	[0,0,1,1,0,0,1,1,2,2,1,1,0,0,1,1,0,0],   //6
	[0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0],
	[0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0],
	[0,0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0],
	[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],   //10
	[1,1,0,0,1,1,0,0,0,0,0,0,1,1,0,0,1,1],
	[2,2,0,0,1,1,0,0,0,0,0,0,1,1,0,0,2,2],
	[1,1,0,0,1,1,0,0,0,0,0,0,1,1,0,0,1,1],
	[0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0],
	[0,0,1,1,0,0,0,1,1,1,1,0,0,0,1,1,0,0],
	[0,0,0,0,0,0,0,1,9,1,0,0,0,0,0,0,0,0],   //16
	
];


var map2 =            //y 26  x 26        地图416*  416      地图块大小16*16  数组下标从0 开始，所以是0-25， 行和列
[

	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0],
	[0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0],
	[0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0],
	[0,0,1,1,0,0,1,1,0,0,1,1,2,2,1,1,0,0,1,1,0,0,1,1,0,0],
	[0,0,1,1,0,0,1,1,0,0,1,1,2,2,1,1,0,0,1,1,0,0,1,1,0,0],
	[0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0],
	[0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0],
	[0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,3,0,0],   //10
	[0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0],
	[1,1,0,0,1,1,1,3,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,1,1],
	[2,2,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,2,2],
	[0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
	[0,0,1,1,0,0,1,1,0,0,1,1,1,1,1,1,0,0,1,1,0,0,1,1,0,0],
	[0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0],
	[0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0],
	[0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0],    //20
	[0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0],  
	[0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0],
	[0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0],
	[0,0,1,1,0,0,1,1,0,0,0,1,1,1,1,0,0,0,1,1,0,0,1,1,0,0],         //23
	[0,0,0,0,0,0,0,0,0,0,0,1,9,8,1,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,1,8,8,1,0,0,0,0,0,0,0,0,0,0,0],        //25
];



$(document).ready(function(){

	canvas=document.getElementById("mapCanvas");
	ctx=canvas.getContext("2d");
	menu= new Menu(ctx);
	map= new Map(ctx);
	myTank=new MYTank(ctx);
	myTank.x=161;
	myTank.y=401;
	overX = 176;
	overY = 384;
	addEnemyTank(ctx)
	timerGame=setInterval("game()", 20);


});

$(window).keydown(function(e){
	
	if(status=='iniS'){
		
		if(e.keyCode==13){
			status='startGameS';		
		}		
				
	} else if(status=='startGameS'){
	
		switch(e.keyCode){
			
			case 37: //左
				myTank.dir=LEFT;	
				myTank.move();
				break;
			case 38: //上
				myTank.dir=UP;
				
				//myTank.run();
				myTank.move();
				break;
			case 39: //右
				myTank.dir=RIGHT;
				//myTank.run();
					myTank.move();
				break;
			case 40:  //下
				myTank.dir=DOWN;
				//alert(myTank.y);
				//myTank.run();
					myTank.move();
				break;
			case 32: //space


				break;
			case 13: //enter
			
				myTank.shoot(1);
				
					
				break;

				

		}
	};

});




function game(){
	

	
	
	switch (status){

		case 'iniS':
			if(isReload) 
				{
					isReload=false;
					window.location.reload();
					
				};		
			menu.drawIni();
			break;
		case 'startGameS':

			map.drawMap();
			myTank.drawTank();
			drawEnemyTanks();
			drawBullets();
			drawBomb();
			
			
			break;
		case 'GameEnd':
			gameOver()
			
			break;

	}
};


var Menu= function(context){

   this.drawIni= function(){
   		context.clearRect(0,0,512,448);
	//	setTimeout(function(){},2000);

//		firstImage.onload = function(){
			context.drawImage(firstImage,0,0);
		//ctx.drawImage(smallImage,128,96,27,27,140,512,27,27);		
		
//		};

	//	smallImage.onload = function(){
			context.drawImage(smallImage,99,0,27,27,122,250,27,27);
	//	};

   }
};

var Map= function(context){

	this.offsetX=32;  // 灰色的里面黑色距离灰色的X, 主要是灰色里面可以加一些图标表示游戏状态
	this.offsetY=16;
	this.tileSize = 16;	
	this.wTileCount = 26; //主游戏区的宽度地图块数
	this.HTileCount = 26;//主游戏区的高度地图块数
	this.drawMap=function(){
		context.clearRect(0,0,512,448);
		context.fillStyle='#7f7f7f';
		context.fillRect(0,0,512,448);
		context.fillStyle='#000';
		context.fillRect(32,16,416,416);

		for(var x=0;x<xLengh;x++){
			for(var y=0;y<yLengh;y++){

				switch(map2[x][y]){

					case 0:
				
						break;
					case 1:
						//context.drawImage(smallImage,0,95,15,15,28*y,28*x,28,28);
						context.drawImage(smallImage,0,96,16,16,16*y+32,16*x+16,16,16);

						// x 灰色 32， y 灰色 16， 地图块大小16*16

					 	break;
					 case 2:
					 	context.drawImage(smallImage,16,96,16,16,16*y+32,16*x+16,16,16);
					 	 break;
					  case 3:
					 	context.drawImage(smallImage,32,96,16,16,16*y+32,16*x+16,16,16);

					 	break;
					 case 9:
					 	context.drawImage(smallImage,254,0,30,30,16*y+32,16*x+16,30,30);

					 break;

				}
			}
		}

	}


	this.updateMap = function(indexArr,target){
		if(indexArr != null && indexArr.length > 0){
			
			for(var i=0;i<indexArr.length;i++){
				var index = indexArr[i];
				map2[index[0]][index[1]] = target;
				if(target > 0){
					context.drawImage(smallImage,this.tileSize*(target-1), 96,this.tileSize,this.tileSize,index[1]*this.tileSize + this.offsetX, index[0]*this.tileSize + this.offsetY,this.tileSize,this.tileSize) ;
				}else{
					context.fillStyle = "#000";
					context.fillRect(index[1]*this.tileSize + this.offsetX, index[0]*this.tileSize + this.offsetY,this.tileSize,this.tileSize);
				}
			}
		}
	};




};





/*

function tankMapCollision(tank,map){
	var rowN=0;
	var colN=0;
	var leftLength=32;
	var topLength=16;
	
	rowN= parseInt((tank.y-topLength)/16);     //总共416=26*16， 每个是16， parseInt 取整   求现在坦克在第几个格，总共26 个格，一个是16px
	colN= parseInt((tank.x-leftLength)/16);  //现在坦克坐标是灰色边+ 第几个格*16 算出来的，所以还的减去灰色的边
	  												//总共416=26*16， 每个是16， parseInt 取整  //总共416=26*16， 每个是16， parseInt 取整   求现在坦克在第几个格，总共26 个格，一个是16px
	var rowNint=Math.floor(rowN);  // 取整 ， 一个表示小于或等于指定数字的最大整数的数字。 为了求出这个坦克是不是在一个格子里，还是两个格子中间位置
	var colNint=Math.floor(colN); 

	alert(rowN + "     " +  colN   + "     " +rowNint +"     " +colNint);



    if (tank.dir==UP) {     
		 if(rowN==rowNint)    //说明坦克在y 轴的整坐标上，就是在一个格子y正中间
		 {
		 	if (colN==0){return true}
		 	//判断坦克正上方是不是墙，所以取出地图的值

		 	var mapValue= map2[rowN-1][colN];   //y 坐标求出的是第几行，数组第一个， 因为是上面的一行，所以减1
		 	if (colN==colNint)      //第一种情况， x 整坐标， 坦克在一个格子正中间
		 	{
		 		alert(colNint);
		 		if (mapValue==0 ||mapValue==3) {tank.newY=tank.newY-8}
		 		else { return true}
		 	}
		 	else  // 第二种情况，x 轴不在正中间，因为取得是偏小的值，所以需要看上面的两块，一个是mapValue, 还有一个是mapValue 右面的，就是colN+1
		 	{
		 		var mapValueOther=map2[rowN-1][colN+1];
		 		if ((mapValue==0 ||mapValue==3)&& (mapValueOther==0 ||mapValueOther==3) ){tank.newY=tank.newY-8}
		 		else { return true}

		 	}

		 }
		 else
		 {
		 	tank.newY=tank.newY-8             //不在整坐标，可以往前移动半个格子, 因为不是正上方就是障碍物，所以直接上移
		 }

	}

*/

/*
if (tank.dir==UP) {  

		 if(rowN==rowNint)    //说明坦克在y 轴的整坐标上，就是在一个格子y正中间
		 {
		 	if (colN==0){return true}
		 	//判断坦克正上方是不是墙，所以取出地图的值

		 	var mapValue= map2[rowN-1][colN];   //y 坐标求出的是第几行，数组第一个， 因为是上面的一行，所以减1
		 	if (colN==colNint)      //第一种情况， x 整坐标， 坦克在一个格子正中间
		 	{
		 	//	alert(mapValue);
		 		if (mapValue==1 ||mapValue==2 ||mapValue==4  ||mapValue==5)
		 		{ return true}


/*

		 	for(var i=0;i<tileNum && colIndex+i < mapobj.wTileCount ;i++){
			var mapContent = mapobj.mapLevel[rowIndex][colIndex+i];
			if(mapContent == WALL || mapContent == GRID || mapContent == WATER || mapContent == HOME || mapContent == ANOTHREHOME){
				if(tank.dir == UP){
					tank.y = mapobj.offsetY + rowIndex * mapobj.tileSize + mapobj.tileSize - overlap;
				}else if(tank.dir == DOWN){
					tank.y = mapobj.offsetY + rowIndex * mapobj.tileSize - tank.size + overlap;
				}
				return true;
			}
		
		 	}
		 	else  // 第二种情况，x 轴不在正中间，因为取得是偏小的值，所以需要看上面的两块，一个是mapValue, 还有一个是mapValue 右面的，就是colN+1
		 	{
		 		var mapValueOther=map2[rowN-1][colN+1];
		 		if ((mapValue==1 ||mapValue==2 ||mapValue==4  ||mapValue==5)&& (mapValueOther==1 ||mapValueOther==2 ||mapValueOther==4  ||mapValueOther==5))
		 			{ return true}

		 	}

		 }
		
	}




	return false;

}


*/





Array.prototype.removeByIndex = function(index){
	var i=0,n=0;
	var arrSize = this.length;
	for(i=0;i<arrSize;i++){
		if(this[i] != this[index]){
			this[n++]=this[i];
		}
	}
	if(n<i){
		this.length = n;
	} 
};


function drawBomb(){
	if(bombs!=null ){
		for (var i=0; i<bombs.length;i++){
			var bomb=bombs[i];
			if(bomb.isOver){
				bombs.removeByIndex(i);
				i--;
				if(bomb.owner== myTank){
					myTank.newLive();
				}
			}else{

				bomb.draw();

			}
		}
	}
}


function drawBullets(){

	for(var i=0; i<bullets.length; i++){
		var bullet=bullets[i];
		if(bullet!=null && bullet.isLive){

				bullet.draw();
				

		}else{
			bullets.removeByIndex(i);
				i--;
		}
		
	}
}







addEnemyTank=function(ctx){
	for(var i=0;i<3;i++){
		var enemyTank=new EnemyTank(ctx);
		enemyTank.x= i*192 + map.offsetX;
		enemyTank.y=map.offsetY;
		EnemyTanks[i]=enemyTank;
	}
}

drawEnemyTanks=function(){
	for(var i=0;i<EnemyTanks.length;i++){
		var enemyTank=EnemyTanks[i];

		if(!enemyTank.isLive){
				EnemyTanks.removeByIndex(i);
				i--;
			}else{
				enemyTank.draw();
			}
		

	}
}



function gameOver(){

	
	ctx.clearRect(0,0,512,448);
	ctx.drawImage(smallImage,384,64,64,32,176+map.offsetX,overY+map.offsetY,64,32);
	overY -= 2 ;
	
	if(overY <= parseInt(208)){
		
var map2 =            //y 26  x 26        地图416*  416      地图块大小16*16  数组下标从0 开始，所以是0-25， 行和列
[

	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0],
	[0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0],
	[0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0],
	[0,0,1,1,0,0,1,1,0,0,1,1,2,2,1,1,0,0,1,1,0,0,1,1,0,0],
	[0,0,1,1,0,0,1,1,0,0,1,1,2,2,1,1,0,0,1,1,0,0,1,1,0,0],
	[0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0],
	[0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0],
	[0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,3,0,0],   //10
	[0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0],
	[1,1,0,0,1,1,1,3,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,1,1],
	[2,2,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,2,2],
	[0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
	[0,0,1,1,0,0,1,1,0,0,1,1,1,1,1,1,0,0,1,1,0,0,1,1,0,0],
	[0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0],
	[0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0],
	[0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0],    //20
	[0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0],  
	[0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0],
	[0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0],
	[0,0,1,1,0,0,1,1,0,0,0,1,1,1,1,0,0,0,1,1,0,0,1,1,0,0],         //23
	[0,0,0,0,0,0,0,0,0,0,0,1,9,8,1,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,1,8,8,1,0,0,0,0,0,0,0,0,0,0,0],        //25
];

	ctx.clearRect(0,0,512,448);
	isReload=true;
	status='iniS'
	
	}
}
