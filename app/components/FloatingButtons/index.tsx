"use client";
import React, { useEffect, useState, MouseEvent } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

const FloatingButtons: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.overflow = isPopupOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isPopupOpen]);

  const styles = {
    overlay: {
      position: 'fixed' as const,
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      overflowY: 'auto' as const,
    },
    modal: {
      position: 'relative' as const,
      backgroundColor: 'white',
      borderRadius: '12px',
      width: '95%',
      maxWidth: '1000px',
      margin: '32px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
      overflow: 'hidden',
      maxHeight: '90vh',
    },
    closeButton: {
      position: 'absolute' as const,
      top: '12px',
      right: '12px',
      background: 'transparent',
      border: 'none',
      fontSize: '24px',
      color: '#333',
      cursor: 'pointer',
      zIndex: 100,
    },
    iframeWrapper: {
      marginTop: '16px',
      paddingTop: '32px',
    },
    iframe: {
      width: '100%',
      height: '600px',
      border: 'none',
    },
  };

  const floatingContainerStyle: React.CSSProperties = {
    position: 'fixed',
    right: '0px',
    top: '50%',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    zIndex: 1000,
  };

  const buttonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #9BBB59',
    color: '#9BBB59',
    backgroundColor: '#fff',
    borderRadius: '8px 0 0 8px',
    overflow: 'hidden',
    width: '56px',
    transition: 'width 0.3s ease',
    fontWeight: 600,
    cursor: 'pointer',
    textDecoration: 'none',
  };

  const iconStyle: React.CSSProperties = {
    padding: '16px',
    flexShrink: 0,
  };

  const labelStyle: React.CSSProperties = {
    padding: '0 16px',
    opacity: 0,
    whiteSpace: 'nowrap' as const,
    transition: 'opacity 0.3s ease',
  };

  const handleMouseEnter = (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.width = 'fit-content';
    const label = e.currentTarget.querySelector('span');
    if (label) (label as HTMLElement).style.opacity = '1';
  };

  const handleMouseLeave = (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.width = '56px';
    const label = e.currentTarget.querySelector('span');
    if (label) (label as HTMLElement).style.opacity = '0';
  };

  return (
    <>
      {/* Floating Buttons */}
      <div style={floatingContainerStyle}>
        {/* Appointment Button */}
        <div style={{ width: 'fit-content', marginLeft: 'auto' }}>
          <button
            onClick={() => setIsPopupOpen(true)}
            style={{ ...buttonStyle }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div style={iconStyle}>
              <FaCalendarAlt size={18} />
            </div>
            <span style={labelStyle}>Einen Termin Vereinbaren</span>
          </button>
        </div>
      </div>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <button onClick={() => setIsPopupOpen(false)} style={styles.closeButton}>
              ×
            </button>
            <div style={styles.iframeWrapper}>
              <iframe
                src="https://calendly.com/turiyayoga-info/30min"
                allowFullScreen
                style={styles.iframe}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingButtons;
