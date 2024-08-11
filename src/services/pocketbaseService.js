// services/pocketbaseService.js
import PocketBase from 'pocketbase';

import axios from 'axios';

//const API_URL = 'https://your-pocketbase-url/api'; // Replace with your PocketBase API URL
const API_URL =  'https://pb.talentcrew.tekishub.com'

export const fetchData = async () => {
  try {
    //const response = await axios.get(`${API_URL}/your-endpoint`); // Replace with your API endpoint
    //return response.data; // Adjust based on your data structure
    const pb = new PocketBase(API_URL);

    const resultList = await pb.collection('Requirements').getList(1, 50, {
        sort: '-created',
      });    
      return resultList.items;
      
  } catch (error) {
    console.error('Error fetching data from PocketBase:', error);
    return [];
  }
};
