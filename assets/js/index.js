let tip_value = 0;
let bill_value = 0;
let people_count = 0;

const calculateFee = (tip, bill, cnt) => {
  let perPerson = ((tip / 100) * bill) / cnt;
  let total = perPerson + bill / cnt;
  // console.table({ tip, bill, cnt, perPerson, total });
  return { perPerson, total };
};
const updateValue = () => {
  const rstbtn = document.querySelector("input[type='reset']");
  rstbtn.disabled =
    tip_value !== 0 || bill_value !== 0 || people_count !== 0 ? false : true;

  const { perPerson, total } = calculateFee(
    tip_value,
    bill_value,
    people_count
  );

  if (isFinite(perPerson) && isFinite(total)) {
    document.querySelector("#tip-val").innerHTML = `$${perPerson.toFixed(2)}`;
    document.querySelector("#total-val").innerHTML = `$${total.toFixed(2)}`;
  } else {
    document.querySelector("#tip-val").innerHTML = `$0.00`;
    document.querySelector("#total-val").innerHTML = `$0.00`;
  }
};

const realButtons = document.querySelectorAll('button[id^="tip-"]');
realButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    realButtons.forEach((x) => {
      x.classList.remove("active-btn");
    });
    event.target.classList.add("active-btn");
    tip_value = Number(event.target.value);
    updateValue();
  });

  if (button.id === "tip-custom") {
    button.children[0].addEventListener("input", (event) => {
      button.value = event.target.value;
      button.click();
    });
  }
});
document.querySelector("#input-bill").addEventListener("input", (event) => {
  bill_value = Number(event.target.value);
  updateValue();
});
document.querySelector("#input-cnt").addEventListener("input", (event) => {
  people_count = Number(event.target.value);
  updateValue();
});
document.querySelector("#__my-form").addEventListener("reset", () => {
  document.querySelector("#tip-val").innerHTML = `$0.00`;
  document.querySelector("#total-val").innerHTML = `$0.00`;
  realButtons.forEach((x) => {
    x.classList.remove("active-btn");
    if (x.id === "tip-custom") {
      x.children[0].addEventListener("input", (event) => {
        x.value = undefined;
      });
    }
  });

  tip_value = 0;
  bill_value = 0;
  people_count = 0;
});
