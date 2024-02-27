import { Button, Modal } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import allowCameraIphoneSafariPng from '../assets/allowCameraIphoneSafari.png';
import allowCameraIphoneChromePng from '../assets/allowCameraIphoneChrome.png';
import allowCameraAndroid1Jpg from '../assets/allowCameraAndroid1.jpg';
import allowCameraAndroid2Jpg from '../assets/allowCameraAndroid2.jpg';
import { isSafari, isChrome, isIOS, isAndroid } from 'react-device-detect';

export const CameraRequestModal = NiceModal.create<any>(() => {
  const modal = useModal();
  const showDetails = (isIOS || isAndroid) && (isChrome || isSafari);

  return (
    <Modal
      open={modal?.visible}
      closeIcon={<Button className="bg-white" shape="circle" icon={<CloseOutlined />} size="middle" />}
      centered
      footer={null}
      className={"nice-ant-modal mt-4"}
    >
      <div className="max-h-[70vh]">
        <div className="my-2 text-lg font-semibold text-darkBlueColor">Please check your camera permission!</div>
        {showDetails &&
          (isIOS ? (
            <>
              <div className="text-sm text-grey">
                Go to <b>Settings</b> on your <b>IOS device</b>. Scroll down and open{' '}
                <b>{isSafari ? 'Safari' : 'Chrome'}</b> tab. Ensure <b>Camera</b> are set to Allow
              </div>
              <img
                src={isSafari ? allowCameraIphoneSafariPng : allowCameraIphoneChromePng}
                alt="allowCameraPng"
                className="mt-4 w-full rounded-3xl"
              />
            </>
          ) : (
            <>
              <div className="text-sm text-grey">
                If you’re using an Android device, you’ll need to allow Chrome permission to use the camera using the
                Settings app. Here’s how.
              </div>
              <div className="mt-2 text-gray-800">
                1. Open the <b>Settings</b> app on your phone and go to <b>Apps and notifications</b>. Scroll down to
                locate <b>Chrome</b> on the app list.
              </div>
              <img src={allowCameraAndroid1Jpg} alt="allowCameraPng" className="mt-3 w-full rounded-xl" />
              <div className="mt-4 text-gray-800">
                2. Next, go to <b>Permissions</b>. Here, you’ll find a list of permissions for Chrome.
              </div>
              <img src={allowCameraAndroid2Jpg} alt="allowCameraPng" className="mt-3 w-full rounded-xl" />
            </>
          ))}
        <div className="flex justify-end pb-4 pt-5">
          <Button className="w-40" onClick={() => modal.hide()} size="large">
            I got it
          </Button>
        </div>
      </div>
    </Modal>
  );
});
