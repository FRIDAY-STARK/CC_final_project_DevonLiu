//learning from p5.play library 
//https://p5play.org/index.html

class CAMERA{
	
	constructor(){
		this.hpX = 1115;
		this.hpY = height/2-100;
		this.playing = false;
		
		this.tpX= 2000;
		this.tpY = 600;
		this.pickup = false; //if pick up the telephone or not
		
		this.dX = 2500;
		this.dY = 300;
		this.scene = 1;
		
		this.zoomIn = false;
		
		this.cbX = 5;
		this.cbY = height-height/6;
		this.cbW = width-10;
		this.cbH = height/4;
		
		this.fly = width;
		this.flyspeed = -1;
		
		
		this.sX = 1500;
		this.sY =-500;
		
		this.cX = 300;
		this.cY = -900;
		
		this.tcX = 2400;
		this.tcY = 200;
	
		this.swi = false;
		this.candle = false;
		this.torch = false;
		
		this.light =false;
		
		this.XPOS = [];
		this.gap = 400;
		this.YPOS = -200;
		for(let i=0; i<7;i++){
			this.XPOS[i] = 800+i*this.gap;
		}
		/*
		yellowX - 0
		pinkX - 1
		whiteX - 2
		blueX - 3
		
		redX - 4
		greenX - 5
		purpleX - 6
		*/
		this.arcadeI =[];
		this.arcadeBoo =[];
		this.whichLine = []
		
		for(let i=0;i<7;i++){
			this.arcadeBoo[i] = false;
		}
		
		this.access =false;
		
		for (let i=0;i<10;i++){
		this.whichLine[i] = -1; 
		}
		// this.index=0;
		//this.lineNum = 1;
		this.part=' ';
		//this.holder =0;
		
	}
	
	limit(SCENE_W,SCENE_H){  
		// limit the movements of jellyfish
		//make the jellyfish start at the bottom left corner of the limited space
		
		if (jellyfish.x < 0) {
			jellyfish.x = 0;//left limit
		}
		if (jellyfish.y < height-SCENE_H) {
			jellyfish.y = height-SCENE_H; //top limit
		}
		if (jellyfish.x >SCENE_W) {
			jellyfish.x = SCENE_W; //right limit
		}
		if (jellyfish.y > height) {
			jellyfish.y = height; //bottom limit
		}
		background(0);
		stroke(255);
		strokeWeight(20);
		if(this.scene==1){
		noFill();
		}
		else if(this.scene==2||this.scene==5){
			stroke(100);
			fill(255);
		}
		else if(this.scene==4){
			if(this.swi ==false){
				noFill();
			}else{
				fill(255);
			}
		}
		rectMode(CORNER);
		rect(0, height-SCENE_H, SCENE_W + jellyfish.w, SCENE_H + jellyfish.h);
		
		
	}
	
	update(){
			this.scene+=1; //scene change
			//set the postion of jellyfish to the default
			jellyfish.x = width/2;
			jellyfish.y = height/2;
		}
	
	bgd1(){ 
		
		noStroke();
		fill(255);
		textAlign(LEFT,TOP);
		textFont(fontReg);
		textSize(30);
		text("don't forget the instructions! WASD and space keys are your friends. ->", 25,570);
		text('pressing z to zoom in/out',25,600);
		
		textAlign(LEFT,CENTER);
		textFont(fontBold);
		textSize(30);
		text('start your journey with a background music', 800,height/2-300);
		
		imageMode(CENTER);
		image(headphone, this.hpX,this.hpY,250,250);
		if(this.pickup == false){
		//animation(shake,this.tpX, this.tpY-300,250,250);
			image(telephone,this.tpX+random(-10,10),this.tpY+random(-10,10),250,250);
		}else{
			image(telephone,this.tpX,this.tpY,250,250);
		}
		image(door, this.dX,this.dY, 800,800);
	}
	
	scene1(hpI,tpI){

		if(kb.presses(' ')){
			if(hpI<200){
				if(this.playing==false){
					this.playing = true;
					bgm.loop();
					this.part = 'background music';
				}
				else{
					this.playing=false;
					bgm.pause();
					this.part = 'pauses';
				}
			}
			
			if(tpI<200){
				if(this.pickup ==false){
					this.pickup = true;
					this.part = 'phone call';
				}
			}
		}
	}
	
	bgd2(){
		this.dX = 1000;
		this.dY = 400;
		imageMode(CENTER);
		image(inkjet, this.dX, this.dY, 800,800);
	}
	
	bgd3(y){
		jellyfish.visible = false;
		background(0);
		
		push();
		translate(width/2,y);
		//rotate(PI);
		image(inkjet,0,0,100,100);
		pop();
		
		
	}
	
	// collect(energy,jellyfish) {
	// 	energy.remove();
	// 	}
	
	bgd4(){
		this.hpX = 600;
		this.hpY = -100;
		image(note,this.hpX,this.hpY,200,200);
		
		this.tpX= 2200;
		this.tpY = -1000;
		this.dX = 40000; //to make sure the dI wouldn't affect the interaction
		this.dY = 40000;
		image(house,this.tpX,this.tpY,800,800);
		
		textAlign(LEFT,TOP);
		fill(255);
		noStroke();
		textFont(fontBold);
		textSize(50);
		text('In Light We Trust.',this.tpX+220, this.tpY+800);
		
		
		if(this.swi==false){
    image(switch1,this.sX,this.sY,300,300);
			this.light = false;
		}else{
			image(switch2,this.sX,this.sY,300,300);
			this.light = true;
		}
		if(this.candle==false){
			image(candle1, this.cX,this.cY,300,300);
		}else{
			image(candle2,this.cX,this.cY,300,300);
		}
		
		if(this.torch ==false){
			image(torch1,this.tcX, this.tcY, 500,500);
		}else{
			image(torch2,this.tcX, this.tcY, 500,500);
		}
		
		//print(this.torch);
	}
		
	
	
	scene4(hpI,tpI,sI,cI,tcI){
	
		if(kb.presses(' ')){
			if(hpI<200){
				this.part = 'note light';
			}
			if(sI <400){
				if(this.swi==false){
					this.swi=true;
				}else{
					this.swi=false;
				}
			}
			if(cI<400){
				if(this.candle==false){
					this.candle=true;
				}else{
					this.candle=false;
				}
			}
			if(tcI<400){
				 if(this.torch ==false){
					this.torch=true;
				 }else{
					this.torch=false;
				}
		}
			
			if(this.light ==true){
				if(tpI<800){
						this.update();
					}
				}
		}
		
	}
	
	bgd5(){
		
		imageMode(CENTER);
		
		//computer
		this.hpX = 1000+(this.XPOS[6]-this.XPOS[0])/2;
		this.hpY = this.YPOS-900; //ypos=-200
		image(cpu,this.hpX,this.hpY,975,585);
		
		
		//book
		this.tpX= 3400;
		this.tpY = -1500;
		image(book,this.tpX,this.tpY,600,600);
		
		//note //pad
		this.sX = 500;
		this.sY =-800;
		image(pad,this.sX,this.sY,400,400);
		
		//notebook 
		this.cX = 1300;
		this.cY = -1200;
		image(note,this.cX,this.cY,400,400);
		
		//diary
		this.tcX =3700;
		this.tcY = 350;
		image(diary,this.tcX,this.tcY,400,400);
		
		let arcadeSize = this.gap/5*3;
		let lightSize = arcadeSize-10;
		let yGap = arcadeSize;
		//arcades and lights
		for(let i=0; i<7;i++){
			if(this.arcadeBoo[i]==false){
				image(arcadeN[i],this.XPOS[i],this.YPOS,arcadeSize,arcadeSize);
				image(bulb[0],this.XPOS[i],this.YPOS+yGap,lightSize,lightSize);
			}else{
				image(arcadeF[i],this.XPOS[i],this.YPOS,arcadeSize,arcadeSize);
				image(bulb[1],this.XPOS[i],this.YPOS+yGap,lightSize,lightSize);
			}
		}
		/*
		yellow - 0
		pink - 1
		white - 2
		blue - 3
		
		red - 4
		green - 5
		purple - 6
		*/
	}
	
	scene5(hpI,tpI,sI,cI,tcI){
		//hpI 500, tpI 200, sI 300, cI 250; tcI 250
		if(kb.presses(' ')){
			
			//interactive narratives
			if(hpI<500){ //computer
				if(this.access ==false){
					this.part = 'access denied';
				}else{
					this.part = 'access granted';
				}
			}
			if(tpI<200){ //book
				this.part = 'book';
			}
			if(sI<300){  //pad //note
				this.part = 'note';
			}
			if(cI<250){//notebook
				this.part = 'notebook';
			}
			if(tcI<250){ //diary
				this.part = 'diary';
			}
			
			//lights and arcade interaction
			for(let i =0;i<7;i++){
				if(this.arcadeI[i]<150){
					if(this.arcadeBoo[i] ==false){
						this.arcadeBoo[i]=true;
					}else{
						this.arcadeBoo[i]=false;
					}
				}
			}
			
		}	
	}
	
	ACCESS(){
		if(this.arcadeBoo[0]==true && this.arcadeBoo[1]==true && this.arcadeBoo[2]==true && this.arcadeBoo[3]==true && this.arcadeBoo [4]==false && this.arcadeBoo [5]==false && this.arcadeBoo[6] ==false){
			this.access = true;
		}else{
			this.access =false;
		}
	}
			
		
		sceneChange(dI){
			if(kb.presses(' ')){
				if(dI <200){
					this.update();
				}
			}
		}
		
		movement(){
			if (kb.pressing('a')||kb.pressing('A')) {
				jellyfish.ani = 'left'; //animations moving left
				jellyfish.x +=-5;
			} 
			else if(kb.pressing('d')||kb.pressing('D')){
				jellyfish.ani = 'right'; //animations moving right
				jellyfish.x += 5;
			}	
			else if (kb.pressing('w')||kb.pressing('W')){
				jellyfish.ani = 'stationary'; //animations moving up
				jellyfish.y+= -5;
			}	
			else if (kb.pressing('s')||kb.pressing('S')){
				jellyfish.ani = 'stationary'; //animations moving down
				jellyfish.y+= 5;
			}	
			else {
				jellyfish.ani = 'stationary'; //animations not moving
			}
			
			if (kb.presses('z')||kb.presses('Z')) {
				if (this.zoomIn == false){
				this.zoomIn =true;
					camera.zoom = 1;
				}else{
					this.zoomIn = false;
					camera.zoom = 0.3;
				}
			}
		
		}
	IN(){
		this.INtext();
		//interactive narrative
		//draw when camera is off		
		
		/*
		this.cbX = 5;
		this.cbY = height-height/6;
		this.cbW = width-10;
		this.cbH = height/4;
		*/
		
		/* index of the texts in the array of narrative
		 0 background_music, 1 phone_call, 2 note_light, 3 bookTXT
		4 noteTXT, 5 notebook, 6 diaryTXT,  7 access_denied, 8 access_granted;9 pauses
		*/
		
		if(this.part == 'background music'){
			//this.whichLine = 0;
			this.INdisplay(narrative[0],0);
		}
		// else if(this.part =='pauses'){
		// 	this.whichLine = 1;
		// 	this.INdisplay(narrative[9],9);
		// }
		else if(this.part == 'phone call'){
				//this.whichLine = 0;
			this.INdisplay(narrative[1],1);
		}
		else if(this.part == 'note light'){
			this.INdisplay(narrative[2],2);
		}
		else if (this.part == 'book'){
			this.INdisplay(narrative[3],3);
		}
		else if(this.part == 'note'){
			this.INdisplay(narrative[4],4);
		}
		else if(this.part == 'notebook'){
			this.INdisplay(narrative[5],5);
		}
		else if(this.part == 'diary'){
			this.INdisplay(narrative[6],6);
		}
		else if(this.part == 'access denied'){
			this.INdisplay(narrative[7],7);
		}
		else if(this.part == 'access granted'){
			this.INdisplay(narrative[8],8);
		}

	}
		
	INdisplay(chat,index){
		let currentLine= chat[this.whichLine[index]]; // a string
		if(this.whichLine[index]>=0 && this.whichLine[index]<chat.length){
		text(currentLine, this.cbX+15,this.cbY+5,this.cbW-30,height/6-15);
		}
			if (kb.presses(' ')) {
				this.chatbox();
					if(this.whichLine[index]<chat.length){
						this.whichLine[index]+=1;
					}else{
						if(this.part == 'access granted'){
							//this.scene=1;
							scene = 'final';
						}else{
						this.whichLine[index]=-1;
						this.part=' ';
						}
				}
			}
			
			
	
	}
	
	
	INtext(){
		textAlign(LEFT,TOP);
		textFont(fontBold);
		noStroke();
		fill(255);
		textSize(30);
	}
	
	chatbox(){
		rectMode(CORNER);  
		stroke(255);
		strokeWeight(5);
		fill(0);
		rect(this.cbX,this.cbY,this.cbW,this.cbH,20);
	}
	
	camOn(){
		
		camera.on(); 
		this.movement();
		// set the camera position to the position of jellyfish
		camera.x = jellyfish.x;
		camera.y = jellyfish.y;
		
		let hpI = dist(jellyfish.x,jellyfish.y,this.hpX,this.hpY);
			//print(hpi);
		
		//condition when jellyfish can interact with telephone
		let tpI = dist(jellyfish.x,jellyfish.y,this.tpX,this.tpY);
			//print(tpi);
		
		let sI,cI,tcI;
		
		sI = dist(jellyfish.x,jellyfish.y,this.sX,this.sY);
		cI =dist(jellyfish.x,jellyfish.y,this.cX,this.cY);
		tcI = dist(jellyfish.x,jellyfish.y,this.tcX,this.tcY);
		
		for(let i=0;i<7;i++){
			this.arcadeI[i] = dist(jellyfish.x,jellyfish.y,this.XPOS[i],this.YPOS);
		}
		//print(tcI);
		
		if(this.scene == 1){
			//set limit the view of camera
			this.limit(3000,800);
			//draw the background of scene1
			this.bgd1();			
			
			 //condition when jellyfish can interact with headphone
		
			
		//draw the interactions
		this.scene1(hpI,tpI);
		}
		else if (this.scene ==2){
			this.limit(1200,800);
			this.bgd2();
		}
		else if(this.scene == 3){
			this.bgd3(this.fly);
			if(this.fly>-800){
				this.fly+=this.flyspeed;
				this.flyspeed+= -0.1;
			}
			else{
				this.update();
			}
		}
		else if(this.scene == 4){
			jellyfish.visible =true;
			
			this.limit(3000,2000);
			this.bgd4();
			this.scene4(hpI,tpI,sI,cI,tcI);
			//print(this.light);
		}
		else if(this.scene==5){
			this.limit(4000,2500);
			this.bgd5();
			this.scene5(hpI,tpI,sI,cI,tcI);
			this.ACCESS();
		// print(this.arcadeI[0]);
		// 	print(this.arcadeI[1]);
			
			
		}
		//print(tpI);
		
		//condition when jellyfish can interact with door/change the scene
		let dI = dist(jellyfish.x,jellyfish.y,this.dX,this.dY);
		//print(di);
		this.sceneChange(dI);
		
		camera.off();
		
		
	}
	
	
}