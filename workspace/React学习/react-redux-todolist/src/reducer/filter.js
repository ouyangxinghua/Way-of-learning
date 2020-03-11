// ALL ACTIVE COMPLETED

export default (state = 'ALL', action) => {
  console.log(action)
  if (['ALL','ACTIVE', 'COMPLETED'].includes(action.type)) {
    return action.type;
  }
  return state;
}