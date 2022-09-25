import React from 'react'

const LoaderMessage = () => {
    return (
        <div className='loader'>
            <div className='message'>
                <div className='message-content'>
                    <div className="loader-content">
                        <p>Cargando</p>
                        <div className='animation'>
                            <p>...</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoaderMessage