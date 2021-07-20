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
const validateInput = (tar, id, value) => {
  let msg = `Can't be less than 1`;
  if (id === "tip") {
    tar = document.querySelector("#tip-custom>input");
  }
  if (value <= 0) {
    tar.classList.add(`__my-input-error`);
    document.querySelector(`#input-${id}-error`).innerHTML = msg;
    return false;
  } else {
    tar.classList.remove(`__my-input-error`);
    document.querySelector(`#input-${id}-error`).innerHTML = ``;
    return true;
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
    validateInput(event.target, "tip", tip_value) && updateValue();
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
  validateInput(event.target, "bill", bill_value) && updateValue();
});
document.querySelector("#input-cnt").addEventListener("input", (event) => {
  people_count = Number(event.target.value);
  validateInput(event.target, "people", people_count) && updateValue();
});
document.querySelector("#__my-form").addEventListener("reset", () => {
  document.querySelector("#tip-val").innerHTML = `$0.00`;
  document.querySelector("#total-val").innerHTML = `$0.00`;
  ["bill", "tip", "people"].forEach((x) => {
    document.querySelector(`#input-${x}-error`).innerHTML = ``;
  });
  document.querySelectorAll(".__my-input-error").forEach((inp) => {
    inp.classList.remove("__my-input-error");
  });
  realButtons.forEach((x) => {
    x.classList.remove("active-btn");
    if (x.id === "tip-custom") {
      x.children[0].addEventListener("input", (event) => {
        x.value = undefined;
      });
    }
  });
  document.querySelector("input[type='reset']").disabled = true;

  tip_value = 0;
  bill_value = 0;
  people_count = 0;
});
