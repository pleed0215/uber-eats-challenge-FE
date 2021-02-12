import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "../components/Header";

import { LogoutPage } from "../pages/logout";
import { PageNotFound } from "../pages/404";
import { HomePage } from "../pages/home/home";
import { PodcastPage } from "../pages/home/podcast";
import { Footer } from "../components/footer";
import { EpisodePage } from "../pages/home/episode";
import { CategoryPage } from "../pages/home/category";
import { SearchPage } from "../pages/home/search";
import { UserPage } from "../pages/home/user";
import { EditProfilePage } from "../pages/home/edit-profile";
import { HostPage } from "../pages/host/host";
import { DoPodcast } from "../pages/host/do-podcast";
import { DoEpisode } from "../pages/host/do-episode";
import { useMe } from "../hooks/useMe";
import { UserRole } from "../codegen/globalTypes";
import { LoaderWithLogo } from "../components/LoaderWithLogo";
import { HostEpisodePage } from "../pages/host/host-episode";
import { PodcastPlayer } from "../components/PodcastPlayer";

interface IPlayerContext {
  isPlaying: boolean;
  isShowing: boolean;
  playLength: number | null;
  title: string | null;
  fileUrl: string | null;
  setIsPlaying: React.Dispatch<boolean>;
  setIsShowing: React.Dispatch<boolean>;
  setPlayLength: React.Dispatch<number | null>;
  setFileUrl: React.Dispatch<string | null>;
  setTitle: React.Dispatch<string | null>;
}

export const PlayerContext = createContext<IPlayerContext | null>(null);

interface HostRoute {
  route: string;
  Component: React.FC;
}

const hostRoutes: Array<HostRoute> = [
  { route: "/host/:id/episode/:episodeId/delete", Component: DoEpisode },
  { route: "/host/:id/episode/:episodeId/update", Component: DoEpisode },
  { route: "/host/:id/episode/create", Component: DoEpisode },
  { route: "/host/:id/episode", Component: HostEpisodePage },
  { route: "/host/:id/delete", Component: DoPodcast },
  { route: "/host/:id/update", Component: DoPodcast },
  { route: "/host/create", Component: DoPodcast },
  { route: "/host", Component: HostPage },
];

export const LoggedInRouter = () => {
  const { data, loading } = useMe();
  const [isShowing, setIsShowing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [title, setTitle] = useState<string | null>(null);
  const [playLength, setPlayLength] = useState<number | null>(0);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  if (loading && !data) {
    return (
      <div className="w-screen min-h-screen">
        <LoaderWithLogo />
      </div>
    );
  }

  return (
    <PlayerContext.Provider
      value={{
        isShowing,
        isPlaying,
        playLength,
        fileUrl,
        title,
        setIsShowing,
        setIsPlaying,
        setPlayLength,
        setFileUrl,
        setTitle,
      }}
    >
      <Router>
        <Header />
        <Switch>
          {data?.me.role === UserRole.Host &&
            hostRoutes.map((route, index) => (
              <Route path={route.route} key={`host-route-${index}`} exact>
                <route.Component />
              </Route>
            ))}
          <Route path="/user/:id" exact>
            <UserPage isSelf={false} />
          </Route>
          <Route path="/my-page/edit" exact>
            <EditProfilePage />
          </Route>
          <Route path="/my-page" exact>
            <UserPage isSelf={true} />
          </Route>
          <Route path="/find" exact>
            <SearchPage />
          </Route>
          <Route path="/category" exact>
            <CategoryPage />
          </Route>
          <Route path="/podcast/:podcastId/episodes/:episodeId" exact>
            <EpisodePage />
          </Route>
          <Route path="/podcast/:id" exact>
            <PodcastPage />
          </Route>
          <Route path="/logout" exact>
            <LogoutPage />
          </Route>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
        <PodcastPlayer />
        <Footer />
      </Router>
    </PlayerContext.Provider>
  );
};
