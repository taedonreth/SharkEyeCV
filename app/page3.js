import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import BasePage from './BasePage';
import DumbShark from '../components/dumbshark';
import SpeechBubble from '../components/SpeechBubble';
import TypewriterText from '../components/TypewriterText';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';
import SharkWrapper from '../components/SharkWrapper';
import Goggles from '../components/goggles';


const VideoComponent = () => {
  if (Platform.OS === 'web') {
    return (
      <video
        src={require('../assets/videos/sharkeyevideo2.mov')}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        autoPlay
        muted
        playsInline
        controls
      />
    );
  }

  return (
    <WebView
      source={{ uri: require('../assets/videos/sharkeyevideo2.mov') }}
      style={styles.video}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      allowsFullscreenVideo={true}
      mediaPlaybackRequiresUserAction={false}
      androidHardwareAccelerationDisabled={false}
      automaticallyAdjustContentInsets={true}
    />
  );
};

export default function Page3() {
  const title = "Video";
  const description = (
    <View style={styles.container}>
      {/* Main content area */}
      <View style={styles.mainContent}>
        <View style={styles.contentRow}>
          {/* Left side container for Shark and Speech Bubble */}
          <View style={styles.leftContainer}>
            {/* Speech bubble positioned above the shark */}
            <View style={styles.speechBubbleContainer}>
              <SpeechBubble scale={1.8}>
                <TypewriterText
                  text="This is how I can be used to detect Frankie's friend's and family in real life!"
                  style={styles.speechText}
                  typingSpeed={100}
                  />
              </SpeechBubble>
            </View>
            {/* Shark below the speech bubble */}
            <View style={styles.sharkContainer}>
              <SharkWrapper>
                <View style={styles.gogglesContainer}>
                  <Goggles />
                </View>
              </SharkWrapper>
            </View>
          </View>

          {/* Right side container for video */}
          <View style={styles.rightContainer}>
            <View style={styles.videoContainer}>
              <VideoComponent />
            </View>
          </View>
        </View>
      </View>

      {/* Footer with navigation buttons */}
      <View style={styles.footerContainer}>
        <Link href="/review" asChild>
          <BackButton isNavigation={true} />
        </Link>
        <Link href="/page17" asChild>
          <ContinueButton isNavigation={true} />
        </Link>
      </View>
    </View>
  );

  return <BasePage pageNumber={3} title={title} description={description} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  speechText: {
    fontSize: 28,
    textAlign: 'center',
    color: 'black',
    lineHeight: 44,
    fontWeight: '500',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 10,
    position: 'relative',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 50,
  },
  speechBubbleContainer: {
    position: 'absolute',
    top: -240,
    left: 270,
    zIndex: 2,
    width: 250,
  },
  speechBubbleImage: {
    width: '100%',
    height: 400,
  },  
  gogglesContainer: {
    position: 'absolute',
    zIndex: 3,
    top: -200,  // Adjust this value to move goggles up/down
    left: -550, // Adjust this value to move goggles left/right
    transform: [
      { scaleX: -1 }, // This flips the goggles horizontally
      { scale: 0.7 }  // This makes the goggles 70% of their original size
    ],
  },
  videoContainer: {
    width: 600,
    height: 500,
    backgroundColor: '#E6EBEA',
    borderRadius: 30,
    overflow: 'hidden',
  },
  video: {
    flex: 1,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
});