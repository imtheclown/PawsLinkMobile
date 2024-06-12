import DocumentPicker from 'react-native-document-picker';
const IMAGE_TYPES =[
    DocumentPicker.types.images
]
export const pickImage = async () => { 
    try {
      const result = await DocumentPicker.pick({
        // allowMultiSelection: false,
        type: IMAGE_TYPES,
      });
      if (result) {
        console.log('Picked document:0', result);
        const { name, size, type, uri } = result[0];
        return {
            name,
            type,
            uri,
            size,
          };
        }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the document picker
        Alert(capitalizeFirstLetter('No document picked'));
      } else {
        // Handle other errors
        console.log('Error picking document:', err);
      }
      return null;
    }
};