import { useState, useEffect } from "react";

import { CircularProgress } from "@mui/material";

import { useSpring, animated as a } from "react-spring";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";

import Image from "next/image";

const ProfileCardContent = () => {
  const [loaded, setLoaded] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "",
    avatar_url: "",
    name: "",
    bio: "",
    html_url: "",
    twitter_username: "",
  });

  const [profileSpring, profileSpringApi] = useSpring(() => ({
    config: {
      friction: 10,
    },
    scale: 0.8,
    opacity: 0,
  }));

  const [githubSpring, githubSpringApi] = useSpring(() => ({
    config: {
      friction: 10,
    },
    scale: 1,
  }));

  const [twitterSpring, twitterSpringApi] = useSpring(() => ({
    config: {
      friction: 10,
    },
    scale: 1,
  }));

  const handleMouseOver = (isLeaving, spring) => {
    if (!isLeaving) {
      spring.start({
        scale: 1.1,
      });
    } else {
      spring.start({
        scale: 1,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/github_info");
      const data = await response.json();
      setProfileData(data);
      setLoaded(true);
      console.log(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (loaded) {
      profileSpringApi.start({
        scale: 1,
        opacity: 1,
      });
    }
  }, [loaded]);

  return loaded && profileData ? (
    <>
      <a.div
        style={profileSpring}
        className="flex flex-col justify-center items-center relative top-36 font-[Poppins]">
        <div className="flex flex-col justify-center items-center">
          <div className="rounded-full">
            <Image
              src={profileData.avatar_url}
              alt={profileData.name}
              className="rounded-full"
              width="80"
              height="80"
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <div>
              <h1 className="text-2xl font-bold inline mx-4">
                {profileData.name}
              </h1>
              <h2 className="text-lg inline">({profileData.username})</h2>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-lg my-2">{profileData.bio}</p>
          <div className="flex content-center justify-center my-1 text-4xl">
            <a.a
              style={githubSpring}
              onMouseEnter={() => handleMouseOver(false, githubSpringApi)}
              onMouseLeave={() => handleMouseOver(true, githubSpringApi)}
              href={profileData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline mx-4">
              <FontAwesomeIcon icon={faGithub} />
            </a.a>
            <a.a
              style={twitterSpring}
              onMouseEnter={() => handleMouseOver(false, twitterSpringApi)}
              onMouseLeave={() => handleMouseOver(true, twitterSpringApi)}
              href={`https://twitter.com/${profileData.twitter_username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-4">
              <FontAwesomeIcon icon={faTwitter} />
            </a.a>
          </div>
        </div>
      </a.div>
    </>
  ) : (
    <>
      <CircularProgress
        sx={{ color: "#e25a4890" }}
        size={100}
        className="relative top-8"
      />
    </>
  );
};

export default ProfileCardContent;
