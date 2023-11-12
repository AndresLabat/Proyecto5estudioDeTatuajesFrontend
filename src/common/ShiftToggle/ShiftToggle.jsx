import React, { useState } from 'react';
import './ShiftToggle.css'

const ShiftToggle = ({ selectedShift, onShiftChange }) => {
    const shiftOptions = ["morning", "afternoon"];

    return (
        <div className="shift-toggle">
            <select
                className="shift-toggle-select"
                name="shift"
                value={selectedShift}
                onChange={(e) => onShiftChange(e.target.value)}
            >
                <option value="" disabled>Select shift</option>
                {shiftOptions.map((option) => (
                    <option key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ShiftToggle;