const initial = [
    {name: "Ann", price: 50, occupation: "teacher"},
    {name: "David", price: 25, occupation: "programmer"},
    {name: "Susan", price: 40, occupation: "driver"},
];

const freelancers = [
  { name: "Dr. Slice", price: 25, occupation: "gardener" },
  { name: "Dr. Pressure", price: 51, occupation: "programmer" },
  { name: "Prof. Possibility", price: 43, occupation: "teacher" },
  { name: "Prof. Prism", price: 81, occupation: "teacher" },
  { name: "Dr. Impulse", price: 43, occupation: "teacher" },
  { name: "Prof. Spark", price: 76, occupation: "programmer" },
  { name: "Dr. Wire", price: 47, occupation: "teacher" },
  { name: "Prof. Goose", price: 72, occupation: "driver" },
];

let totalCost = 0;
let totalPeople = 0;

function addPeople(array) {
  for (const person of array) {
    const table = document.querySelector("#table");
    let row = table.insertRow(-1);
    let cell1 = row.insertCell(0);
    cell1.innerHTML = person.name;
    let cell2 = row.insertCell(1);
    cell2.innerHTML = person.price;
    cell2.style.textAlign = "center";
    let cell3 = row.insertCell(2);
    cell3.innerHTML = person.occupation;
    totalCost += person.price;
    totalPeople += 1;
  }
}

function setInitialTable(initial) {
  addPeople(initial);
  let average = totalCost / totalPeople;
  average = (Math.round(average * 100) / 100).toFixed(2);
  let textNode = document.createTextNode(`The average price is $${average}`);
  const p = document.getElementById("average");
  p.appendChild(textNode);
}

function setAverage() {
  let average = totalCost / totalPeople;
  average = (Math.round(average * 100) / 100).toFixed(2);
  const p = document.getElementById("average");
  p.innerHTML = `The average price is $${average}`;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function addRestOfPeople(array) {
  let index = 0;
  let numUsed = [];
  function delayed() {
    if (index < array.length) {
      // Make it so a random freelancer is added each loop
      let random = getRandomInt(array.length - 1);
      while (numUsed.includes(random)) {
        random = getRandomInt(array.length - 1);
      }
      const person = array[random];

      const table = document.querySelector("#table");
      let row = table.insertRow(-1);
      let cell1 = row.insertCell(0);
      cell1.innerHTML = person.name;
      let cell2 = row.insertCell(1);
      cell2.innerHTML = person.price;
      cell2.style.textAlign = "center";
      let cell3 = row.insertCell(2);
      cell3.innerHTML = person.occupation;
      totalCost += person.price;
      totalPeople += 1;

      // Make sure there are not repeats of freelancers
      numUsed.push(random);
      // Increment Index, reset the average, add timeout
      index++;
      setAverage();
      setTimeout(delayed, 1000);
    }
  }
  delayed();
}

setInitialTable(initial);
addRestOfPeople(freelancers);