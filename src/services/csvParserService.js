import Papa from 'papaparse';

export const parseCSV = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          reject(new Error(`Parsing errors: ${results.errors.map(e => e.message).join(', ')}`));
          return;
        }
        resolve(results.data);
      },
      error: (error) => {
        reject(new Error(`Failed to parse CSV: ${error.message}`));
      }
    });
  });
};

export const parseMultipleCSV = async (files) => {
  const parsedFiles = [];
  
  for (const file of files) {
    try {
      const data = await parseCSV(file.file);
      parsedFiles.push({
        ...file,
        data: data
      });
    } catch (error) {
      throw new Error(`Error parsing ${file.name}: ${error.message}`);
    }
  }
  
  return parsedFiles;
};

export const validateCSVFormat = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('CSV file is empty or invalid format');
  }

  // Check for required fields
  const firstRow = data[0];
  const requiredFields = ['amount', 'status'];
  const optionalFields = ['product_name', 'product', 'category', 'date', 'price'];

  const hasRequiredFields = requiredFields.some(field => 
    Object.keys(firstRow).some(key => key.toLowerCase().includes(field))
  );

  if (!hasRequiredFields) {
    throw new Error('CSV must contain required fields: amount, status');
  }

  return true;
};