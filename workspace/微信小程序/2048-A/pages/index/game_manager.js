const Grid = require('./grid.js');
function GameManager(size) {
    this.size = size;
    this.startTiles = startTiles;
}
GameManager.prototype = {
    setup: function () {
        this.grid = new Grid(this.size);
        // 随机添加方块
        this.addStartTiles();
        return this.grid.cells;
    },
    addStartTiles: function () {
        // 有几块 调用几块
        for (let i = 0; i < this.startTiles; i++) {
            this.addRandomTiles();
        }
    },
    addRandomTiles: function(){
        // 添加方块
        // 1.位置随机 2.数值随机
        const value = Math.random() < 0.9 ? 2 : 4;
        // grid 有数据 知道 哪些位置空着
        const position = this.grid.randomAvailableCell();
    }
}
module.exports = GameManager;