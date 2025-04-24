import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import AnimatedShark from './AnimatedShark';
import SeaweedImage from './SeaweedImage';
import Goggles from './goggles';

const VerificationScene = ({ onComplete, style }) => {
  // States to control the flow of the scene
  const [targetType, setTargetType] = useState(null);
  const [targetPositions, setTargetPositions] = useState({});
  const [currentTarget, setCurrentTarget] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [identification, setIdentification] = useState(null);
  const [showStartButton, setShowStartButton] = useState(true);
  
  // Set target for verification
  const setTarget = (targetInfo) => {
    setTargetPositions(prev => ({
      ...prev,
      [targetInfo.id]: targetInfo.position
    }));
  };
  
  // Start the verification process
  const startVerification = () => {
    setShowStartButton(false);
    setTargetType('seaweed');
  };
  
  // Handle identification from goggles (will be wrong)
  const handleIdentification = (result) => {
    setIdentification(result);
    
    // After a short delay, start shark verification
    setTimeout(() => {
      setCurrentTarget('seaweed');
      setIsVerifying(true);
    }, 1500);
  };
  
  // Handle completion of verification
  const handleVerificationComplete = () => {
    // After the shark has verified and shown the message
    setTimeout(() => {
      setIsVerifying(false);
      setIdentification(null);
      
      // Notify parent component that the scene is complete
      if (onComplete) {
        onComplete();
      }
    }, 1000);
  };
  
  return (
    <View style={[styles.container, style]}>
      {/* Top section for goggles and messages */}
      <View style={styles.topSection}>
        <Goggles 
          onIdentification={handleIdentification} 
          targetType={targetType}
        />
      </View>
      
      {/* Center section for underwater scene */}
      <View style={styles.sceneContainer}>
        {/* Seaweed positioned in the scene */}
        <View style={styles.seaweedContainer}>
          <SeaweedImage 
            id="seaweed" 
            setTarget={setTarget} 
            style={styles.seaweed}
          />
        </View>
        
        {/* Shark positioned in the scene */}
        <View style={styles.sharkContainer}>
          <AnimatedShark 
            isVerifying={isVerifying}
            targetPosition={currentTarget ? targetPositions[currentTarget] : null}
            onVerificationComplete={handleVerificationComplete}
            style={styles.shark}
          />
        </View>
      </View>
      
      {/* Start button */}
      {showStartButton && (
        <TouchableOpacity 
          style={styles.startButton}
          onPress={startVerification}
        >
          <Text style={styles.buttonText}>Start Verification</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  sceneContainer: {
    width: '100%',
    height: 400,
    position: 'relative',
    backgroundColor: 'rgba(173, 216, 230, 0.2)',
    borderRadius: 20,
  },
  seaweedContainer: {
    position: 'absolute',
    right: 100,
    bottom: 20,
  },
  seaweed: {
    // The seaweed has its own size
  },
  sharkContainer: {
    position: 'absolute',
    left: 20,
    bottom: 100,
  },
  shark: {
    transform: [{ scale: 0.5 }], // Scale down the shark for the scene
  },
  startButton: {
    marginTop: 20,
    backgroundColor: '#0077cc',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default VerificationScene;