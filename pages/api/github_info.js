const handler = async (req, res) => {
  //const response = await fetch(`https://api.github.com/users/bboud`);
  //const data = await response.json();

  // temporary static data because we hit the limit

  const tempData = {
    username: "bboud",
    avatar_url: "https://avatars.githubusercontent.com/u/66580288?v=4",
    url: "https://api.github.com/users/bboud",
    html_url: "https://github.com/bboud",
    name: "Brandon",
    bio: "Physics undergraduate at Wayne State University",
    twitter_username: "brandonb_phy",
  };

  // res.status(200).json({
  //   username: data.login,
  //   avatar_url: data.avatar_url,
  //   name: data.name,
  //   html_url: data.html_url,
  //   bio: data.bio,
  //   name: data.name,
  //   twitter_username: data.twitter_username,
  // });

  res.status(200).json(tempData);
};

export default handler;
