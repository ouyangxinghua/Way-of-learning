import appReducer from '../AppReducer';

const rootReducer = appReducer;

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>
