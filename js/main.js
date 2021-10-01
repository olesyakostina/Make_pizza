const inputsCheckbox = document.querySelectorAll(
    ".container-custom-checkbox input"
);
const ingredients = document.querySelectorAll(".current-pizza-item");
const drinks = document.querySelectorAll(".select-drink-item");
const totalAmount = document.querySelector(".total-amount>.summa");
const orderBtn = document.querySelector(".typical-btn");
const modalWindow = document.querySelector(".modal-window ");
const submitBtn = document.querySelector(".modal-window__submit-btn");

const subject = document.querySelector(".modal-window__subject");
const ingredientsSpan = document.querySelector(".modal-window__ingredients");
const drinksSpan = document.querySelector(".modal-window__drinks");

/*Adding ingredients to pizza*/
const addIngredients = (checkboxes) => {
    // преврашаем псевдомассив checkboxes в массив
    const nodesArray = Array.from(checkboxes);
    const ingredientsArray = Array.from(ingredients);
    ingredientsArray.splice(0, 2); // выезаем первые 2 элемента, тк они по умолчанию всегда есть и перебирать их не ну;но

    for (let node of checkboxes) {
        node.addEventListener("click", (e) => {
            e.target.parentNode.classList.toggle("active");
            const index = nodesArray.indexOf(e.target); //узнаем индекс по которому кликнули
            ingredientsArray[index].classList.toggle("active");
            calculateOrder();
        });
    }
};
addIngredients(inputsCheckbox);

/*Adding ingredients to drinks*/

const addDrinks = (drinkItems) => {
    for (let item of drinkItems) {
        item.addEventListener("click", (event) => {
            event.target.parentNode.classList.toggle("active");
            calculateOrder();
        });
    }
};
addDrinks(drinks);

/*Calculate order*/

const calculateOrder = () => {
    const ingredients = document.querySelectorAll(
        ".container-custom-checkbox.active"
    );
    const drinks = document.querySelectorAll(".select-drink-item.active");
    const startPrice = 300;
    const ingredientsPrice = ingredients.length * 25;
    const drinksPrice = drinks.length * 95;

    totalAmount.innerHTML = `${startPrice + ingredientsPrice + drinksPrice}₽`;
};
/*Modal window for order*/

window.addEventListener("click", (e) => {
    if (e.target === modalWindow) {
        modalWindow.classList.add("none");
    }
});
submitBtn.addEventListener("click", () => {
    modalWindow.classList.add("none");
});

const prepareWindowModalContent = () => {
    subject.innerHTML = "";
    ingredientsSpan.innerHTML = "";
    drinksSpan.innerHTML = "";

    const addedIngredients = document.querySelectorAll(
        ".container-custom-checkbox.active"
    );
    const addedDrinks = document.querySelectorAll(".select-drink-item.active");

    let ingredientsList = [];
    if (addedIngredients) {
        for (let ingredient of addedIngredients) {
            ingredientsList.push(ingredient.innerText);
        }
    }

    let drinksList = [];
    if (addedDrinks) {
        for (let drink of addedDrinks) {
            drinksList.push(drink.dataset.name);
        }
    }
    // console.log(ingredientsList);
    // console.log(drinksList);
    const totalIngredients = ingredientsList.join(", ") || "нет ингредиентов"; // превращаем массив в строку
    const totaldrinks = drinksList.join(", ") || "нет напитков"; // превращаем массив в строку

    const totalText = `Вы заказали пиццу с ингредиентами:'${totalIngredients}', а также напитки:' ${totaldrinks}', c Вас : '${totalAmount.innerHTML}'`;
    subject.innerHTML = totalText;
};

orderBtn.addEventListener("click", () => {
    modalWindow.classList.remove("none");
    prepareWindowModalContent();
});
