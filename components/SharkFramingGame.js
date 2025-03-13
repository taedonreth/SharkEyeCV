import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import SharkIcon from './SharkIcon';

const SharkFramingGame = () => {
  // Game state
  const [gameStarted, setGameStarted] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [maxAttempts, setMaxAttempts] = useState(5);
  
  // Feedback state
  const [feedbackState, setFeedbackState] = useState({
    message: '',
    visible: false
  });
  
  // Game area dimensions
  const gameWidth = 300;
  const gameHeight = 300;
  
  // Shark position and size
  const [sharkPosition, setSharkPosition] = useState({ x: 150, y: 150 });
  const [sharkSize, setSharkSize] = useState(40);
  
  // Frame position and size - CHANGED: initial size is 0x0 (no visible rectangle)
  const [framePosition, setFramePosition] = useState({ x: 100, y: 100 });
  const [frameSize, setFrameSize] = useState({ width: 0, height: 0 });
  
  // Reference to the game box for position calculations
  const gameBoxRef = useRef(null);
  
  // Hide feedback after a set duration
  useEffect(() => {
    let feedbackTimer = null;
    
    if (feedbackState.visible) {
      feedbackTimer = setTimeout(() => {
        setFeedbackState(prev => ({ ...prev, visible: false }));
      }, 3000);
    }
    
    return () => {
      if (feedbackTimer) clearTimeout(feedbackTimer);
    };
  }, [feedbackState.visible]);
  
  // Generate a random shark size
  const generateRandomSharkSize = () => {
    const sizes = [30, 45, 60];
    const randomIndex = Math.floor(Math.random() * sizes.length);
    return sizes[randomIndex];
  };
  
  // Move shark to a random position with random size
  const moveSharkRandomly = () => {
    const newSize = generateRandomSharkSize();
    setSharkSize(newSize);
    
    const padding = 20;
    const newX = Math.floor(Math.random() * (gameWidth - newSize - 2*padding)) + padding;
    const newY = Math.floor(Math.random() * (gameHeight - newSize - 2*padding)) + padding;
    setSharkPosition({ x: newX, y: newY });
  };
  
  // Initialize game - CHANGED: removed code that creates initial frame
  useEffect(() => {
    if (gameStarted && !gameComplete) {
      moveSharkRandomly();
      // No longer setting framePosition and frameSize here
      setFeedbackState({ message: '', visible: false });
    }
  }, [gameStarted, gameComplete, attempts]);
  
  // Check game completion
  useEffect(() => {
    if (attempts >= maxAttempts) {
      setGameComplete(true);
    }
  }, [attempts, maxAttempts]);
  
  // Add marquee selection using DOM for web
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined' || !gameBoxRef.current || !gameStarted || gameComplete) return;
    
    let isSelecting = false;
    let startX = 0;
    let startY = 0;
    let marqueeElement = null;
    
    // Create a marquee element
    const createMarquee = () => {
      const element = document.createElement('div');
      element.id = 'selection-marquee';
      element.style.position = 'absolute';
      element.style.border = '1px dashed #ffcc00';
      element.style.backgroundColor = 'rgba(255, 204, 0, 0.1)';
      element.style.pointerEvents = 'none';
      element.style.zIndex = '1000';
      return element;
    };
    
    // Update marquee size
    const updateMarquee = (currentX, currentY) => {
      if (!marqueeElement) return;
      
      const left = Math.min(startX, currentX);
      const top = Math.min(startY, currentY);
      const width = Math.abs(currentX - startX);
      const height = Math.abs(currentY - startY);
      
      marqueeElement.style.left = `${left}px`;
      marqueeElement.style.top = `${top}px`;
      marqueeElement.style.width = `${width}px`;
      marqueeElement.style.height = `${height}px`;
    };
    
    // Handle mouse down - uses direct offsets
    const handleMouseDown = (e) => {
      // Only handle left mouse button
      if (e.button !== 0) return;
      
      // Use direct offset which is relative to the target element
      startX = e.offsetX;
      startY = e.offsetY;
      
      // Create and add marquee
      marqueeElement = createMarquee();
      gameBoxRef.current.appendChild(marqueeElement);
      
      // Set initial position
      marqueeElement.style.left = `${startX}px`;
      marqueeElement.style.top = `${startY}px`;
      
      isSelecting = true;
    };
    
    // Handle mouse move - uses direct offsets and client coordinates
    const handleMouseMove = (e) => {
      if (!isSelecting) return;
      
      // Calculate offset within the game box
      const rect = gameBoxRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      
      // Clamp to game boundaries
      const x = Math.max(0, Math.min(gameWidth, offsetX));
      const y = Math.max(0, Math.min(gameHeight, offsetY));
      
      updateMarquee(x, y);
    };
    
    // Handle mouse up
    const handleMouseUp = (e) => {
      if (!isSelecting) return;
      
      isSelecting = false;
      
      // Calculate offset within the game box
      const rect = gameBoxRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      
      // Clamp to game boundaries
      const x = Math.max(0, Math.min(gameWidth, offsetX));
      const y = Math.max(0, Math.min(gameHeight, offsetY));
      
      // Calculate final rectangle - no minimum size constraints
      const left = Math.min(startX, x);
      const top = Math.min(startY, y);
      const width = Math.abs(x - startX);
      const height = Math.abs(y - startY);
      
      // Remove marquee
      if (marqueeElement && marqueeElement.parentNode) {
        marqueeElement.parentNode.removeChild(marqueeElement);
      }
      marqueeElement = null;
      
      // Update frame position and size
      setFramePosition({ x: left, y: top });
      setFrameSize({ width, height });
    };
    
    // Add event listeners to the game box
    const gameBox = gameBoxRef.current;
    gameBox.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Cleanup
    return () => {
      gameBox.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      
      if (marqueeElement && marqueeElement.parentNode) {
        marqueeElement.parentNode.removeChild(marqueeElement);
      }
    };
  }, [gameStarted, gameComplete]);
  
  // Check if shark is properly framed
  const checkSharkFramed = () => {
    setAttempts(prev => prev + 1);
    
    const tolerance = 5;
    
    const sharkInFrame = 
      (sharkPosition.x + tolerance) >= framePosition.x &&
      (sharkPosition.x + sharkSize - tolerance) <= (framePosition.x + frameSize.width) &&
      (sharkPosition.y + tolerance) >= framePosition.y &&
      (sharkPosition.y + sharkSize - tolerance) <= (framePosition.y + frameSize.height);
    
    const sharkArea = sharkSize * sharkSize;
    const frameArea = frameSize.width * frameSize.height;
    const efficiency = sharkArea / frameArea;
    
    let pointsEarned = 0;
    let message = '';
    
    if (sharkInFrame) {
      if (efficiency > 0.8) {
        pointsEarned = 150;
        message = 'Perfect framing! +150';
      } else if (efficiency > 0.65) {
        pointsEarned = 100;
        message = 'Excellent framing! +100';
      } else if (efficiency > 0.5) {
        pointsEarned = 75;
        message = 'Great framing! +75';
      } else if (efficiency > 0.35) {
        pointsEarned = 50;
        message = 'Good framing! +50';
      } else if (efficiency > 0.2) {
        pointsEarned = 35;
        message = 'Decent framing! +35';
      } else if (efficiency > 0.1) {
        pointsEarned = 25;
        message = 'Frame too big! +25';
      } else {
        pointsEarned = 10;
        message = 'Frame way too big! +10';
      }
      
      setScore(prev => prev + pointsEarned);
    } else {
      const sharkPartiallyInFrame = 
        !(sharkPosition.x > (framePosition.x + frameSize.width) ||
          (sharkPosition.x + sharkSize) < framePosition.x ||
          sharkPosition.y > (framePosition.y + frameSize.height) ||
          (sharkPosition.y + sharkSize) < framePosition.y);
          
      if (sharkPartiallyInFrame) {
        pointsEarned = 5;
        message = 'Partially framed! +5';
        setScore(prev => prev + pointsEarned);
      } else {
        message = 'Missed the shark! +0';
      }
    }
    
    moveSharkRandomly();
    
    // Reset frame by making it zero-sized
    setFrameSize({ width: 0, height: 0 });
    
    setFeedbackState({ message: '', visible: false });
    
    setTimeout(() => {
      setFeedbackState({ message, visible: true });
    }, 50);
  };
  
  // Start new game
  const startGame = () => {
    setGameStarted(true);
    setGameComplete(false);
    setScore(0);
    setAttempts(0);
  };
  
  return (
    <View style={styles.container}>
      {!gameStarted ? (
        <View style={styles.startScreen}>
          <Text style={styles.gameTitle}>Shark Frame</Text>
          <Text style={styles.instructions}>
            Click and drag to select an area around the shark.{'\n'}
            Release to set the frame.{'\n'}
            Click "Capture" when you think you've got it!{'\n\n'}
            Sharks come in different sizes!{'\n'}
            Tighter frames earn more points!{'\n'}
            Perfect fit = 150 points
          </Text>
          <TouchableOpacity style={styles.startButton} onPress={startGame}>
            <Text style={styles.startButtonText}>Start Game</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.gameContainer}>
          <View style={styles.header}>
            <Text style={styles.scoreText}>Score: {score}</Text>
            <Text style={styles.attemptsText}>Attempts: {attempts}/{maxAttempts}</Text>
          </View>
          
          {gameComplete ? (
            <View style={styles.completeScreen}>
              <Text style={styles.completeText}>Game Over!</Text>
              <Text style={styles.finalScore}>Final Score: {score}</Text>
              <TouchableOpacity style={styles.restartButton} onPress={startGame}>
                <Text style={styles.restartButtonText}>Play Again</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.gameArea}>
              <View 
                ref={gameBoxRef}
                style={styles.gameBox}
              >
                {/* Shark Layer */}
                <View style={styles.sharkLayer} pointerEvents="none">
                  <View 
                    style={[
                      styles.shark, 
                      { 
                        left: sharkPosition.x, 
                        top: sharkPosition.y,
                        width: sharkSize,
                        height: sharkSize
                      }
                    ]}
                  >
                    <SharkIcon width={sharkSize} height={sharkSize} />
                  </View>
                </View>
                
                {/* Frame */}
                <View style={styles.frameLayer}>
                  <View
                    style={[
                      styles.frame,
                      {
                        left: framePosition.x,
                        top: framePosition.y,
                        width: frameSize.width,
                        height: frameSize.height
                      }
                    ]}
                  />
                </View>
                
                {/* Feedback */}
                {feedbackState.visible && (
                  <View style={styles.feedbackPopup}>
                    <Text style={styles.feedbackText}>{feedbackState.message}</Text>
                  </View>
                )}
              </View>
              
              {/* Controls */}
              <View style={styles.controls}>
                <TouchableOpacity style={styles.captureButton} onPress={checkSharkFramed}>
                  <Text style={styles.captureButtonText}>Capture!</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    userSelect: 'none',
  },
  startScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 60, 120, 0.7)',
    padding: 20,
  },
  gameTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 24,
  },
  startButton: {
    backgroundColor: '#4a90e2',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 30,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  gameContainer: {
    flex: 1,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  attemptsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  gameArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  gameBox: {
    width: 300,
    height: 300,
    backgroundColor: '#858585',
    borderWidth: 2,
    borderColor: '#fff',
    marginTop: 20,
    position: 'relative',
    overflow: 'hidden',
    cursor: 'crosshair',
  },
  sharkLayer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    pointerEvents: 'none',
  },
  frameLayer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 2,
    pointerEvents: 'none',
  },
  shark: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  frame: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#ffcc00',
    backgroundColor: 'rgba(255, 204, 0, 0.2)',
    zIndex: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  controls: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  captureButton: {
    backgroundColor: '#4a90e2',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
  },
  captureButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  feedbackPopup: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 60,
    pointerEvents: 'none',
  },
  feedbackText: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    textAlign: 'center',
    minWidth: 180,
  },
  completeScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 60, 120, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 70,
  },
  completeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  finalScore: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 30,
  },
  restartButton: {
    backgroundColor: '#4a90e2',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 30,
  },
  restartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SharkFramingGame;