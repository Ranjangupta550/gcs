import React from "react";
import { useState } from "react";

function inputParameter() {
  const [formData, setFormData] = useState({
    altitude: "",
    longitude: "",
    latitude: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("YOUR_SERVER_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Data submitted successfully");
      } else {
        console.error("Error submitting data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center"
    >
      <div className="w-4/5 ">
        <label className="">
          Altitude:
          <input
            className="w-full pr-2 pl-2 p-1"
            type="text"
            name="altitude"
            value={formData.altitude}
            onChange={handleChange}
          />
        </label>

        {/* <label>
                Longitude:
                <input className="w-full" type="text" name="longitude" value={formData.longitude} onChange={handleChange} />
            </label>
     
            <label>
                Latitude:
                <input className="w-full" type="text" name="latitude" value={formData.latitude} onChange={handleChange} />
            </label> */}
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 transation duration-200 w-24 h-8 rounded-md mt-2"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
export default inputParameter;
