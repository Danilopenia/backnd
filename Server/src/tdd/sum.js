const sum = (...nums) => {
    if (nums.length===0) return 0;
    if(nums.some(each=> typeof each !=="number")) return null
    return nums.reduce((acumulador, elemento)=>acumulador + elemento)


};
let testOk = 0;
let testFail = 0;

function test1() {
  winstonLog.INFO("TEST1: debe retornar 0 si no recibe parametros");
  const test = sum();
  if (test === 0) {
    winstonLog.INFO("test1 ok");
    testOk++;
  } else {
    winstonLog.INFO("TEST1: FAIL! se esperaba 0 se obtuvo: " + test);
    testFail++;
  }
}
test1();

function test2() {
  winstonLog.INFO("TEST2: debe retornar null si recibe parametros no numericos");
  const test = sum(10, "10");
  if (test === null) {
    winstonLog.INFO("TEST2 ok");
    testOk++;
  } else {
    winstonLog.INFO("TEST2: FAIL! se esperaba null y se obtuvo" + test);
    testFail++;
  }
}

test2();

function test3() {
  winstonLog.INFO("TEST3: debe sumar correctamente los numeros");
  const test = sum(10, 10);
  if (test === 20) {
    winstonLog.INFO("TEST 3: OK!");
    testOk++;
  } else {
    winstonLog.INFO("TEST 3: FAIL! se esperaba 20 y se obtuvo" + test);
    testFail++;
  }
}
test3();


function test4() {
  winstonLog.INFO("TEST4: debe sumar correctamente cualquier cantidad de numeros");
  const test = sum(10, 10, 20, 30, 40);
  if (test === 110) {
    winstonLog.INFO("TEST4: OK!");
    testOk++;
  } else {
    winstonLog.INFO("TEST4: FAIL! se esperaba 110, se obtuvo: " + test);
    testFail++;
  }
}
test4();

winstonLog.INFO({ testOk, testFail });
