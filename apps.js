const diceOnScreen = [];
let diceTotal = 0;
let diceCreated = 0;
// const dieFace = ["\u2680", "\u2681", "\u2682", "\u2683", "\u2684", "\u2685"]

const getRandomValue = (maximum, minimum) => {
    return Math.floor(Math.random() * (maximum - minimum) + minimum);
};

const addDice = () => {
    let newRandomValue = getRandomValue(7, 1);
    let newDieDiv = new Die(newRandomValue);
    diceOnScreen.push(newDieDiv);
    diceCreated += 1;
};

const rollDice = () => {
    for(let i = 0; i < diceOnScreen.length; i += 1) {
        diceOnScreen[i].roll();
    }
}

const addRolls = () => {
    for(let i = 0; i < diceOnScreen.length; i += 1) {
        diceTotal += diceOnScreen[i].value;
    }
    alert(`Your total is ${diceTotal}!`);
    resetDiceTotal();
};

const resetDiceTotal = () => {
    diceTotal = 0;
};

const resetDiceOnScreen = () => {
    location.reload();
};

$(`#newDieBtn`).click(addDice);
$(`#rollDiceBtn`).click(rollDice);
$(`#getSumBtn`).click(addRolls);
$(`#startOverBtn`).click(resetDiceOnScreen);

class Die {
    constructor(value) {
        this.value = value;
        this.id = diceCreated;
        this.div = $(`<div class="die "></div>`);
        this.div.attr(`id`, this.id);
        // this.div.attr(`class`, `die`);
        this.div.append(this.dieFace());
        $(`#diceContainerDiv`).append(this.div);
        console.log(this.value);

        this.div.click(() => {
            this.roll();
        });

        this.div.dblclick(() => {
            $(`#${this.id}`).remove();
            let index = diceOnScreen.findIndex((item) => item.id === this.id);
            diceOnScreen.splice(index, 1);
            // console.log(diceOnScreen);
            // diceOnScreen = diceOnScreen.filter((die) => die.id != this.id);
        });
    }

    roll() {
        this.newValue = getRandomValue(7, 1);
        this.value = this.newValue;
        this.div.empty().append(this.dieFace());
    }

    dieFace() {
       
            if (this.value === 1) {
                return `\u2680`;
            } else if (this.value === 2) {
                return `\u2681`;
            } else if (this.value === 3) {
                return `\u2682`;
            } else if (this.value === 4) {
                return `\u2683`;
            } else if (this.value === 5) {
                return `\u2684`;
            } else if (this.value === 6) {
                return `\u2685`;
            }
    }
}
