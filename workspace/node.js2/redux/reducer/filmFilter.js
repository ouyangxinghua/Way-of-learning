module.exports = function(state = [1], action) {
  switch (action.type){
    case 'ouyang':
      return state*10
  }
  return state;
}