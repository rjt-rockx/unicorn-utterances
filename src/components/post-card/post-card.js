import React, { useRef } from "react"
import { Link } from "gatsby"
import cardStyles from "./post-card.module.scss"
import Image from "gatsby-image"
import { stopPropCallback } from "../../utils/preventCallback"

export const PostCard = ({ title, authors, published, tags, excerpt, description, className, slug }) => {
  const headerLink = useRef()
  const authorLink = useRef()
  return (
    <div className={`${cardStyles.card} ${className}`} onClick={() => headerLink.current.click()}>
      <div className={cardStyles.cardContents}>
        <Link
          to={`/posts${slug}`}
          onClick={stopPropCallback}
          className="unlink"
        >
          <h2 className={cardStyles.header} ref={headerLink}
          >{title}</h2>
        </Link>
        <p className={cardStyles.authorName}
           onClick={(e) => {
             stopPropCallback(e)
             authorLink.current.click()
           }}
        >
          by&nbsp;{authors.map(author => author.name).join(", ")} {/*get comma-separated list of authors*/}
        </p>
        <div className={cardStyles.dateTagSubheader}>
          <p className={cardStyles.date}>{published}</p>
          <div>
            {
              tags.map(tag => (
                <span
                  key={tag}
                  className={cardStyles.tag}
                >
                  {tag}
                </span>
              ))
            }
          </div>
        </div>
        <p className={cardStyles.excerpt} dangerouslySetInnerHTML={{
          __html: description || excerpt,
        }}
        />
      </div>
      <Link
        to={`/unicorns/${authors.id}`}
        ref={authorLink}
        onClick={stopPropCallback}
        className={cardStyles.profilePicLink}
        style={{
          borderColor: authors.color,
        }}
      >
        <Image
          fixed={authors[0].profileImg.childImageSharp.smallPic}
          alt={authors.name}
          className={cardStyles.profilePic}
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
      </Link>
    </div>
  )
}

