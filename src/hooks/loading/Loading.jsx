import React from 'react'
import './Loading.css'

const Loading = () => {
    return (
        <div style={{
            minHeightheight: "100vh", padding:"10rem 0",
            alignItems: "center", marginTop: "5rem"
        }}>
            <div className="loader"></div>
        </div>
    )
}

export default Loading