import { useState, useContext, createContext } from "react";

const postContext = createContext();

export const usePostsValue = () => {
  const value = useContext(postContext);
  return value;
};

export const PostContextProvider = ({ children }) => {
  const [savedPosts, setSavedPosts] = useState([]);

  const resetPosts = () => setSavedPosts([]);

  const savePost = (post) => {
    const isSaved = savedPosts.find((p) => p.id === post.id);
    if (isSaved) {
      return alert("Post is already saved.");
    }
    setSavedPosts((prev) => [post, ...prev]);
  };

  // create a function to unsave post here
  const unsave = (id) =>{
    const index = savedPosts.findIndex((p) => p.id === id )
    if(index !== -1){
      savedPosts.splice(index,1);
      console.log("saved", savedPosts);
      setSavedPosts([...savedPosts]);
    }
    else{return}
    // const filterPost = savedPosts.filter((p)=> p.id !== id);
    // setSavedPosts(filterPost);

  }

  return (
    <postContext.Provider
      value={{ savedPosts, setSavedPosts, resetPosts, savePost, unsave }}
    >
      {children}
    </postContext.Provider>
  );
};