# n8n-nodes-eranol

This is an n8n community node that lets you professionaly process media using the [Eranol FFmpeg API](https://www.eranol.com). Eranol provides a powerful, cloud-based FFmpeg engine for video, audio, and image processing.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation tool.

## Features

- **Video Processing**: Trim, watermark, caption, overlay, progressBar, reframe, thumbnail, generate GIF, and more.
- **Audio Processing**: Denoise, highlights, remove silence, and conversion.
- **Composition**: Merge multiple images into videos with transitions and background audio.
- **Conversion**: Batch convert between common video (MP4, WebM), audio (MP3, WAV), and image (JPG, WebP) formats.
- **Job Management**: Long-running media tasks managed via a robust job system.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

```bash
npm install n8n-nodes-eranol
```

## Credentials

You'll need an API Key from your [Eranol Dashboard](https://www.eranol.com/dashboard).

1. Go to **Credentials** in n8n.
2. Select **Eranol API**.
3. Paste your **API Key**.

## Resources & Operations

### Video
- **Add Intro/Outro**: Seamlessly stitch intro or outro videos.
- **Caption**: Add text overlays or closed captions.
- **Extract Audio/Images**: Pull assets from your video files.
- **Generate GIF**: Convert video segments into high-quality GIFs.
- **Overlay**: Layer images or videos over your footage.
- **Progress Bar**: Add custom progress bars to your videos.
- **Reframe**: Automatically adjust video aspect ratios.
- **Thumbnail**: Generate preview images at specific timestamps.
- **Trim**: Precise cut operations.
- **Watermark**: Brand your content with logo overlays.

### Audio
- **Denoise**: Remove background noise from recordings.
- **Highlights**: Automatically extract key moments from audio.
- **Remove Silence**: Tighten up recordings by removing dead air.

### Compose
- **Merge**: Combine images into a slideshow video with transitions.

### Convert
- **Video**: MP4, WebM.
- **Audio**: MP3, WAV.
- **Image**: JPG, WebP.

## License

[MIT](LICENSE)
