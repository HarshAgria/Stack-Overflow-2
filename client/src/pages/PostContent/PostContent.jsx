import React, { useState } from 'react';
import { filterAbusiveWords } from './Filter.jsx';

const PostContent = ({ addContent }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [contentType, setContentType] = useState('text');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const filteredContent = filterAbusiveWords(content);

    if (filteredContent === content) {
      addContent({ title, type: contentType, [contentType]: content });
      setTitle('');
      setContent('');
    } else {
      setError('Your content contains abusive or hateful words. Please revise.');
    }
  };

  return (
    <div className="post-content">
      <h1 className="post-content-title">Post Content</h1>
      <form onSubmit={handleSubmit} className="post-content-form">
        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Type</label>
          <select
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
            className="form-select"
          >
            <option value="text">Text</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Content</label>
          {contentType === 'text' && (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="form-textarea"
            />
          )}
          {contentType === 'image' && (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setContent(e.target.files[0])}
              className="form-file-input"
            />
          )}
          {contentType === 'video' && (
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setContent(e.target.files[0])}
              className="form-file-input"
            />
          )}
        </div>
        {error && <p className="form-error">{error}</p>}
        <button type="submit" className="form-submit-button">Post</button>
      </form>
    </div>
  );
};

export default PostContent;
