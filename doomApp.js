function doomArmour(health, armour, hit){
    let initDamage = armour - hit;
    if(initDamage < 0){
        //remember to use plus to add, otherwise minus reverses
        health = health + initDamage;
        return 'Health: ' + health + ' Armour: 0';
    }
    return 'Health: ' + health + ' Armour: ' + initDamage;
}

document.addEventListener("DOMContentLoaded", function () {
    // Wait for the DOoM to be fully loaded before adding event listeners.

    var calculateButton = document.getElementById("calculateButton");
    var health1Input = document.getElementById("number1");
    var armour2Input = document.getElementById("number2");
    var hitPoint3Input = document.getElementById("number3");
    var resultParagraph = document.getElementById("result");


    
    calculateButton.addEventListener("click", function () {
        var health1 = parseFloat(health1Input.value);
        var armour2 = parseFloat(armour2Input.value);
        var hitPoint3 = parseFloat(hitPoint3Input.value);
        
        if (!isNaN(health1) && !isNaN(armour2) && !isNaN(hitPoint3)) {
            //var sum = number1 + number2;
            let initDamage = armour2 - hitPoint3;
            if(initDamage < 0){
                //remember to use plus to add, otherwise minus reverses
                health1 = health1 + initDamage;
                resultParagraph.textContent = 'Health: ' + health1 + ' Armour: 0';
            } else {
                resultParagraph.textContent = 'Health: ' + health1 + ' Armour: ' + initDamage;
            }
        } else {
            resultParagraph.textContent = "Please enter valid numbers.";
        }
    });
});

console.log(doomArmour(100, 20, 10)) // Return Life 100 Armour 10
console.log(doomArmour(100, 20, 30)) // Return Life 90 Armour 0
console.log(doomArmour(100, 20, 72)) // Return Life 48 Armour 0
console.log(doomArmour(100, 20, 20)) // Return Life 100 Armour 0
console.log(doomArmour(100, 100, 50)) // Return Life 100 Armour 50
console.log(doomArmour(100, 100, 128)) // Return Life 72 Armour 0
console.log(doomArmour(100, 100, 103)) // Return Life 97 Armour 0
console.log(doomArmour(87, 23, 33)) // Return Life 77 Armour 0
console.log(doomArmour(87, 34, 33)) // Return Life 87 Armour 1