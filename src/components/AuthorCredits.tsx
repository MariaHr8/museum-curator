export const AuthorCredits = ({ item }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flex: 1,
        flexDirection: "row",
        fontSize: 14,
        color: "white",
        lineHeight: "1em",
        margin: "4px 2px 0px 2px",
      }}
    >
      <span>
        <a href={item.link} target="_blank" rel="noopener noreferrer">
          Photo
        </a>
        {" by "}
        <a href={item.authorLink} target="_blank" rel="noopener noreferrer">
          {item.author}
        </a>
        {" on "}
        <a
          href="https://unsplash.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Unsplash
        </a>
      </span>
    </div>
  );
};
