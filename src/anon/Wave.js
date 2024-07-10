import React, { useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';

function Wave() {
  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: '#4F3A85',
      progressColor: '#383351',
    });

    wavesurfer.load('audio/Nujabes.mp3');
    // Ensure wavesurfer is properly destroyed when component is unmounted
    return () => wavesurfer.destroy();
  }, []); // Empty dependency array means this effect runs once when component mounts

  return <div id="waveform"></div>;
}

export default Wave;