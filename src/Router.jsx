import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import VideoDetail from "./pages/video/VideoDetail";
function AppRouter() {

    return (

        <Router>
            <Navbar />
            <Switch>
                <Route path="/videos/:id">
                    <VideoDetail />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export { AppRouter as Route };