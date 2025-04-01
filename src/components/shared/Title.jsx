import React from 'react'
import {Helmet} from 'react-helmet-async'

const Title = ({title = "Chat app",description = "this the chat app called chattu"}) => {
  return (
     <Helmet>
         <title>{title}</title>
         <meta name="description" content={description}/>
     </Helmet>
  )
}

export default Title