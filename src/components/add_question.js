import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "./Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid'; // Make sure to install uuid

const AddQuestion = () => {
    const [formData, setFormData] = useState({
        title: '',
        email: '',
        constraints: '',
        examples: '',
        testcase: '',
        hiddenTestcase: '',
        description:''
    });

    useEffect(() => {
        const emailFromStorage = localStorage.getItem('email');
        if (emailFromStorage) {
            setFormData(formData => ({ ...formData, email: emailFromStorage }));
        } else {
            toast.warn("Please log in to submit your question.");
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email) {
            toast.error("Email is required to submit a question.");
            return;
        }

        try {
            const response = await axios.post('https://featured-code-server.onrender.com/api/questions', { ...formData});
            toast.success("Question added successfully!");
            // Reset form or handle success
        } catch (error) {
            console.error('Error adding question:', error);
            toast.error("Error adding question.");
            // Handle error
        }
    };

    return (
        <>
            <Header />
            <ToastContainer />
            <div className="container mx-auto p-4">
                <form onSubmit={handleSubmit} className="w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        {/* Title Field */}
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="title" type="text" name="title" value={formData.title} onChange={handleChange}
                                required/>
                        </div>
                        {/* Email Field (Read-Only) */}
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="email" type="email" name="email" value={formData.email} readOnly/>
                        </div>
                    </div>
                    <div className="w-full px-3 mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* Constraints Field */}
                    <div className="w-full px-3 mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="constraints">
                            Constraints
                        </label>
                        <textarea
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="constraints"
                            name="constraints"
                            value={formData.constraints}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Examples Field */}
                    <div className="w-full px-3 mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="examples">
                            Examples
                        </label>
                        <textarea
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="examples"
                            name="examples"
                            value={formData.examples}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Testcase Field */}
                    <div className="w-full px-3 mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="testcase">
                            Test Cases
                        </label>
                        <textarea
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="testcase"
                            name="testcase"
                            value={formData.testcase}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Hidden Testcase Field */}
                    <div className="w-full px-3 mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hiddenTestcase">
                            Hidden Test Cases
                        </label>
                        <textarea
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="hiddenTestcase"
                            name="hiddenTestcase"
                            value={formData.hiddenTestcase}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <button type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add
                        Question
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddQuestion;
