/*-- Declares the variables for helicopter, package and ground --*/
var helicopterIMG, helicopterSprite, packageSprite, packageIMG, groundSprite;

/*-- Declares the varibles for Matter.js package ang ground object --*/
var packageBody,ground;

/*-- Variables for the Matter.js classes --*/
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

/*-- Engine created variable --*/
var engine, world;

function preload()
{
	helicopterIMG = loadImage("helicopter.png")
	packageIMG = loadImage("package.png")
}

function setup()
{
    /*-- Creates the Drawing Canvas --*/
	createCanvas(800, 700)

    /*-- Make the rectangle  around the centre point --*/
	rectMode(CENTER)

    /*-- Creates the package Sprites and assigns properties --*/
	packageSprite = createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

    /*-- Creates the helicopter Sprites and assigns properties --*/
	helicopterSprite = createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

    /*-- Creates the ground Sprites and assigns properties --*/
	groundSprite = createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor = color(255)


    /*-- Creates the engine and engine property 'World' --*/
	engine = Engine.create();
	world = engine.world;

    /*-- Creates a rectangular package matter.js object --*/
	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:0.4, isStatic:true});
	World.add(world, packageBody);
	

	/*-- Create a Ground --*/
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, ground);

    /*--X and Y Coordinates of the box object --*/
 	var boxX = width/2-100
 	var boxY = 610
    
    /*-- Creates the box with three matter objects and three sprites --*/
 	var boxleftSprite = createSprite(boxX, boxY, 20,100)
 	boxleftSprite.shapeColor = color(255,0,0);

    var boxLeftBody = Bodies.rectangle(boxX+20, boxY, 20,100 , {isStatic:true})
    World.add(world, boxLeftBody);

 	var boxBase=createSprite(boxX+100, boxY+40, 200,20)
 	boxBase.shapeColor = color(255,0,0)

 	var boxBottomBody = Bodies.rectangle(boxX+100, boxY+45-20, 200,20 , {isStatic:true})
 	World.add(world, boxBottomBody)

 	var boxleftSprite = createSprite(boxX+200 , boxY, 20,100)
 	boxleftSprite.shapeColor=color(255,0,0)

 	var boxRightBody = Bodies.rectangle(boxX+200-20 , boxY, 20,100 , {isStatic:true})
 	World.add(world, boxRightBody)


    /*-- Runs the engine --*/
	Engine.run(engine)
  
}


function draw()
{
    /*-- Make the rectangle  around the centre point --*/
    rectMode(CENTER)

    /*-- Changes the background color --*/
    background(0)
 
    /*-- Links the position of matter.js object with the sprite --*/
    packageSprite.x= packageBody.position.x 
    packageSprite.y= packageBody.position.y 
    
    /*-- If conditions to move the  helicopter and package left or right --*/
    if (keyCode === LEFT_ARROW)
    {
        helicopterSprite.x = helicopterSprite.x - 5

        if (packageBody.position.y < 500)
        {
            Body.translate(packageBody, {x: -5, y: 0})
        }
        
    }

    if(keyCode === RIGHT_ARROW)
    {
        helicopterSprite.x = helicopterSprite.x + 5

        if (packageBody.position.y < 500)
        {
            Body.translate(packageBody,{x: 5, y: 0})
        }
        
    }

    /*-- If condition to stop the helicopter and package --*/
    if(keyCode === DOWN_ARROW)
    {
        helicopterSprite.x = helicopterSprite.x + 0
        Body.translate(packageBody,{x: 0, y: 0})
    }
  
    drawSprites()
    
}

function keyPressed()
{
    /*-- If space is pressed the package will drop into the box --*/
    if (keyCode == 32)
    {
        Body.setStatic(packageBody, false)
    }
}