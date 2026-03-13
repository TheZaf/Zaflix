import { create } from "zustand";

export const useContentStore = create((set)=>({
    contentType:"movie",
    setContentType:(type) =>set({contentType:type}),//sets the content type like tv or movies which to fetch

}));