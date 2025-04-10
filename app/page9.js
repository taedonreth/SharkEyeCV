import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import BasePage from './BasePage';
import GoodSharkIcon from '../components/GoodSharkIcon';
import BadSharkIcon from '../components/BadSharkIcon';
import CorrectButton from '../components/CorrectButton';
import FalseButton from '../components/FalseButton';
import DumbShark from '../components/dumbshark';
import SpeechBubble from '../components/SpeechBubble';
import TypewriterText from '../components/TypewriterText';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';
import SharkWrapper from '../components/SharkWrapper';

// Component layout configuration
const layoutConfig = {
  // Container spacing and layout configuration
  container: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },

  // Box section layout
  boxSection: {
    marginBottom: 0,     // Removed large bottom margin
    marginTop: 40,       // Added top margin to push content down
    padding: 10,         // reduced internal padding
    gap: 15,             // gap between boxes
    width: '50%',
    marginLeft: 50,     // control the overall width
  },

  // Individual box properties
  goodBox: {
    flex: 1,             // flex ratio (relative sizing)
    marginRight: 10,     // right margin
    width: '35%',        // reduced width percentage
    scale: 0.75,         // reduced scale factor
  },
  badBox: {
    flex: 1,             // flex ratio (relative sizing)
    marginLeft: 10,      // left margin
    width: '35%',        // reduced width percentage
    scale: 0.75,         // reduced scale factor
  },

  // Shark section
  sharkSection: {
    marginTop: -400,    // Adjusted top margin to be closer to boxes
    marginLeft: -1000,  // negative margin to adjust position
  },

  // Text and label customization
  labelText: {
    fontSize: 30,        // font size
    fontWeight: 'bold',  // font weight
  },

  // Box label positioning
  boxLabel: {
    marginTop: 80,       // Add space above the label to push it down
    paddingVertical: 8,  // Slightly more vertical padding
    width: '90%',        // Keep the width
  },
};

export default function Page9() {
  const title = " ";

  const description = (
    <View style={[styles.container, {
      paddingHorizontal: layoutConfig.container.paddingHorizontal,
      paddingVertical: layoutConfig.container.paddingVertical,
    }]}>
      <View style={styles.mainContent}>
        {/* Speech Bubble */}
        <View style={styles.speechBubbleContainer}>
          <SpeechBubble scale={1.5}>
            <TypewriterText
              text="Let's see what happens when we put our data into boxes!"
              style={styles.speechText}
              typingSpeed={40}
            />
          </SpeechBubble>
        </View>

        {/* Box Section with Good and Bad Boxes */}
        <View style={[styles.boxSection, {
          marginBottom: layoutConfig.boxSection.marginBottom,
          marginTop: layoutConfig.boxSection.marginTop,
          padding: layoutConfig.boxSection.padding,
          gap: layoutConfig.boxSection.gap,
          width: layoutConfig.boxSection.width,
          marginLeft: layoutConfig.boxSection.marginLeft
        }]}>
          {/* Good Box */}
          <View style={[styles.box, {
            flex: layoutConfig.goodBox.flex,
            marginRight: layoutConfig.goodBox.marginRight,
            width: layoutConfig.goodBox.width,
            transform: [{ scale: layoutConfig.goodBox.scale }]
          }]}>
            <View style={styles.iconContainer}>
              <View style={styles.sharkicon}>
                <GoodSharkIcon />
              </View>
              <View style={styles.correctButton}>
                <CorrectButton />
              </View>
            </View>
            <View style={[styles.boxLabel, {
              width: layoutConfig.boxLabel.width,
              marginTop: layoutConfig.boxLabel.marginTop,
              paddingVertical: layoutConfig.boxLabel.paddingVertical,
            }]}>
              <Text style={[styles.labelText, {
                fontSize: layoutConfig.labelText.fontSize,
                fontWeight: layoutConfig.labelText.fontWeight
              }]}>Good box!</Text>
            </View>
          </View>

          {/* Bad Box */}
          <View style={[styles.box, {
            flex: layoutConfig.badBox.flex,
            marginLeft: layoutConfig.badBox.marginLeft,
            width: layoutConfig.badBox.width,
            transform: [{ scale: layoutConfig.badBox.scale }]
          }]}>
            <View style={styles.iconContainer}>
              <View style={styles.sharkicon}>
                <BadSharkIcon />
              </View>
              <View style={styles.falseButton}>
                <FalseButton />
              </View>
            </View>
            <View style={[styles.boxLabel, {
              width: layoutConfig.boxLabel.width,
              marginTop: layoutConfig.boxLabel.marginTop,
              paddingVertical: layoutConfig.boxLabel.paddingVertical,
            }]}>
              <Text style={[styles.labelText, {
                fontSize: layoutConfig.labelText.fontSize,
                fontWeight: layoutConfig.labelText.fontWeight
              }]}>Bad box.</Text>
            </View>
          </View>
        </View>

        {/* Shark Component */}
        <View style={[styles.sharkSection, {
          marginTop: layoutConfig.sharkSection.marginTop,
          marginLeft: layoutConfig.sharkSection.marginLeft,
        }]}>
          <SharkWrapper>
            <DumbShark />
          </SharkWrapper>
        </View>
      </View>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <Link href="/page8" asChild>
          <BackButton isNavigation={true} />
        </Link>
        <Link href="/page10" asChild>
          <ContinueButton isNavigation={true} />
        </Link>
      </View>
    </View>
  );

  return <BasePage pageNumber={9} title=" " description={description} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxSection: {
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  box: {
    alignItems: 'center',
  },
  iconContainer: {
    position: 'relative',
    marginBottom: -50,
    height: 400,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sharkicon: {
    transform: [{ scale: 1.4 }],
  },
  correctButton: {
    position: 'absolute',
    bottom: -30,
    right: 0,
    transform: [{ scale: 0.8 }],
  },
  falseButton: {
    position: 'absolute',
    bottom: -30,
    right: 0,
    transform: [{ scale: 0.8 }],
  },
  boxLabel: {
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    padding: 6,
    alignItems: 'center',
    width: '90%',
  },
  labelText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 12,
  },
  sharkSection: {
    alignItems: 'center',
    bottom: 70,
    right: 50,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
    width: '100%',
  },
  speechBubbleContainer: {
    position: 'absolute',
    left: 250,
    bottom: 380,
    zIndex: 2,
    width: 250,
  },
  speechText: {
    fontSize: 36,
    textAlign: 'center',
    color: 'black',
    lineHeight: 44,
    fontWeight: '500',
  },
});