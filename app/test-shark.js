import React from 'react';
import Shark from '../components/Shark';

const TestSharkComponent = () => {
  return (
    <div className="test-container" style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <h1 style={{
        textAlign: 'center',
        marginBottom: '20px'
      }}>Shark Component Test</h1>
      
      <div className="shark-wrapper" style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '20px',
        backgroundColor: '#f5f5f5'
      }}>
        <Shark />
      </div>
      
      <p style={{
        textAlign: 'center',
        marginTop: '20px'
      }}>This is a test page for the Shark SVG component</p>
    </div>
  );
};

export default TestSharkComponent;