import React from 'react';
// --- /src/components/common/PhoneMockup.js ---
const PhoneMockup = ({ children, className }) => (
    <div className={`mx-auto max-w-sm border-8 border-gray-800 rounded-2xl bg-gray-700 p-4 shadow-2xl ${className}`}>
        <div className="text-white space-y-4">{children}</div>
    </div>
);
export default PhoneMockup;
