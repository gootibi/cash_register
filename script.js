let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];
let cash = 0;

const inputCash = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const changeDue = document.getElementById('change-due');

const checkCashRegister = (price, cash, cid) => {

  let returnCash = parseFloat((cash - price).toFixed(2));
  let arr = [];
  let sum = 0;
  let str = '';

  cid.forEach(item => {
    sum = parseFloat((sum + item[1]).toFixed(2));
  });

  let closeReturnCash = returnCash;

  const checker = (num, numArrItem, str) => {
    if (returnCash >= num) {
      if (returnCash - cid[numArrItem][1] >= 0) {
        arr.push(cid[numArrItem]);
        returnCash = returnCash - cid[numArrItem][1];
      } else {
        let count = 0;
        while (returnCash >= num && cid[numArrItem][1] >= num) {
          returnCash -= num;
          cid[numArrItem][1] -= num;
          count += num;
        }
        arr.push([str, count]);
      }
    }
  }

  checker(100, 8, "ONE HUNDRED");
  checker(20, 7, "TWENTY");
  checker(10, 6, "TEN");
  checker(5, 5, "FIVE");
  checker(1, 4, "ONE");
  checker(0.25, 3, "QUARTER");
  checker(0.1, 2, "DIME");
  checker(0.05, 1, "NICKEL");

  if (returnCash >= 0.01) {
    if (parseFloat((returnCash - cid[0][1]).toFixed(2)) >= 0) {
      arr.push(cid[0]);
      console.log(cid[0]);
      returnCash = parseFloat((returnCash - cid[0][1]).toFixed(2));
    } else {
      let count = 0;
      while (returnCash >= 0.01 && cid[0][1] >= 0.01) {
        returnCash = parseFloat((returnCash - 0.01).toFixed(2));
        cid[0][1] = parseFloat((cid[0][1] - 0.01).toFixed(2));
        count = parseFloat((count + 0.01).toFixed(2));
      }
      arr.push(["PENNY", count]);
    }
  }

  str = resumeStr(arr);

  if (returnCash == 0 && parseFloat((sum - closeReturnCash).toFixed(2)) == 0) {
    changeDue.innerHTML = `<p>Status: CLOSED</p>${str}`//closeStatus;
  } else if (returnCash == 0 && parseFloat((sum - closeReturnCash).toFixed(2)) > 0) {
    changeDue.innerHTML = `<p>Status: OPEN</p>${str}`//openStatus;
  } else if (returnCash > 0) {
    changeDue.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`; //insufficientStatus
  }
}

purchaseBtn.addEventListener('click', () => {
  cash = inputCash.value;
  if (cash < price) {
    alert('Customer does not have enough money to purchase the item');
    return;
  }
  if (cash == price) {
    changeDue.textContent = 'No change due - customer paid with exact cash';
    return;
  }
  checkCashRegister(price, cash, cid);
});

const resumeStr = (arr) => {
  let str = '';
  arr.forEach(unit => {
    str += unit[1] != 0 ? `<p>${unit[0]}: $${unit[1]}</p>` : '';
  })
  return str;
};