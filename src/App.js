import React from 'react';
import './App.css';
import Home from './Home';
import Gradient from './images/gradient.png';
import Gradient2 from './images/gradient-2.png';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import EventRegistration from './EventRegistration';
import JobApplication from './JobApplication';
import SurveyForm from './SurveyForm';

function App() {
  return (
    <div className="App">
      <Router>
        
          <img src={Gradient} className='absolute right-0' alt="Gradient" />
       

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event" element={<EventRegistration />} />
          <Route path="/job" element={<JobApplication />} />
          <Route path="/survey" element={<SurveyForm />} />
        </Routes>

        
          <img src={Gradient2} className='absolute bottom-0 ' alt="Gradient" />
  
      </Router>
    </div>
  );
}

export default App;
