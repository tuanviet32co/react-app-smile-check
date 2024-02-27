export { }
// import { ReactNode } from 'react';
// import { Button, notification, Row, Upload } from 'antd';
// import { ReactComponent as UploadSVG } from 'assets/images/Upload.svg';
// import { useGetSignedUrlMutation } from 'services/api';
// import { s3Upload } from 'services/s3-api/endpoints';
// import { beforeImage5mbUpload } from 'utils';
// import { DraggerProps } from 'antd/lib/upload';
// import { useGetProfileSignedUrlMutation } from 'modules/auth/services/authApi';
// import classNames from 'classnames';
// import { ImageUploadList } from './image-upload-list';
// import { IImage } from 'services/patients-api/types';
// import { twMerge } from 'tailwind-merge';
// import { CameraOutlined } from '@ant-design/icons';
// import NiceModal from '@ebay/nice-modal-react';
// import { WebcamModal } from 'components/webcam-modal/webcam-modal';
// import { TFile } from 'components/webcam-modal/upload-webcam-capture/upload-webcam-capture';
// import { showCameraRequestModal } from 'components/modals/camera-request-modal';
// import { v4 as uuidv4 } from 'uuid';
// import { PreviewImageGroup } from '../../../preview-image-group/preview-image-group';
// import { useWindowSize } from 'hooks/useWindowSize';

// const { Dragger } = Upload;

// interface IProps extends Omit<DraggerProps, 'onChange'> {
//   name: string;
//   value?: any[];
//   onChange?: (value: any[]) => void;
//   publicUpload?: boolean;
//   className?: string;
//   minMandatoryNumber?: number;
//   placeholder?: ReactNode;
//   uploadImageIcon?: ReactNode;
//   croppable?: boolean;
//   uploadListClassName?: string;
//   isWebcamEnable?: boolean;
//   isPatientSmileQuestionnaire?: boolean;
//   onSave?: () => void;
// }

// export const ImageDraggerNew = (props: IProps) => {
//   const {
//     name,
//     publicUpload,
//     className,
//     minMandatoryNumber,
//     showUploadList = false,
//     placeholder,
//     uploadImageIcon = <UploadSVG />,
//     croppable,
//     uploadListClassName,
//     isWebcamEnable,
//     isPatientSmileQuestionnaire,
//     onSave,
//     ...rest
//   } = props;

//   const { value, onChange } = rest;

//   const { isLg, isMd } = useWindowSize();

//   const [getSignedUrl] = useGetSignedUrlMutation();
//   const [getPublicSignedUrl] = useGetProfileSignedUrlMutation();

//   const handleSave = () => setTimeout(() => onSave?.(), 250);

//   const handleFileChange = ({ fileList, file }: any) => {
//     const { status, uid } = file;

//     if (status === 'done') {
//       const newList = fileList.map((f: any) => (f.uid === uid ? { ...f, url: f.response?.url } : f)) || [];
//       onChange?.(newList);
//       notification.success({
//         message: `${file.name} file uploaded successfully.`,
//         placement: 'topRight',
//       });
//       handleSave();
//       return;
//     }

//     if (status === 'error') {
//       const newList = (value || []).filter((f: any) => f.uid !== uid) || [];
//       onChange?.(newList);
//       notification.error({
//         message: `Sorry ${file.name} didn't upload, please try again.`,
//         placement: 'topRight',
//       });
//       return;
//     }

//     onChange?.(fileList);
//   };

//   const uploadImageRequest = async ({ file, filename, onProgress, onSuccess, onError }: any) => {
//     const { name: keyName, type } = file;
//     const supportedFileType = type === 'image/jpeg' || type === 'image/png' || type === 'image/jpg';
//     if (!supportedFileType) {
//       return;
//     }

//     try {
//       const filePayload = {
//         fileName: keyName,
//         mimeType: type,
//         folderName: filename,
//       };
//       const signedUrl = await (publicUpload ? getPublicSignedUrl : getSignedUrl)(filePayload).unwrap();
//       await s3Upload(signedUrl.url, file, (percent) => onProgress({ percent }, file));
//       onSuccess({ url: signedUrl && signedUrl.url.split('?')[0] }, file);
//     } catch (error) {
//       onError(error);
//     }
//   };

//   const onDeleteImage = (url: string) => {
//     const filterImages = value?.filter((item: any) => item.url !== url) || [];
//     onChange?.(filterImages);
//     handleSave();
//   };

//   const onCropped = (croppedImage: IImage, image: IImage) => {
//     // replace image by cropped image
//     const newImages = value?.map((item: any) => (item.url === image.url ? croppedImage : item)) || [];

//     onChange?.(newImages);
//   };

//   const customRequestWebcam = async (file: TFile): Promise<void> => {
//     const { name: keyName, type } = file;

//     if (file) {
//       const filePayload = {
//         ...file,
//         name,
//         filename: rest.id,
//         url: null,
//         uid: uuidv4(),
//       };

//       const uploadingData = [...(value || []), { ...filePayload, status: 'uploading' }];
//       onChange?.(uploadingData);
//       const fileData = {
//         fileName: keyName,
//         mimeType: type,
//         folderName: rest.id!,
//       };
//       const signedUrl = await (publicUpload ? getPublicSignedUrl : getSignedUrl)(fileData).unwrap();
//       await s3Upload(signedUrl.url, file);
//       const url = signedUrl && signedUrl.url.split('?')[0];

//       const fieldData = {
//         ...filePayload,
//         url,
//         response: { url },
//       };

//       const newList = uploadingData?.map((f: any) => (f.uid === fieldData.uid ? fieldData : f)) || [];
//       onChange?.(newList);
//       notification.success({
//         message: `${file.name} file uploaded successfully.`,
//         placement: 'topRight',
//       });
//       handleSave();
//     }
//   };

//   const checkCameraPermission = async (): Promise<boolean> => {
//     try {
//       const response = await navigator.mediaDevices.getUserMedia({ video: true });
//       response?.getTracks().forEach((track) => {
//         track.stop();
//       });
//       return true;
//     } catch (error) {
//       showCameraRequestModal({});
//       return false;
//     }
//   };

//   const handleTakePhotoClick = async (e: React.MouseEvent<HTMLElement>) => {
//     e.stopPropagation();
//     const cameraPermission = await checkCameraPermission();

//     if (cameraPermission) {
//       NiceModal.show(WebcamModal, {
//         customRequest: customRequestWebcam,
//         isImgCrop: true,
//       });
//     }
//   };

//   return (
//     <>
//       <div id={rest?.id} className={classNames('w-full max-w-xs gap-x-2', className, { '': isWebcamEnable })}>
//         <Dragger
//           {...rest}
//           name={name}
//           multiple
//           fileList={value || []}
//           showUploadList={false}
//           customRequest={uploadImageRequest}
//           beforeUpload={beforeImage5mbUpload}
//           onChange={handleFileChange}
//         >
//           <div className="flex w-full items-center justify-center">
//             <div className="mr-3 mt-1">{uploadImageIcon}</div>
//             <div className="upload-text">
//               {placeholder || (
//                 <p className="text-left">
//                   Click or drag file to this area to upload{' '}
//                   {minMandatoryNumber ? `(${value?.length || 0}/${minMandatoryNumber})` : ''}
//                 </p>
//               )}
//               {isWebcamEnable && (
//                 <div className="self-stretch">
//                   <Button onClick={handleTakePhotoClick} className="h-full rounded">
//                     <CameraOutlined style={{ fontSize: '20px' }} />
//                     <div className="-mt-1 text-xs">Take a photo</div>
//                   </Button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </Dragger>
//       </div>
//       {showUploadList &&
//         (isPatientSmileQuestionnaire ? (
//           <Row gutter={[20, 10]} className="mb-4 mt-5">
//             <PreviewImageGroup
//               name={name}
//               images={value as IImage[]}
//               deleteImage={onDeleteImage}
//               perRow={isLg ? 4 : isMd ? 3 : 2}
//             />
//           </Row>
//         ) : (
//           <ImageUploadList
//             images={value as IImage[]}
//             name="name"
//             deleteImage={onDeleteImage}
//             className={twMerge('mt-4', uploadListClassName)}
//             croppable={croppable}
//             onCropped={onCropped}
//           />
//         ))}
//     </>
//   );
// };
