import { configureStore } from "@reduxjs/toolkit";
import jotjunction from "@src/store/reducers";

const store = configureStore({
	reducer: { jotjunction },
});

export { store };
