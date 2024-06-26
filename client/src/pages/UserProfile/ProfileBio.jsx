import React, { useState} from 'react';

const ProfileBio = ({currentProfile}) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const toggleMoreInfo = () => {
    setShowMoreInfo(!showMoreInfo);
};

  return (
    <div>
      <div>
      {
        currentProfile?.tags.length !== 0 ? (
            <>
                <h4>Tags watched</h4>
                {
                    currentProfile?.tags.map((tag) =>(
                        <p key={tag}>{tag}</p>
                    ))
                }
            </>
        ): (
            <p>0 tags watched</p>
        )
      }
      </div>
      <div>
        {
            currentProfile?.about ? (
                <>
                    <h4>About</h4>
                    <p>{currentProfile?.about}</p>
                </>
            ): (
                <p>No bio found</p>
            )
        }
      </div>

      <div>
                <h4>Points</h4>
                {console.log(currentProfile?.points)}
                <p>{currentProfile?.points}</p>
            </div>

            {currentProfile?.badges.length > 0 ? (
                <div>
                    <h4>Badges</h4>
                    {currentProfile.badges.map((badge) => (
                        <p key={badge}>{badge}</p>
                    ))}
                </div>
            ):(
              <h4>No Badges</h4>  
            )}

      <button className="profile-more-info-button" onClick={toggleMoreInfo}>
                {showMoreInfo ? 'Hide Info' : 'More Info'}
            </button>
            {showMoreInfo && (
                <div className="profile-login-history-container">
                    {currentProfile?.loginHistory?.length !== 0 ? (
                        <>
                            <h4>Login History</h4>
                            <table className="login-history-table">
                                <thead>
                                    <tr>
                                        <th>Timestamp</th>
                                        <th>IP Address</th>
                                        <th>Browser</th>
                                        <th>OS</th>
                                        <th>Device</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentProfile.loginHistory?.map((entry) => (
                                        <tr key={entry._id}>
                                            <td>{new Date(entry.timestamp).toLocaleString()}</td>
                                            <td>{entry.ip}</td>
                                            <td>{entry.browser}</td>
                                            <td>{entry.os}</td>
                                            <td>{entry.device}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <p>No login history found</p>
                    )}
                </div>
            )}

    </div>
  )
}

export default ProfileBio
