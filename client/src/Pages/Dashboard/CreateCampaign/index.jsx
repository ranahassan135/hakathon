import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const initialState = {
    title: '',
    description: '',
    category: 'Other',
    goalAmount: '',
    image: null,
  }
const CreateCampaign = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, category, goalAmount, image } = formData
    if (!title || !description || !goalAmount || !category || !image) {
      return window.notify("Please fill all the fields", "error")
    }
    // const campaignData = formData
    const campaignData = new FormData()
    campaignData.append("title", title)
    campaignData.append("description", description)
    campaignData.append("category", category)
    campaignData.append("goalAmount", goalAmount)
    campaignData.append("image", image)

console.log(campaignData)
    setIsSubmitting(true);
    axios.post("http://localhost:8000/campaign/", campaignData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(({ status, data }) => {
        if (status == 200) {
          window.notify(data.message, "success")
          setFormData(initialState)
          setIsSubmitting(false);
        }
      }).catch((error) => {
        window.notify("Something went wrong while creating camapign", "error")
        console.log('error', error)
        setIsSubmitting(false);
      }).finally(() => {
        setIsSubmitting(false);
      })


  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            Create a New Campaign
          </h1>
          <p className="text-gray-600">Inspire donors with your new initiative!</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-xl font-medium transition-colors"
          >
            🏠 Back to Dashboard
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campaign Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Campaign Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Fund Education for Underprivileged Children"
              className="w-full h-12 px-4 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 placeholder-gray-500 text-gray-800"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Campaign Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your campaign's mission and impact..."
              className="w-full h-32 px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 placeholder-gray-500 text-gray-800"
              required
            ></textarea>
          </div>
          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full h-12 px-4 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 text-gray-800"
            >
              <option value="health">🏥 Healthcare</option>
              <option value="education">📚 Education</option>
              <option value="disaster">⛑️ Disaster Relief</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Goal Amount */}
          <div>
            <label htmlFor="goalAmount" className="block text-sm font-medium text-gray-700 mb-1">
              Fundraising Goal ($)
            </label>
            <input
              type="number"
              name="goalAmount"
              value={formData.goalAmount}
              onChange={handleChange}
              placeholder="e.g., 5000"
              className="w-full h-12 px-4 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 placeholder-gray-500 text-gray-800"
              required
              min="1"
            />
          </div>


          {/* Image Upload */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Campaign Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full h-12 px-4 py-2 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 text-gray-800"
            />
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Campaign Preview"
                  className="w-full max-w-xs rounded-lg shadow-sm"
                />
              </div>
            )}
          </div>


          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating...' : 'Create Campaign 🚀'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCampaign;