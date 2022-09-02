// vaiables declaration
const hooby = ["work", "play", "study", "exercice", "social", "selfCare"];
const hoobyColor = [
  "hsl(15, 100%, 70%)",
  "hsl(195, 74%, 62%)",
  "hsl(348, 100%, 68%)",
  "hsl(145, 58%, 55%)",
  "hsl(264, 64%, 52%)",
  "hsl(43, 84%, 65%)",
];
const lst = document.querySelectorAll("li>span");
const hide = document.querySelectorAll("h2");
const items = document.querySelectorAll(".items");
const current = document.querySelectorAll(".curent");
const prevuis = document.querySelectorAll(".previous");
// set icon and color of background
let icon = document.querySelectorAll(".illu");
icon.forEach((icons) => {
  if (hooby.includes(icons.dataset.icon)) {
    if (icons.dataset.icon === "exercice") {
      icons.parentElement.children[0].parentElement.children[0].children[0].src = `/src/images/icon-exercise.svg`;
      icons.style.backgroundColor = hoobyColor[hooby.indexOf("exercice")];
    } else if (icons.dataset.icon === "selfCare") {
      icons.parentElement.children[0].parentElement.children[0].children[0].src = `/src/images/icon-self-care.svg`;
      icons.style.backgroundColor = hoobyColor[hooby.indexOf("selfCare")];
    } else {
      icons.parentElement.children[0].parentElement.children[0].children[0].src = `/src/images/icon-${icons.dataset.icon}.svg`;
      icons.style.backgroundColor =
        hoobyColor[hooby.indexOf(icons.dataset.icon)];
    }
  } else {
    console.warn("the icon does not exist");
  }
});
// toogle between state active or not
lst.forEach((item) => {
  item.addEventListener("click", () => {
    lst.forEach((i) => {
      i.classList.remove("active");
    });
    item.classList.add("active");
  });
});
// <=== get data from data.json ===>
const apiData = () => {
  fetch("../../data.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((elem, index) => {
        // add title to cards
        hide[index].textContent = elem.title;
        // Onclick on item
        items.forEach((element) => {
          element.addEventListener("click", () => {
            if (element.innerHTML == "Daily") {
              current[index].innerHTML = `${elem.timeframes.daily.current}hrs`;
              prevuis[
                index
              ].innerHTML = `Last Week - ${elem.timeframes.daily.previous}hrs`;
            } else if (element.innerHTML == "Weekly") {
              current[index].innerHTML = `${elem.timeframes.weekly.current}hrs`;
              prevuis[
                index
              ].innerHTML = `Last Week - ${elem.timeframes.weekly.previous}hrs`;
            } else if (element.innerHTML == "Monthly") {
              current[
                index
              ].innerHTML = `${elem.timeframes.monthly.current}hrs`;
              prevuis[
                index
              ].innerHTML = `Last Week - ${elem.timeframes.monthly.previous}hrs`;
            }
          });
        });
      });
    });
};
apiData();
