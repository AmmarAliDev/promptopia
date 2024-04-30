'use client'

import { useEffect, useState } from "react"
import PromptCard from "./PromptCard"

const PromptCardList = ({ data, handleTagClick }) => (
  <div className="mt-16 prompt_layout">
    {data?.map((post) => (
      <PromptCard
        key={post._id}
        post={post}
        handleTagClick={handleTagClick}
      />
    ))}

  </div>
)

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searchTimeOut, setSearchTimeOut] = useState(null)
  const [posts, setPosts] = useState([])

  const filteredPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = async (e) => {
    clearTimeout(searchTimeOut)
    setSearchText(e.target.value)

    setTimeout(() => {
      const searchResults = filteredPrompts(e.target.value)
      setSearchResults(searchResults)
    }, 500)


  }

  const handleTagClick = (tagName) => {
    setSearchText(tagName)

    const searchResults = filteredPrompts(tagName)
    setSearchResults(searchResults)
  }


  const feedPosts = async () => {
    const response = await fetch('/api/prompt')
    const data = await response.json()
    setPosts(data)
  }

  useEffect(() => {

    feedPosts()
  }, [])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {searchText
        ? <PromptCardList
          data={searchResults}
          handleTagClick={handleTagClick}
        />

        : <PromptCardList
          data={posts}
          handleTagClick={handleTagClick}
        />
      }


    </section>
  )
}

export default Feed