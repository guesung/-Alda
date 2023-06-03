import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCZU_RdlcGhjUPw6JG_sYfg_dwPmpXstms",
  authDomain: "tech-tree-381c9.firebaseapp.com",
  databaseURL: "https://tech-tree-381c9-default-rtdb.firebaseio.com",
  projectId: "tech-tree-381c9",
  storageBucket: "tech-tree-381c9.appspot.com",
  messagingSenderId: "714728325630",
  appId: "1:714728325630:web:0ada7f29ddde33dfec80af",
  measurementId: "G-DD5GMS6FY9",
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
