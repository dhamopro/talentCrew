import PocketBase from 'pocketbase';

const pb = new PocketBase('https://pb.talentcrew.tekishub.com');



export const isFieldValuePresent = async (collectionName, fieldName, value, returnList = false, attributes = []) => {
  try {
    // Construct the fields parameter based on optional attributes
    const fields = attributes.length > 0 ? attributes.join(',') : '';

    // Perform the query to get a list of items with the specified filter
    const result = await pb.collection(collectionName).getList(1, 100, {
      filter: `${fieldName}="${value}"`,
      fields: fields // Use fields parameter to specify which attributes to include
    });

    // If returnList is true, return the list of items with the specified attributes and a boolean flag
    if (returnList) {
      return {
        exists: result.items.length > 0,
        items: result.items.map(item => {
          // If specific attributes are requested, filter them
          if (attributes.length > 0) {
            const filteredItem = {};
            attributes.forEach(attr => {
              if (item[attr] !== undefined) {
                filteredItem[attr] = item[attr];
              }
            });
            return filteredItem;
          }
          return item;
        })
      };
    }
    
    // Otherwise, return just the boolean indicating existence
    return result.items.length > 0;
  } catch (error) {
    // Log error with more context if needed
    console.error(`Error checking presence in collection "${collectionName}" with ${fieldName}="${value}":`, error);
    return false;
  }
}
