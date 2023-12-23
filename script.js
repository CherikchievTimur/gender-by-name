const female = document.querySelector(".female");
const male = document.querySelector(".male");

const percentFemale = document.querySelector(".percent-female");
const percentMale = document.querySelector(".percent-male");

let nameResearch = ''

const getData = async (url) => {
    const request = await fetch(url);
    const data = await request.json();

    return data
}

const onChangeName = (e) => nameResearch = e.target.value;

const onClick = async () => {
    const url = `https://api.genderize.io?name=${nameResearch}`

    const data = await getData(url);

    redrawImages(calcGenderPercentage(data));

    /*let malePersent = .5;
    let femalePersent = .5;

    switch (data.gender) {
        case 'male': {
            malePersent = data.probability;
            femalePersent = 1 - malePersent;
        } break;
        case 'female': {
            femalePersent = data.probability;
            malePersent = 1 - femalePersent;
        } break;
    }

    console.log(malePersent, femalePersent);

    male.style.height = `${malePersent * 100}%`;
    female.style.height = `${femalePersent * 100}%`;*/
}

const calcGenderPercentage = (data) => {
    const genderPercentage = {
        gender: data.gender,
        female: 0.5,
        male: 0.5
    }

    switch (genderPercentage.gender) {
        case 'male': {
            genderPercentage.male = data.probability;
            genderPercentage.female = 1 - genderPercentage.male;
        } break;
        case 'female': {
            genderPercentage.female = data.probability;
            genderPercentage.male = 1 - genderPercentage.female;
        } break;
    }

    return genderPercentage;
}

const redrawImages = (genderPercentage) => {
    let pMale = genderPercentage.male;
    let pFemale = genderPercentage.female;

    if (pMale && pMale <= .1) {
        pMale = .15;
        pFemale = .85;
    }
    else if (pFemale && pFemale <= .1) {
        pMale = .85;
        pFemale = .15;
    }

    const percentageFemale = pFemale * 100;
    const percentageMale = pMale * 100;

    const femaleBounding = female.getBoundingClientRect();

    female.style.clipPath = `inset(0px ${percentageMale}% 0px 0px)`;
    male.style.clipPath = `inset(0px 0px 0px ${percentageFemale}%)`;

    percentFemale.style.top = `${femaleBounding.top + 30}px`
    percentMale.style.top = `${femaleBounding.top + 30}px`

    if (genderPercentage.female) {
        percentFemale.textContent = (genderPercentage.female * 100).toFixed(0);
        percentFemale.style.left = `${femaleBounding.left + femaleBounding.width * pFemale - 40}px`
    }
    if (genderPercentage.male) {
        percentMale.textContent = (genderPercentage.male * 100).toFixed(0);
        percentMale.style.left = `${femaleBounding.left + femaleBounding.width * pFemale + 20}px`
    }
}

