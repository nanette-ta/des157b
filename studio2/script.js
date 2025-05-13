let globalData;
async function getData(){
    const myHours = await fetch('hour.json');
    const data = await myHours.json();
    // console.log(data);
    globalData = data;
    // document.querySelector('#hours').innerHTML = outputHTML(data);
    document.querySelector('#picker').innerHTML = createSelectList(data);
}

function outputHTML(data){
    const time = ['6', '7', '8', '9', '10', '11'];
    const html = `<p>On ${data.point2.day} I got ${data.point2.hours} hours of sleep because ${data.point2.reason}.</p>`;
    return html;
}

function createSelectList(data){
    let html = '<option>Select a Day!</option>';
    const dataPoints = Object.keys(data);
    console.log(dataPoints);
    dataPoints.forEach( function(eachPoint){
        html += `<option value="${eachPoint}">${data[eachPoint].day}</option>`;
    } );
    return html;
}

document.querySelector('#picker').addEventListener('change', function(){
    const newValue = this.value;
    updateInterface(newValue, globalData);
});

function updateInterface(value, jsonData){
    const time = ['6', '7', '8', '9', '10', '11'];
    let html = '<p>';
    html += `On ${jsonData[value].day} I got ${jsonData[value].hours} hours of sleep because ${jsonData[value].reason}.`;
    html += '</p>';
    document.querySelector('#result').innerHTML = html;
}


getData();