import React, { useState } from 'react';

const EventRegistration = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [guest, setGuest] = useState(false);
    const [guestName, setGuestName] = useState("");
    const [formErrors, setFormErrors] = useState({
        name: '',
        email: '',
        age: '',
        guestName: '',
    });
    const [submittedData, setSubmittedData] = useState(null);

    const handleGuestChange = (e) => {
        setGuest(e.target.value === 'yes');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.values(errors).some(error => error !== '')) {
            setFormErrors(errors);
        } else {
            const data = {
                name,
                email,
                age,
                guest: guest ? 'Yes' : 'No',
                guestName: guest ? guestName : null,
            };
            setSubmittedData(data);
            resetForm();
        }
    };

    const resetForm = () => {
        setName("");
        setEmail("");
        setAge("");
        setGuest(false);
        setGuestName("");
        setFormErrors({
            name: '',
            email: '',
            age: '',
            guestName: '',
        });
    };

    const validateForm = () => {
        let errors = {
            name: '',
            email: '',
            age: '',
            guestName: '',
        };

        if (!name.trim()) {
            errors.name = 'Name is required';
        }

        if (!email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid';
        }

        if (!age.trim()) {
            errors.age = 'Age is required';
        } else if (isNaN(Number(age)) || Number(age) <= 0) {
            errors.age = 'Age must be a number greater than 0';
        }

        if (guest && !guestName.trim()) {
            errors.guestName = 'Guest name is required';
        }

        return errors;
    };
    const isSubmitDisabled = () => {
        return (
            !name.trim() ||
            !email.trim() ||
            !age.trim() ||
            (guest && !guestName.trim()) 
        );
    };

    return (
        <div className='p-12'>
            <h1 className='text-2xl font-semibold text-neutral-700'>
                Event Registration Form
            </h1>
            <form className='flex flex-col gap-2 ml-auto mr-auto w-1/3 mt-12' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="name" className='text-left'>Name</label>
                    <input
                        type='text'
                        id="name"
                        className={`border border-neutral-400 px-4 py-2 rounded-md ${formErrors.name && 'border-red-500'}`}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Enter your name'
                    />
                    {formErrors.name && <span className='text-red-500 text-left'>{formErrors.name}</span>}
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="email" className='text-left'>Email</label>
                    <input
                        type='email'
                        id="email"
                        className={`border border-neutral-400 px-4 py-2 rounded-md ${formErrors.email && 'border-red-500'}`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter your email address'
                    />
                    {formErrors.email && <span className='text-red-500 text-left'>{formErrors.email}</span>}
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="age" className='text-left'>Age</label>
                    <input
                        type='number'
                        id="age"
                        className={`border border-neutral-400 px-4 py-2 rounded-md ${formErrors.age && 'border-red-500'}`}
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder='Enter your age'
                    />
                    {formErrors.age && <span className='text-red-500 text-left'>{formErrors.age}</span>}
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='text-left'>Are you attending with a guest?</label>
                    <div className='flex gap-4'>
                        <label className='flex gap-2'>
                            <input
                                type='radio'
                                name='guest'
                                value='yes'
                                checked={guest === true}
                                onChange={handleGuestChange}
                            />
                            Yes
                        </label>
                        <label className='flex gap-2'>
                            <input
                                type='radio'
                                name='guest'
                                value='no'
                                checked={guest === false}
                                onChange={handleGuestChange}
                            />
                            No
                        </label>
                    </div>
                </div>
                {guest && (
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="guestName" className='text-left'>Guest Name</label>
                        <input
                            type='text'
                            id="guestName"
                            className={`border border-neutral-400 px-4 py-2 rounded-md ${formErrors.guestName && 'border-red-500'}`}
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            placeholder='Enter guest name'
                        />
                        {formErrors.guestName && <span className='text-red-500 text-left'>{formErrors.guestName}</span>}
                    </div>
                )}
                <button
                    className={`bg-purple-700 my-2 text-white px-4 py-3 w-1/3 rounded-md ${isSubmitDisabled() && 'opacity-50 cursor-not-allowed'}`}
                    type='submit'
                    disabled={isSubmitDisabled()}
                >
                    Submit
                </button>
            </form>

            {submittedData && (
                <div className='mt-8'>
                    <h2 className='text-xl font-semibold text-neutral-700'>Submitted Data</h2>
                    <ul className='mt-4 ml-auto mr-auto w-1/4'>
                        <li className='text-left'><span className='font-semibold'>Name:</span> {submittedData.name}</li>
                        <li className='text-left'><span className='font-semibold'>Email:</span> {submittedData.email}</li>
                        <li className='text-left'><span className='font-semibold'>Age:</span> {submittedData.age}</li>
                        <li className='text-left'><span className='font-semibold'>Attending with guest:</span> {submittedData.guest}</li>
                        {submittedData.guest === 'Yes' && submittedData.guestName && (
                            <li className='text-left'><span className='font-semibold'>Guest Name:</span> {submittedData.guestName}</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default EventRegistration;
