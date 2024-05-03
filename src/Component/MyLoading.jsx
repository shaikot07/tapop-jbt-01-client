/* eslint-disable react/prop-types */
import Lottie from 'lottie-react';
import animationLottiLoading from '../../public/assets/lottieAnimation/loadingLottie.json'

const MyLoading = ({className, loop}) => {
    return (
        <div className='flex items-center justify-center'>
        <Lottie animationData={animationLottiLoading} loop={loop !== 'undefined'? loop : true} className={`${className? className : 'h-20 w-20'}`} />
    </div>
    );
};

export default MyLoading;