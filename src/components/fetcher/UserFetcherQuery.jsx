import React from "react";
import { useSearchParams } from "react-router-dom";

// HOC pour injecter searchParams dans un composant de classe
function withSearchParams(WrappedComponent) {
  function WithSearchParams(props) {
    const [searchParams] = useSearchParams();
    return <WrappedComponent {...props} searchParams={searchParams} />;
  }
  WithSearchParams.displayName = `WithSearchParams(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;
  return WithSearchParams;
}

class UserFetcherQuery extends React.Component {
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
    const userId = this.props.searchParams.get("user");
    if (!userId) {
      this.setState({
        loading: false,
        error: new Error("Aucun userId dans l'URL"),
      });
      return;
    }

    // Fetch all endpoints in parallel
    Promise.all([
      fetch(`http://localhost:3000/user/${userId}`).then((res) => res.json()),
      fetch(`http://localhost:3000/user/${userId}/performance`).then((res) =>
        res.json(),
      ),
      fetch(`http://localhost:3000/user/${userId}/average-sessions`).then(
        (res) => res.json(),
      ),
      fetch(`http://localhost:3000/user/${userId}/activity`).then((res) =>
        res.json(),
      ),
    ])
      .then(([userData, performance, averageSessions, activity]) => {
        this.setState({
          userData,
          performance,
          averageSessions,
          activity,
          loading: false,
        });
        console.log("Données utilisateur : ", {
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
    if (typeof this.props.children === "function") {
      // Passe toutes les données combinées à l'enfant
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

const UserFetcherQueryWithSearchParams = withSearchParams(UserFetcherQuery);
export default UserFetcherQueryWithSearchParams;
