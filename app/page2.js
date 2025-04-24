import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import BasePage from './BasePage';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';
import DumbShark from '../components/dumbshark';
import SpeechBubble from '../components/SpeechBubble';
import TypewriterText from '../components/TypewriterText';
import SharkWrapper from '../components/SharkWrapper';

export default function Page2() {
  const title = "Help Improve Frankie The Shark's Vision!";
  const [message, setMessage] = useState("Help me find something to improve my vision!");
  const [messageKey, setMessageKey] = useState('initial');
  const [clickedItems, setClickedItems] = useState({});
  const [foundSolution, setFoundSolution] = useState(false);

  const handleItemClick = (item) => {
    // Skip if already clicked
    if (clickedItems[item]) return;
    
    if (item === 'goggles') {
      setMessage("Ooh these goggles definitely can help me see better!");
      setFoundSolution(true);
    } else if (foundSolution) {
      setMessage("You already found the goggles that help me see better!");
    } else {
      // Custom messages for each item
      switch(item) {
        case 'sunscreen':
          setMessage("Sunscreen protects my skin but it won't help me see any better!");
          break;
        case 'umbrella':
          setMessage("An umbrella keeps me dry, but it doesn't help my eyes see underwater!");
          break;
        case 'trashcan':
          setMessage("Hmm, a trash can? That helps keep the beach clean, but it won't help me see better!");
          break;
        case 'swimtrunks':
          setMessage("Swim trunks are fun for swimming, but they won't help my eyes!");
          break;
        case 'surfboard':
          setMessage("A surfboard is for riding waves, not for helping sharks see better!");
          break;
        default:
          setMessage("I don't think this will help me see better underwater!");
      }
    }
    // Update key to force TypewriterText to restart animation
    setMessageKey(item);
    // Track clicked items
    setClickedItems(prev => ({...prev, [item]: true}));
  };

  const description = (
    <View style={styles.container}>
      {/* Main content area - Game */}
      <View style={styles.mainContent}>
        {/* Game items */}
        <View style={styles.gameArea}>
          {/* Goggles */}
          <TouchableOpacity 
            style={[
              styles.itemContainer, 
              { top: 400, left:1000 },
              clickedItems['goggles'] && styles.correctItem
            ]}
            onPress={() => handleItemClick('goggles')}
            activeOpacity={0.7}
            disabled={clickedItems['goggles']}
          >
            <Image 
              source={require('../assets/images/goggles.png')} 
              style={styles.item}
              resizeMode="contain"
            />
          </TouchableOpacity>
          
          {/* Sunscreen */}
          <TouchableOpacity 
            style={[
              styles.itemContainer, 
              { top: 400, left: 800 },
              clickedItems['sunscreen'] && (foundSolution ? styles.wrongItem : styles.wrongItem)
            ]}
            onPress={() => handleItemClick('sunscreen')}
            activeOpacity={0.7}
            disabled={clickedItems['sunscreen']}
          >
            <Image 
              source={require('../assets/images/page2-game/suncreen.png')} 
              style={styles.item}
              resizeMode="contain"
            />
          </TouchableOpacity>
          
          {/* Umbrella */}
          <TouchableOpacity 
            style={[
              styles.itemContainer, 
              { top: 450, left: 600 },
              clickedItems['umbrella'] && (foundSolution ? styles.wrongItem : styles.wrongItem)
            ]}
            onPress={() => handleItemClick('umbrella')}
            activeOpacity={0.7}
            disabled={clickedItems['umbrella']}
          >
            <Image 
              source={require('../assets/images/page2-game/umbrella.png')} 
              style={styles.item}
              resizeMode="contain"
            />
          </TouchableOpacity>
          
          {/* Trash can */}
          <TouchableOpacity 
            style={[
              styles.itemContainer, 
              { top: 400, left: 350 },
              clickedItems['trashcan'] && (foundSolution ? styles.wrongItem : styles.wrongItem)
            ]}
            onPress={() => handleItemClick('trashcan')}
            activeOpacity={0.7}
            disabled={clickedItems['trashcan']}
          >
            <Image 
              source={require('../assets/images/page2-game/trashcan.png')} 
              style={styles.item}
              resizeMode="contain"
            />
          </TouchableOpacity>
          
          {/* Swim trunks */}
          <TouchableOpacity 
            style={[
              styles.itemContainer, 
              { top: 250, left: 550 },
              clickedItems['swimtrunks'] && (foundSolution ? styles.wrongItem : styles.wrongItem)
            ]}
            onPress={() => handleItemClick('swimtrunks')}
            activeOpacity={0.7}
            disabled={clickedItems['swimtrunks']}
          >
            <Image 
              source={require('../assets/images/page2-game/swimtrunks.png')} 
              style={styles.item}
              resizeMode="contain"
            />
          </TouchableOpacity>
          
          {/* Surfboard */}
          <TouchableOpacity 
            style={[
              styles.itemContainer, 
              { top: 300, left: 1200 },
              clickedItems['surfboard'] && (foundSolution ? styles.wrongItem : styles.wrongItem)
            ]}
            onPress={() => handleItemClick('surfboard')}
            activeOpacity={0.7}
            disabled={clickedItems['surfboard']}
          >
            <Image 
              source={require('../assets/images/page2-game/surfboard.png')} 
              style={styles.item}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Shark with speech bubble */}
        <View style={styles.sharkContainer}>
          <SharkWrapper>
            <DumbShark />
          </SharkWrapper>
        </View>
        
        <View style={styles.speechBubbleContainer}>
          <SpeechBubble scale={1.5}>
            <TypewriterText
              key={messageKey}
              text={message}
              style={styles.speechText}
              typingSpeed={50}
            />
          </SpeechBubble>
        </View>
      </View>

      {/* Footer container with separated navigation buttons */}
      <View style={styles.footerContainer}>
        <View style={styles.backButtonContainer}>
          <Link href="/" asChild>
            <BackButton isNavigation={true} />
          </Link>
        </View>
        <View style={styles.continueButtonContainer}>
          <Link href="/page6" asChild>
            <ContinueButton isNavigation={true} />
          </Link>
        </View>
      </View>
    </View>
  );

  return (
    <BasePage
      pageNumber={2}
      title={title}
      description={description}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    position: 'relative',
  },
  gameArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
  },
  sharkContainer: {
    position: 'absolute',
    transform: [{ scale: 1.2 }],
    bottom: -50,
    left: -150,
    zIndex: 3,
  },
  speechBubbleContainer: {
    position: 'absolute',
    bottom: 350,
    left: 270,
    zIndex: 2,
  },
  speechText: {
    fontSize: 24,
    textAlign: 'center',
    color: 'black',
    lineHeight: 32,
    fontWeight: '500',
  },
  itemContainer: {
    position: 'absolute',
    width: 150,
    height: 150,
    zIndex: 6,
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderRadius: 10,
  },
  item: {
    width: '100%',
    height: '100%',
  },
  correctItem: {
    borderWidth: 4,
    borderColor: '#4CAF50', // Green
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
  },
  wrongItem: {
    borderWidth: 4,
    borderColor: '#F44336', // Red
    backgroundColor: 'rgba(244, 67, 54, 0.2)',
  },
  
  // Footer styles - exactly matching Page10
  footerContainer: {
    width: '100%',
    marginTop: 60,
    position: 'relative',
    height: 80, // Give enough height for the buttons
    pointerEvents: 'none', // This makes the container not capture any touch events
  },
  backButtonContainer: {
    position: 'absolute',
    left: 0,
    bottom: 25,
    zIndex: 99,
    pointerEvents: 'auto', // This allows the button to receive touch events
  },
  continueButtonContainer: {
    position: 'absolute',
    right: 0,
    bottom: 25,
    zIndex: 99,
    pointerEvents: 'auto', // This allows the button to receive touch events
  },
});