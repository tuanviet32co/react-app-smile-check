import axios from 'axios';

export type TResult = {
  toothAnimationUrl: string;
  treatmentDesign: {
    totalSteps: 25
    arches: string;
    estimatedPrice: 2000
    totalRefinements: 3
    accuracy: 95
    image: string;
  }
}

export const RESULT: TResult = {
  toothAnimationUrl: `https://webview.32-stories.com/?mlink=https://onyx-uploads.s3.eu-west-2.amazonaws.com/Client983/SUBM-WWNXGKF/81F16ABD470C45A5879866538E9A9157.iiwgl&fg=004&bg=ddd&p=BUERRB`,
  treatmentDesign: {
    "totalSteps": 25,
    "arches": "Single Arch - Upper",
    "estimatedPrice": 2000,
    "totalRefinements": 3,
    "accuracy": 95,
    "image": 'https://32co-files-upload-staging.s3.eu-west-2.amazonaws.com/intraOralImages/91fb4d88-c583-41c1-a56b-cf8cfb085f41-intraoral-help-2.8c05a871c04922a5b391.jpg',
  }
}


const simulateApiCall = (data: TResult): Promise<TResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1500);
  });
}


export const getSimulationData = async (formData: any, mock?: boolean): Promise<TResult | null> => {
  if (mock) {
    return await simulateApiCall(RESULT);
  }

  try {
    const res = await axios.post('http://localhost:3005/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
