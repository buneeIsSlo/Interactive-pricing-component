//Selecting elements for DOM manipulation
const slider = document.querySelector(".slider");
const price = document.getElementById("price");
const pageViews = document.getElementById("views");
const toggle = document.getElementById("checked");
const discount = document.querySelector(".discount")

//Regular Expressinons for replacing values
let [priceRegEx, pageRegEx,] = [/\d+/, /\d+[A-Z]/];

//Check if toggle's already toggled.
const ifToggled = num => {
    let replace = num - num * .25;
    if(toggle.checked) {
        price.innerHTML = price.innerText.replace(priceRegEx, replace);
    } if(!toggle.checked) {
        price.innerHTML = price.innerText.replace(priceRegEx, num);
    }
};

//Listen for click events on toggle
const justToggled = num => toggle.addEventListener("click", event => {
    ifToggled(num);
});

//Changes discount text
const changeDis = mq => {
    if(mq.matches) discount.innerHTML = "-25%";
    else discount.innerHTML = "-25% discount";
}

//Functions to complete when the slider thumb is moved.
slider.oninput = () => {

    /* console.log(slider.value); //Logs the input value */
    let sliderValue = slider.value;


    slider.addEventListener("mousemove", () => {
        const color = `linear-gradient(90deg, hsl(174, 77%, 80%) ${sliderValue * 25}%, hsl(226deg 68% 95%) ${sliderValue * 25}%)`;
        let replacePageVal = [];

        //Changes the background as the slider thumb is moved using the input value.
        slider.style.background = color;

        //Changes price and pageviews values.
        switch (sliderValue) {

            case "0":
                ifToggled(8);
                justToggled(8);
                replacePageVal.push("10K");
                break;
            case "1":
                ifToggled(12);
                justToggled(12);
                replacePageVal.push("50K");
                break;
            case "2":
                ifToggled(16);
                justToggled(16);
                replacePageVal.push("100K");
                break;
            case "3":
                ifToggled(24);
                justToggled(24);
                replacePageVal.push("500K");
                break;
            case "4":
                ifToggled(36);
                justToggled(36);
                replacePageVal.push("1M");
                break;

        }
        pageViews.innerHTML = pageViews.innerText.replace(pageRegEx, replacePageVal[0]);

    });

}

//Media query to change discount text
let mediaQuery = window.matchMedia("(max-width: 377px)");
changeDis(mediaQuery);
mediaQuery.addListener(changeDis);

//Listen for click events on toggle when the widow loads
window.addEventListener("load", () => {
    justToggled(16);
})


