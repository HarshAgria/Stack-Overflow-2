import React from 'react';

const ContentItem = ({ content }) => {
  return (
    <div className="content-item">
      <h3 className="content-title">{content.title}</h3>
      {content.type === 'text' && <p className="content-text">{content.text}</p>}
      {content.type === 'image' && <img className="content-image" src={content.url} alt={content.title} />}
      {content.type === 'video' && (
        <video className="content-video" controls>
          <source src={content.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default ContentItem;
