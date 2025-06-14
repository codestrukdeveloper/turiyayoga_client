import React from 'react'
import Link  from 'next/link';

const ThankYouPage = () => {
  return (
    <>
      <div className='thank-you-page'>
        <img className='logo img-fluid' src="/assets/images/logo.webp" alt='logo' />
        <h3>Danke, dass du diesen Weg mit uns gehst.</h3>
        <Link className='back-to-home-button' href='/'>Back to Home</Link>
      </div>
    </>
  )
}

export default ThankYouPage
