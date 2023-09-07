import React from 'react';

// Import the CustomButton component
import CustomButton from './CustomButton';

// Define the AIPicker component
const AIPicker = ({ prompt, setPrompt, generatingImg, handleSubmit }) => {
  return (
    <div className='aipicker-container'>
      {/* Textarea for entering AI prompts */}
      <textarea 
        className='aipicker-textarea'
        placeholder='Ask AI...'
        value={prompt}
        rows={5}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className="flex flex-wrap gap-3">
        {generatingImg ? (
          // Render a button when generating an image
          <CustomButton 
            type='outline'
            title="Asking AI..."
            customStyles='text-xs'
          />
        ) : (
          // Render buttons for choosing AI logo or AI full image
          <>
            <CustomButton 
              type='outline'
              title="AI Logo"
              handleClick={() => handleSubmit('logo')}
              customStyles='text-xs'
            />
            <CustomButton 
              type='filled'
              title="AI Full"
              handleClick={() => handleSubmit('full')}
              customStyles='text-xs'
            />
          </>
        )}
      </div>
    </div>
  )
}

export default AIPicker;