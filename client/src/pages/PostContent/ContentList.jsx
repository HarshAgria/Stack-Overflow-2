import React from 'react';
import ContentItem from './ContentItem.jsx';

const ContentList = ({ contents }) => {
  return (
    <div className="content-list">
      <h1 className="content-list-title">Public Content</h1>
      {contents.map(content => (
        <ContentItem key={content.id} content={content} />
      ))}
    </div>
  );
};

export default ContentList;
