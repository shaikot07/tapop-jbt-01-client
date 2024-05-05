import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import QRScanner from 'react-qr-scanner';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const UserProfile = ({ userId }) => {
    const [qrCodeData, setQRCodeData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(null);
    const [scannerActive, setScannerActive] = useState(false);
    const axiosPublic= useAxiosPublic()

    useEffect(() => {
        const fetchQRCodeData = async () => {
            setIsLoading(true);
            try {
                const response = await  axiosPublic.get(`/api/users/${userId}/qr-code`);
                setQRCodeData(response.data);
            } catch (error) {
                console.error('Error fetching QR code data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchQRCodeData();
    }, [userId]);

    const handleScan = async (data) => {
        if (data) {
            setScannerActive(false);
            try {
                const response = await  axiosPublic.post('/decode-qr-code', { data });
                setUserInfo(response.data);
            } catch (error) {
                console.error('Error decoding QR code:', error);
                // Display error message to the user
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            {isLoading ? (
                <p className="text-xl font-bold text-gray-700">Loading QR code...</p>
            ) : (
                <>
                    {qrCodeData && (
                        <div>
                            <QRCode value={qrCodeData} size={256} />
                            <button
                                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => setScannerActive(true)}
                            >
                                Scan QR Code
                            </button>
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
                </>
            )}
        </div>
    );
};

export default UserProfile;
