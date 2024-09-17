import React from 'react'
import YouTubeSubscriptionCheck from '../Youtube/YoutubeAuth';
import GitHubFollowerCheck from '../GitHub/GitHubAuth';

function RightContent({ youtube, github }) {
    const handleLinkClick = () => {
        // Clear localStorage
        localStorage.clear();
    };

    return (
        <div className='m-2'>

            <p className='font-bold text-xl mb-10 '>Please Choose an options:</p>
            <div className='flex gap-10'>
                <div style={{ display: "flex" }}>
                    <div>
                        <GitHubFollowerCheck />
                    </div>
                </div>

                <div>
                    <div style={{ display: "flex" }}>
                        <YouTubeSubscriptionCheck />
                    </div>
                </div>
            </div>

            <div>
                <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }} className='m-3 ml-12 w-fit border-2 border-black'>
                    <div>
                        {youtube && github ? (
                            <img
                                src="/QR.svg"
                                alt="QR Code"
                                width={150}
                            />
                        ) : (
                            <img
                                src="/alternative.png"
                                alt="see Troubleshooting"
                                width={150}
                            />
                        )}
                    </div>
                </div>

                {youtube && github && (
                    <a
                        href="https://github.com/bytemait"
                        target="_blank"
                        className="text-blue-500 hover:underline ml-6"
                        onClick={handleLinkClick}
                    >
                        https://byte-site.vercel.app/
                    </a>
                )}
            </div>
        </div>
    );
}

export default RightContent;
