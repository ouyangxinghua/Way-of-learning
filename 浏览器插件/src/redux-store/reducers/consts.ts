const initialState = {
  hydrated: false
};

export default function consts(state = initialState, action: any) {
  if (!state.hydrated) {
    state = Object.assign({}, initialState, state, { hydrated: true });
  }
  return state;
}
