import React, { useState } from 'react';

const JobApplication = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [experience, setExperience] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [managementExperience, setManagementExperience] = useState("");
  const [additionalSkills, setAdditionalSkills] = useState([]);
  const [interviewTime, setInterviewTime] = useState("");
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    portfolio: '',
    managementExperience: '',
    additionalSkills: '',
    interviewTime: '',
  });
  const [submittedData, setSubmittedData] = useState(null);
  const hasErrors = Object.values(formErrors).some(error => error !== '');

  const isSubmitDisabled = () => {
    return !name || !email || !phone || !position || !interviewTime ||
      (position === 'developer' || position === 'designer') && !experience ||
      (position === 'designer' && !portfolio) ||
      (position === 'manager' && !managementExperience) ||
      additionalSkills.length === 0;
  };
  const handleSkillsChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setAdditionalSkills([...additionalSkills, value]);
    } else {
      setAdditionalSkills(additionalSkills.filter(skill => skill !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).some(field => errors[field])) {
      setFormErrors(errors);
    } else {
      const data = {
        name,
        email,
        phone,
        position,
        experience: position === 'developer' || position === 'designer' ? experience : null,
        portfolio: position === 'designer' ? portfolio : null,
        managementExperience: position === 'manager' ? managementExperience : null,
        additionalSkills,
        interviewTime,
      };
      setSubmittedData(data);
      setName("");
      setEmail("");
      setPhone("");
      setPosition("");
      setExperience("");
      setPortfolio("");
      setManagementExperience("");
      setAdditionalSkills([]);
      setInterviewTime("");
      setFormErrors({
        name: '',
        email: '',
        phone: '',
        experience: '',
        portfolio: '',
        managementExperience: '',
        additionalSkills: '',
        interviewTime: '',
      });
    }
  };

  const validateForm = () => {
    let errors = {
      name: '',
      email: '',
      phone: '',
      experience: '',
      portfolio: '',
      managementExperience: '',
      additionalSkills: '',
      interviewTime: '',
    };

    if (!name.trim()) {
      errors.name = 'Name is required';
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    if (!phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = 'Phone number is invalid';
    }

    if ((position === 'developer' || position === 'designer') && !experience.trim()) {
      errors.experience = 'Relevant experience is required';
    } else if ((position === 'developer' || position === 'designer') && isNaN(Number(experience))) {
      errors.experience = 'Experience must be a number';
    } else if ((position === 'developer' || position === 'designer') && Number(experience) <= 0) {
      errors.experience = 'Experience must be greater than 0';
    }


    if (position === 'designer' && !portfolio.trim()) {
      errors.portfolio = 'Portfolio URL is required';
    } else if (position === 'designer' && !/^(ftp|http|https):\/\/[^ "]+$/.test(portfolio)) {
      errors.portfolio = 'Portfolio URL is invalid';
    }


    if (position === 'manager' && !managementExperience.trim()) {
      errors.managementExperience = 'Management experience is required';
    }


    if (additionalSkills.length === 0) {
      errors.additionalSkills = 'At least one skill must be selected';
    }

  
    if (!interviewTime.trim()) {
      errors.interviewTime = 'Preferred interview time is required';
    }

    return errors;
  };

  return (
    <div className='p-12'>
      <h1 className='text-2xl font-semibold text-neutral-700'>
        Job Application Form
      </h1>
      <form className='flex flex-col gap-4 ml-auto mr-auto w-1/3 mt-12' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-2'>
          <label htmlFor="name" className='text-left'>Full Name</label>
          <input
            type='text'
            id="name"
            className='border border-neutral-400 px-4 py-2 rounded-md'
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
            className='border border-neutral-400 px-4 py-2 rounded-md'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email address'
          />
          {formErrors.email && <span className='text-left text-red-500 '>{formErrors.email}</span>}
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="phone" className='text-left'>Phone Number</label>
          <input
            type='tel'
            id="phone"
            className='border border-neutral-400 px-4 py-2 rounded-md'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder='Enter your phone number'
          />
          {formErrors.phone && <span className='text-red-500 text-left'>{formErrors.phone}</span>}
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="position" className='text-left'>Applying for Position</label>
          <select
            id="position"
            className='border border-neutral-400 px-4 py-2 rounded-md'
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          >
            <option value="">Select a position</option>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="manager">Manager</option>
          </select>
        </div>
        {(position === 'developer' || position === 'designer') && (
          <div className='flex flex-col gap-2'>
            <label htmlFor="experience" className='text-left'>Relevant Experience (Years)</label>
            <input
              type='number'
              id="experience"
              className='border border-neutral-400 px-4 py-2 rounded-md'
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder='Enter your relevant experience'
            />
            {formErrors.experience && <span className='text-red-500 text-left'>{formErrors.experience}</span>}
          </div>
        )}
        {position === 'designer' && (
          <div className='flex flex-col gap-2'>
            <label htmlFor="portfolio" className='text-left'>Portfolio URL</label>
            <input
              type='url'
              id="portfolio"
              className='border border-neutral-400 px-4 py-2 rounded-md'
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
              placeholder='Enter your portfolio URL'
            />
            {formErrors.portfolio && <span className='text-red-500 text-left'>{formErrors.portfolio}</span>}
          </div>
        )}
        {position === 'manager' && (
          <div className='flex flex-col gap-2'>
            <label htmlFor="managementExperience" className='text-left'>Management Experience</label>
            <input
              type='text'
              id="managementExperience"
              className='border border-neutral-400 px-4 py-2 rounded-md'
              value={managementExperience}
              onChange={(e) => setManagementExperience(e.target.value)}
              placeholder='Describe your management experience'
            />
            {formErrors.managementExperience && <span className='text-red-500 text-left'>{formErrors.managementExperience}</span>}
          </div>
        )}
        <div className='flex flex-col gap-2'>
          <label className='text-left'>Additional Skills</label>
          <div className='flex flex-wrap gap-2'>
            {['JavaScript', 'CSS', 'Python', 'React', 'Node.js'].map(skill => (
              <label key={skill} className='flex gap-2 items-center'>
                <input
                  type='checkbox'
                  value={skill}
                  checked={additionalSkills.includes(skill)}
                  onChange={handleSkillsChange}
                />
                {skill}
              </label>
            ))}
          </div>
          {formErrors.additionalSkills && <span className='text-red-500 text-left'>{formErrors.additionalSkills}</span>}
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="interviewTime" className='text-left'>Preferred Interview Time</label>
          <input
            type='datetime-local'
            id="interviewTime"
            className='border border-neutral-400 px-4 py-2 rounded-md'
            value={interviewTime}
            onChange={(e) => setInterviewTime(e.target.value)}
          />
          {formErrors.interviewTime && <span className='text-red-500 text-left'>{formErrors.interviewTime}</span>}
        </div>
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
          <ul className='mt-4 ml-auto mr-auto w-1/4 '>
            {Object.keys(submittedData).map(key => (
              <li key={key} className='mb-2 text-left'>
                <span className='font-semibold'>{key.charAt(0).toUpperCase() + key.slice(1)}:</span> {submittedData[key]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default JobApplication;
