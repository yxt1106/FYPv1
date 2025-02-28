import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
export const useDataStore = defineStore('dataStore', () => {
    let fetchedData = ref([]);
    const fetchData = async () => {
        try {
       // const response = await fetch("https://api.sheetbest.com/sheets/d6215116-7bca-4f15-a0e7-fa63b3daf8c6");
          const response = await fetch("https://api.sheetbest.com/sheets/5b0a2a97-34fb-4f27-8940-7c2ec84704c3");
          const data = await response.json();
          for(let i = 1;i < data.length;i++){
            fetchedData.value.push({id: i, 
              Name: data[i]['0'],
              doi:data[i]['1'],
              FigureType:data[i]['3'],
              Figure:data[i]['10'],
              Status:data[i]['4'],MovingCause:data[i]['5'],
              Color1:data[i]['7'],Color2:data[i]['8'],Color3:data[i]['9'],ViewAngleChange:data[i]['6'],
              modal:false})
          }
        } catch (error) {
          console.error("Fetching data failed:", error);
        }
      };
      return { fetchedData, fetchData };
})
