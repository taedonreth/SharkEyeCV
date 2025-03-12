import React from 'react';
import { View, StyleSheet } from 'react-native';
import BasePage from './BasePage';
import Shark from '../components/Shark';
import SpeechBubble from '../components/SpeechBubble';
import Resources from '../components/Resources';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';

export default function Page17() {
  const title = ' '; // Or any title you'd like
  const description = (
    <View style={styles.container}>
      {/* Main content: shark + speech bubble + resources */}
      <View style={styles.mainContent}>
        {/* Shark + bubble side by side (or stacked, your choice) */}
        <View style={styles.sharkBubbleContainer}>
          <View style={styles.sharkContainer}>
            <Shark />
          </View>

          <View style={styles.bubbleContainer}>
            <SpeechBubble />
          </View>
        </View>

        {/* Resources component to the right (or below, if you change flexDirection) */}
        <View style={styles.resourcesContainer}>
          <Resources />
        </View>
      </View>

      {/* Footer with Back button only */}
      <View style={styles.footerContainer}>
        <Link href="/page16" asChild>
          <BackButton isNavigation={true} />
        </Link>
      </View>
    </View>
  );

  // Render BasePage with custom description
  return <BasePage pageNumber={17} title={title} description={description} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Fills available space (below the title/description in BasePage)
  mainContent: {
    flex: 1,
    flexDirection: 'row',    // Place items in a row
    alignItems: 'center',
    justifyContent: 'center',
    // If you want them stacked vertically, do flexDirection: 'column'
  },
  sharkBubbleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: -300,
  },
  sharkContainer: {
    transform: [{ scale: 0.7 }, { rotate: '-5deg' }],
  },
  bubbleContainer: {
    transform: [{ scale: 0.3 }, { rotate: '5deg' }],
    marginBottom: 200,
  },
  resourcesContainer: {
    // Additional styling if needed
    transform: [{ scale: 0.7 }],
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Or 'center' / 'space-between'
    paddingVertical: 25,
    // If you need it pinned truly at the bottom, you can do:
    // alignSelf: 'stretch',
  },
});
