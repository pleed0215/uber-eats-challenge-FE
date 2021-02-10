import React from "react";
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

export const LoggedInRouter = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/host/:id/episode/:episodeId/delete" exact>
          <DoEpisode />
        </Route>
        <Route path="/host/:id/episode/:episodeId/update" exact>
          <DoEpisode />
        </Route>
        <Route path="/host/:id/episode/create" exact>
          <DoEpisode />
        </Route>
        <Route path="/host/:id/episode" exact>
          <EpisodePage />
        </Route>
        <Route path="/host/:id/delete" exact>
          <DoPodcast />
        </Route>
        <Route path="/host/:id/update" exact>
          <DoPodcast />
        </Route>
        <Route path="/host/create" exact>
          <DoPodcast />
        </Route>
        <Route path="/host" exact>
          <HostPage />
        </Route>
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
      <Footer />
    </Router>
  );
};
