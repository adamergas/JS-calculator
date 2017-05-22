var decimal = false;
var operator = false;
var equated = false;
var equation = [];

$(document).ready(function() {
  $("#zero").on("click", function(){ addNumber(0); });
  $("#1").on("click", function(){ addNumber(1); });
  $("#2").on("click", function(){ addNumber(2); });
  $("#3").on("click", function(){ addNumber(3); });
  $("#4").on("click", function(){ addNumber(4); });
  $("#5").on("click", function(){ addNumber(5); });
  $("#6").on("click", function(){ addNumber(6); });
  $("#7").on("click", function(){ addNumber(7); });
  $("#8").on("click", function(){ addNumber(8); });
  $("#9").on("click", function(){ addNumber(9); });
  $("#dec").on("click", function(){ addDecimal(); });
  $("#sign").on("click", function(){ changeSign(); });
  $("#plus").on("click", function(){ addOperator('+'); });
  $("#minus").on("click", function(){ addOperator('-'); });
  $("#divide").on("click", function(){ addOperator('/'); });
  $("#multiply").on("click", function(){ addOperator('x'); });
  $("#equal").on("click", function(){ equate(); });
  $("#AC").on("click", function(){ allClear(); });
});

function addNumber(num){
  if(equated) { delete $("#operation").text(''); }
  let who = $("#operation").text();
  if(/^(\D)/.test(who)){ $("#operation").text(""); }
  $("#operation").html( function(i, pre){
    return pre+num;
  });
  operator = false;
  equated = false;
}

function addDecimal(){
  if(equated) { delete $("#operation").text(''); }
  if(!decimal){
    $("#operation").html( function(i, pre){
      if(pre == '' || /[+-/*]/.test(pre)){ return 0+'.'; }
      return pre+'.';
    });
    decimal = true;
  }
  equated = false;
}

function addOperator(op){
  if(!operator){
    decimal = false;
    equation.push($("#operation").text());
    equation.push(op);
    $("#operation").html(op);
    operator = true;
    update();
  }
}

function changeSign(){
  if(!operator){
    $("#operation").html( function(i, pre){
      if(pre[0]==='-') { return pre.substr(1); }
      else { return '-'+pre; }
    });
  }
}

function equate(){
  equation.push($("#operation").text());
  equated = true;
  update();
  multiDiv();
  addSub();
  $("#operation").text(  equation[0] );
  equation = [];
}

function multiDiv(){
  for(let i = 0; i < equation.length; i++){
    if(equation[i] == 'x'){
      let val = equation[i-1] * equation[i+1];
      equation.splice(i-1, 3, val);
      multiDiv();
    }
    else if(equation[i] == '/'){
      let val = equation[i-1] / equation[i+1];
      equation.splice(i-1, 3, val);
      multiDiv();
    }
  }
}

function addSub(){
  for(let i = 0; i < equation.length; i++){
    if(equation[i] == '+'){
      let val = parseFloat(equation[i-1]) + parseFloat(equation[i+1]);
      equation.splice(i-1, 3, val);
      addSub();
    }
    else if(equation[i] == '-'){
      let val = parseFloat(equation[i-1]) - parseFloat(equation[i+1]);
      equation.splice(i-1, 3, val);
      addSub();
    }
  }
}

function update(){
  $("#queue").text(equation.join(' '));
}

function allClear(){
  delete $("#operation").text('');
  delete $("#queue").text('');
  equation = [];
  decimal = false;
  operator = true;
}
