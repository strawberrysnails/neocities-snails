module.exports = {
  eleventyNavigation: data => {
    if (!data.title) return;

    return {
      key: data.title,
      parent: "Blog",
      order: data.page.date.getTime(),
    };
  }
};
