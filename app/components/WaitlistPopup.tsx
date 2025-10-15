import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const images = {
  pattern: {
    src: "/assets/pattern.svg",
    width: 450,
    height: 120
  },
  tick: {
    src: "/assets/tick.svg",
    width: 128,
    height: 128
  },
  closeIcon: {
    src: "/assets/close.svg",
    width: 23,
    height: 23
  },
  ireland: {
    src: "/assets/ireland.svg",
    width: 18,
    height: 18
  }
};

interface WaitlistPopupProps {
  onClose: () => void;
}

const WaitlistPopup: React.FC<WaitlistPopupProps> = ({ onClose }) => {
  const [name, setName] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [mobileError, setMobileError] = useState<string>('');
  const [eircode, setEircode] = useState<string>('');
  const [eircodeError, setEircodeError] = useState<string>('');
  const [description, setDescription] = useState<string>('tenant');
  const [space, setSpace] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  // Prevent background scrolling when popup is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Helper function to get full text description
  const getDescriptionText = (value: string): string => {
    const descriptionMap: { [key: string]: string } = {
      'owner': 'I own a home and am looking to rent out a room.',
      'tenant': "I&apos;m a tenant and would like to sublet a room.",
      'manager': 'I help manage or list properties for others.',
      'learn': 'I just want to learn more about this.'
    };
    return descriptionMap[value] || value;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitMessage(null);

    // Validation
    if (!name.trim()) {
      setSubmitMessage({ type: 'error', text: 'Please enter your name.' });
      return;
    }
    if (!mobile.trim()) {
      setSubmitMessage({ type: 'error', text: 'Please enter your mobile number.' });
      return;
    }
    if (mobile.length > 9) {
      setMobileError('Please enter a valid mobile number.');
      return;
    }
    if (eircode.length !== 7) {
      setEircodeError('Please enter a valid Eircode.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create timestamp in readable format
      const timestamp = new Date().toLocaleString('en-IE', {
        dateStyle: 'medium',
        timeStyle: 'short'
      });

      // Prepare data with full text description
      const formData = {
        name: name.trim(),
        mobile: `+353${mobile}`,
        eircode: eircode,
        type: getDescriptionText(description),  // Radio button selection
        spaceDescription: space.trim() || 'N/A',  // Textarea about their space
        timestamp: timestamp
      };

      // Log the data being sent (for debugging)
      console.log('Form data being sent:', formData);

      // Send to Google Apps Script
      // Use no-cors mode to avoid CORS issues with Google Apps Script
      fetch(
        'https://script.google.com/macros/s/AKfycbxPqrzHAfQLWEI_ldQfbyw7tiQE_xHFq1jo9LCxdi72pHjf6rEapROtVNnLndDM7n8n/exec',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      ).catch(error => {
        console.error('Submission error:', error);
      });

      // Show success screen immediately (data is sent in background)
      setShowSuccess(true);
      
      // Reset form
      setName('');
      setMobile('');
      setEircode('');
      setDescription('tenant');
      setSpace('');

    } catch (error) {
      console.error('Submission error:', error);
      setSubmitMessage({ 
        type: 'error', 
        text: 'Failed to submit. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Email handler
  const handleEmailMe = () => {
    window.location.href = 'mailto:jithin.koottu@gmail.com'; // Update with your email
  };

  // Success Screen
  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 overflow-y-auto p-4">
        <div className="bg-white rounded-[16px] shadow-lg w-full max-w-[450px] my-auto relative overflow-hidden" style={{
          background: 'linear-gradient(180deg, rgba(43, 208, 110, 0.20) 0%, rgba(43, 208, 110, 0.00) 52.06%), #FFF'
        }}>
          {/* Pattern background at top */}
          <div className="absolute top-0 left-0 right-0 flex justify-center">
            <Image 
              src={images.pattern.src}
              alt=""
              width={images.pattern.width}
              height={images.pattern.height}
              className="w-full h-auto"
            />
          </div>
          
          <div className="relative p-8 text-center">
            {/* Success checkmark */}
            <div className="flex justify-center">
              <Image 
                src={images.tick.src}
                alt="Success"
                width={images.tick.width}
                height={images.tick.height}
                className="w-32 h-32"
              />
            </div>

            {/* Success text */}
            <h2 className="text-[24px] font-cooper-bt-medium text-[#1CC969] mb-4 leading-tight">
              You have successfully<br />joined the waitlist!
            </h2>
            <p className="text-[16px] text-[#0E1B22] font-geist-medium mb-9">
              We&apos;ll get in touch with you soon.
            </p>

            {/* Action buttons */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleEmailMe}
                className="flex items-center gap-1 px-4 py-3  h-10 w-32 bg-[#0E1B22] text-white rounded-[14px] font-geist-semibold text-[16px] hover:bg-[#2F4F4F] transition duration-300 shadow-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email me
              </button>
              <button
                onClick={onClose}
                className="flex items-center gap-1 px-3 py-3 h-10 w-25 bg-white text-[#575757] border-2 border-[#575757] rounded-[14px] font-geist-semibold text-[16px] hover:bg-gray-50 transition duration-300 shadow-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Form Screen
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 overflow-y-auto p-4">
      <div className="bg-white rounded-[16px] shadow-lg w-full max-w-[400px] my-auto">
        <div className="p-6">
          <div className="relative mb-6">
            <h2 className="text-[18px] font-bold font-cooper-bt-medium text-[#0E1B22] text-center">Almost there!</h2>
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <button 
                onClick={onClose} 
                className="text-[#0E1B22] opacity-60 hover:opacity-100 w-6 h-6 flex items-center justify-center"
                aria-label="Close"
              >
                <Image 
                  src={images.closeIcon.src}
                  alt="Close"
                  width={images.closeIcon.width}
                  height={images.closeIcon.height}
                  className="w-[23px] h-[23px]" 
                />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-geist-semibold text-[#0E1B22] mb-1">Name<span className="text-red-500">*</span></label>
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-[10px] h-[38px] border border-[#E1E8F1] rounded-[8px] text-[14px] font-geist-regular text-[#0E1B22] placeholder-[#90A5BA] placeholder-opacity-60 focus:outline-none focus:ring-0 focus:border-[#0E1B22]"
              style={{ boxShadow: '0px 3px 14px 0px #0000000A' }}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="mobileNumber" className="block text-sm font-geist-semibold text-[#0E1B22] mb-1">Mobile Number<span className="text-red-500">*</span></label>
            <div className="flex gap-1 w-full">
              <div className="flex-shrink-0 flex items-center bg-white px-3 font-geist-regular text-[#0E1B22] h-[38px] border border-[#E1E8F1] rounded-[8px]"
                   style={{ boxShadow: '0px 3px 14px 0px #0000000A' }}>
                <Image 
                  src={images.ireland.src}
                  alt="Ireland Flag"
                  width={images.ireland.width}
                  height={images.ireland.height}
                  className="w-[18px] h-[18px] mr-2" 
                /> 
                <span className='text-[14px] text-[#0E1B22]'>+353</span>
              </div>
              <div className="flex-grow">
                <input
                  type="text"
                  id="mobileNumber"
                  placeholder="(000) 000 0000"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={mobile}
                  required
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    const digits = target.value.replace(/\D+/g, '');
                    setMobile(digits);
                    setMobileError(digits.length > 9 ? 'Please enter a valid mobile number.' : '');
                  }}
                  className={`w-full px-[10px] h-[38px] border ${mobileError ? 'border-red-500' : 'border-[#E1E8F1]'} rounded-[8px] font-geist-regular text-[14px] text-[#0E1B22] placeholder-[#90A5BA] focus:outline-none focus:ring-0 focus:border-[#0E1B22]`}
                  style={{ boxShadow: '0px 3px 14px 0px #0000000A' }}
                  aria-invalid={mobileError ? 'true' : 'false'}
                  aria-describedby={mobileError ? 'mobile-error' : undefined}
                />
              </div>
            </div>
            {mobileError && (
              <p id="mobile-error" className="mt-1 text-[12px] text-red-600 font-geist-medium">{mobileError}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="eircode" className="block text-sm font-geist-semibold text-[#0E1B22] mb-1">Eircode<span className="text-red-500">*</span></label>
            <input
              type="text"
              id="eircode"
              placeholder="e.g. D02 XY45"
              value={eircode}
              required
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                const sanitized = target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
                setEircode(sanitized);
                if (sanitized.length > 7) {
                  setEircodeError('Please enter a valid Eircode.');
                } else {
                  setEircodeError('');
                }
              }}
              className={`w-full px-[10px] h-[38px] border ${eircodeError ? 'border-red-500' : 'border-[#E1E8F1]'} rounded-[8px] font-geist-regular text-[14px] text-[#0E1B22] placeholder-[#90A5BA] placeholder-opacity-60 focus:outline-none focus:ring-0 focus:border-[#0E1B22]`}
              style={{ boxShadow: '0px 3px 14px 0px #0000000A' }}
              aria-invalid={eircodeError ? 'true' : 'false'}
              aria-describedby={eircodeError ? 'eircode-error' : undefined}
            />
            {eircodeError && (
              <p id="eircode-error" className="mt-1 text-[12px] text-red-600 font-geist-medium">{eircodeError}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-geist-semibold text-[#0E1B22] mb-2">Which best describes you?<span className="text-red-500">*</span> <span className="text-[#0E1B22] opacity-60 font-geist-medium text-[12px]">(Choose one)</span></label>
            <div className="space-y-3">
              <label className="flex items-start radio-label">
                <input 
                  type="radio" 
                  name="description" 
                  value="owner" 
                  className="hidden" 
                  checked={description === 'owner'}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <span className="radio-custom mr-2 mt-[3px]"></span>
                <span className="text-sm font-geist-regular text-[#0E1B22]">I own a home and am looking to rent out a room.</span>
              </label>
              <label className="flex items-start radio-label">
                <input 
                  type="radio" 
                  name="description" 
                  value="tenant" 
                  className="hidden" 
                  checked={description === 'tenant'}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <span className="radio-custom mr-2 mt-[3px]"></span>
                <span className="text-sm font-geist-regular text-[#0E1B22]">I am a tenant and would like to sublet a room.</span>
              </label>
              <label className="flex items-start radio-label">
                <input 
                  type="radio" 
                  name="description" 
                  value="manager" 
                  className="hidden" 
                  checked={description === 'manager'}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <span className="radio-custom mr-2 mt-0.5"></span>
                <span className="text-sm font-geist-regular text-[#0E1B22]">I help manage or list properties for others.</span>
              </label>
              <label className="flex items-start radio-label">
                <input 
                  type="radio" 
                  name="description" 
                  value="learn" 
                  className="hidden" 
                  checked={description === 'learn'}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <span className="radio-custom mr-2 mt-0.5"></span>
                <span className="text-sm font-geist-regular text-[#0E1B22]">I just want to learn more about this.</span>
              </label>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="space" className="block text-sm font-geist-semibold text-[#0E1B22] mb-1">Tell us a bit about your space <span className="text-[#0E1B22] opacity-60 font-geist-medium text-[12px]">(Optional)</span></label>
            <textarea
              id="space"
              rows={3}
              placeholder="e.g. 1BHK in Tallaght, near LUAS stop"
              value={space}
              onChange={(e) => setSpace(e.target.value)}
              className="w-full px-4 py-3 border border-[#DEEDE0] rounded-[8px] font-geist-regular text-[#0E1B22] placeholder-[#90A5BA] placeholder-opacity-60 focus:outline-none focus:ring-0 focus:border-[#0E1B22] text-[14px]"
              style={{ boxShadow: '0px 3px 14px 0px #0000000A' }}
            ></textarea>
          </div>

          <p className="text-xs text-[#0E1B22] opacity-60 font-geist-regular mb-4">
            We&apos;ll only use your details to notify you about verified student matches.
          </p>

          {submitMessage && submitMessage.type === 'error' && (
            <div className="mb-4 p-3 rounded-[8px] text-sm font-geist-medium text-center bg-red-50 text-red-800 border border-red-200">
              {submitMessage.text}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-[#0E1B22] text-white text-base font-geist-semibold rounded-[14px] transition duration-300 hover:bg-[#2F4F4F] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ boxShadow: '0px 3px 7px 0px #00C75026' }}
          >
            {isSubmitting ? 'Submitting...' : 'Join the waitlist'}
          </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WaitlistPopup;
