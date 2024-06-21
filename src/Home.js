import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [button, setButton] = useState("");

    const setForm = (props) => {
        setButton(props);
        navigate(props);
    };

    return (
        <div className='p-12'>
            <h1 className='text-2xl font-semibold text-neutral-700'>
                Please select your form type
            </h1>
            <div className="flex gap-4 flex-col w-1/5 ml-auto mr-auto mt-8">
                <button
                    className='px-4 py-3 border-purple-700 border-2 hover:bg-purple-500 hover:border-purple-500 hover:text-white text-md rounded-md'
                    onClick={() => setForm('/event')}
                >
                    Event Registration
                </button>
                <button
                    className='px-4 py-3 border-purple-700 border-2 hover:bg-purple-500 hover:border-purple-500 hover:text-white text-md rounded-md'
                    onClick={() => setForm('/job')}
                >
                    Job Application
                </button>
                <button
                    className='px-4 py-3 border-purple-700 border-2 hover:bg-purple-500 hover:border-purple-500 hover:text-white text-md rounded-md'
                    onClick={() => setForm('/survey')}
                >
                    Survey Form
                </button>
            </div>
        </div>
    );
};

export default Home;
