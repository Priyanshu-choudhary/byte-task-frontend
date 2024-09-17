import React from 'react'

function FontPage() {
    return (
        <div className='m-2'>
            <div className='bg-blue-100 max-w-96 rounded-lg p-3  '>
                <h2 className='font-bold text-xl ' >Welcome to BYTE</h2>

                <p className='mt-2'>To access our exclusive content, we kindly ask you to support us by following us on GitHub or subscribing to our YouTube channel. This helps us continue providing valuable content and updates.</p>

            </div>
            <div className="max-w-96 mt-2 rounded-lg p-3 bg-yellow-100 border-l-8 border-yellow-600">
    <p className="font-semibold mb-2 text-xl">Troubleshooting:</p>
    <ul className="list-disc list-inside">
        <li>
            Visit our  <a href="https://www.youtube.com/@BYTE-mait" target="_blank" className="text-blue-500 hover:underline">YouTube channel:</a>Check if the “Subscribed” button is active.
        </li>
        <li>
            Go to our  <a href="https://github.com/bytemait" target="_blank" className="text-blue-500 hover:underline">GitHub profile: </a>Check if you “Follow” us.
        </li>
    </ul>
</div>


        </div>
    )
}

export default FontPage
