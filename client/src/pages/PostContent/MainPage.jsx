import React, { useState } from 'react';
import PostContent from './PostContent.jsx';
import ContentList from './ContentList.jsx';
import './styles.css';

const HomePage = () => {
  const [contents, setContents] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const addContent = (content) => {
    if (content.type === 'image' || content.type === 'video') {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        content.url = fileReader.result;
        setContents([...contents, { id: contents.length + 1, ...content }]);
      };
      fileReader.readAsDataURL(content[content.type]);
    } else {
      setContents([...contents, { id: contents.length + 1, ...content }]);
    }
  };

  return (
    <div className="home-page">
      <button className="toggle-form-button" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Close' : 'Add Your Content'}
      </button>
      {showForm && <PostContent addContent={addContent} />}
      <ContentList contents={contents} />
    </div>
  );
};

export default HomePage;
