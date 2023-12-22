const genderImg = document.querySelector('#genderImg');
const male = document.querySelector('.male');
const female = document.querySelector('.female');

let nameResearch = ''

const getData = async (url) => {
    const request = await fetch(url);
    const data = await request.json();

    return data
}

const onChangeName = (e) => nameResearch = e.target.value;

const onClick = async () => {
    const url = `https://api.genderize.io?name=${nameResearch}`    

    const data = await getData(url)

    console.log(data)

    let malePersent = 100;
    let femalePersent = 100;

    switch(data.gender){
        case 'male':{
            malePersent = data.probability;
            femalePersent = 1 - malePersent;
        }break;
        case 'female': {
            femalePersent = data.probability;
            malePersent = 1 - femalePersent;
        } break;
    }

    console.log(malePersent, femalePersent);

    male.style.height = `${malePersent * 100}%`;
    female.style.height = `${femalePersent * 100}%`;

}