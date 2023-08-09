let favNumber = 25;
let url = "http://numbersapi.com";



async function number() {
    let data = await $.getJSON(`${url}/${favNumber}?json`);
    console.log(data);
}

number();

let nums = [17, 23, 45];
async function numbers() {
    let data = await $.getJSON(`${url}/${nums}?json`);
    console.log(data);
}

numbers();

async function favorite() {
    let facts = await Promise.all(
        Array.from({ length: 4 }, () => $.getJSON(`${url}/${favNumber}?json`))
        );
    facts.forEach(data => {
        $('body').append(`<p>${data.text}</p>`);
        });
      }
favorite();