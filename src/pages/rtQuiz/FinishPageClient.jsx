import React from 'react';

export default function FinishPageClient() {

    return (
        <div className="clapping" style={{width:"500px", height:"500px"}}>
            <video>
                <source src={process.env.PUBLIC_URL + '/media/clapping.mp4'} type="video/mp4"></source>
                dasdasdsad
            </video>
        </div>
    )
}
