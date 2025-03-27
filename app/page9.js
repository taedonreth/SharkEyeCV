import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import BasePage from './BasePage';
import SharkIcon from '../components/SharkIcon';
import CorrectButton from '../components/CorrectButton';
import FalseButton from '../components/FalseButton';
import CroppingRectangle from '../components/CroppingRectangle';
import Shark from '../components/Shark';
import SpeechBubble from '../components/SpeechBubble';
import { ThemedText } from '../components/ThemedText';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';
import { transform } from 'typescript';

// Component layout configuration
const layoutConfig = {
  // Container spacing and layout configuration
  container: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },

  // Box section layout
  boxSection: {
    marginBottom: 600,    // space below the box section
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

  // Cropping section layout
  croppingRow: {
    marginVertical: -150,  // Move the entire row higher (negative value moves up)
    gap: 30,               // Reasonable gap between elements
    justifyContent: 'center', // Center the row
  },
  croppingGood: {
    flex: 0,               // Remove flex to prevent stretching
    marginRight: 0,        // Small margin for spacing
    marginLeft: 0,         // Reset any left margin
    scale: 0.62,           // Reduced scale to make it narrower (changed from 0.64)
    marginTop: -1000,       // Keep your vertical positioning
  },
  croppingBad: {
    flex: 0,               // Remove flex to prevent stretching
    marginLeft: 400,       // Small margin for spacing
    marginRight: 50,       // Reset any right margin
    scale: 0.30,           // Keep your scale
    marginTop: -1200,      // Added vertical positioning
  },

  // Shark section
  sharkSection: {
    marginTop: -700,       // top margin
    marginBottom: 0,
    marginLeft: -900,  // negative margin to adjust position
    transform: [{ scale: 0.8 }],
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
          <SpeechBubble>
            <ThemedText style={styles.questionText}>
              Is this image{'\n'}good or bad{'\n'}training data?
            </ThemedText>
          </SpeechBubble>
        </View>

        {/* Box Section with Good and Bad Boxes */}
        <View style={[styles.boxSection, {
          marginBottom: layoutConfig.boxSection.marginBottom,
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
              <SharkIcon />
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
              <SharkIcon />
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

        {/* Cropping Rectangles */}
        <View style={[styles.croppingRow, {
          marginVertical: layoutConfig.croppingRow.marginVertical,
          gap: layoutConfig.croppingRow.gap,
          justifyContent: 'center'
        }]}>
          <View style={[styles.croppingGood, {
            flex: layoutConfig.croppingGood.flex,
            marginRight: layoutConfig.croppingGood.marginRight,
            marginLeft: layoutConfig.croppingGood.marginLeft,
            marginTop: layoutConfig.croppingGood.marginTop,
            transform: [{ scale: layoutConfig.croppingGood.scale }]
          }]}>
            <CroppingRectangle />
          </View>
          <View style={[styles.croppingBad, {
            flex: layoutConfig.croppingBad.flex,
            marginLeft: layoutConfig.croppingBad.marginLeft,
            marginRight: layoutConfig.croppingBad.marginRight,
            marginTop: layoutConfig.croppingBad.marginTop,
            transform: [{ scale: layoutConfig.croppingBad.scale }]
          }]}>
            <CroppingRectangle />
          </View>
        </View>

        {/* Shark Component */}
        <View style={[styles.sharkSection, {
          marginTop: layoutConfig.sharkSection.marginTop,
          marginBottom: layoutConfig.sharkSection.marginBottom,
          marginLeft: layoutConfig.sharkSection.marginLeft,
          transform: layoutConfig.sharkSection.transform
        }]}>
          <Shark />
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
    height: 400,        // Reduced height
    width: 100,         // Reduced width
    justifyContent: 'center',
    alignItems: 'center',
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
    borderRadius: 6,      // smaller border radius
    padding: 6,           // reduced padding
    alignItems: 'center',
    width: '90%',         // slightly narrower
  },
  labelText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 12,         // smaller font size
  },
  croppingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  croppingGood: {},
  croppingBad: {},
  sharkSection: {
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
    width: '100%',
  },
  speechBubbleContainer: {
    position: 'absolute',
    left: 10,
    top: -370,
    transform: [{ scale: 0.25 }],
    zIndex: 20,
  },
  questionText: {
    fontSize: 70,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    lineHeight: 100,
  },
});