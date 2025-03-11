import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Lưu vào localStorage
import { combineReducers } from 'redux';

// Cấu hình redux-persist
const persistConfig = {
  key: 'root',
  storage, // Sử dụng localStorage
};

// Kết hợp reducer với persistReducer
const rootReducer = combineReducers({
  auth: authReducer, 
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Cấu hình store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Bỏ kiểm tra serializable để tránh lỗi
    }),
});

// Tạo persistor
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
