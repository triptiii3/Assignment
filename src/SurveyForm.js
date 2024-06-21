import React, { useEffect, useState } from 'react';

const SurveyForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState("");
  const [exp, setExp] = useState("");
  const [exercise, setExercise] = useState("");
  const [diet, setDiet] = useState("");
  const [qualification, setQualification] = useState("")
  const [field, setField] = useState("");
  const [feedback, setFeedback] = useState("");
  const [educationData, setEducationData] = useState([]);
  const [healthData, setHealthData] = useState([]);
  const [technologyData, setTechnologyData] = useState([]);

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    exp: '',
    language: '',
    exercise: '',
    diet: '',
    qualification: '',
    field: '',
    feedback: '',
  });

  const getEducationData = async () => {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple')
      const data = await response.json();
      setEducationData(data.results);
      console.log(data.results)
    }
    catch (error) {
console.log(error)
    }
  }
  const getHealthData = async () => {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple')
      const data = await response.json();
      setHealthData(data.results);
    

    }
    catch (error) {
console.log(error)
    }
  }
  const getTechnologyData = async () => {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=10&category=30&difficulty=easy&type=multiple')
      const data = await response.json();
      setTechnologyData(data.results);
    }
    catch (error) {
console.log(error)
    }
  }
  // useEffect(()=>{
  //   getDockerData();
  //   getBashData();
  //   getLinuxData();
  // })

  const handleTechnologyInputChange = (key, value) => {
    const newTechnologyData = [...technologyData];
    newTechnologyData[key].answer = value;
    setTechnologyData(newTechnologyData);
  };
  const handleEducationInputChange = (key, value) => {
    const newEducationData = [...educationData];
    newEducationData[key].answer = value;
    setEducationData(newEducationData);
  };
  const handleHealthInputChange = (key, value) => {
    const newHealthData = [...healthData];
    newHealthData[key].answer = value;
    setHealthData(newHealthData);
  };

  const [submittedData, setSubmittedData] = useState(null);


  const isSubmitDisabled = () => {
    return !name || !email || !topic ||
      (topic ===
        "Technology" && !language && !exp
      )
      ||
      (topic==="Health" && !exercise && !diet) 
      ||
      (topic==="Education" && !qualification && !field)
      || !feedback
  };

  const handleTopicChange = (e) => {
    const selectedTopic = e.target.value;
    setTopic(selectedTopic);

    switch (selectedTopic) {
      case 'Technology':
        getTechnologyData();
        break;
      case 'Education':
        getEducationData();
        break;
      case 'Health':
        getHealthData();
        break;
      default:

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
        topic,
        feedback,

      };
      setSubmittedData(data);
      setName("");
      setEmail("");
      setTopic("");
      setFeedback("");

      setFormErrors({
        name: '',
        email: '',
        category: '',
        feedback:'',
      });
    }
  };

  const validateForm = () => {
    let errors = {
      name: '',
      email: '',
      category: '',
      feedback:''

    };

    if (!name.trim()) {
      errors.name = 'Name is required';
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    if (topic === "Technology") {
      if (!language) {
        errors.language = 'Programming language is required';
      }
      if (!exp) {
        errors.exp = 'Experience is required';
      }
    }

    if (topic === "Health") {
      if (!exercise) {
        errors.exercise = 'Exercise frequency is required';
      }
      if(!diet){
        errors.diet="Diet preference is required";
      }
    }
    if(topic==="Education"){
      if(!qualification){
        errors.qualification='Qualification is required';
      }
      if(!field){
        errors.field='Field is required';
      }
    }

    if (!feedback.trim()) {
      errors.feedback = 'Feedback is required';
    } else if (feedback.trim().length < 50) {
      errors.feedback = 'Feedback must be at least 50 characters';
    }


    return errors;
  };

  return (
    <div className='p-12'>
      <h1 className='text-2xl font-semibold text-neutral-700'>
        Survey Form
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
          <label htmlFor="topic" className='text-left'>Survey Topic</label>
          <select
            id="topic"
            className='border border-neutral-400 px-4 py-2 rounded-md'
            value={topic}
            onChange={handleTopicChange}
          >
            <option value="">Select a topic</option>
            <option value="Technology" >Technology</option>
            <option value="Education" >Education</option>
            <option value="Health" >Health</option>
          </select>
        </div>

     

        {topic === "Technology" && (<>
          <div className='flex flex-col gap-2'>
            <label htmlFor="proglanguage" className='text-left'>Favourite programming language</label>
            <select
              id="proglanguage"
              className='border border-neutral-400 px-4 py-2 rounded-md'
              value={language}
              onChange={(e)=>setLanguage(e.target.value)}
            >
              <option value="">Select your favourite language</option>
              <option value="Javascript">Javascript</option>
              <option value="Python" >Python</option>
              <option value="Java" >Java</option>
              <option value="C++" >C++</option>
            </select>
            {formErrors.language && <span className='text-left text-red-500 '>{formErrors.language}</span>}
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="years" className='text-left'>Years of Experience</label>
            <input
              type='number'
              id="years"
              className='border border-neutral-400 px-4 py-2 rounded-md'
              value={exp}
              onChange={(e) => setExp(e.target.value)}
              placeholder='Enter your years of experience'
            />
            {formErrors.years && <span className='text-left text-red-500 '>{formErrors.years}</span>}
          </div>
          {technologyData.map((item, key) => (
            <div className='flex flex-col gap-2' key={key}>
              <label htmlFor={`question-${key}`} className='text-left'>{item.question}</label>
              <input
                type="text"
                id={`question-${key}`}
                className='border border-neutral-400 px-4 py-2 rounded-md'
                value={item.answer || ''} 
                onChange={(e) => handleTechnologyInputChange(key, e.target.value)}
              />
            </div>
          ))}
        </>)}
        {topic === "Health" && (<>
          <div className='flex flex-col gap-2'>
            <label htmlFor="exfrequency" className='text-left'>Exercise Frequency</label>
            <select
              id="exfrequency"
              className='border border-neutral-400 px-4 py-2 rounded-md'
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
            >
              <option value="">Select Frequency</option>
              <option value="Daily">Daily</option>
              <option value="Weekly" >Weekly</option>
              <option value="Monthly" >Monthly</option>
              <option value="Rarely" >Rarely</option>
            </select>
            {formErrors.exercise && <span className='text-left text-red-500 '>{formErrors.exercise}</span>}
           
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="diet" className='text-left'>Diet Preference</label>
            <select
              id="diet"
              className='border border-neutral-400 px-4 py-2 rounded-md'
              value={diet}
              onChange={(e) => setDiet(e.target.value)}
            >
              <option value="">Select your Preference</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan" >Vegan</option>
              <option value="Non_vegetarian" >Non vegetarian</option>

            </select>
            {formErrors.diet && <span className='text-left text-red-500 '>{formErrors.diet}</span>}
          </div>
          {healthData.map((item, key) => (
            <div className='flex flex-col gap-2' key={key}>
              <label htmlFor={`question-${key}`} className='text-left'>{item.question}</label>
              <input
                type="text"
                id={`question-${key}`}
                className='border border-neutral-400 px-4 py-2 rounded-md'
                value={item.answer}
                onChange={(e) => handleHealthInputChange(key, e.target.value)}
              />
            </div>
          ))}
        </>)}
        {topic === "Education" && (<>
          <div className='flex flex-col gap-2'>
            <label htmlFor="qualification" className='text-left'>Highest Qualification</label>
            <select
              id="qualification"
              className='border border-neutral-400 px-4 py-2 rounded-md'
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
            >
              <option value="">Select Qualification</option>
              <option value="High_school">High school</option>
              <option value="Bachelor" >Bachelor's</option>
              <option value="Master" >Master's</option>
              <option value="PhD" >PhD</option>
            </select>
            {formErrors.qualification && <span className='text-left text-red-500 '>{formErrors.qualification}</span>}
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="field" className='text-left'>Field of Study</label>
            <input
              type='text'
              id="field"
              className='border border-neutral-400 px-4 py-2 rounded-md'
              value={field}
              onChange={(e) => setField(e.target.value)}
              placeholder='Enter your field of study'
            />
            {formErrors.field && <span className='text-left text-red-500 '>{formErrors.field}</span>}
          </div>
          {educationData.map((item, key) => (
            <div className='flex flex-col gap-2' key={key}>
              <label htmlFor={`question-${key}`} className='text-left'>{item.question}</label>
              <input
                type="text"
                id={`question-${key}`}
                className='border border-neutral-400 px-4 py-2 rounded-md'
                value={item.answer || ''} 
                onChange={(e) => handleEducationInputChange(key, e.target.value)}
              />
            </div>
          ))}
        </>)}
        <div className='flex flex-col gap-2'>
          <label htmlFor="feedback" className='text-left'>Feedback</label>
          <textarea
            type='feedback'
            id="feedback"
            className='border border-neutral-400 px-4 py-2 rounded-md'
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder='Enter your feedback'
          />
          {formErrors.email && <span className='text-left text-red-500 '>{formErrors.email}</span>}
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

export default SurveyForm;
