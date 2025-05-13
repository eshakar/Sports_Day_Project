function OpeningCeremony(callback){
    console.log("Let the games begin!");
    
    const score = {
        red: 0,
        blue: 0,
        green: 0,
        yellow: 0
    };

    console.log("Initial scores:", score);
    
    setTimeout(() => {
        callback(score, Race100M);
    }, 1000);
}

// Simulates a 100m race

 function Race100M(score, callback){
    console.log("\n---- Race 100M Event ----");
    console.log("Previous scores:", {...score});

    const raceResults = {};
    const colors = Object.keys(score);

    colors.forEach(color => {
        raceResults[color] = parseFloat((Math.random() * 5 + 10).toFixed(2));
    });
    
    console.log("Race results (in seconds):", raceResults);

    const sortedColors = colors.sort((a, b) => raceResults[a] - raceResults[b]);

    score[sortedColors[0]] += 50;
    score[sortedColors[1]] += 25;
    score[sortedColors[2]] += 10;

    console.log(`${sortedColors[0]} came in 1st place (+50 points)`);
    console.log(`${sortedColors[1]} came in 1st place (+25 points)`);
    console.log(`${sortedColors[2]} came in 1st place (+10 points)`);
    console.log(`${sortedColors[3]} came in 1st place (+0 points)`);
    
    console.log("Updated scores:", score);
    
    setTimeout(() => {
        callback(score, LongJump);
    }, 3000);
 }

//  Simulate a long jump event

function LongJump(score, callback) {
    console.log("\n----- Long Jump Event -----");
    console.log("Previous scores:", {...score});

    const colors = Object.keys(score);

    const winnerIndex = Math.floor(Math.random() * colors.length);
    const winner = colors[winnerIndex];

    score[winner] += 150;

    console.log(`${winner} team won the long jump event! (+150 points)`);
    console.log("Updated scores:", score);

    
    setTimeout(() => {
        callback(score, HighJump);
    }, 2000);
}

// Simulate a high jump event with user input

function HighJump(score, callback) {
    console.log("\n----- HIGH JUMP EVENT -----");
    console.log("Previous scores:", {...score});
    
    const processHighJump = (color) => {
        if (color && score.hasOwnProperty(color.toLowerCase())) {
            const selectedColor = color.toLowerCase();

            score[selectedColor] += 100;
            console.log(`${selectedColor} team won the high jump event! (+100 points)`);

        } else {
            console.log("Event was cancelled due to invalid input or no response");

            Object.keys(score).forEach(color => {
                score[color] += 25;
            });
            console.log("All teams receive 25 points each");
        }

        console.log("Updated scores:", score);

        callback(score);
    };

    console.log("Which color secured the highest jump? (red/blue/green/yellow)");

    const simulatedUserInput = "blue";
    console.log(`User input: ${simulatedUserInput}`);
    processHighJump(simulatedUserInput);
}

// Announces the final scores and winners

function AwardCeremony(score) {
    console.log("\n----- AWARD CEREMONY -----");
    console.log("Final scores:", score);

    const sortedTeams = Object.entries(score)
        .sort((a, b) => b[1] - a[1])
        .map(([color, points]) => ({ color, points }));

    console.log("\n🏆 FINAL STANDINGS 🏆");
    sortedTeams.forEach((team, index) => {
        console.log(`${index + 1}. ${team.color}: ${team.points} points`);
    });
    console.log(`\nCongratulations to ${sortedTeams[0].color} team for winning the Sports Day with ${sortedTeams[0].points} points!`);
    console.log("Thank you all for participating!");
}

console.log("===== SPORTS DAY SIMULATION =====");
OpeningCeremony((score, nextEvent) => {
  nextEvent(score, (updatedScore, nextCallback) => {
    nextCallback(updatedScore, (finalScore, lastCallback) => {
      lastCallback(finalScore, AwardCeremony);
    });
  });
});
