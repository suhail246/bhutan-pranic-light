const VideoPreview = ({ fileKey, url, type }) => {
  return (
    <div className="relative w-full h-full">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={url}
        type={type}
        controls
        muted
      />
    </div>
  );
};

export default VideoPreview;
