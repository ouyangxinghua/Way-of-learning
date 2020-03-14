'use strict';

var main = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var d;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        console.log('Random is: ');
                        _context.next = 3;
                        return sleep(2);

                    case 3:
                        d = _context.sent;

                        console.log(d);
                        return _context.abrupt('return', d);

                    case 6:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function main() {
        return _ref.apply(this, arguments);
    };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// import { a } from './index'
// a(2)

function sleep(time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(Math.random() * 10 >> 0);
        }, time * 1000);
    });
}

var rst = main();

var b = function b() {
    console.log('ouyang');
};
b();

// babel-node app.js  要用这个命令执行，不能直接用node
