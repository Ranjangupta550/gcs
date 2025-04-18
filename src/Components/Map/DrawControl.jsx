import React from 'react';
import { DrawControl } from 'react-map-gl-draw'; // Import DrawControl

const DrawControlComponent = ({ onCreate, onUpdate, onDelete, initialData }) => {
  return (
    <DrawControl
      onCreate={onCreate}   // Triggered when a drawing is created
      onUpdate={onUpdate}   // Triggered when an existing drawing is updated
      onDelete={onDelete}   // Triggered when a drawing is deleted
      initialData={initialData} // Initial data (geofence) if exists
      controls={{
        point: false,    // Disable point drawing
        line_string: false, // Disable line drawing
        polygon: true,   // Enable polygon drawing
        rectangle: true,  // Enable rectangle drawing
        trash: true,  // Enable trash (delete) control
      }}
    />
  );
};

export default DrawControlComponent;
