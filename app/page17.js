import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import BasePage from './BasePage';
import Shark from '../components/Shark';
import SpeechBubble from '../components/SpeechBubble';
import TypewriterText from '../components/TypewriterText';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import { useFocusEffect } from '@react-navigation/native';
import SharkWrapper from '../components/SharkWrapper';

const VideoComponent = () => {
  if (Platform.OS === 'web') {
    return (
      <iframe
        src="https://sharkeye.org?wvideo=ajmwpt0hu3"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
        }}
        allow="autoplay; fullscreen"
      />
    );
  }

  return (
    <WebView
      source={{ uri: 'https://sharkeye.org?wvideo=ajmwpt0hu3' }}
      style={styles.video}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      allowsFullscreenVideo={true}
    />
  );
};

export default function Page17() {
  const title = ' ';

  const [showVideo, setShowVideo] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setShowVideo(true);
      return () => {
        setShowVideo(false);
      };
    }, [])
  );

  const description = (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <View style={styles.contentRow}>
          <View style={styles.leftContainer}>
            <View style={styles.speechBubbleContainer}>
              <SpeechBubble scale={1.6}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <TypewriterText
                    text="Click "
                    style={styles.speechText}
                    typingSpeed={40}
                  />
                  <Link href="https://sharkeye.org/">
                    <TypewriterText
                      text="here"
                      style={[styles.speechText, { color: '#4CC0B9' }]}
                      typingSpeed={40}
                      startDelay={200} // Delay to start after the first part finishes
                    />
                  </Link>
                  <TypewriterText
                    text=" for more resources!"
                    style={styles.speechText}
                    typingSpeed={40}
                    startDelay={400} // Additional delay for the rest of the text
                  />
                </View>
              </SpeechBubble>
            </View>
            <View style={styles.sharkContainer}>
              <SharkWrapper>
                <Shark />
              </SharkWrapper>
            </View>
          </View>
          <View style={styles.rightContainer}>
            <View style={styles.videoContainer}>
              {showVideo && <VideoComponent />}
            </View>
          </View>
        </View>
      </View>
      <View style={styles.footerContainer}>
        <Link href="/page16" asChild>
          <BackButton isNavigation={true} />
        </Link>
      </View>
    </View>
  );

  return <BasePage pageNumber={17} title={title} description={description} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    marginRight: -100,
  },
  speechBubbleContainer: {
    position: 'absolute',
    left: 260,
    bottom: 300,
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
  sharkContainer: {
    zIndex: 1,
    right: 225,
    top: 100,
    transform: [{ scale: 0.9 }],
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
    justifyContent: 'flex-start',
    paddingVertical: 25,
  },
});
