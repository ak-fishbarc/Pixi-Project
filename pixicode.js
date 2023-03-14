let app = new PIXI.Application ({width: 640, height: 360,
backgroundColor: 0x2980b9 });
document.body.appendChild(app.view);

// Create level. Values are temporary.
const Level =
{
  sizex: 500,
  sizey: 500,
  numofsectors: 0,
  sectors: new Map(),
  /* Create function that will divide map into sectors.
     Each sector will contain certain amount of objects, like floors, for
     collision detection, etc. This is to lower the amount of search required.
     For this project it's not neccessary to implement this. There aren't going
     to be that many objects. It's here just as an idea.
     Further this would take players position to check in which sector to look
     for collisions, etc. */
  divideSectors: function(objects_list){
    // For simplicity sizex and sizey are equal.
    let divide_by_size = this.sizex / 250;
    for(let x = 0; x < divide_by_size; x++)
    {
      sector_size = this.numofsectors * 250;
      this.sectors.set(sector_size, []);
      for(x in objects_list)
      {
        let obj = objects_list[x];
        this.sectors.forEach( function(list, sec){
          // sec will be the size of sector. For example: Objects between x,y = 0
          // and x,y = 250 will end up added to the list of objects in this sector.
          if(obj.sprite.x > sector_size && obj.sprite.x <= sec + 250)
          {
            list.push(obj);
          }
        });
      }
    }
  }
}

const Player =
{
  sprite: PIXI.Sprite.from('hooded-assassin.png'),
  isjumping: false,
  isstanding: false,
  isColliding: function(other){
    let colliding = false;
    if(this.sprite.x < other.sprite.x + other.sprite.width &&
      this.sprite.x + this.sprite.width > other.sprite.x &&
      this.sprite.y + this.sprite.height > other.sprite.y &&
      this.sprite.y < other.sprite.y + other.sprite.height)
      {
        colliding = true;
        return colliding;
      }
    else
    {
      return colliding;
    }
  },
  isStanding: function(other)
  {
    if(this.sprite.y + this.sprite.height + 3 > other.sprite.y &&
      this.sprite.x + this.sprite.width - 3 >= other.sprite.x  &&
      this.sprite.x <= other.sprite.x + other.sprite.width - 3)
    {
      this.isstanding = true;
      return this.isstanding;
    }
    else
    {
      this.isstanding = false;
      return this.isstanding;
    }
  }
}

function createFloor()
{
  const floor =
  {
    sprite: PIXI.Sprite.from('brick-wall.png'),
  }
  new_floor = floor;
  new_floor.sprite.width = 50;
  new_floor.sprite.height = 50;
  return new_floor;
};

const Physics =
{
  gravity: 3
}

let level1 = Level;
let player1 = Player;
let brick_floor = createFloor();
let brick_floor2 = createFloor();
let physics = Physics;
let elapsed = 0;

player1.sprite.x = 50;
player1.sprite.y = 145;
player1.sprite.width = 50;
player1.sprite.height = 50;

brick_floor.sprite.x = 50;
brick_floor.sprite.y = 200;
brick_floor2.sprite.x = 150;
brick_floor2.sprite.y = 150;

let floors = [brick_floor, brick_floor2];
level1.divideSectors(floors);

app.stage.addChild(player1.sprite);
app.stage.addChild(brick_floor.sprite);
app.stage.addChild(brick_floor2.sprite);

document.addEventListener("keydown", keysMove);

function keysMove(event) {
  // 65 = "A"
  if(event.keyCode == 65)
  {
    player1.sprite.x -= 3;
  }
  // 68 = "D"
  else if(event.keyCode == 68)
  {
    player1.sprite.x += 3;
  }
  // 32 = "Space"
  else if(event.keyCode == 32)
  {
    if(player1.isstanding == true)
    {
      player1.isjumping = true;
    }
  }
};

app.ticker.add((delta)=>
{
  level1.sectors.forEach(function(list, sec)
  {
    if(player1.sprite.x > sec || player1.sprite.x <= sec + 250)
    {
      for(x in list)
      {
        player1.isStanding(list[x]);
        if(player1.isstanding == true)
        {
          break;
        }
      }
    }
  });

  if(player1.isjumping == true)
  {
    elapsed += delta;
    if(elapsed < 160.0)
    {
      player1.sprite.y -= 0.5;
    }
    else
    {
      player1.isjumping = false;
      elapsed = 0;
    }
  }
  if(player1.isjumping == false)
  {
      if(player1.isstanding == false)
      {
        player1.sprite.y += physics.gravity;
      }
  }

})
