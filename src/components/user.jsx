/* eslint-disable react/prop-types */
import "../styles/userstyles.scss";
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const User = ({fscore}) => {

  const nav=useNavigate();
  const location = useLocation();
  const finalscore = location.state?.fscore || -1;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    score:String(finalscore),
  });

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/questions', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('User registered successfully:', response.data);
      nav('/quiz-done')
    } catch (error) {
      console.error('Error registering user:', error);
      window.alert('An error occurred. Check if all the fields are filled.');
    }
  };
  

  return (
    <div className="user_reg">
      <form onSubmit={handleSubmit}>
        NAME: <input type="text" name="name" value={formData.name} onChange={handleChange} /><br />
        EMAIL: <input type="email" name="email" value={formData.email} onChange={handleChange} /><br />
        <label htmlFor="department">DEPARTMENT:</label>
        <select
          id="department"
          name="department"
          value={formData.department}
          onChange={handleChange}
        >
          <option value="">Select Department</option>
          <option value="CSE">CSE</option>
          <option value="IT">IT</option>
          <option value="ECE">ECE</option>
          <option value="EEE">EEE</option>
          <option value="MEC">MEC</option>
        </select>
        <br/>
        Score:<p>{finalscore}</p>
        <input type="submit" className="submit" />
      </form>
    </div>
  );
};

export default User;
