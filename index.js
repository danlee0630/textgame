class zone {
    constructor(zName, zDesc){
      this._zName = zName
      this._zDesc = zDesc
      this._linkedZones = {}
    }
  
    linkZone(direction, zone){
      this._linkedZones[direction] = zone;
    }
  
    move(direction) {
        if (direction in this._linkedZones){
            return this._linkedZones[direction];
        } else {
            alert ("Obstacles ahead, unable to move.");
            return this;
        }
    }

    get zName(){
      return this._zName;
    }
  
    get zDesc(){
      return this._zDesc;
    }
  
    set zName(value) {
      if (value.length <4){
        console.log("name is too short")
        return;
      }
      this._zName = value;
    }
  
    describe() {
      return "You step into " + this._zName + ". This area has" + this._zDesc + ".";
    }
  
  }
  
class Character{
    constructor(cName, cDesc, cConversation){
        this._cName = cName;
        this._cDesc = cDesc;
        this._cConversation = cConversation;
    }

    get zName(){
        return this._zName;
    }

    get cDesc(){
        return this._cDesc;
    }

    get cConversation(){
        return this._cConversation;
      }

    set cName(value){
        if (value.length <4){
            console.log("name is too short");
            return;
        }
        this._cName = value
    }

    talk() {
        return this._cName + " says " + this._cConversation
    }

    describe(){
        return"you can see " + this._cName + " they are " + this._cDesc;
    }
}

class Enemy extends Character{
    constructor(eName, eDesc, eConversation, eWeakness){
    super(eName, eDesc, eConversation, eWeakness)
    this._eWeakness = eWeakness
    }

    fight(item){
        if (item === this._eWeakness){
            return true;
        } else {
            return false;
        }

    }

    talk(){
        return this._cName +" growls " + this._cConversation;
    }
}

const Pete = new Enemy("Pete", "a smellyzombie", "grr brains", "cheese")
console.log(Pete.describe());
console.log(Pete.talk());
console.log(Pete.fight("drum"));
console.log(Pete.fight("cheese"));

const Bob = new Character("bob", "a friendly skellington", "Hello I am Bob")
console.log(Bob.describe());
console.log(Bob.talk());

  const Grassland = new zone("Grassland", " plain and wide view ")
  const Forest = new zone("Forst", " alot of trees ")
  const PetrolStation = new zone("Petrol Station", " quite and terrible ")
  const Road = new zone("a Road", " long and nobody here ")
  const Shop = new zone("a Shop", " look like ruins ")
  const Warehouse = new zone("a Warehouse", " poor smell and there painting on the wall'go to Town Hall if you alive ")
  const Cliff = new zone("Cliff", " it is danger and you can hear the sound of wave ")
  const CarPark = new zone("Car Park", "few cars here, but they are all broken")
  const Sewer = new zone("Sewer", "Echo cho ho o o o ......, there are...")
  const Village = new zone("Village", "It looks old and dilapidated ")
  const TownHall = new zone("Town Hall", "Someone is there, chase? ")
  const SafetyRoom = new zone("Safety Room", "Someone is there, chase? ")

  const Sea = new zone("Sea", "You fall from the cliff, YOU DEAD!!!")


  const images = [];

  images[0] = ""
  images[1] = ""
  images[2] = ""
  images[3] = ""
  images[4] = ""
  images[5] = ""
  images[6] = ""
  images[7] = ""
  images[8] = ""
  images[9] = ""
  images[10] = ""
  images[11] = ""
  images[12] = ""
  images[13] = ""
//////////////////////////////////////////////
//         //         //        //          //
//Grassland   Petrol      Shop    Warehouse //
//         // Station //        //          //
/////  /////////  /////////  ////////  ///////
//        //          //        //          //
// Forest      Road       Car       Sever   //
//        //          //  Park  //          //
/////  /////////  ////////////////////////////
//       //          //        //           //
// Cliff     Village     Town      Safety   //
//       //          //  Hall  //  Room     //
//////////////////////////////////////////////

 /**
 * links for Grassland E & S
 */
  Grassland.linkZone("e", PetrolStation)
  Grassland.linkZone("s", Forest)

 /**
 * links for Petrol Station E, S & W
 */
  PetrolStation.linkZone("e", Shop)
  PetrolStation.linkZone("s", Road)
  PetrolStation.linkZone("w", Grassland)

 /**
 * links for Shop E, S & W
 */
  Shop.linkZone("e", Warehouse)
  Shop.linkZone("s", CarPark)
  Shop.linkZone("w", PetrolStation)

  /**
 * links for Warehouse S & W
 */
  Warehouse.linkZone("s", Sewer)
  Warehouse.linkZone("w", Shop)

 /**
 * links for Forest N, E & S
 */
  Forest.linkZone("n", Grassland)
  Forest.linkZone("e", Road)
  Forest.linkZone("s", Cliff)

/**
 * links for Road E, S, W & N
 */
  Road.linkZone("e", CarPark)
  Road.linkZone("s", Village)
  Road.linkZone("w", Forest)
  Road.linkZone("n", PetrolStation)
  
/**
 * links for Car Park E, W & N
 */
  CarPark.linkZone("e", Sewer)
  CarPark.linkZone("w", Road)
  CarPark.linkZone("n", Shop)

 /**
 * links for Sewer W & N
 */
  Sewer.linkZone("w", CarPark)
  Sewer.linkZone("n", Warehouse)

/**
 * links for Cliff E, """S""" & N
 */
  Cliff.linkZone("e", Village)
  Cliff.linkZone("n", Forest)
  Cliff.linkZone("s", Sea)
 /**
 * links for Village E, W & N
 */
  Village.linkZone("e", TownHall)
  Village.linkZone("w", Cliff)
  Village.linkZone("n", Road)

 /**
 * links for Village E, W & N
 */
  Village.linkZone("e", TownHall)
  Village.linkZone("w", Cliff)
  Village.linkZone("n", Road)

 /**
 * links for Town Hall W & N
 */
  TownHall.linkZone("e", SafetyRoom)
  TownHall.linkZone("w", Village)

function display(currentZone) {
    const textContent = currentZone.describe();
    document.getElementById("textArea").innerHTML = textContent;
    document.getElementById("userInput").focus();
}

function startGame(){
    currentZone = Grassland;
    display(currentZone);

document.addEventListener("keydown", function(event){
    if (event.key === "Enter") {
        const command = document.getElementById("userInput").value.toLowerCase();
        const directions = ["n", "s", "e", "w"]
        if (directions.includes(command) ) {
            currentZone = currentZone.move(command);
            display(currentZone);
            if (currentZone == Sea){
                alert("GAME is OVER! You DIED!!!")
            }
            if (currentZone == SafetyRoom){
                alert("Congratulation! You reach to Safety Room")
            }
        } else {
            document.getElementById("userInput").value = "";
            alert("Enter 'e,s,w,n' for moving to any direction")
        }
  }})
}

startGame()