// 会计 计算年终奖
// 绩效 S 5个月年终奖
// A 3
// B 2 
// C 1
// D 
// 一个个策略函数
var performanceX = function(salary){
    return salary * 60;
}
var performanceS = function(salary){
    return salary * 5;
}
var performanceA = function(salary){
    return salary * 3;
}
var performanceB = function(salary){
    return salary * 2;
}
var performanceC = function(salary){
    return salary * 1;
}
var calculateBounce = function(performanceLevel,salary) {
    if(performanceLevel === 'X'){
        return performanceX(salary);
    }
    if(performanceLevel === 'S'){
        return performanceS(salary);
    }
    if(performanceLevel === 'A'){
        return performanceA(salary);
    }
    if(performanceLevel === 'B'){
        return performanceB(salary);
    }
    if(performanceLevel === 'C'){
        return performanceC(salary);
    }
    if(performanceLevel === 'D'){
        return 0;
    }
}
// 可以如何优化代码？分支太多，计算策略太简陋了
// 会计是负责发钱的，制定发钱策略的区分开来，
console.log(calculateBounce('X',17000));