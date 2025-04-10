import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

const SeaCreaturesGame = () => {
  // Game state
  const [gameStarted, setGameStarted] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [maxAttempts, setMaxAttempts] = useState(8);
  const [showSubmitButton, setShowSubmitButton] = useState(false);

  // Debug mode - Set to true to show item boundaries (no toggle button)
  const debugMode = false;

  // Feedback state
  const [feedbackState, setFeedbackState] = useState({
    message: '',
    visible: false
  });

  // Sea creatures data with their positions in the image
  const seaCreatures = [
    {
      id: 1,
      name: 'sting ray',
      position: { x: 40, y: 10 },
      size: { width: 145, height: 90 }
    },
    {
      id: 2,
      name: 'clownfish',
      position: { x: 140, y: 180 },
      size: { width: 50, height: 40 }
    },
    {
      id: 3,
      name: 'jellyfish',
      position: { x: 515, y: 0 },
      size: { width: 95, height: 153 }
    },
    {
      id: 4,
      name: 'turtle',
      position: { x: 310, y: 115 },
      size: { width: 240, height: 145 }
    },
    {
      id: 6,
      name: 'clownfish',
      position: { x: 190, y: 90 },
      size: { width: 50, height: 50 }
    },
    {
      id: 7,
      name: 'octopus',
      position: { x: 160, y: 235 },
      size: { width: 145, height: 120 }
    },
  ];

  // Current creature to find
  const [currentCreature, setCurrentCreature] = useState(null);

  // Game area dimensions - adjust as needed to match your image aspect ratio
  const gameWidth = 640;
  const gameHeight = 360;

  // Selection frame
  const [framePosition, setFramePosition] = useState({ x: 0, y: 0 });
  const [frameSize, setFrameSize] = useState({ width: 0, height: 0 });

  // Reference to the game box for position calculations
  const gameBoxRef = useRef(null);

  // Track which creatures have been found
  const [foundCreatures, setFoundCreatures] = useState([]);

  // Track creatures that have already been prompted
  const [promptedCreatures, setPromptedCreatures] = useState([]);

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
    captureButton: {
      backgroundColor: '#4CAF50',
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderRadius: 25,
      elevation: 2,
    },
    captureButtonText: {
      color: '#fff',
      fontSize: 16,
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
      textAlign: 'center',
    },
    finalFound: {
      fontSize: 20,
      color: '#fff',
      marginBottom: 30,
      textAlign: 'center',
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
      borderColor: 'rgba(0, 255, 0, 0.5)',
      backgroundColor: 'rgba(0, 255, 0, 0.1)',
      zIndex: 2,
    },
  });


  // Load next creature to find
  const loadNextCreature = () => {
    // Filter out creatures that have already been found or prompted
    const availableCreatures = seaCreatures.filter(
      creature => !foundCreatures.includes(creature.id) && !promptedCreatures.includes(creature.id)
    );

    if (availableCreatures.length === 0) {
      // No more new creatures to find
      if (foundCreatures.length === seaCreatures.length) {
        // All creatures found, game complete
        setGameComplete(true);
      } else {
        // Some creatures still not found, but all have been prompted.
        // Reset the prompted creatures list but keep the found creatures list
        setPromptedCreatures([]);

        // Try again with creatures that haven't been found yet
        const notFoundCreatures = seaCreatures.filter(
          creature => !foundCreatures.includes(creature.id)
        );
        const randomIndex = Math.floor(Math.random() * notFoundCreatures.length);
        const nextCreature = notFoundCreatures[randomIndex];

        setCurrentCreature(nextCreature);
        setPromptedCreatures([nextCreature.id]);
      }
      return;
    }

    // Pick a random creature from the available ones
    const randomIndex = Math.floor(Math.random() * availableCreatures.length);
    const nextCreature = availableCreatures[randomIndex];
    setCurrentCreature(nextCreature);

    // Add this creature to the prompted list
    setPromptedCreatures(prev => [...prev, nextCreature.id]);

    // Reset frame and hide submit button
    setFrameSize({ width: 0, height: 0 });
    setShowSubmitButton(false);
  };

  // Initialize game
  useEffect(() => {
    if (gameStarted && !gameComplete) {
      // Reset prompted creatures on game start
      setPromptedCreatures([]);
      loadNextCreature();
      setFeedbackState({ message: '', visible: false });
    }
  }, [gameStarted, gameComplete]);

  // Check game completion
  useEffect(() => {
    if (attempts >= maxAttempts || foundCreatures.length === seaCreatures.length) {
      setGameComplete(true);
    }
  }, [attempts, maxAttempts, foundCreatures, seaCreatures.length]);

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

      // Add a submit button if the selection is valid
      if (width > 10 && height > 10) {
        // Show a submit button instead of auto-checking
        setShowSubmitButton(true);
      }
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

  // Check if the selection is correct
  const checkSelection = () => {
    setAttempts(prev => prev + 1);

    if (!currentCreature) return;

    // Calculate overlap between the creature and the frame
    const creatureLeft = currentCreature.position.x;
    const creatureTop = currentCreature.position.y;
    const creatureRight = creatureLeft + currentCreature.size.width;
    const creatureBottom = creatureTop + currentCreature.size.height;

    const frameLeft = framePosition.x;
    const frameTop = framePosition.y;
    const frameRight = frameLeft + frameSize.width;
    const frameBottom = frameTop + frameSize.height;

    // Check if there's an overlap
    const overlap = !(
      creatureRight < frameLeft ||
      creatureLeft > frameRight ||
      creatureBottom < frameTop ||
      creatureTop > frameBottom
    );

    // Calculate overlap percentage of creature covered by frame
    let creatureOverlapPercentage = 0;
    // Calculate how much of the frame is actually covering the creature (precision)
    let frameOverlapPercentage = 0;

    if (overlap) {
      const overlapLeft = Math.max(creatureLeft, frameLeft);
      const overlapTop = Math.max(creatureTop, frameTop);
      const overlapRight = Math.min(creatureRight, frameRight);
      const overlapBottom = Math.min(creatureBottom, frameBottom);

      const overlapWidth = overlapRight - overlapLeft;
      const overlapHeight = overlapBottom - overlapTop;
      const overlapArea = overlapWidth * overlapHeight;

      const creatureArea = currentCreature.size.width * currentCreature.size.height;
      const frameArea = frameSize.width * frameSize.height;

      creatureOverlapPercentage = (overlapArea / creatureArea) * 100;
      frameOverlapPercentage = (overlapArea / frameArea) * 100;
    }

    // Calculate score - now accounting for both coverage and precision
    let pointsEarned = 0;
    let message = '';

    // Frame is too large (less than 30% of frame is the creature)
    const frameTooLarge = frameOverlapPercentage < 30;

    if (overlap && creatureOverlapPercentage > 50) {
      if (frameTooLarge) {
        // Penalize selections that are too big
        pointsEarned = 20;
        message = 'Your selection is too large! +20';
      }
      else if (creatureOverlapPercentage > 90 && frameOverlapPercentage > 70) {
        pointsEarned = 150;
        message = 'Perfect capture! +150';
        // Mark this creature as found
        setFoundCreatures(prev => [...prev, currentCreature.id]);
      } else if (creatureOverlapPercentage > 75 && frameOverlapPercentage > 50) {
        pointsEarned = 100;
        message = 'Great capture! +100';
        // Mark this creature as found
        setFoundCreatures(prev => [...prev, currentCreature.id]);
      } else {
        pointsEarned = 75;
        message = 'Good capture! +75';
        // Mark this creature as found
        setFoundCreatures(prev => [...prev, currentCreature.id]);
      }
    } else if (overlap) {
      pointsEarned = 25;
      message = 'Partial capture. Try to select more of the creature! +25';
    } else {
      message = 'Missed the creature! +0';
    }

    setScore(prev => prev + pointsEarned);
    setFeedbackState({ message, visible: true });

    // Reset frame size
    setFrameSize({ width: 0, height: 0 });
    setShowSubmitButton(false);

    // Load next creature
    loadNextCreature();
  };

  // Start new game
  const startGame = () => {
    setGameStarted(true);
    setGameComplete(false);
    setScore(0);
    setAttempts(0);
    setFoundCreatures([]);
    setPromptedCreatures([]);
  };

  // Get current creature prompt
  const getCreaturePrompt = () => {
    if (!currentCreature) return "Capture a sea creature";

    // Use ID to distinguish between similar creatures
    if (currentCreature.name === "clownfish") {
      if (currentCreature.id === 2) {
        return "Capture the clownfish at the bottom";
      } else if (currentCreature.id === 6) {
        return "Capture the clownfish on top";
      }
    }

    const creatureTypes = {
      "sting ray": "Capture the stingray",
      "jellyfish": "Capture the jellyfish",
      "turtle": "Capture the turtle",
      "octopus": "Capture the octopus"
    };

    return creatureTypes[currentCreature.name] || `Capture the ${currentCreature.name}`;
  };

  return (
    <View style={styles.container}>
      {!gameStarted ? (
        <View style={styles.startScreen}>
          <Text style={styles.gameTitle}>Sea Creatures Capture Game</Text>
          <Text style={styles.instructions}>
            Click and drag to capture a sea creature in the image.{'\n'}
            After selecting, click the "Capture!" button to submit.{'\n'}
            You can readjust your selection before capturing.{'\n\n'}
            Better captures earn more points!{'\n'}
            Perfect capture = 150 points
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
            <Text style={styles.foundText}>Found: {foundCreatures.length}/{seaCreatures.length}</Text>
          </View>

          {gameComplete ? (
            <View style={styles.completeScreen}>
              <Text style={styles.completeText}>Game Over!</Text>
              <Text style={styles.finalScore}>Final Score: {score}</Text>
              <Text style={styles.finalFound}>Sea Creatures Found: {foundCreatures.length}/{seaCreatures.length}</Text>
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
                {/* Sea background image */}
                <Image
                  source={require('../assets/images/clearimage.jpg')}
                  style={styles.backgroundImage}
                  resizeMode="cover"
                />

                {/* Debug mode visualization */}
                {debugMode && seaCreatures.map(creature => (
                  <View
                    key={creature.id}
                    style={{
                      position: 'absolute',
                      left: creature.position.x,
                      top: creature.position.y,
                      width: creature.size.width,
                      height: creature.size.height,
                      borderWidth: 2,
                      borderColor: foundCreatures.includes(creature.id) ? 'green' : 'red',
                      backgroundColor: foundCreatures.includes(creature.id)
                        ? 'rgba(0, 255, 0, 0.2)'
                        : 'rgba(255, 0, 0, 0.2)',
                      zIndex: 10
                    }}
                  >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                      {creature.name}
                    </Text>
                  </View>
                ))}

                {/* Highlight found creatures */}
                {foundCreatures.map(id => {
                  const creature = seaCreatures.find(c => c.id === id);
                  return creature ? (
                    <View
                      key={`found-${id}`}
                      style={{
                        position: 'absolute',
                        left: creature.position.x,
                        top: creature.position.y,
                        width: creature.size.width,
                        height: creature.size.height,
                        borderWidth: 2,
                        borderColor: 'rgba(0, 255, 0, 0.5)',
                        backgroundColor: 'rgba(0, 255, 0, 0.1)',
                        zIndex: 2
                      }}
                    />
                  ) : null;
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

              {/* Current target */}
              <View style={styles.targetPrompt}>
                <Text style={styles.targetText}>{getCreaturePrompt()}</Text>
              </View>

              {/* Controls */}
              <View style={styles.controls}>
                {showSubmitButton ? (
                  <TouchableOpacity
                    style={styles.captureButton}
                    onPress={checkSelection}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Text style={styles.captureButtonText}>Capture!</Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={styles.selectionPrompt}>
                    Click and drag to capture a sea creature
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

export default SeaCreaturesGame;