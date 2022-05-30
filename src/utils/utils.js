export const dataMapper = (data) => {
  return Array.isArray(data)
    ? data.map(({ name, description }) => ({ name, description }))
    : {
        login: data.login,
        name: data.name,
        picture: data.avatar_url,
        alt: `Avatar of user ${data.login}`,
        repoUrl: data.repos_url,
      };
};
