import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

const UnderwaterClassificationGame = () => {
  // Game state
  const [gameStarted, setGameStarted] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [maxAttempts, setMaxAttempts] = useState(10);

  // Feedback state
  const [feedbackState, setFeedbackState] = useState({
    message: '',
    visible: false
  });

  // Underwater items data with their positions in the image
  const underwaterItems = [
    {
      id: 1,
      name: 'fish',
      position: { x: 260, y: 160 },
      size: { width: 100, height: 48 }
    },
    {
      id: 2,
      name: 'fish',
      position: { x: 250, y: 230 },
      size: { width: 100, height: 50 }
    },
    {
      id: 3,
      name: 'fish',
      position: { x: 150, y: 25 },
      size: { width: 100, height: 250 }
    },
    {
      id: 4,
      name: 'plant',
      position: { x: 20, y: 0 },
      size: { width: 140, height: 355 }
    },
    {
      id: 5,
      name: 'plant',
      position: { x: 500, y: 100 },
      size: { width: 150, height: 255 }
    },
    {
      id: 6,
      name: 'fish',
      position: { x: 200, y: 300 },
      size: { width: 115, height: 55 }
    },
    {
      id: 7,
      name: 'fish',
      position: { x: 400, y: 50 },
      size: { width: 100, height: 150 }
    },
    {
      id: 8,
      name: 'fish',
      position: { x: 365, y: 250 },
      size: { width: 100, height: 60 }
    },
  ];

  // User input - replaced with selection type
  const [userSelection, setUserSelection] = useState('');
  const [showSelectionButtons, setShowSelectionButtons] = useState(false);

  // Game area dimensions - adjust as needed to match your image aspect ratio
  const gameWidth = 640;
  const gameHeight = 360;

  // Selection frame
  const [framePosition, setFramePosition] = useState({ x: 0, y: 0 });
  const [frameSize, setFrameSize] = useState({ width: 0, height: 0 });

  // Reference to the game box for position calculations
  const gameBoxRef = useRef(null);

  // Track which items have been found
  const [foundItems, setFoundItems] = useState([]);

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

  // Check game completion
  useEffect(() => {
    if (attempts >= maxAttempts || foundItems.length === underwaterItems.length) {
      setGameComplete(true);
    }
  }, [attempts, maxAttempts, foundItems, underwaterItems.length]);

  // Initialize game
  useEffect(() => {
    if (gameStarted && !gameComplete) {
      setFeedbackState({ message: '', visible: false });
    }
  }, [gameStarted, gameComplete]);

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
      element.style.border = '2px solid #ffcc00';
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

      // Calculate final rectangle
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

      // Show selection buttons after selection
      setShowSelectionButtons(true);
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
  }, [gameStarted, gameComplete, gameWidth, gameHeight]);

  // Handle user selection
  const handleSelection = (type) => {
    setUserSelection(type);
    checkSelection(type);
  };

  // Check if the selection is correct
  const checkSelection = (selectionType) => {
    setAttempts(prev => prev + 1);

    // First, check if the selection is too small (prevents accidental clicks)
    const MIN_SELECTION_SIZE = 30; // Increased minimum size requirement
    if (frameSize.width < MIN_SELECTION_SIZE || frameSize.height < MIN_SELECTION_SIZE) {
      // Selection too small, consider it a miss
      setFeedbackState({
        message: 'Selection too small. Try to frame the item better!',
        visible: true
      });
      setShowSelectionButtons(false);
      return; // Don't count this as an attempt
    }

    // Get frame dimensions
    const frameLeft = framePosition.x;
    const frameTop = framePosition.y;
    const frameRight = frameLeft + frameSize.width;
    const frameBottom = frameTop + frameSize.height;

    // Track the best match (item with highest overlap percentage)
    let bestMatch = null;
    let highestOverlapPercentage = 0;
    let bestSelectionPrecision = 0;

    // Check against all underwater items that haven't been found yet
    underwaterItems.forEach(item => {
      // Skip if this item has already been found
      if (foundItems.includes(item.id)) return;

      const itemLeft = item.position.x;
      const itemTop = item.position.y;
      const itemRight = itemLeft + item.size.width;
      const itemBottom = itemTop + item.size.height;

      // Calculate the actual overlap area
      const overlapLeft = Math.max(itemLeft, frameLeft);
      const overlapTop = Math.max(itemTop, frameTop);
      const overlapRight = Math.min(itemRight, frameRight);
      const overlapBottom = Math.min(itemBottom, frameBottom);

      // Check if there is an actual overlap
      const hasOverlap = overlapLeft < overlapRight && overlapTop < overlapBottom;

      if (hasOverlap) {
        const overlapWidth = overlapRight - overlapLeft;
        const overlapHeight = overlapBottom - overlapTop;
        const overlapArea = overlapWidth * overlapHeight;

        const itemArea = item.size.width * item.size.height;
        const overlapPercentage = (overlapArea / itemArea) * 100;

        // Also calculate how much of the selection contains the item
        const selectionArea = frameSize.width * frameSize.height;
        const selectionPrecision = (overlapArea / selectionArea) * 100;

        // If this item has better overlap than our current best match, update the best match
        if (overlapPercentage > highestOverlapPercentage) {
          highestOverlapPercentage = overlapPercentage;
          bestMatch = item;
          bestSelectionPrecision = selectionPrecision;
        }
      }
    });

    // Check if we found a match
    if (bestMatch) {
      console.log(`Best match: ${bestMatch.name} with ${highestOverlapPercentage.toFixed(2)}% overlap`);
      console.log(`Selection precision: ${bestSelectionPrecision.toFixed(2)}%`);

      // Check if the label is correct
      const labelCorrect = selectionType.toLowerCase() === bestMatch.name.toLowerCase();

      // Calculate score
      let pointsEarned = 0;
      let message = '';

      // Apply much stricter precision requirements
      let effectiveOverlapPercentage = highestOverlapPercentage;

      // Heavily penalize imprecise selections (large boxes around small items)
      if (bestSelectionPrecision < 30) {
        // If the selection is very large and the item is small within it,
        // drastically reduce the effective overlap percentage
        effectiveOverlapPercentage = highestOverlapPercentage * (bestSelectionPrecision / 100);
      }

      if (effectiveOverlapPercentage > 60) { // Much higher threshold for a good match
        if (labelCorrect) {
          if (effectiveOverlapPercentage > 80) {
            pointsEarned = 150;
            message = `Perfect match! You found a ${bestMatch.name}! +150`;
            // Mark this item as found
            setFoundItems(prev => [...prev, bestMatch.id]);
          } else {
            pointsEarned = 100;
            message = `Good match! You found a ${bestMatch.name}! +100`;
            // Mark this item as found
            setFoundItems(prev => [...prev, bestMatch.id]);
          }
        } else {
          pointsEarned = 25;
          message = `Good selection, but that's not a ${selectionType}. It's a ${bestMatch.name}! +25`;
        }
      } else if (effectiveOverlapPercentage > 30) { // Partial match
        if (labelCorrect) {
          pointsEarned = 50;
          message = `Decent selection and correct label. It's a ${bestMatch.name}! +50`;
          // Only mark found if label is correct and overlap is decent
          setFoundItems(prev => [...prev, bestMatch.id]);
        } else {
          pointsEarned = 10;
          message = `Partial selection but wrong label. It's a ${bestMatch.name}, not a ${selectionType}! +10`;
        }
      } else {
        // Poor selection
        message = `Bad selection! You need to be more precise. Try again. +0`;
        pointsEarned = 0;
      }

      setScore(prev => prev + pointsEarned);
      setFeedbackState({ message, visible: true });
    } else {
      // No match found
      const message = 'Missed! Try selecting a different area. +0';
      setFeedbackState({ message, visible: true });
    }

    // Reset selection and prepare for next round
    setUserSelection('');
    setFrameSize({ width: 0, height: 0 });
    setShowSelectionButtons(false);
  };

  // Start new game
  const startGame = () => {
    setGameStarted(true);
    setGameComplete(false);
    setScore(0);
    setAttempts(0);
    setFoundItems([]);
  };

  // Get current item prompt
  const getItemPrompt = () => {
    const remainingCount = underwaterItems.length - foundItems.length;
    return `Find and label ${remainingCount} more underwater items as 'fish' or 'plant'`;
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
      backgroundColor: 'rgba(173, 216, 230, 1)',
      padding: 20,
    },
    gameTitle: {
      fontSize: 34,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 20,
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    },
    instructions: {
      fontSize: 16,
      color: '#fff',
      marginBottom: 30,
      textAlign: 'center',
      lineHeight: 24,
      maxWidth: 600,
    },
    startButton: {
      backgroundColor: '#4CAF50',
      paddingHorizontal: 30,
      paddingVertical: 15,
      borderRadius: 30,
      elevation: 3,
    },
    startButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    gameContainer: {
      flex: 1,
      position: 'relative',
      backgroundColor: '#e0f7fa',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
    foundText: {
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
      backgroundColor: '#f0f0f0',
      borderWidth: 2,
      borderColor: '#333',
      marginTop: 20,
      position: 'relative',
      overflow: 'hidden',
      cursor: 'crosshair',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
    frame: {
      position: 'absolute',
      borderWidth: 2,
      borderColor: '#ffcc00',
      backgroundColor: 'rgba(255, 204, 0, 0.2)',
      zIndex: 5,
      pointerEvents: 'none',
    },
    targetPrompt: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      padding: 10,
      borderRadius: 10,
      margin: 10,
      width: '80%',
      maxWidth: 600,
      alignItems: 'center',
    },
    targetText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    controls: {
      width: '100%',
      alignItems: 'center',
      marginTop: 15,
      marginBottom: 20,
    },
    selectionButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '80%',
      maxWidth: 500,
      marginVertical: 10,
    },
    selectionButton: {
      paddingHorizontal: 30,
      paddingVertical: 15,
      borderRadius: 25,
      marginHorizontal: 10,
      elevation: 2,
    },
    fishButton: {
      backgroundColor: '#4682B4', // Steel Blue
    },
    plantButton: {
      backgroundColor: '#228B22', // Forest Green
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    selectionPrompt: {
      fontSize: 18,
      color: '#333',
      padding: 10,
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      borderRadius: 10,
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
      top: -100,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(173, 216, 230, 1)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 70,
      width: '100%',
      height: '700%',
      padding: 20,
    },
    completeText: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 20,
      textAlign: 'center',
    },
    finalScore: {
      fontSize: 24,
      color: '#fff',
      marginBottom: 10,
    },
    finalFound: {
      fontSize: 20,
      color: '#fff',
      marginBottom: 30,
    },
    restartButton: {
      backgroundColor: '#4CAF50',
      paddingHorizontal: 30,
      paddingVertical: 15,
      borderRadius: 30,
      elevation: 3,
    },
    restartButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    foundItemHighlight: {
      borderColor: 'green',
      backgroundColor: 'rgba(0, 255, 0, 0.2)',
    },
  });

  return (
    <View style={styles.container}>
      {!gameStarted ? (
        <View style={styles.startScreen}>
          <Text style={styles.gameTitle}>Underwater Classification Game</Text>
          <Text style={styles.instructions}>
            Click and drag to select either a fish or a plant in the underwater scene.{'\n'}
            Click "Fish" or "Plant" to classify your selection.{'\n'}
            Better selections and correct classifications earn more points!{'\n\n'}
            Perfect match = 150 points
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
            <Text style={styles.foundText}>Found: {foundItems.length}/{underwaterItems.length}</Text>
          </View>

          {gameComplete ? (
            <View style={styles.completeScreen}>
              <Text style={styles.completeText}>Game Over!</Text>
              <Text style={styles.finalScore}>Final Score: {score}</Text>
              <Text style={styles.finalFound}>Items Found: {foundItems.length}/{underwaterItems.length}</Text>
              <Text style={styles.finalFound}>Continue to next page!</Text>
              <TouchableOpacity style={styles.restartButton} onPress={startGame}>
                <Text style={styles.restartButtonText}>Play Again</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.gameArea}>
              <View
                ref={gameBoxRef}
                style={[styles.gameBox, { width: gameWidth, height: gameHeight }]}
              >
                {/* Underwater background image */}
                <Image
                  source={require('../assets/images/murkyimage.jpg')}
                  style={styles.backgroundImage}
                  resizeMode="cover"
                />

                {/* Optional debug mode: visualize items with borders */}
                {/* Change this to false to hide debug visualization */}
                {false && underwaterItems.map(item => (
                  <View
                    key={item.id}
                    style={{
                      position: 'absolute',
                      left: item.position.x,
                      top: item.position.y,
                      width: item.size.width,
                      height: item.size.height,
                      borderWidth: 2,
                      borderColor: foundItems.includes(item.id) ? 'green' : 'red',
                      backgroundColor: foundItems.includes(item.id)
                        ? 'rgba(0, 255, 0, 0.2)'
                        : 'rgba(255, 0, 0, 0.2)',
                      zIndex: 10
                    }}
                  >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                      {item.name}
                    </Text>
                  </View>
                ))}

                {/* Highlight found items with subtle indication */}
                {foundItems.map(id => {
                  const item = underwaterItems.find(item => item.id === id);
                  return (
                    <View
                      key={`found-${id}`}
                      style={{
                        position: 'absolute',
                        left: item.position.x,
                        top: item.position.y,
                        width: item.size.width,
                        height: item.size.height,
                        borderWidth: 2,
                        borderColor: 'rgba(0, 255, 0, 0.5)',
                        backgroundColor: 'rgba(0, 255, 0, 0.1)',
                        zIndex: 2
                      }}
                    />
                  );
                })}

                {/* Selection Frame */}
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

                {/* Feedback */}
                {feedbackState.visible && (
                  <View style={styles.feedbackPopup}>
                    <Text style={styles.feedbackText}>{feedbackState.message}</Text>
                  </View>
                )}
              </View>

              <View style={styles.targetPrompt}>
                <Text style={styles.targetText}>{getItemPrompt()}</Text>
              </View>

              {/* Controls */}
              <View style={styles.controls}>
                {showSelectionButtons ? (
                  <View style={styles.selectionButtonsContainer}>
                    <TouchableOpacity
                      style={[styles.selectionButton, styles.fishButton]}
                      onPress={() => handleSelection('fish')}
                    >
                      <Text style={styles.buttonText}>Fish</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.selectionButton, styles.plantButton]}
                      onPress={() => handleSelection('plant')}
                    >
                      <Text style={styles.buttonText}>Plant</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Text style={styles.selectionPrompt}>
                    Click and drag to select a fish or plant
                  </Text>
                )}
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default UnderwaterClassificationGame;