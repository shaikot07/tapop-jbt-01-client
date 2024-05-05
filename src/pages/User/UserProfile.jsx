import React, { useState, useEffect } from 'react';
import QRScanner from 'react-qr-scanner';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import QRCode from 'react-qr-code';
import { Link } from 'react-router-dom';

const UserProfile = ({ userId }) => {
    console.log('from userPro', userId);
    const [qrCodeData, setQRCodeData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(null);
    const [scannerActive, setScannerActive] = useState(false);
    const axiosPublic = useAxiosPublic()

    useEffect(() => {
        const fetchQRCodeDataWithDelay = async () => {
            setIsLoading(true);

            if (userId) {
                // Introduce a delay using setTimeout
                setTimeout(async () => {
                    try {
                        const response = await axiosPublic.get(`/users/${userId}/qr-code`);
                        setQRCodeData(response.data);
                    } catch (error) {
                        console.error('Error fetching QR code data:', error);
                    } finally {
                        setIsLoading(false);
                    }
                }, 2000); // Delay of 5 seconds (adjust as needed)
            }
        };

        fetchQRCodeDataWithDelay();
    }, [userId]);

    const handleScan = async (data) => {
        if (data) {
            setScannerActive(false);
            try {
                const response = await axiosPublic.post('/decode-qr-code', { data });
                setUserInfo(response.data);
            } catch (error) {
                console.error('Error decoding QR code:', error);
                // Display error message to the user
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center  w-full">
            <p>Please Scan For Get Info</p>
            {isLoading ? (
                <p className="text-xl font-bold text-blue-600">Loading QR code...</p>
            ) : (
                <>
                    <div className='h-[300px] max-w-5xl mx-auto'>
                        {qrCodeData && (
                            <div className='border-2 border-black'>
                                <QRCode value={qrCodeData} size={256} />
                                <Link to="/profileDittles">
                                    <button
                                        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => setScannerActive(true)}
                                    >
                                        Go to Profile
                                    </button>
                                </Link>
                            </div>
                        )}
                        {scannerActive && (
                            <QRScanner
                                onError={(error) => {
                                    console.error('QR code scanning error:', error);
                                }}
                                onScan={handleScan}
                                style={{ width: '100%', marginTop: '2rem' }}
                            />
                        )}
                        {userInfo && (
                            <div className="mt-4">
                                <p className="text-xl font-bold">User Information:</p>
                                {/* Display user details here (e.g., name, email) */}
                                <p>Name: {userInfo.name}</p>
                                <p>Email: {userInfo.email}</p>
                                {/* Add more user details as needed */}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default UserProfile;
