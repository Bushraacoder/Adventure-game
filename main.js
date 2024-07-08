import inquirer from "inquirer";
class Player {
    name;
    fuel = 100;
    constructor(name) {
        this.name = name;
    }
    fuelDecrease() {
        this.fuel -= 25;
    }
    fuelIncrease() {
        this.fuel = 100;
    }
}
class Opponent {
    name;
    fuel = 100;
    constructor(name) {
        this.name = name;
    }
    fuelDecrease() {
        this.fuel -= 25;
    }
}
async function main() {
    let playerInfo = await inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Please enter your name:"
        }
    ]);
    let opponentInfo = await inquirer.prompt([
        {
            name: "select",
            type: "list",
            message: "Select your opponent:",
            choices: ["skeleton", "alien", "zombie"]
        }
    ]);
    let p1 = new Player(playerInfo.name);
    let o1 = new Opponent(opponentInfo.select);
    while (true) {
        let ask = await inquirer.prompt([
            {
                name: "opt",
                type: "list",
                message: "What would you like to do?",
                choices: ["attack", "drink potion", "run for your life..."]
            }
        ]);
        if (ask.opt === "attack") {
            let num = Math.floor(Math.random() * 2);
            if (num === 1) {
                p1.fuelDecrease();
                console.log(`${p1.name}'s fuel is ${p1.fuel}`);
                if (p1.fuel <= 0) {
                    console.log("You lose. Better luck next time!");
                    break;
                }
            }
            else {
                o1.fuelDecrease();
                console.log(`${o1.name}'s fuel is ${o1.fuel}`);
                if (o1.fuel <= 0) {
                    console.log("You win!");
                    break;
                }
            }
        }
        else if (ask.opt === "drink potion") {
            p1.fuelIncrease();
            console.log(`You drink a health potion. Your fuel is ${p1.fuel}`);
        }
        else if (ask.opt === "run for your life...") {
            console.log("You lose. Better luck next time.");
            break;
        }
        // Check if either player or opponent is out of fuel
        if (p1.fuel <= 0) {
            console.log("You ran out of fuel. Game over!");
            break;
        }
        else if (o1.fuel <= 0) {
            console.log("Opponent ran out of fuel. You win!");
            break;
        }
    }
}
main().catch(console.error);
