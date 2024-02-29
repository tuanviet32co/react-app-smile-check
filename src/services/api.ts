import axios from 'axios';
import { convertToBase64 } from '../utils/ui';

export const RESULT = {
  toothAnimationUrl: `https://webview.32-stories.com/?mlink=https://onyx-uploads.s3.eu-west-2.amazonaws.com/Client983/SUBM-WWNXGKF/81F16ABD470C45A5879866538E9A9157.iiwgl&fg=004&bg=ddd&p=BUERRB`,
  treatmentDesign: {
    "upperStageNumber": 1,
    "lowerStageNumber": 1,
    "totalSteps": 1,
    "arches": "Single arch - upper",
    "havingIpr": true,
    "iprStages": [
      "Stage 0"
    ],
    "havingAttachment": true,
    "havingElastic": false,
    "attachmentStages": [
      "Stage 1"
    ],
    "elastics": [],
    "auxiliaryDetail": "Et accusantium volup",
    "comment": "A mollitia et qui do",
  },
  images: [
    'https://32co-files-upload-staging.s3.eu-west-2.amazonaws.com/intraOralImages/91fb4d88-c583-41c1-a56b-cf8cfb085f41-intraoral-help-2.8c05a871c04922a5b391.jpg',
    'https://32co-files-upload-staging.s3.eu-west-2.amazonaws.com/intraOralImages/09d29367-7e86-40dd-aa75-50fb3cad4fd8-intraoral-help-3.bda9f1d5bd706916df9c.jpg',
    'https://32co-files-upload-development.s3.eu-west-2.amazonaws.com/completed-treatment/a00ca901-e9dd-4695-a19d-ba119faaeaad-intraoral-help-1.0ce7e638edfc2b4c0c65.jpg-cropped.jpeg',
    'https://32co-files-upload-staging.s3.eu-west-2.amazonaws.com/intraOralImages/4a006a78-4668-4a07-a289-edbfd54586f6-intraoral-help-5.c1d7dd44e863fa2e7a97.jpg'
  ]
}

const simulateApiCall = (data: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1500);
  });
}


export const getSimulationData = async (beforeFile: any, mock?: boolean): Promise<any> => {
  if (mock) {
    return await simulateApiCall(RESULT);
  }

  try {
    const formData = new FormData();
    formData.append('file', beforeFile);
    const res = await axios.post('http://localhost:3005/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return res.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}


export const getSimulationData2 = async (beforeFile: any): Promise<any> => {
  try {
    const beforeBase64 = await convertToBase64(beforeFile);
    const res = await axios.post('http://localhost:3001/upload', { image: beforeBase64 }, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return res.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}
