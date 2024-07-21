import React, { useState, useEffect } from 'react';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from '../firebase';
import Sidebar from '../components/sidebar';
import './StudentProfile.css';

function PersonalInformation() {
  const [formData, setFormData] = useState({
    familyName: '',
    firstName: '',
    middleName: '',
    suffix: '',
    classification: 'Freshman',
    department: 'Baccalaureate',
    program: 'BS in Computer Engineering',
    yearLevel: '3',
    dateOfBirth: '',
    placeOfBirth: '',
    age: '',
    status: '',
    citizenship: '',
    religion: '',
    mobileNumber: '',
    emailAddress: '',
    address: '',
    province: '',
    municipalityCity: '',
    zipCode: '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data());
        }
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      try {
        await setDoc(doc(db, "users", user.uid), formData);
        console.log('Data saved successfully');
        // Upload the image to storage and save the URL to the database
        // You can use Firebase Storage for this purpose


        // palihug nalag adjust sa pagsuds sa container wa koy data lisod i chatgpts selpon 

        
      } catch (error) {
        console.error('Error saving data:', error);
      }
    }
  };

  return (
    <div>
      <div className="personal-information">
        <form onSubmit={handleSubmit} className="content-wrapper">
          <div className="column">
            <div className="profile-image-wrapper">
              <img
                loading="lazy"
                src={imagePreviewUrl || "https://cdn.builder.io/api/v1/image/assets/TEMP/06632949bef9bc4dbed8293b071d72f3d69aaa4adaa997f630ff734eae92504c?apiKey=a38f3cba0a6b4fdbabbbee8891d4e212&"}
                className="profile-image"
                alt="profile picture"
              />
              <input type="file" accept="image/*" onChange={handleImageChange} className="file-input" />
            </div>
          </div>
          <div className="column-2">
            <div className="info-container">
              <div className="header">PERSONAL INFORMATION</div>
              <div className="info-content">
                <div className="info-section">
                  <div className="info-row">
                    <div className="info-grid">
                      <div className="info-group">
                        <div className="info-item">
                          <div className="info-label">Family Name</div>
                          <input type="text" name="familyName" value={formData.familyName} onChange={handleChange} className="info-value" />
                        </div>
                        <div className="info-item">
                          <div className="info-label">First Name</div>
                          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="info-value" />
                        </div>
                        <div className="info-item">
                          <div className="info-label">Middle Name</div>
                          <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} className="info-value" />
                        </div>
                        <div className="info-item">
                          <div className="info-label">Suffix</div>
                          <input type="text" name="suffix" value={formData.suffix} onChange={handleChange} className="info-value" />
                        </div>
                      </div>
                      <div className="info-group">
                        <div className="info-item">
                          <div className="info-label">Classification</div>
                          <select name="classification" value={formData.classification} onChange={handleChange} className="info-value">
                            <option value="Baccalaureate">Baccalaureate</option>
                            <option value="Associate">Associate</option>
                            <option value="Doctorate">Doctorate</option>
                            <option value="Master's Degree">Master's Degree</option>
                          </select>
                        </div>
                        <div className="info-item">
                          <div className="info-label">Department</div>
                          <select name="department" value={formData.department} onChange={handleChange} className="info-value">
                            <option value="Freshman">Freshman</option>
                            <option value="Sophomore">Sophomore</option>
                            <option value="Junior">Junior</option>
                            <option value="Senior">Senior</option>
                            <option value="Super Senior">Super Senior</option>
                            <option value="Legendary Senior">Legendary Senior</option>
                            <option value="Mythical Senior">Mythical Senior</option>
                          </select>
                        </div>
                        <div className="info-item">
                          <div className="info-label">Program</div>
                          <select name="program" value={formData.program} onChange={handleChange} className="info-value">
                            <option value="BS in Computer Engineering">BS in Computer Engineering</option>
                            <option value="BS in Pharmacy">BS in Pharmacy</option>
                            <option value="BS in Civil Engineering">BS in Civil Engineering</option>
                          </select>
                        </div>
                        <div className="info-item">
                          <div className="info-label">Year Level</div>
                          <select name="yearLevel" value={formData.yearLevel} onChange={handleChange} className="info-value">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="info-section">
                  <div className="info-item">
                    <div className="info-label">Date of Birth</div>
                    <input type="text" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="info-value" />
                  </div>
                  <div className="info-item">
                    <div className="info-label">Place of Birth</div>
                    <input type="text" name="placeOfBirth" value={formData.placeOfBirth} onChange={handleChange} className="info-value" />
                  </div>
                  <div className="info-item">
                    <div className="info-label">Age</div>
                    <input type="text" name="age" value={formData.age} onChange={handleChange} className="info-value" />
                  </div>
                  <div className="info-item">
                    <div className="info-label">Status</div>
                    <input type="text" name="status" value={formData.status} onChange={handleChange} className="info-value" />
                  </div>
                  <div className="info-item">
                    <div className="info-label">Citizenship</div>
                    <input type="text" name="citizenship" value={formData.citizenship} onChange={handleChange} className="info-value" />
                  </div>
                </div>
                <div className="info-section">
                  <div className="info-item">
                    <div className="info-label">Religion</div>
                    <input type="text" name="religion" value={formData.religion} onChange={handleChange} className="info-value" />
                  </div>
                  <div className="info-item">
                    <div className="info-label">Mobile Number</div>
                    <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} className="info-value" />
                  </div>
                  <div className="info-item">
                    <div className="info-label">Email Address</div>
                    <input type="text" name="emailAddress" value={formData.emailAddress} onChange={handleChange} className="info-value" />
                  </div>
                </div>
                <div className="info-section">
                  <div className="info-item">
                    <div className="info-label">Address</div>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} className="info-value" />
                  </div>
                  <div className="info-item">
                    <div className="info-label">Province</div>
                    <input type="text" name="province" value={formData.province} onChange={handleChange} className="info-value" />
                  </div>
                  <div className="info-item">
                    <div className="info-label">Municipality/City</div>
                    <input type="text" name="municipalityCity" value={formData.municipalityCity} onChange={handleChange} className="info-value" />
                  </div>
                  <div className="info-item">
                    <div className="info-label">Zip Code</div>
                    <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} className="info-value" />
                  </div>
                </div>
                <div className="info-section">
                  <button type="submit" className="submit-button">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PersonalInformation;
