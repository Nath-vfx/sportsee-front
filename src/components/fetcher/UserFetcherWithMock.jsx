import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { mockData } from '../../mocks/userData';

function withSearchParams(WrappedComponent) {
  function WithSearchParams(props) {
    const [searchParams] = useSearchParams();
    return <WrappedComponent {...props} searchParams={searchParams} />;
  }
  WithSearchParams.displayName = `WithSearchParams(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return WithSearchParams;
}

class UserFetcherWithMock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      performance: null,
      averageSessions: null,
      activity: null,
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    const userId = this.props.searchParams.get('user');
    const isMock = this.props.searchParams.get('mock') === 'true';

    if (!userId) {
      this.setState({
        loading: false,
        error: new Error("Aucun userId dans l'URL"),
      });
      return;
    }

    if (isMock) {
      this.fetchMockData(userId);
    } else {
      this.fetchRealData(userId);
    }
  }

  fetchMockData(userId) {
    const numericUserId = parseInt(userId, 10);
    const mockDataForUser = mockData[numericUserId];
    
    if (mockDataForUser) {
      this.setState({
        userData: mockDataForUser.userData,      // Ne pas réencapsuler dans { data: ... }
        performance: mockDataForUser.performance,
        averageSessions: mockDataForUser.averageSessions,
        activity: mockDataForUser.activity,
        loading: false,
      });
      console.log('Données mockées chargées : ', mockDataForUser);
    } else {
      this.setState({
        loading: false,
        error: new Error("Données mockées non trouvées pour cet utilisateur"),
      });
    }
  }

  fetchRealData(userId) {
    Promise.all([
      fetch(`http://localhost:3000/user/${userId}`).then((res) => res.json()),
      fetch(`http://localhost:3000/user/${userId}/performance`).then((res) => res.json()),  
      fetch(`http://localhost:3000/user/${userId}/average-sessions`).then((res) => res.json()),
      fetch(`http://localhost:3000/user/${userId}/activity`).then((res) => res.json()),
    ])
      .then(([userData, performance, averageSessions, activity]) => {
        this.setState({
          userData,
          performance,
          averageSessions,
          activity,
          loading: false,
        });
        console.log('Données utilisateur : ', {
          userData,
          performance,
          averageSessions,
          activity,
        });
      })
      .catch((err) => this.setState({ error: err, loading: false }));
  }

  render() {
    if (this.state.loading) return <div>Chargement...</div>;
    if (this.state.error) return <div>Erreur : {this.state.error.message}</div>;
    if (typeof this.props.children === 'function') {
      const { userData, performance, averageSessions, activity } = this.state;
      return this.props.children({
        userData,
        performance,
        averageSessions,
        activity,
      });
    }
    return null;
  }
}

const UserFetcherWithMockParams = withSearchParams(UserFetcherWithMock);
export default UserFetcherWithMockParams;