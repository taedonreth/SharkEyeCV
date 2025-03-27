import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput } from 'react-native';

const SeaCreaturesLabelingGame = () => {
  // Game state
  const [gameStarted, setGameStarted] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [maxAttempts, setMaxAttempts] = useState(8);

  // Feedback state
  const [feedbackState, setFeedbackState] = useState({
    message: '',
    visible: false
  });

  // Sea creatures data with their positions in the image
  const seaCreatures = [
    {
      id: 1,
      name: 'shark',
      position: { x: 50, y: 80 },
      size: { width: 165, height: 80 }
    },
    {
      id: 2,
      name: 'clownfish',
      position: { x: 105, y: 165 },
      size: { width: 57, height: 40 }
    },
    {
      id: 3,
      name: 'jellyfish',
      position: { x: 530, y: 15 },
      size: { width: 90, height: 110 }
    },
    {
      id: 4,
      name: 'turtle',
      position: { x: 380, y: 225 },
      size: { width: 120, height: 76 }
    },
    {
      id: 5,
      name: 'shrimp',
      position: { x: 410, y: 160 },
      size: { width: 95, height: 75 }
    },
    {
      id: 6,
      name: 'lionfish',
      position: { x: 37, y: 180 },
      size: { width: 88, height: 75 }
    },
    {
      id: 7,
      name: 'seahorse',
      position: { x: 150, y: 190 },
      size: { width: 50, height: 80 }
    },
    {
      id: 8,
      name: 'rainbow fish',
      position: { x: 465, y: 100 },
      size: { width: 78, height: 48 }
    }
  ];

  // Current creature to find
  const [currentCreature, setCurrentCreature] = useState(null);

  // User input
  const [userLabel, setUserLabel] = useState('');
  const [showLabelInput, setShowLabelInput] = useState(false);

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
    labelInputContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '80%',
      maxWidth: 500,
      marginVertical: 10,
    },
    labelInput: {
      flex: 1,
      height: 50,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 25,
      paddingHorizontal: 20,
      backgroundColor: '#fff',
      fontSize: 16,
    },
    submitButton: {
      backgroundColor: '#4CAF50',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 25,
      marginLeft: 10,
      elevation: 2,
    },
    submitButtonText: {
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

    // Reset user label and frame
    setUserLabel('');
    setFrameSize({ width: 0, height: 0 });
    setShowLabelInput(false);
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

      // Show label input after selection
      setShowLabelInput(true);
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

    // Calculate overlap percentage
    let overlapPercentage = 0;
    if (overlap) {
      const overlapLeft = Math.max(creatureLeft, frameLeft);
      const overlapTop = Math.max(creatureTop, frameTop);
      const overlapRight = Math.min(creatureRight, frameRight);
      const overlapBottom = Math.min(creatureBottom, frameBottom);

      const overlapWidth = overlapRight - overlapLeft;
      const overlapHeight = overlapBottom - overlapTop;
      const overlapArea = overlapWidth * overlapHeight;

      const creatureArea = currentCreature.size.width * currentCreature.size.height;
      overlapPercentage = (overlapArea / creatureArea) * 100;
    }

    // Check if the label is correct
    const labelCorrect = userLabel.trim().toLowerCase() === currentCreature.name.toLowerCase();

    // Calculate score
    let pointsEarned = 0;
    let message = '';

    if (overlap && overlapPercentage > 50) {
      if (labelCorrect) {
        if (overlapPercentage > 90) {
          pointsEarned = 150;
          message = 'Perfect match! +150';
          // Mark this creature as found
          setFoundCreatures(prev => [...prev, currentCreature.id]);
        } else if (overlapPercentage > 75) {
          pointsEarned = 100;
          message = 'Great match! +100';
          // Mark this creature as found
          setFoundCreatures(prev => [...prev, currentCreature.id]);
        } else {
          pointsEarned = 75;
          message = 'Good match! +75';
          // Mark this creature as found
          setFoundCreatures(prev => [...prev, currentCreature.id]);
        }
      } else {
        pointsEarned = 25;
        message = `Good selection, but that's not a ${userLabel}. +25`;
      }
    } else if (overlap) {
      if (labelCorrect) {
        pointsEarned = 50;
        message = 'Right label, but selection needs work. +50';
        // Mark this creature as found despite poor selection
        setFoundCreatures(prev => [...prev, currentCreature.id]);
      } else {
        pointsEarned = 10;
        message = 'Poor selection and wrong label. +10';
      }
    } else {
      message = 'Missed the creature! +0';
    }

    setScore(prev => prev + pointsEarned);
    setFeedbackState({ message, visible: true });

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
    if (!currentCreature) return "Find and label a sea creature";

    const creatureTypes = {
      shark: "Find and label the predator with sharp teeth",
      clownfish: "Find and label the orange and white striped fish",
      jellyfish: "Find and label the transparent floating creature",
      turtle: "Find and label the slow reptile with a shell",
      shrimp: "Find and label the small red crustacean",
      lionfish: "Find and label the fish with spiky fins",
      seahorse: "Find and label the tiny creature that swims upright",
      "rainbow fish": "Find and label the colorful fish with multiple hues"
    };

    return creatureTypes[currentCreature.name] || `Find and label the ${currentCreature.name}`;
  };

  return (
    <View style={styles.container}>
      {!gameStarted ? (
        <View style={styles.startScreen}>
          <Text style={styles.gameTitle}>Sea Creatures Labeling Game</Text>
          <Text style={styles.instructions}>
            Click and drag to select a sea creature in the image.{'\n'}
            Label the creature correctly.{'\n'}
            Press "Submit" to check your answer.{'\n\n'}
            Better selections and correct labels earn more points!{'\n'}
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
                  source={require('../assets/images/underthesea.jpg')}
                  style={styles.backgroundImage}
                  resizeMode="cover"
                />

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
                {showLabelInput ? (
                  <View style={styles.labelInputContainer}>
                    <TextInput
                      style={styles.labelInput}
                      placeholder="What sea creature is this?"
                      value={userLabel}
                      onChangeText={setUserLabel}
                      autoFocus
                    />
                    <TouchableOpacity
                      style={styles.submitButton}
                      onPress={checkSelection}
                      disabled={!userLabel.trim()}
                    >
                      <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Text style={styles.selectionPrompt}>
                    Click and drag to select a sea creature
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
export default SeaCreaturesLabelingGame;