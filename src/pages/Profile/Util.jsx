import PocketBase from 'pocketbase';

const pb = new PocketBase('https://pb.talentcrew.tekishub.com');

export const isFieldValuePresent = async (collectionName, fieldName, value, ) => {
  try {
    const result = await pb.collection(collectionName).getList(1, 1, {
      filter: `${fieldName}="${value}"`
    });
    return result.items.length > 0;
  } catch (error) {
    console.error("Error checking field presence:", error);
    return false;
  }
};
